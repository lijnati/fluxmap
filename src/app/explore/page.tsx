'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { HeatmapGrid } from '@/components/heatmap/HeatmapGrid';
import { HeatmapData } from '@/types';
import { getStoredHeatmaps } from '@/lib/storage';
import { Compass, Search, Eye, Sparkles, TrendingUp, Filter, Heart } from 'lucide-react';

export default function ExplorePage() {
  const [heatmaps, setHeatmaps] = useState<HeatmapData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setHeatmaps(getStoredHeatmaps());
  }, []);

  const categories = [
    { id: 'all', label: 'All Heatmaps' },
    { id: 'github', label: 'GitHub Activity' },
    { id: 'website', label: 'Website Clickmaps' },
    { id: 'blockchain', label: 'On-Chain Web3' },
    { id: 'productivity', label: 'Productivity' }
  ];

  const filtered = heatmaps.filter((h) => {
    const matchesCat = selectedCategory === 'all' || h.type === selectedCategory;
    const matchesSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.ownerHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-4 border border-emerald-500/20">
          <Compass className="w-3.5 h-3.5" />
          <span>Public Gallery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Explore Developer Heatmaps
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          Browse trending activity grids, community telemetry dashboards, and popular heatmap templates.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search heatmaps or @username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((heatmap) => (
          <Card key={heatmap.id} className="p-6 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
            <div>
              {/* Owner Info & Title */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900 mb-4">
                <Link href={`/profile/${heatmap.ownerHandle}`} className="flex items-center gap-2.5 group">
                  <img
                    src={heatmap.ownerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                    alt={heatmap.ownerName}
                    className="w-7 h-7 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:underline">
                      {heatmap.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      by @{heatmap.ownerHandle}
                    </span>
                  </div>
                </Link>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase">
                  {heatmap.type}
                </span>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
                {heatmap.description}
              </p>

              {/* Heatmap Grid Preview */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 mb-4">
                <HeatmapGrid cells={heatmap.cells} config={heatmap.config} interactive={true} />
              </div>
            </div>

            {/* Footer Stats & View Button */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {heatmap.viewsCount}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  {heatmap.likesCount}
                </span>
              </div>

              <Link href={`/h/${heatmap.id}`}>
                <Button variant="primary" size="sm">
                  View Heatmap
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
