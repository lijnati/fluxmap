'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Sparkline } from '@/components/ui/Sparkline';
import { Button } from '@/components/ui/Button';
import { HeatmapGrid } from '@/components/heatmap/HeatmapGrid';
import { HeatmapData } from '@/types';
import { getStoredHeatmaps } from '@/lib/storage';
import { formatNumber } from '@/lib/utils';
import { useSession } from '@/lib/auth-client';
import { Grid3X3, Eye, TrendingUp, Plus, Sparkles, Share2, ExternalLink, Activity } from 'lucide-react';

export default function DashboardOverviewPage() {
  const [heatmaps, setHeatmaps] = useState<HeatmapData[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    setHeatmaps(getStoredHeatmaps());
  }, []);

  const totalHeatmaps = heatmaps.length;
  const totalViews = heatmaps.reduce((acc, h) => acc + h.viewsCount, 0);
  const totalLikes = heatmaps.reduce((acc, h) => acc + h.likesCount, 0);

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Developer';

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
              Welcome back, <span className="font-semibold text-zinc-800 dark:text-zinc-200">{userName}</span>. Here is your team's visual activity telemetry.
            </p>
          </div>
          <Link href="/dashboard/create">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" />
              <span>Create Heatmap</span>
            </Button>
          </Link>
        </div>

        {/* Spotlight Metric Cards Grid with Sparklines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.12)">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">Total Heatmaps</span>
              <Grid3X3 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-end justify-between mt-2">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {totalHeatmaps}
              </div>
              <Sparkline data={[12, 18, 24, 28, 35, 39, totalHeatmaps]} color="#10b981" />
            </div>
            <p className="text-[11px] text-emerald-500 font-mono mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +4 created this month
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.12)">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">Total Views</span>
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-end justify-between mt-2">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {formatNumber(totalViews)}
              </div>
              <Sparkline data={[4200, 5800, 8100, 11400, 14200, totalViews]} color="#3b82f6" />
            </div>
            <p className="text-[11px] text-blue-500 font-mono mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +24% vs last month
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.12)">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">Active Projects</span>
              <Activity className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex items-end justify-between mt-2">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                12
              </div>
              <Sparkline data={[4, 6, 8, 9, 10, 12]} color="#a855f7" />
            </div>
            <p className="text-[11px] text-zinc-400 font-mono mt-2">
              across 4 telemetry sources
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.12)">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">Engagements</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-end justify-between mt-2">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {formatNumber(totalLikes * 3.4)}
              </div>
              <Sparkline data={[450, 780, 1200, 1900, 2400, totalLikes * 3.4]} color="#f59e0b" />
            </div>
            <p className="text-[11px] text-amber-500 font-mono mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              98.4% uptime telemetry
            </p>
          </SpotlightCard>
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
              <SpotlightCard key={heatmap.id} className="p-5 flex flex-col gap-4">
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
              </SpotlightCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
