'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HeatmapGrid } from '@/components/heatmap/HeatmapGrid';
import { AIInsightsPanel } from '@/components/heatmap/AIInsightsPanel';
import { EmbedModal } from '@/components/heatmap/EmbedModal';
import { HeatmapData } from '@/types';
import { getHeatmapById, incrementHeatmapViews, getStoredHeatmaps } from '@/lib/storage';
import { Eye, Share2, ArrowLeft, Heart, Sparkles, Download, Code2, Globe } from 'lucide-react';

export default function PublicHeatmapPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'h_github_2026';

  const [heatmap, setHeatmap] = useState<HeatmapData | null>(null);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const found = getHeatmapById(id) || getStoredHeatmaps()[0];
    if (found) {
      incrementHeatmapViews(found.id);
      setHeatmap({ ...found, viewsCount: found.viewsCount + 1 });
    }
  }, [id]);

  if (!heatmap) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-mono text-xs text-zinc-500">
        Loading Heatmap Telemetry...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant={liked ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{heatmap.likesCount + (liked ? 1 : 0)}</span>
          </Button>

          <Button variant="primary" size="sm" onClick={() => setIsEmbedModalOpen(true)}>
            <Share2 className="w-3.5 h-3.5" />
            <span>Share & Embed</span>
          </Button>
        </div>
      </div>

      {/* Main Heatmap Visualization Card */}
      <Card className="p-6 md:p-8 bg-zinc-950/90 text-zinc-50 border-zinc-800 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {heatmap.title}
              </h1>
              <Badge variant="success">{heatmap.visibility.toUpperCase()}</Badge>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {heatmap.description}
            </p>
          </div>

          {/* Author info */}
          <Link href={`/profile/${heatmap.ownerHandle}`} className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
            <img
              src={heatmap.ownerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt={heatmap.ownerName}
              className="w-8 h-8 rounded-full object-cover border border-zinc-700"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-200">@{heatmap.ownerHandle}</span>
              <span className="text-[10px] text-zinc-400 font-mono">{heatmap.ownerName}</span>
            </div>
          </Link>
        </div>

        {/* Heatmap Grid Render */}
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
          <HeatmapGrid cells={heatmap.cells} config={heatmap.config} interactive={true} />
        </div>

        {/* Views & Metadata Footer */}
        <div className="flex items-center justify-between pt-4 mt-6 border-t border-zinc-900 text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            {heatmap.viewsCount.toLocaleString()} Total Impressions
          </span>
          <span>Created on {new Date(heatmap.createdAt).toLocaleDateString()}</span>
        </div>
      </Card>

      {/* AI Insights Engine Section */}
      <AIInsightsPanel heatmapId={heatmap.id} cells={heatmap.cells} />

      {/* Share & Embed Modal */}
      <EmbedModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
        heatmap={heatmap}
        onExportPNG={() => alert('PNG asset generation initiated.')}
        onExportSVG={() => alert('SVG vector downloaded.')}
      />
    </div>
  );
}
