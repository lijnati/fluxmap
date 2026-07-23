export type HeatmapType = 'github' | 'website' | 'blockchain' | 'productivity' | 'custom';

export type VisibilityType = 'public' | 'private' | 'unlisted';

export type ColorTheme = 
  | 'emerald'     // GitHub Green
  | 'obsidian'    // Vercel Dark/Monochrome
  | 'sunset'      // Orange to Red
  | 'cyber'       // Neon Purple to Cyan
  | 'sapphire'    // Ocean Blues
  | 'amethyst'    // Deep Purples
  | 'amber';      // Warm Amber/Gold

export interface DataCell {
  id: string;
  x: number;          // Column index or week index
  y: number;          // Row index or day-of-week index (0-6)
  value: number;      // Numeric intensity value
  date?: string;      // YYYY-MM-DD format for calendar mode
  label?: string;     // Cell hover label (e.g., "14 commits", "1.2k clicks", "0.45 ETH")
  details?: Record<string, string | number>;
}

export interface HeatmapConfig {
  columns: number;
  rows: number;
  cellSize: number;
  cellGap: number;
  borderRadius: number;
  colorTheme: ColorTheme;
  showLegend: boolean;
  showLabels: boolean;
  showTooltips: boolean;
  minValue?: number;
  maxValue?: number;
  xLabels?: string[];
  yLabels?: string[];
}

export interface HeatmapData {
  id: string;
  title: string;
  description: string;
  type: HeatmapType;
  visibility: VisibilityType;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  ownerHandle: string;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  likesCount: number;
  config: HeatmapConfig;
  cells: DataCell[];
  tags: string[];
}

export interface HeatmapTemplate {
  id: string;
  title: string;
  description: string;
  type: HeatmapType;
  category: string;
  iconName: string;
  popular?: boolean;
  config: HeatmapConfig;
  sampleCells: DataCell[];
}

export interface AIInsight {
  id: string;
  heatmapId: string;
  title: string;
  description: string;
  metric?: string;
  type: 'positive' | 'neutral' | 'warning' | 'tip';
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  location?: string;
  website?: string;
  githubHandle?: string;
  heatmapsCount: number;
  totalViews: number;
  followersCount: number;
  followingCount: number;
  joinedDate: string;
}
