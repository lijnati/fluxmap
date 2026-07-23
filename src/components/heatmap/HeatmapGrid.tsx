'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataCell, HeatmapConfig } from '@/types';
import { getCellColor, COLOR_THEMES } from '@/lib/utils';
import { Info, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export interface HeatmapGridProps {
  cells: DataCell[];
  config: HeatmapConfig;
  className?: string;
  interactive?: boolean;
  onCellClick?: (cell: DataCell) => void;
}

export function HeatmapGrid({
  cells,
  config,
  className = '',
  interactive = true,
  onCellClick
}: HeatmapGridProps) {
  const [hoveredCell, setHoveredCell] = useState<DataCell | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Compute min and max values if not provided
  const cellValues = cells.map((c) => c.value);
  const minValue = config.minValue ?? (cellValues.length > 0 ? Math.min(...cellValues) : 0);
  const maxValue = config.maxValue ?? (cellValues.length > 0 ? Math.max(...cellValues) : 100);

  // Create grid lookup map for fast rendering
  const cellMap = new Map<string, DataCell>();
  cells.forEach((cell) => {
    cellMap.set(`${cell.x}-${cell.y}`, cell);
  });

  const handleCellMouseEnter = (e: React.MouseEvent<HTMLDivElement>, cell: DataCell) => {
    if (!interactive || !config.showTooltips) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCell(cell);
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const currentTheme = COLOR_THEMES[config.colorTheme] || COLOR_THEMES.emerald;

  // Render Legend Scale
  const renderLegend = () => {
    if (!config.showLegend) return null;
    return (
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900/80">
        <div className="flex items-center gap-1.5 font-mono">
          <Info className="w-3.5 h-3.5 text-zinc-400" />
          <span>Intensity Scale</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400">Low</span>
          <div className="flex items-center gap-1">
            {currentTheme.palette.map((color, idx) => (
              <div
                key={idx}
                className="w-3.5 h-3.5 rounded-xs transition-transform hover:scale-125"
                style={{
                  backgroundColor: color,
                  border: `1px solid ${currentTheme.borderColors[idx]}`
                }}
                title={`Level ${idx}`}
              />
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400">High</span>
        </div>
      </div>
    );
  };

  // Compute calculated dimensions based on zoom
  const currentCellSize = Math.max(6, Math.floor(config.cellSize * zoomLevel));
  const currentGap = Math.max(1, Math.floor(config.cellGap * zoomLevel));

  return (
    <div className={`relative flex flex-col w-full select-none ${className}`}>
      {/* Zoom Toolbar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {config.yLabels && config.yLabels.length > 0 && (
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {config.rows} × {config.columns} Matrix
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
            className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1.5 text-zinc-600 dark:text-zinc-400">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
            className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {zoomLevel !== 1 && (
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ml-1"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Heatmap Grid Container */}
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800">
        <div className="flex flex-col gap-1 min-w-max">
          {/* X Labels Header if provided */}
          {config.xLabels && config.xLabels.length > 0 && config.showLabels && (
            <div className="flex items-center mb-1 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
              {config.yLabels && <div className="w-10 shrink-0" />}
              <div
                className="flex items-center justify-between w-full"
                style={{
                  width: config.columns * (currentCellSize + currentGap)
                }}
              >
                {config.xLabels.map((lbl, idx) => (
                  <span key={idx} className="truncate px-0.5">
                    {lbl}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rows */}
          {Array.from({ length: config.rows }).map((_, rIdx) => {
            const yLabel = config.yLabels && config.yLabels[rIdx];

            return (
              <div key={`row-${rIdx}`} className="flex items-center gap-1">
                {/* Row Y Label */}
                {config.showLabels && config.yLabels && (
                  <div className="w-10 shrink-0 text-right pr-2 font-mono text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                    {rIdx % 2 === 1 || config.rows <= 7 ? yLabel : ''}
                  </div>
                )}

                {/* Columns */}
                <div className="flex items-center" style={{ gap: `${currentGap}px` }}>
                  {Array.from({ length: config.columns }).map((_, cIdx) => {
                    const cell = cellMap.get(`${cIdx}-${rIdx}`) || {
                      id: `empty-${cIdx}-${rIdx}`,
                      x: cIdx,
                      y: rIdx,
                      value: 0
                    };

                    const { bg, border } = getCellColor(
                      cell.value,
                      minValue,
                      maxValue,
                      config.colorTheme
                    );

                    return (
                      <motion.div
                        key={cell.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: (cIdx * config.rows + rIdx) * 0.0004
                        }}
                        onMouseEnter={(e) => handleCellMouseEnter(e, cell)}
                        onMouseLeave={() => setHoveredCell(null)}
                        onClick={() => onCellClick && onCellClick(cell)}
                        className={`transition-all duration-150 relative ${
                          interactive ? 'cursor-pointer hover:scale-125 hover:z-20 hover:shadow-md' : ''
                        }`}
                        style={{
                          width: `${currentCellSize}px`,
                          height: `${currentCellSize}px`,
                          backgroundColor: bg,
                          border: `1px solid ${border}`,
                          borderRadius: `${config.borderRadius}px`
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full px-3 py-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs rounded-lg shadow-xl border border-zinc-800 dark:border-zinc-200"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`
            }}
          >
            <div className="font-semibold flex items-center gap-1.5">
              <span>{hoveredCell.label || `Value: ${hoveredCell.value}`}</span>
            </div>
            {hoveredCell.date && (
              <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono mt-0.5">
                {hoveredCell.date}
              </div>
            )}
            <div className="text-[10px] text-emerald-400 dark:text-emerald-600 font-mono mt-0.5">
              Intensity: {Math.round(((hoveredCell.value - minValue) / Math.max(1, maxValue - minValue)) * 100)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend Footer */}
      {renderLegend()}
    </div>
  );
}
