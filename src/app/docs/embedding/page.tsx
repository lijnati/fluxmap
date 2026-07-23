'use client';

import React from 'react';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Callout } from '@/components/docs/Callout';
import { Layers, Globe, Code } from 'lucide-react';

export default function EmbeddingDocsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 mb-2">
          <span>Documentation</span>
          <span>/</span>
          <span>Embedding & Styling</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Embedding Guide
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
          Learn how to embed interactive Fluxmap heatmaps directly into React applications, Next.js sites, Notion docs, and Webflow pages.
        </p>
      </div>

      <Callout type="tip" title="Responsive & Zero Dependency">
        Fluxmap iframe embeds automatically adjust to dark/light theme preferences and scale to match container width.
      </Callout>

      {/* HTML Iframe Section */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          1. HTML Iframe Embed
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Copy and paste the clean iframe snippet into your website HTML:
        </p>

        <CodeBlock
          language="html"
          title="HTML Iframe Snippet"
          code={`<iframe 
  src="https://fluxmap.dev/h/h_github_2026?embed=true" 
  width="100%" 
  height="340" 
  frameborder="0" 
  scrolling="no" 
  style="border-radius: 12px; border: 1px solid #27272a;"
></iframe>`}
        />
      </section>

      {/* React Component Section */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          2. React / Next.js Component Embed
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Incorporate the HeatmapGrid component directly into your React design system:
        </p>

        <CodeBlock
          language="tsx"
          title="React Heatmap Component"
          code={`import { HeatmapGrid } from '@fluxmap/react';

export function AnalyticsDashboard() {
  return (
    <div className="p-6 bg-zinc-950 rounded-xl border border-zinc-800">
      <HeatmapGrid 
        cells={dataCells} 
        config={{
          columns: 52,
          rows: 7,
          colorTheme: 'emerald',
          showLegend: true
        }} 
      />
    </div>
  );
}`}
        />
      </section>
    </div>
  );
}
