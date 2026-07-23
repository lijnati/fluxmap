import { toPng, toSvg } from 'html-to-image';
import { DataCell } from '@/types';

/**
 * Downloads a high-resolution 4K PNG screenshot of a container element.
 */
export async function downloadPNG(elementId: string, filename: string = 'heatmap-export.png') {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Export error: Element with ID #${elementId} not found.`);
    return;
  }

  try {
    const dataUrl = await toPng(node, {
      pixelRatio: 4, // 4K high resolution rendering
      cacheBust: true,
      backgroundColor: '#09090b',
    });

    const link = document.createElement('a');
    link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Failed to export PNG:', error);
  }
}

/**
 * Downloads a scalable SVG vector of a container element.
 */
export async function downloadSVG(elementId: string, filename: string = 'heatmap-export.svg') {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Export error: Element with ID #${elementId} not found.`);
    return;
  }

  try {
    const dataUrl = await toSvg(node, {
      cacheBust: true,
      backgroundColor: '#09090b',
    });

    const link = document.createElement('a');
    link.download = filename.endsWith('.svg') ? filename : `${filename}.svg`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Failed to export SVG:', error);
  }
}

/**
 * Compiles cell telemetry into a downloadable CSV spreadsheet.
 */
export function downloadCSV(cells: DataCell[], filename: string = 'heatmap-data.csv') {
  if (!cells || cells.length === 0) return;

  const headers = ['Cell ID', 'Week (X)', 'Day (Y)', 'Date', 'Value', 'Label'];
  const rows = cells.map((c) => [
    c.id,
    c.x,
    c.y,
    c.date || 'N/A',
    c.value,
    `"${(c.label || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
