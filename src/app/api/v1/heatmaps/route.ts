import { NextRequest, NextResponse } from 'next/server';
import { getStoredHeatmaps, saveHeatmap } from '@/lib/storage';
import { HeatmapData } from '@/types';

// GET /api/v1/heatmaps - List heatmaps with filtering and pagination
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const visibility = searchParams.get('visibility');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    let heatmaps = getStoredHeatmaps();

    if (type) {
      heatmaps = heatmaps.filter((h) => h.type === type);
    }
    if (visibility) {
      heatmaps = heatmaps.filter((h) => h.visibility === visibility);
    }

    const total = heatmaps.length;
    const startIndex = (page - 1) * limit;
    const paginated = heatmaps.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: paginated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/v1/heatmaps - Create a new heatmap programmatically
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    const newHeatmap: HeatmapData = {
      id: body.id || `h_api_${Date.now()}`,
      title: body.title,
      description: body.description || 'Created via Heatmap Hub REST API',
      type: body.type || 'custom',
      visibility: body.visibility || 'public',
      ownerId: body.ownerId || 'api_user',
      ownerName: body.ownerName || 'API Developer',
      ownerAvatar: body.ownerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      ownerHandle: body.ownerHandle || 'api_dev',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 0,
      likesCount: 0,
      config: body.config || {
        columns: 24,
        rows: 7,
        cellSize: 16,
        cellGap: 4,
        borderRadius: 4,
        colorTheme: 'emerald',
        showLegend: true,
        showLabels: true,
        showTooltips: true,
      },
      cells: body.cells || [],
      tags: body.tags || ['API', 'Automated'],
    };

    saveHeatmap(newHeatmap);

    return NextResponse.json(
      {
        success: true,
        message: 'Heatmap created successfully',
        data: newHeatmap,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create heatmap' },
      { status: 500 }
    );
  }
}
