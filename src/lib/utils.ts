import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ColorTheme } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map color themes to CSS background colors / hex values based on normalized intensity (0.0 to 1.0)
export const COLOR_THEMES: Record<ColorTheme, {
  name: string;
  description: string;
  palette: string[]; // 5 steps: Level 0 (empty), Level 1, Level 2, Level 3, Level 4 (max)
  borderColors: string[];
}> = {
  emerald: {
    name: 'GitHub Emerald',
    description: 'Classic GitHub contribution graph theme',
    palette: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    borderColors: ['#30363d', '#005a2b', '#00833d', '#2ecc71', '#52e077']
  },
  obsidian: {
    name: 'Vercel Obsidian',
    description: 'Monochrome grayscale palette inspired by Vercel',
    palette: ['#18181b', '#27272a', '#52525b', '#a1a1aa', '#f4f4f5'],
    borderColors: ['#27272a', '#3f3f46', '#71717a', '#d4d4d8', '#ffffff']
  },
  sunset: {
    name: 'Solar Sunset',
    description: 'Warm ember, orange and fire gradient',
    palette: ['#1c1917', '#7c2d12', '#c2410c', '#ea580c', '#f97316'],
    borderColors: ['#292524', '#9a3412', '#ea580c', '#f97316', '#fb923c']
  },
  cyber: {
    name: 'Neon Cyber',
    description: 'Vibrant neon purple to cyan futuristic theme',
    palette: ['#0f172a', '#3b0764', '#6b21a8', '#a855f7', '#06b6d4'],
    borderColors: ['#1e293b', '#581c87', '#7e22ce', '#c084fc', '#22d3ee']
  },
  sapphire: {
    name: 'Deep Sapphire',
    description: 'Cool oceanic blue tones',
    palette: ['#0f172a', '#1e3a8a', '#1d4ed8', '#2563eb', '#38bdf8'],
    borderColors: ['#1e293b', '#1e40af', '#2563eb', '#3b82f6', '#60a5fa']
  },
  amethyst: {
    name: 'Amethyst Purple',
    description: 'Rich royal purple shades',
    palette: ['#121019', '#3b1c64', '#6b21a8', '#9333ea', '#c084fc'],
    borderColors: ['#1f1a2e', '#581c87', '#7e22ce', '#a855f7', '#e879f9']
  },
  amber: {
    name: 'Warm Amber',
    description: 'Golden amber activity heat scale',
    palette: ['#1c1917', '#451a03', '#78350f', '#b45309', '#f59e0b'],
    borderColors: ['#292524', '#78350f', '#92400e', '#d97706', '#fbbf24']
  }
};

/**
 * Returns background color and border style for a given value normalized between 0 and 1
 */
export function getCellColor(value: number, min: number = 0, max: number = 100, theme: ColorTheme = 'emerald') {
  if (value <= 0 || max <= min) {
    return {
      bg: COLOR_THEMES[theme].palette[0],
      border: COLOR_THEMES[theme].borderColors[0],
      step: 0
    };
  }

  const range = max - min;
  const normalized = Math.min(1, Math.max(0, (value - min) / range));

  let step = 1;
  if (normalized > 0.75) step = 4;
  else if (normalized > 0.5) step = 3;
  else if (normalized > 0.25) step = 2;

  return {
    bg: COLOR_THEMES[theme].palette[step],
    border: COLOR_THEMES[theme].borderColors[step],
    step
  };
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
