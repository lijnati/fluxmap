'use client';

import React from 'react';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Callout } from '@/components/docs/Callout';
import { Code2, Terminal, ShieldAlert } from 'lucide-react';

export default function ApiReferenceDocsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 mb-2">
          <span>Documentation</span>
          <span>/</span>
          <span>API Reference</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          REST API Reference
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
          The Fluxmap REST API allows developers to create heatmaps, push real-time telemetry events, retrieve analytics data, and query AI insights.
        </p>
      </div>

      <Callout type="note" title="Base URL & Formatting">
        All API requests must be sent to <code className="font-mono text-xs">https://fluxmap.dev/api/v1</code> with <code className="font-mono text-xs">Content-Type: application/json</code>.
      </Callout>

      {/* Endpoint 1: List Heatmaps */}
      <div className="flex flex-col gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
            GET
          </span>
          <span className="text-zinc-800 dark:text-zinc-200 font-semibold">/api/v1/heatmaps</span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Returns a paginated list of public heatmaps. Supports filtering by category type.
        </p>

        <CodeBlock
          language="bash"
          title="Example Request"
          code={`curl -X GET "https://fluxmap.dev/api/v1/heatmaps?type=website&limit=5"`}
        />

        <CodeBlock
          language="json"
          title="Response (200 OK)"
          code={`{
  "success": true,
  "pagination": { "total": 42, "page": 1, "limit": 5, "totalPages": 9 },
  "data": [
    {
      "id": "h_web_analytics",
      "title": "SaaS Visitor Heatmap",
      "type": "website",
      "viewsCount": 5120,
      "config": { "columns": 24, "rows": 7, "colorTheme": "obsidian" }
    }
  ]
}`}
        />
      </div>

      {/* Endpoint 2: Create Heatmap */}
      <div className="flex flex-col gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
            POST
          </span>
          <span className="text-zinc-800 dark:text-zinc-200 font-semibold">/api/v1/heatmaps</span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Create a new heatmap configuration programmatically.
        </p>

        <CodeBlock
          language="bash"
          title="cURL Request"
          code={`curl -X POST https://fluxmap.dev/api/v1/heatmaps \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Smart Contract Gas Tracker",
    "type": "blockchain",
    "visibility": "public",
    "config": {
      "columns": 24,
      "rows": 7,
      "colorTheme": "cyber"
    }
  }'`}
        />
      </div>

      {/* Endpoint 3: Ingest Telemetry */}
      <div className="flex flex-col gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20">
            POST
          </span>
          <span className="text-zinc-800 dark:text-zinc-200 font-semibold">/api/v1/telemetry/ingest</span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Push single or batch telemetry events into any heatmap grid.
        </p>

        <CodeBlock
          language="json"
          title="Payload (Single or Batch Ingest)"
          code={`{
  "heatmapId": "h_blockchain_tx",
  "x": 18,
  "y": 4,
  "increment": 1,
  "label": "Contract deployment executed"
}`}
        />
      </div>
    </div>
  );
}
