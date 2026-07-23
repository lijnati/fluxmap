'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Users, Eye, Globe2 } from 'lucide-react';

const VIEW_ANALYTICS_DATA = [
  { day: 'Mon', views: 2400, engagements: 1200 },
  { day: 'Tue', views: 3800, engagements: 2100 },
  { day: 'Wed', views: 5200, engagements: 3400 },
  { day: 'Thu', views: 4100, engagements: 2600 },
  { day: 'Fri', views: 6800, engagements: 4500 },
  { day: 'Sat', views: 3100, engagements: 1800 },
  { day: 'Sun', views: 2900, engagements: 1400 },
];

const GEOGRAPHIC_DATA = [
  { country: 'United States', views: '48.2k', percent: '42%' },
  { country: 'Germany', views: '18.4k', percent: '16%' },
  { country: 'United Kingdom', views: '14.1k', percent: '12%' },
  { country: 'Japan', views: '11.8k', percent: '10%' },
  { country: 'Canada', views: '9.2k', percent: '8%' },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Aggregated Analytics
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time traffic telemetry, embed impressions, and viewer demographic breakdown.
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <Card className="lg:col-span-8">
            <CardHeader>
              <CardTitle className="text-base">Weekly Impression & Engagement Trajectory</CardTitle>
              <CardDescription>Daily total views across all public heatmaps and iframe embeds.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VIEW_ANALYTICS_DATA}>
                  <defs>
                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#71717a" fontSize={12} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #27272a', color: '#fff' }} />
                  <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#viewsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-500" />
                Top Demographic Regions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {GEOGRAPHIC_DATA.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.country}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                    <span>{item.views}</span>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px]">
                      {item.percent}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
