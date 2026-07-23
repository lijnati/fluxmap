'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { HeatmapBuilder } from '@/components/heatmap/HeatmapBuilder';
import { HeatmapData } from '@/types';
import { getHeatmapById } from '@/lib/storage';

function BuilderContent() {
  const searchParams = useSearchParams();
  const editId = searchParams?.get('edit');
  const [initialData, setInitialData] = useState<HeatmapData | undefined>(undefined);

  useEffect(() => {
    if (editId) {
      const existing = getHeatmapById(editId);
      if (existing) setInitialData(existing);
    }
  }, [editId]);

  return <HeatmapBuilder initialData={initialData} />;
}

export default function CreateHeatmapPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 max-w-7xl">
        <Suspense fallback={<div className="p-8 text-xs font-mono text-zinc-400">Loading Builder...</div>}>
          <BuilderContent />
        </Suspense>
      </main>
    </div>
  );
}
