'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, Check, Download, Code2, Image as ImageIcon, FileJson } from 'lucide-react';
import { HeatmapData } from '@/types';

export interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  heatmap: HeatmapData;
  onExportPNG?: () => void;
  onExportSVG?: () => void;
}

export function EmbedModal({ isOpen, onClose, heatmap, onExportPNG, onExportSVG }: EmbedModalProps) {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/h/${heatmap.id}`
    : `https://heatmaphub.com/h/${heatmap.id}`;

  const iframeSnippet = `<iframe src="${publicUrl}?embed=true" width="100%" height="320" frameborder="0" scrolling="no" style="border-radius: 12px; border: 1px solid #27272a;"></iframe>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(iframeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(heatmap, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${heatmap.title.toLowerCase().replace(/\s+/g, '-')}-heatmap.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share & Export Heatmap"
      description={`Share "${heatmap.title}" or embed it directly into your website or documentation.`}
      className="max-w-xl"
    >
      <div className="flex flex-col gap-5">
        {/* Shareable Link */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Public Link
          </label>
          <div className="flex items-center gap-2">
            <Input value={publicUrl} readOnly className="font-mono text-xs" />
            <Button variant="secondary" size="md" onClick={handleCopyUrl}>
              {copiedUrl ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copiedUrl ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* HTML Iframe Embed Code */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              Embed Code (HTML / React Iframe)
            </span>
          </label>
          <div className="relative">
            <textarea
              readOnly
              rows={3}
              value={iframeSnippet}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-100 p-3 font-mono text-xs leading-relaxed focus:outline-none resize-none"
            />
            <button
              onClick={handleCopyCode}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* High Resolution Export Buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Export Asset Formats
          </span>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={onExportPNG} className="w-full">
              <ImageIcon className="w-3.5 h-3.5" />
              PNG Image
            </Button>
            <Button variant="outline" size="sm" onClick={onExportSVG} className="w-full">
              <Download className="w-3.5 h-3.5" />
              SVG Vector
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadJSON} className="w-full">
              <FileJson className="w-3.5 h-3.5" />
              Raw JSON
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
