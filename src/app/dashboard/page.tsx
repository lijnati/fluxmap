'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HeatmapGrid } from '@/components/heatmap/HeatmapGrid';
import { HeatmapData } from '@/types';
import { getStoredHeatmaps } from '@/lib/storage';
import { formatNumber } from '@/lib/utils';
import { Grid3X3, Eye, TrendingUp, Plus, Sparkles, Share2, ExternalLink, Activity } from 'lucide-react';

export default function DashboardOverviewPage() {
  const [heatmaps, setHeatmaps] = useState<HeatmapData[]>([]);

  useEffect(() => {
    setHeatmaps(getStoredHeatmaps());
  }, []);

  const totalHeatmaps = heatmaps.length;
  const totalViews = heatmaps.reduce((acc, h) => acc + h.viewsCount, 0);
  const totalLikes = heatmaps.reduce((acc, h) => acc + h.likesCount, 0);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Welcome back, Yegetaneh. Here is your team's visual activity telemetry.
            </p>
          </div>
          <Link href="/dashboard/create">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" />
              <span>Create Heatmap</span>
            </Button>
          </Link>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">Total Heatmaps</span>
              <Grid3X3 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              {totalHeatmaps}
            </div>
            <p className="text-[11px] text-emerald-500 font-mono mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +4 created this month
            </p>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">Total Views</span>
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              {formatNumber(totalViews)}
            </div>
            <p className="text-[11px] text-blue-500 font-mono mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +24% increase vs last month
            </p>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">Active Projects</span>
              <Activity className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              12
            </div>
            <p className="text-[11px] text-zinc-400 font-mono mt-1">
              across 4 data sources
            </p>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">Engagements</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              {formatNumber(totalLikes * 3.4)}
            </div>
            <p className="text-[11px] text-amber-500 font-mono mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              98.4% uptime telemetry
            </p>
          </Card>
        </div>

        {/* Heatmaps Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Recent Heatmaps
            </h2>
            <Link
              href="/dashboard/heatmaps"
              className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
            >
              View All ({heatmaps.length})
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {heatmaps.slice(0, 3).map((heatmap) => (
              <Card key={heatmap.id} className="p-5 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-900">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                        {heatmap.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase">
                        {heatmap.type}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {heatmap.visibility}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {heatmap.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1 mr-2">
                      <Eye className="w-3.5 h-3.5" />
                      {heatmap.viewsCount}
                    </span>
                    <Link href={`/h/${heatmap.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/create?edit=${heatmap.id}`}>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800">
                  <HeatmapGrid cells={heatmap.cells} config={heatmap.config} interactive={true} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
