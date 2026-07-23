import { NextRequest, NextResponse } from 'next/server';
import { getHeatmapById } from '@/lib/storage';
import { SAMPLE_AI_INSIGHTS } from '@/lib/sample-data';

// GET /api/v1/insights/[id] - Programmatic AI Insights Endpoint
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const heatmap = getHeatmapById(id);

    if (!heatmap) {
      return NextResponse.json(
        { success: false, error: `Heatmap '${id}' not found` },
        { status: 404 }
      );
    }

    const preset = SAMPLE_AI_INSIGHTS[id];
    const cells = heatmap.cells || [];
    const values = cells.map((c) => c.value);
    const total = values.reduce((a, b) => a + b, 0);
    const maxVal = values.length > 0 ? Math.max(...values) : 0;
    const avg = values.length > 0 ? Math.round(total / values.length) : 0;

    const insights = preset || [
      {
        id: `ins_api_1_${id}`,
        heatmapId: id,
        title: 'Peak Activity Detection',
        description: `Highest recorded intensity reached ${maxVal} units (${Math.round((maxVal / (avg || 1)) * 100)}% above baseline average).`,
        metric: `${maxVal} max units`,
        type: 'positive',
      },
      {
        id: `ins_api_2_${id}`,
        heatmapId: id,
        title: 'Density Analysis',
        description: `${Math.round((cells.filter((c) => c.value > 0).length / Math.max(1, cells.length)) * 100)}% of matrix slots contain non-zero telemetry records.`,
        metric: `${cells.length} total slots`,
        type: 'neutral',
      },
    ];

    return NextResponse.json({
      success: true,
      heatmapId: id,
      title: heatmap.title,
      diagnostics: {
        totalCells: cells.length,
        totalVolume: total,
        maxIntensity: maxVal,
        averageIntensity: avg,
      },
      insights,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
