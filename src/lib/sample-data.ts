import { HeatmapData, DataCell, HeatmapTemplate, UserProfile, AIInsight } from '@/types';

// Helper to generate calendar dates for 52 weeks x 7 days (GitHub style)
export function generateGitHubSampleData(): DataCell[] {
  const cells: DataCell[] = [];
  const startDate = new Date(2026, 0, 1); // Jan 1, 2026

  for (let week = 0; week < 52; week++) {
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + (week * 7 + day));
      
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Seeded realistic activity algorithm
      const isWeekend = day === 0 || day === 6;
      let rand = Math.random();
      let value = 0;
      
      if (!isWeekend) {
        if (rand > 0.85) value = Math.floor(Math.random() * 15) + 12; // High burst
        else if (rand > 0.4) value = Math.floor(Math.random() * 8) + 3; // Regular work
        else if (rand > 0.15) value = Math.floor(Math.random() * 3) + 1; // Light
      } else {
        if (rand > 0.7) value = Math.floor(Math.random() * 5) + 1; // Weekend hacking
      }

      cells.push({
        id: `gh-${week}-${day}`,
        x: week,
        y: day,
        value,
        date: dateStr,
        label: `${value} contributions on ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
      });
    }
  }

  return cells;
}

// Helper to generate 24 hours x 7 days website analytics grid
export function generateWebsiteAnalyticsSampleData(): DataCell[] {
  const cells: DataCell[] = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Peak hours around 14:00 - 20:00 (2pm to 8pm)
      const isPeakHour = hour >= 13 && hour <= 21;
      const isWeekend = day >= 5;
      
      let baseClicks = isPeakHour ? 350 : 80;
      if (isWeekend) baseClicks = Math.floor(baseClicks * 0.6);

      const value = Math.floor(baseClicks + Math.random() * 200);

      cells.push({
        id: `web-${day}-${hour}`,
        x: hour,
        y: day,
        value,
        label: `${days[day]} ${hour}:00 — ${value.toLocaleString()} page interactions (Scroll depth 84%)`,
        details: {
          clicks: Math.floor(value * 0.4),
          scrolls: Math.floor(value * 0.6),
          conversions: Math.floor(value * 0.05)
        }
      });
    }
  }

  return cells;
}

// Helper to generate Blockchain activity matrix
export function generateBlockchainSampleData(): DataCell[] {
  const cells: DataCell[] = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const isHighGasPeriod = (hour >= 14 && hour <= 19) || (hour >= 1 && hour <= 4);
      let value = Math.floor(Math.random() * 15);
      if (isHighGasPeriod && Math.random() > 0.4) {
        value = Math.floor(Math.random() * 45) + 15;
      }

      cells.push({
        id: `chain-${day}-${hour}`,
        x: hour,
        y: day,
        value,
        label: `${days[day]} ${hour}:00 — ${value} smart contract txs (${(value * 0.0084).toFixed(3)} ETH gas)`
      });
    }
  }

  return cells;
}

// Helper to generate Productivity grid
export function generateProductivitySampleData(): DataCell[] {
  const cells: DataCell[] = [];
  const weeks = 16; // 16 weeks habit tracker

  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < 7; day++) {
      const score = Math.floor(Math.random() * 100);
      cells.push({
        id: `prod-${week}-${day}`,
        x: week,
        y: day,
        value: score,
        label: `Week ${week + 1}, Day ${day + 1} — Productivity Score: ${score}/100`
      });
    }
  }

  return cells;
}

// Sample User Profile
export const MOCK_USER_PROFILE: UserProfile = {
  id: 'usr_1',
  name: 'Developer Profile',
  handle: 'developer',
  bio: 'Full-stack Architect & Open Source Contributor. Building high-performance developer tools and data visualizers.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  location: 'San Francisco, CA',
  website: 'https://fluxmap.com',
  githubHandle: 'developer',
  heatmapsCount: 42,
  totalViews: 148500,
  followersCount: 1240,
  followingCount: 180,
  joinedDate: 'January 2025'
};

// Initial Preset Heatmaps
export const SAMPLE_HEATMAPS: HeatmapData[] = [
  {
    id: 'h_github_2026',
    title: 'GitHub Activity 2026',
    description: 'Year-long contribution intensity graph showing commit velocity, pull requests, and code reviews across 12 repos.',
    type: 'github',
    visibility: 'public',
    ownerId: 'usr_1',
    ownerName: 'Alex Rivers',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    ownerHandle: 'arivers',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-07-23T12:00:00Z',
    viewsCount: 2450,
    likesCount: 382,
    config: {
      columns: 52,
      rows: 7,
      cellSize: 14,
      cellGap: 4,
      borderRadius: 3,
      colorTheme: 'emerald',
      showLegend: true,
      showLabels: true,
      showTooltips: true,
      minValue: 0,
      maxValue: 25,
      yLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    cells: generateGitHubSampleData(),
    tags: ['Developer', 'GitHub', 'Contributions', 'OpenSource']
  },
  {
    id: 'h_web_analytics',
    title: 'SaaS App Interaction Heatmap',
    description: 'Hourly click intensity and scroll depth metrics on landing hero section over the last 7 days.',
    type: 'website',
    visibility: 'public',
    ownerId: 'usr_1',
    ownerName: 'Alex Rivers',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    ownerHandle: 'arivers',
    createdAt: '2026-03-14T14:30:00Z',
    updatedAt: '2026-07-20T18:00:00Z',
    viewsCount: 5120,
    likesCount: 890,
    config: {
      columns: 24,
      rows: 7,
      cellSize: 18,
      cellGap: 4,
      borderRadius: 4,
      colorTheme: 'obsidian',
      showLegend: true,
      showLabels: true,
      showTooltips: true,
      minValue: 0,
      maxValue: 500,
      yLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      xLabels: ['00', '03', '06', '09', '12', '15', '18', '21']
    },
    cells: generateWebsiteAnalyticsSampleData(),
    tags: ['UX', 'Analytics', 'Clickmap', 'Vercel']
  },
  {
    id: 'h_blockchain_tx',
    title: 'Arbitrum DeFi Contract Interactions',
    description: 'Smart contract deployment and transaction frequency breakdown by hour of day.',
    type: 'blockchain',
    visibility: 'public',
    ownerId: 'usr_2',
    ownerName: 'Alex Rivers',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    ownerHandle: 'arivers',
    createdAt: '2026-05-01T08:15:00Z',
    updatedAt: '2026-07-22T09:12:00Z',
    viewsCount: 1890,
    likesCount: 240,
    config: {
      columns: 24,
      rows: 7,
      cellSize: 16,
      cellGap: 4,
      borderRadius: 4,
      colorTheme: 'cyber',
      showLegend: true,
      showLabels: true,
      showTooltips: true,
      minValue: 0,
      maxValue: 60,
      yLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      xLabels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
    },
    cells: generateBlockchainSampleData(),
    tags: ['DeFi', 'Web3', 'Blockchain', 'GasTracker']
  },
  {
    id: 'h_productivity_q3',
    title: 'Deep Work & Sprint Velocity',
    description: 'Weekly focus hours and task completion score across 16 sprint cycles.',
    type: 'productivity',
    visibility: 'public',
    ownerId: 'usr_3',
    ownerName: 'Elena Rostova',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    ownerHandle: 'elena_r',
    createdAt: '2026-06-10T11:00:00Z',
    updatedAt: '2026-07-21T16:45:00Z',
    viewsCount: 3410,
    likesCount: 512,
    config: {
      columns: 16,
      rows: 7,
      cellSize: 20,
      cellGap: 5,
      borderRadius: 5,
      colorTheme: 'sunset',
      showLegend: true,
      showLabels: true,
      showTooltips: true,
      minValue: 0,
      maxValue: 100,
      yLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    cells: generateProductivitySampleData(),
    tags: ['Productivity', 'Habit', 'Linear', 'Sprint']
  }
];

// Preset Templates
export const SAMPLE_TEMPLATES: HeatmapTemplate[] = [
  {
    id: 'tmpl_github',
    title: 'GitHub Contribution Grid',
    description: '52-week calendar heat map ideal for developer activity, commits, and pull requests.',
    type: 'github',
    category: 'Developer',
    iconName: 'GitCommit',
    popular: true,
    config: {
      columns: 52,
      rows: 7,
      cellSize: 14,
      cellGap: 4,
      borderRadius: 3,
      colorTheme: 'emerald',
      showLegend: true,
      showLabels: true,
      showTooltips: true,
      minValue: 0,
      maxValue: 25,
      yLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    sampleCells: generateGitHubSampleData()
  },
  {
    id: 'tmpl_website',
    title: 'Website Visitor Activity Matrix',
    description: '24-hour by 7-day click and scroll density grid for Web & Mobile applications.',
    type: 'website',
    category: 'Analytics',
    iconName: 'MousePointerClick',
    popular: true,
    config: {
      columns: 24,
      rows: 7,
      cellSize: 18,
      cellGap: 4,
      borderRadius: 4,
      colorTheme: 'obsidian',
      showLegend: true,
      showLabels: true,
      showTooltips: true,
      minValue: 0,
      maxValue: 500,
      yLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      xLabels: ['00', '03', '06', '09', '12', '15', '18', '21']
    },
    sampleCells: generateWebsiteAnalyticsSampleData()
  },
  {
    id: 'tmpl_blockchain',
    title: 'On-Chain Transaction Heatmap',
    description: 'Visualize wallet activity, gas consumption, and smart contract triggers.',
    type: 'blockchain',
    category: 'Web3',
    iconName: 'Blocks',
    popular: false,
    config: {
      columns: 24,
      rows: 7,
      cellSize: 16,
      cellGap: 4,
      borderRadius: 4,
      colorTheme: 'cyber',
      showLegend: true,
      showLabels: true,
      showTooltips: true,
      minValue: 0,
      maxValue: 60,
      yLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    sampleCells: generateBlockchainSampleData()
  },
  {
    id: 'tmpl_productivity',
    title: 'Team Productivity & Sprint Tracker',
    description: 'Track task completions, focus hours, and sprint velocity over 16-week intervals.',
    type: 'productivity',
    category: 'Workflow',
    iconName: 'CheckSquare',
    popular: true,
    config: {
      columns: 16,
      rows: 7,
      cellSize: 20,
      cellGap: 5,
      borderRadius: 5,
      colorTheme: 'sunset',
      showLegend: true,
      showLabels: true,
      showTooltips: true,
      minValue: 0,
      maxValue: 100,
      yLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    sampleCells: generateProductivitySampleData()
  }
];

// Sample AI Insights
export const SAMPLE_AI_INSIGHTS: Record<string, AIInsight[]> = {
  h_github_2026: [
    {
      id: 'ins_1',
      heatmapId: 'h_github_2026',
      title: 'Peak Contribution Velocity',
      description: 'Your coding activity peaked 37% higher this month compared to previous quarterly average.',
      metric: '+37% MoM',
      type: 'positive'
    },
    {
      id: 'ins_2',
      heatmapId: 'h_github_2026',
      title: 'Optimal Deep-Work Window',
      description: 'Most active contribution period detected on Tuesday & Thursday evenings between 6:00 PM and 10:00 PM.',
      metric: 'Tue/Thu 18:00-22:00',
      type: 'neutral'
    },
    {
      id: 'ins_3',
      heatmapId: 'h_github_2026',
      title: 'Weekend Recovery Pattern',
      description: 'Weekend commit density is 82% lower than weekdays, indicating a sustainable work-life balance.',
      metric: '82% lower on weekends',
      type: 'tip'
    }
  ],
  h_web_analytics: [
    {
      id: 'ins_4',
      heatmapId: 'h_web_analytics',
      title: 'High Conversion Spike',
      description: 'User engagement density peaks significantly on Wednesday afternoons around 2:00 PM (1,420 total clicks).',
      metric: '1.4k interactions',
      type: 'positive'
    },
    {
      id: 'ins_5',
      heatmapId: 'h_web_analytics',
      title: 'Off-Peak Traffic Opportunity',
      description: 'Low visitor engagement recorded between 02:00 AM and 06:00 AM UTC. Ideal window for zero-downtime maintenance.',
      metric: 'Optimal Maint Window',
      type: 'tip'
    }
  ]
};
