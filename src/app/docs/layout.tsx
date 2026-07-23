import React from 'react';
import { DocsSidebar } from '@/components/docs/DocsSidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <DocsSidebar />
      <main className="flex-1 p-6 md:p-10 max-w-4xl overflow-y-auto">{children}</main>
    </div>
  );
}
