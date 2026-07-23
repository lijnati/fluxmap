import { NextRequest, NextResponse } from 'next/server';
import { getHeatmapById, saveHeatmap } from '@/lib/storage';
import { DataCell } from '@/types';

// POST /api/v1/telemetry/ingest - Live Telemetry Event Ingestion Endpoint
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { heatmapId, x, y, value, increment, label, events } = body;

    if (!heatmapId) {
      return NextResponse.json(
        { success: false, error: 'heatmapId is required' },
        { status: 400 }
      );
    }

    const heatmap = getHeatmapById(heatmapId);
    if (!heatmap) {
      return NextResponse.json(
        { success: false, error: `Heatmap '${heatmapId}' not found` },
        { status: 404 }
      );
    }

    const cellMap = new Map<string, DataCell>();
    heatmap.cells.forEach((c) => cellMap.set(`${c.x}-${c.y}`, c));

    // Handle batch events if provided
    const itemsToIngest = Array.isArray(events)
      ? events
      : typeof x === 'number' && typeof y === 'number'
      ? [{ x, y, value, increment, label }]
      : [];

    if (itemsToIngest.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid cell coordinates (x, y) provided' },
        { status: 400 }
      );
    }

    let updatedCount = 0;

    itemsToIngest.forEach((item: any) => {
      const key = `${item.x}-${item.y}`;
      const existingCell = cellMap.get(key);

      const cellValue =
        typeof item.increment === 'number'
          ? (existingCell?.value || 0) + item.increment
          : typeof item.value === 'number'
          ? item.value
          : (existingCell?.value || 0) + 1;

      const updatedCell: DataCell = {
        id: existingCell?.id || `cell_${item.x}_${item.y}`,
        x: item.x,
        y: item.y,
        value: cellValue,
        label: item.label || existingCell?.label || `Value: ${cellValue}`,
        date: item.date || existingCell?.date || new Date().toISOString().split('T')[0],
      };

      cellMap.set(key, updatedCell);
      updatedCount++;
    });

    const updatedCells = Array.from(cellMap.values());
    const updatedHeatmap = {
      ...heatmap,
      cells: updatedCells,
      updatedAt: new Date().toISOString(),
    };

    saveHeatmap(updatedHeatmap);

    return NextResponse.json({
      success: true,
      message: `Ingested ${updatedCount} telemetry event(s) into heatmap '${heatmapId}'`,
      heatmapId,
      totalCells: updatedCells.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Telemetry ingestion failed' },
      { status: 500 }
    );
  }
}
