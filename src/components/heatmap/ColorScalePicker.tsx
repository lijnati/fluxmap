'use client';

import React from 'react';
import { ColorTheme } from '@/types';
import { COLOR_THEMES } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface ColorScalePickerProps {
  selectedTheme: ColorTheme;
  onChange: (theme: ColorTheme) => void;
}

export function ColorScalePicker({ selectedTheme, onChange }: ColorScalePickerProps) {
  const themes = Object.keys(COLOR_THEMES) as ColorTheme[];

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
        Color Theme Preset
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {themes.map((themeKey) => {
          const theme = COLOR_THEMES[themeKey];
          const isSelected = selectedTheme === themeKey;

          return (
            <button
              key={themeKey}
              type="button"
              onClick={() => onChange(themeKey)}
              className={`flex flex-col p-3 rounded-lg border text-left transition-all relative ${
                isSelected
                  ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900/90 ring-1 ring-zinc-900 dark:ring-zinc-100 shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {theme.name}
                </span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
                )}
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-2 truncate">
                {theme.description}
              </p>
              {/* Color Bar */}
              <div className="flex items-center gap-1">
                {theme.palette.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-3 rounded-xs"
                    style={{
                      backgroundColor: color,
                      border: `1px solid ${theme.borderColors[idx]}`
                    }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
