'use client';

import React from 'react';
import Link from 'next/link';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Callout } from '@/components/docs/Callout';
import { Button } from '@/components/ui/Button';
import { ArrowRight, BookOpen, Terminal, Sparkles, Code2, Layers } from 'lucide-react';

export default function DocsIntroductionPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 mb-2">
          <span>Documentation</span>
          <span>/</span>
          <span>Getting Started</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Fluxmap Documentation
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
          Fluxmap is a modern, developer-first analytics platform designed to turn complex telemetry data, git activity, and website clickmaps into beautiful interactive heatmaps.
        </p>
      </div>

      <Callout type="tip" title="Developer Experience First">
        Fluxmap is built with a minimal Vercel design philosophy, Framer Motion staggered animations, and zero-config iframe & REST API integrations.
      </Callout>

      {/* Quickstart Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Quickstart (3 Steps)
        </h2>

        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <span className="text-xs font-mono font-bold text-emerald-500">Step 1: Create a Heatmap</span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Use the interactive Heatmap Builder or send a `POST` request to `/api/v1/heatmaps`.
            </p>
            <CodeBlock
              language="bash"
              title="cURL Create Heatmap"
              code={`curl -X POST https://fluxmap.dev/api/v1/heatmaps \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "API Telemetry Heatmap",
    "type": "website",
    "config": { "columns": 24, "rows": 7, "colorTheme": "obsidian" }
  }'`}
            />
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <span className="text-xs font-mono font-bold text-emerald-500">Step 2: Ingest Real-Time Events</span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Push telemetry clicks or commits into your heatmap grid via the ingestion webhook.
            </p>
            <CodeBlock
              language="bash"
              title="cURL Ingest Telemetry Event"
              code={`curl -X POST https://fluxmap.dev/api/v1/telemetry/ingest \\
  -H "Content-Type: application/json" \\
  -d '{
    "heatmapId": "h_12345",
    "x": 14,
    "y": 3,
    "increment": 1,
    "label": "2,410 interactions"
  }'`}
            />
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <span className="text-xs font-mono font-bold text-emerald-500">Step 3: Embed Interactive Grid</span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Copy the lightweight iframe embed snippet into your Web app or GitHub README.
            </p>
            <CodeBlock
              language="html"
              title="HTML Iframe Snippet"
              code={`<iframe src="https://fluxmap.dev/h/h_12345?embed=true" width="100%" height="320" frameborder="0" style="border-radius: 12px;"></iframe>`}
            />
          </div>
        </div>
      </section>

      {/* Next Pages Link Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <Link href="/docs/api-reference">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-emerald-500" />
                API Reference
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Full REST API specification for CRUD & telemetry events.
            </p>
          </div>
        </Link>

        <Link href="/docs/embedding">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-500" />
                Embedding Guide
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Learn how to embed heatmaps into React apps, Notion & Webflow.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
