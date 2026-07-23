import { NextRequest, NextResponse } from 'next/server';
import { getHeatmapById, saveHeatmap, deleteHeatmap } from '@/lib/storage';

// GET /api/v1/heatmaps/[id] - Fetch specific heatmap
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const heatmap = getHeatmapById(id);

    if (!heatmap) {
      return NextResponse.json(
        { success: false, error: `Heatmap with ID '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: heatmap,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT /api/v1/heatmaps/[id] - Update heatmap configuration or cells
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = getHeatmapById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Heatmap with ID '${id}' not found` },
        { status: 404 }
      );
    }

    const updates = await req.json();

    const updatedHeatmap = {
      ...existing,
      ...updates,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };

    saveHeatmap(updatedHeatmap);

    return NextResponse.json({
      success: true,
      message: 'Heatmap updated successfully',
      data: updatedHeatmap,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update heatmap' },
      { status: 500 }
    );
  }
}

// DELETE /api/v1/heatmaps/[id] - Delete heatmap
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = getHeatmapById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Heatmap with ID '${id}' not found` },
        { status: 404 }
      );
    }

    deleteHeatmap(id);

    return NextResponse.json({
      success: true,
      message: `Heatmap '${id}' deleted successfully`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete heatmap' },
      { status: 500 }
    );
  }
}
