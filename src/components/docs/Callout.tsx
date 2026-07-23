'use client';

import React from 'react';
import { Info, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CalloutProps {
  type?: 'note' | 'tip' | 'warning';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ type = 'note', title, children, className }: CalloutProps) {
  const styles = {
    note: {
      border: 'border-blue-500/30 dark:border-blue-500/20 bg-blue-500/5 text-blue-950 dark:text-blue-100',
      icon: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
      defaultTitle: 'Note',
    },
    tip: {
      border: 'border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/5 text-emerald-950 dark:text-emerald-100',
      icon: <Lightbulb className="w-4 h-4 text-emerald-500 shrink-0" />,
      defaultTitle: 'Pro Tip',
    },
    warning: {
      border: 'border-amber-500/30 dark:border-amber-500/20 bg-amber-500/5 text-amber-950 dark:text-amber-100',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
      defaultTitle: 'Warning',
    },
  };

  const current = styles[type];

  return (
    <div
      className={cn(
        'my-4 p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed',
        current.border,
        className
      )}
    >
      {current.icon}
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-xs tracking-tight">
          {title || current.defaultTitle}
        </span>
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
}
