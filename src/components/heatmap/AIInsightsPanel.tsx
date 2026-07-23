'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Lightbulb, Activity, ArrowUpRight } from 'lucide-react';
import { DataCell, AIInsight } from '@/types';
import { SAMPLE_AI_INSIGHTS } from '@/lib/sample-data';

export interface AIInsightsPanelProps {
  heatmapId?: string;
  cells: DataCell[];
}

export function AIInsightsPanel({ heatmapId, cells }: AIInsightsPanelProps) {
  // Generate real-time derived insights if specific heatmapId isn't pre-seeded
  const presetInsights = heatmapId ? SAMPLE_AI_INSIGHTS[heatmapId] : undefined;

  let computedInsights: AIInsight[] = [];

  if (presetInsights && presetInsights.length > 0) {
    computedInsights = presetInsights;
  } else if (cells && cells.length > 0) {
    const values = cells.map((c) => c.value);
    const total = values.reduce((a, b) => a + b, 0);
    const maxVal = Math.max(...values);
    const avg = Math.round(total / (cells.length || 1));
    const peakCell = cells.find((c) => c.value === maxVal);

    const activeCells = cells.filter((c) => c.value > 0);
    const activePercent = Math.round((activeCells.length / cells.length) * 100);

    computedInsights = [
      {
        id: 'c_ins_1',
        heatmapId: heatmapId || 'custom',
        title: 'Activity Surge Peak',
        description: `Your highest recorded activity peaked at ${maxVal} units (${Math.round((maxVal / (avg || 1)) * 100)}% above baseline average).`,
        metric: `${maxVal} peak units`,
        type: 'positive'
      },
      {
        id: 'c_ins_2',
        heatmapId: heatmapId || 'custom',
        title: 'Consistency Index',
        description: `${activePercent}% of total grid slots show recorded activity, indicating strong steady engagement.`,
        metric: `${activePercent}% active density`,
        type: 'neutral'
      },
      {
        id: 'c_ins_3',
        heatmapId: heatmapId || 'custom',
        title: 'Optimization Suggestion',
        description: peakCell?.date
          ? `Highest concentration recorded around ${peakCell.date}. Consider scheduling product deployments during these peak windows.`
          : 'Activity is clustered during mid-week cycles. Consider scheduling key launches on Tuesdays or Wednesdays.',
        metric: 'Peak Window',
        type: 'tip'
      }
    ];
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'tip':
        return <Lightbulb className="w-4 h-4 text-amber-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50/50 to-white dark:from-zinc-950/80 dark:to-zinc-900/50 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
              AI Activity Insights
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                GPT-4o Enhanced
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Automated behavioral pattern analysis and velocity diagnostics
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {computedInsights.map((insight, idx) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.1 }}
            className="p-3.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {getIcon(insight.type)}
                  <span>{insight.title}</span>
                </div>
                {insight.metric && (
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {insight.metric}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {insight.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
