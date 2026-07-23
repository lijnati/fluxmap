'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ColorScalePicker } from './ColorScalePicker';
import { HeatmapGrid } from './HeatmapGrid';
import { HeatmapData, HeatmapConfig, ColorTheme, VisibilityType, HeatmapType, DataCell } from '@/types';
import { useSession } from '@/lib/auth-client';
import { fetchGitHubActivity } from '@/lib/github-sync';
import { downloadPNG, downloadSVG, downloadCSV } from '@/lib/export';
import {
  generateGitHubSampleData,
  generateWebsiteAnalyticsSampleData,
  generateBlockchainSampleData,
  generateProductivitySampleData,
} from '@/lib/sample-data';
import { saveHeatmap } from '@/lib/storage';
import {
  Sliders,
  Palette,
  Database,
  Eye,
  Save,
  RefreshCw,
  Download,
  FileSpreadsheet,
  Image as ImageIcon,
  GitBranch,
  Check,
  Sparkles
} from 'lucide-react';

export interface HeatmapBuilderProps {
  initialData?: HeatmapData;
}

export function HeatmapBuilder({ initialData }: HeatmapBuilderProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const activeUser = session?.user;

  // Initial State
  const [title, setTitle] = useState<string>(initialData?.title || 'My New Heatmap 2026');
  const [description, setDescription] = useState<string>(
    initialData?.description || 'Interactive activity heatmap visualization.'
  );
  const [type, setType] = useState<HeatmapType>(initialData?.type || 'github');
  const [visibility, setVisibility] = useState<VisibilityType>(initialData?.visibility || 'public');

  const [config, setConfig] = useState<HeatmapConfig>(
    initialData?.config || {
      columns: 52,
      rows: 7,
      cellSize: 14,
      cellGap: 4,
      borderRadius: 3,
      colorTheme: 'emerald',
      showLegend: true,
      showLabels: true,
      showTooltips: true,
      yLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  );

  const [cells, setCells] = useState<DataCell[]>(
    initialData?.cells || generateGitHubSampleData()
  );

  const [activeTab, setActiveTab] = useState<'style' | 'data' | 'settings'>('style');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  // GitHub Sync State
  const [githubUsername, setGithubUsername] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Handle Preset Data Swap
  const handleTypeChange = (newType: HeatmapType) => {
    setType(newType);
    if (newType === 'github') {
      setConfig((prev) => ({
        ...prev,
        columns: 52,
        rows: 7,
        cellSize: 14,
        colorTheme: 'emerald',
        yLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        xLabels: undefined
      }));
      setCells(generateGitHubSampleData());
    } else if (newType === 'website') {
      setConfig((prev) => ({
        ...prev,
        columns: 24,
        rows: 7,
        cellSize: 18,
        colorTheme: 'obsidian',
        yLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        xLabels: ['00', '03', '06', '09', '12', '15', '18', '21']
      }));
      setCells(generateWebsiteAnalyticsSampleData());
    } else if (newType === 'blockchain') {
      setConfig((prev) => ({
        ...prev,
        columns: 24,
        rows: 7,
        cellSize: 16,
        colorTheme: 'cyber',
        yLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        xLabels: ['00:00', '06:00', '12:00', '18:00']
      }));
      setCells(generateBlockchainSampleData());
    } else if (newType === 'productivity') {
      setConfig((prev) => ({
        ...prev,
        columns: 16,
        rows: 7,
        cellSize: 20,
        colorTheme: 'sunset',
        yLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        xLabels: undefined
      }));
      setCells(generateProductivitySampleData());
    }
  };

  // GitHub Importer Action
  const handleGitHubSync = async () => {
    if (!githubUsername.trim()) return;
    setIsSyncing(true);
    setSyncStatus('Fetching GitHub telemetry...');

    try {
      const result = await fetchGitHubActivity(githubUsername);
      setCells(result.cells);
      setType('github');
      setTitle(`${result.name || result.username}'s GitHub Contributions`);
      setDescription(`Real-time GitHub activity graph for @${result.username} (${result.totalContributions} total contributions).`);
      setConfig((prev) => ({
        ...prev,
        columns: 52,
        rows: 7,
        colorTheme: 'emerald',
      }));
      setSyncStatus(`Successfully synced ${result.totalContributions} contributions!`);
      setTimeout(() => setSyncStatus(null), 3000);
    } catch (e: any) {
      setSyncStatus('GitHub sync failed. Using fallback matrix.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    const newId = initialData?.id || `h_${Date.now()}`;
    const heatmapToSave: HeatmapData = {
      id: newId,
      title,
      description,
      type,
      visibility,
      ownerId: initialData?.ownerId || activeUser?.id || 'usr_1',
      ownerName: initialData?.ownerName || activeUser?.name || activeUser?.email?.split('@')[0] || 'Developer',
      ownerAvatar: initialData?.ownerAvatar || activeUser?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      ownerHandle: initialData?.ownerHandle || (activeUser?.name ? activeUser.name.toLowerCase().replace(/\s+/g, '') : 'developer'),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: initialData?.viewsCount || 1,
      likesCount: initialData?.likesCount || 0,
      config,
      cells,
      tags: [type, visibility, config.colorTheme]
    };

    saveHeatmap(heatmapToSave);
    setTimeout(() => {
      setIsSaving(false);
      router.push(`/h/${newId}`);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {initialData ? 'Edit Heatmap' : 'Create New Heatmap'}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Configure visual styling, dimensions, and dataset parameters in real time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} isLoading={isSaving}>
            <Save className="w-4 h-4" />
            {initialData ? 'Update Heatmap' : 'Publish Heatmap'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls & Configuration (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Preset Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab('style')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'style'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Style & Theme
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('data')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'data'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Dataset Engine
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Dimensions
            </button>
          </div>

          {/* Dataset Engine Tab (with GitHub Live Sync Importer) */}
          {activeTab === 'data' && (
            <div className="flex flex-col gap-5">
              {/* Live GitHub Importer Box */}
              <Card className="border-emerald-500/30 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-emerald-950 dark:text-emerald-100">
                    <GitBranch className="w-4 h-4 text-emerald-500" />
                    Live GitHub Activity Sync
                  </CardTitle>
                  <CardDescription>
                    Import real-time contribution telemetry from any public GitHub profile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter username (e.g. torvalds, shadcn)"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      className="font-mono text-xs"
                    />
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleGitHubSync}
                      isLoading={isSyncing}
                    >
                      Sync
                    </Button>
                  </div>
                  {syncStatus && (
                    <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      {syncStatus}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Data Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Preset Data Templates</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleTypeChange('github')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        type === 'github'
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="text-xs">GitHub Activity</div>
                      <div className="text-[10px] opacity-75">52 Wk Calendar</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeChange('website')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        type === 'website'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="text-xs">Website Visitor</div>
                      <div className="text-[10px] opacity-75">24h x 7d Matrix</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeChange('blockchain')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        type === 'blockchain'
                          ? 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="text-xs">Blockchain Tx</div>
                      <div className="text-[10px] opacity-75">Gas / Contract</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeChange('productivity')}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        type === 'productivity'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="text-xs">Productivity</div>
                      <div className="text-[10px] opacity-75">16 Wk Sprint</div>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Regenerate Values</span>
                    <Button variant="outline" size="sm" onClick={() => handleTypeChange(type)}>
                      <RefreshCw className="w-3.5 h-3.5" />
                      Shuffle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Style Tab */}
          {activeTab === 'style' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Color Scale & Palette</CardTitle>
                <CardDescription>
                  Choose a color gradient designed for light and dark themes.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <ColorScalePicker
                  selectedTheme={config.colorTheme}
                  onChange={(theme: ColorTheme) => setConfig((prev) => ({ ...prev, colorTheme: theme }))}
                />

                <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Display Features
                  </label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      <span>Show Intensity Legend</span>
                      <input
                        type="checkbox"
                        checked={config.showLegend}
                        onChange={(e) => setConfig((prev) => ({ ...prev, showLegend: e.target.checked }))}
                        className="rounded dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                      />
                    </label>
                    <label className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      <span>Show Axis Labels</span>
                      <input
                        type="checkbox"
                        checked={config.showLabels}
                        onChange={(e) => setConfig((prev) => ({ ...prev, showLabels: e.target.checked }))}
                        className="rounded dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dimensions Tab */}
          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Grid Controls</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Columns ({config.columns})
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={60}
                      value={config.columns}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, columns: parseInt(e.target.value) || 1 }))
                      }
                      className="w-full mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Rows ({config.rows})
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={24}
                      value={config.rows}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, rows: parseInt(e.target.value) || 1 }))
                      }
                      className="w-full mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* General Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Input
                label="Heatmap Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Canvas Preview + 4K Export Controls (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <Card className="p-6 bg-zinc-950/90 text-zinc-50 border-zinc-800 shadow-xl overflow-hidden min-h-[500px] flex flex-col justify-between">
            <div>
              {/* Preview Header with 4K Export Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800/80 gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Live Preview Canvas
                  </span>
                </div>

                {/* 4K High-Res Export Shortcuts */}
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadPNG('builder-canvas-grid', `${title.toLowerCase().replace(/\s+/g, '-')}-4k.png`)}
                    className="h-7 text-[11px] px-2 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                    title="Export 4K High-Res PNG"
                  >
                    <ImageIcon className="w-3 h-3 text-emerald-400" />
                    4K PNG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadSVG('builder-canvas-grid', `${title.toLowerCase().replace(/\s+/g, '-')}.svg`)}
                    className="h-7 text-[11px] px-2 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                    title="Export Scalable SVG Vector"
                  >
                    <Download className="w-3 h-3 text-blue-400" />
                    SVG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadCSV(cells, `${title.toLowerCase().replace(/\s+/g, '-')}.csv`)}
                    className="h-7 text-[11px] px-2 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                    title="Export CSV Telemetry Spreadsheet"
                  >
                    <FileSpreadsheet className="w-3 h-3 text-amber-400" />
                    CSV
                  </Button>
                </div>
              </div>

              {/* Title & Meta */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">{title || 'Untitled Heatmap'}</h2>
                <p className="text-xs text-zinc-400 mt-1 max-w-xl">{description}</p>
              </div>

              {/* Heatmap Canvas Container */}
              <div id="builder-canvas-grid" className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                <HeatmapGrid cells={cells} config={config} interactive={true} />
              </div>
            </div>

            {/* Canvas Footer */}
            <div className="pt-4 mt-6 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>{cells.length} Total Telemetry Slots</span>
              <span>Exporter Ready (4K DPI)</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
