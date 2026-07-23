'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HeatmapGrid } from '@/components/heatmap/HeatmapGrid';
import { SAMPLE_HEATMAPS } from '@/lib/sample-data';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Share2,
  TrendingUp,
  ShieldCheck,
  MousePointerClick,
  GitCommit,
  Blocks,
  Zap,
  BarChart2
} from 'lucide-react';

export default function LandingPage() {
  const [activeDemoTab, setActiveDemoTab] = useState<number>(0);
  const currentDemoHeatmap = SAMPLE_HEATMAPS[activeDemoTab] || SAMPLE_HEATMAPS[0];

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient Grid Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-linear-to-tr from-purple-500/10 via-emerald-500/10 to-blue-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center flex flex-col items-center">
        {/* Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-6 backdrop-blur-xs shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Heatmap Hub 2.0 Released</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl leading-[1.1]"
        >
          Visualize activity.{' '}
          <span className="bg-linear-to-r from-zinc-900 via-zinc-600 to-zinc-400 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            Understand patterns.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
        >
          Heatmap Hub turns complex behavioral data, website interactions, git velocity, and on-chain transactions into beautiful interactive heatmaps.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard/create">
            <Button variant="primary" size="lg" className="shadow-lg shadow-zinc-900/10 dark:shadow-none">
              <span>Create Heatmap</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline" size="lg">
              Explore Examples
            </Button>
          </Link>
        </motion.div>

        {/* Hero Interactive Live Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 w-full max-w-5xl"
        >
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-md overflow-hidden">
            {/* Demo Header Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80 gap-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 ml-2">
                  live-sandbox.heatmaphub.com
                </span>
              </div>

              {/* Demo Tabs */}
              <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveDemoTab(0)}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
                    activeDemoTab === 0
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-2xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <GitCommit className="w-3.5 h-3.5" />
                  GitHub Activity
                </button>
                <button
                  onClick={() => setActiveDemoTab(1)}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
                    activeDemoTab === 1
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-2xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <MousePointerClick className="w-3.5 h-3.5" />
                  Web Clickmap
                </button>
                <button
                  onClick={() => setActiveDemoTab(2)}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
                    activeDemoTab === 2
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-2xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <Blocks className="w-3.5 h-3.5" />
                  Blockchain Tx
                </button>
              </div>
            </div>

            {/* Live Interactive Heatmap Render */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center justify-between mb-4 text-left">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {currentDemoHeatmap.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {currentDemoHeatmap.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {currentDemoHeatmap.viewsCount} live views
                </span>
              </div>
              <HeatmapGrid cells={currentDemoHeatmap.cells} config={currentDemoHeatmap.config} interactive={true} />
            </div>

            {/* Floating Metric Badge Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 text-left">
              <div className="p-3 rounded-lg bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Velocity Surge</span>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  +37.4% MoM
                </div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Export Formats</span>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  PNG, SVG & JSON
                </div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Embed Ready</span>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  &lt;iframe /&gt; Snippet
                </div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">AI Insights</span>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Automated Diagnostic
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-200 dark:border-zinc-800/80">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Designed for high-output engineering teams.
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Built with a clean Vercel aesthetic, smooth 60fps animations, and zero configuration friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                Real-Time Builder
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                Customize grid dimensions, cell gaps, corner radii, and color palettes with instant canvas feedback.
              </p>
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                AI Behavior Diagnostics
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                Automatic peak velocity detection, anomaly flags, and work-life balance insights powered by AI.
              </p>
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                Universal Embed & Export
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                Embed interactive heatmaps into Notion, GitHub readmes, or custom Web apps with copy-paste iframe snippets.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-100">Heatmap Hub</span>
            <span>— See patterns. Understand behavior.</span>
          </div>
          <div>© 2026 Heatmap Hub. Open Source Inspired.</div>
        </div>
      </footer>
    </div>
  );
}
