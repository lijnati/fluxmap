'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { HeatmapGrid } from '@/components/heatmap/HeatmapGrid';
import { HeatmapData } from '@/types';
import { getStoredHeatmaps, deleteHeatmap, saveHeatmap } from '@/lib/storage';
import { Grid3X3, Plus, Search, Trash2, Copy, ExternalLink, Eye, Share2 } from 'lucide-react';

export default function MyHeatmapsPage() {
  const [heatmaps, setHeatmaps] = useState<HeatmapData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setHeatmaps(getStoredHeatmaps());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this heatmap?')) {
      deleteHeatmap(id);
      setHeatmaps(getStoredHeatmaps());
    }
  };

  const handleDuplicate = (heatmap: HeatmapData) => {
    const duplicated: HeatmapData = {
      ...heatmap,
      id: `h_${Date.now()}`,
      title: `${heatmap.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 0
    };
    saveHeatmap(duplicated);
    setHeatmaps(getStoredHeatmaps());
  };

  const filteredHeatmaps = heatmaps.filter(
    (h) =>
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              My Heatmaps
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Manage, edit, duplicate, and export your active heatmap visualizations.
            </p>
          </div>
          <Link href="/dashboard/create">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" />
              <span>Create Heatmap</span>
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-md">
          <Input
            placeholder="Search heatmaps by title or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Heatmaps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHeatmaps.map((heatmap) => (
            <Card key={heatmap.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                      {heatmap.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                      {heatmap.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase shrink-0">
                    {heatmap.type}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 mb-4">
                  <HeatmapGrid cells={heatmap.cells} config={heatmap.config} interactive={true} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-900">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {heatmap.viewsCount} views
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDuplicate(heatmap)}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(heatmap.id)}>
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  </Button>
                  <Link href={`/h/${heatmap.id}`}>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-3.5 h-3.5" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
