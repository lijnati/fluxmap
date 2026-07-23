'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Terminal, Code2, Sparkles, Layers, Shield, ChevronRight } from 'lucide-react';

export function DocsSidebar() {
  const pathname = usePathname();

  const sections = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Introduction', href: '/docs', icon: BookOpen },
        { label: 'Quickstart', href: '/docs/quickstart', icon: Terminal },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { label: 'REST API Overview', href: '/docs/api-reference', icon: Code2 },
        { label: 'Telemetry Ingestion', href: '/docs/telemetry-ingest', icon: Terminal },
        { label: 'AI Insights API', href: '/docs/ai-insights', icon: Sparkles },
      ],
    },
    {
      title: 'Embedding & Styling',
      items: [
        { label: 'Iframe & Component Embeds', href: '/docs/embedding', icon: Layers },
        { label: 'Color Themes & Scaling', href: '/docs/color-themes', icon: Shield },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50 min-h-[calc(100vh-3.5rem)] p-4 hidden md:block">
      <div className="flex flex-col gap-6">
        <div className="px-3 text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 font-mono">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Fluxmap Docs</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
            v2.0
          </span>
        </div>

        {sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="px-3 mb-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
              {section.title}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3 h-3 text-zinc-400" />}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
