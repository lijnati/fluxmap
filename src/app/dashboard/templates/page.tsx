'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HeatmapGrid } from '@/components/heatmap/HeatmapGrid';
import { SAMPLE_TEMPLATES } from '@/lib/sample-data';
import { HeatmapTemplate, HeatmapData } from '@/types';
import { saveHeatmap } from '@/lib/storage';
import { useSession } from '@/lib/auth-client';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export default function TemplatesPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const activeUser = session?.user;

  const handleUseTemplate = (template: HeatmapTemplate) => {
    const newHeatmap: HeatmapData = {
      id: `h_${Date.now()}`,
      title: `${template.title}`,
      description: template.description,
      type: template.type,
      visibility: 'public',
      ownerId: activeUser?.id || 'usr_1',
      ownerName: activeUser?.name || activeUser?.email?.split('@')[0] || 'Developer',
      ownerAvatar: activeUser?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      ownerHandle: activeUser?.name ? activeUser.name.toLowerCase().replace(/\s+/g, '') : 'developer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 1,
      likesCount: 0,
      config: template.config,
      cells: template.sampleCells,
      tags: [template.category, template.type]
    };

    saveHeatmap(newHeatmap);
    router.push(`/dashboard/create?edit=${newHeatmap.id}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-500" />
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Heatmap Templates
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Production-tested visual templates pre-configured for GitHub, Web analytics, On-chain data, and Sprint velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SAMPLE_TEMPLATES.map((template) => (
            <Card key={template.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                        {template.title}
                      </h3>
                      {template.popular && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {template.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase">
                    {template.category}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 mb-4">
                  <HeatmapGrid cells={template.sampleCells} config={template.config} interactive={true} />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">
                  {template.config.rows}×{template.config.columns} Grid • {template.config.colorTheme.toUpperCase()}
                </span>
                <Button variant="primary" size="sm" onClick={() => handleUseTemplate(template)}>
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
