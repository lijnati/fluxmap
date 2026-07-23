'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HeatmapGrid } from '@/components/heatmap/HeatmapGrid';
import { UserProfile, HeatmapData } from '@/types';
import { getStoredHeatmaps, getStoredUserProfile } from '@/lib/storage';
import { useSession } from '@/lib/auth-client';
import { MapPin, Globe, Calendar, Eye, Grid3X3, Users, ExternalLink, Check, Plus } from 'lucide-react';

export default function UserProfilePage() {
  const params = useParams();
  const usernameParam = (params?.username as string) || 'developer';
  const { data: session } = useSession();

  const [profile, setProfile] = useState<UserProfile>({
    id: 'usr_dynamic',
    name: 'Developer Profile',
    handle: usernameParam,
    bio: 'Full-stack Architect & Open Source Contributor. Building high-performance developer tools.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    location: 'San Francisco, CA',
    website: 'https://github.com',
    heatmapsCount: 12,
    totalViews: 48500,
    followersCount: 340,
    followingCount: 120,
    joinedDate: 'January 2026'
  });

  const [userHeatmaps, setUserHeatmaps] = useState<HeatmapData[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const storedProfile = getStoredUserProfile();
    const activeUser = session?.user;

    const displayName = activeUser?.name || storedProfile.name || 'Developer';
    const displayHandle = activeUser?.name ? activeUser.name.toLowerCase().replace(/\s+/g, '') : (activeUser?.email?.split('@')[0] || usernameParam);
    const displayAvatar = activeUser?.image || storedProfile.avatarUrl;

    setProfile((prev) => ({
      ...prev,
      name: displayName,
      handle: displayHandle,
      avatarUrl: displayAvatar,
      bio: storedProfile.bio || prev.bio,
    }));

    const all = getStoredHeatmaps();
    setUserHeatmaps(all);
  }, [usernameParam, session]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile Header Banner */}
      <Card className="p-6 md:p-8 mb-8 bg-linear-to-b from-zinc-900 to-zinc-950 text-white border-zinc-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 rounded-2xl border-2 border-zinc-700 object-cover shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">{profile.name}</h1>
                <Badge variant="success">Verified Architect</Badge>
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">@{profile.handle}</p>
              <p className="text-xs text-zinc-300 mt-2 max-w-xl leading-relaxed">{profile.bio}</p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-zinc-400 font-mono">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {profile.location}
                  </span>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-zinc-500" />
                    {profile.website}
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  Joined {profile.joinedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={isFollowing ? 'secondary' : 'primary'}
              size="md"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
              {isFollowing ? 'Following' : `Follow @${profile.handle}`}
            </Button>
          </div>
        </div>

        {/* Profile Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-800/80 text-center font-mono">
          <div>
            <span className="text-[10px] uppercase text-zinc-500">Heatmaps</span>
            <div className="text-xl font-bold text-white mt-0.5">{userHeatmaps.length}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase text-zinc-500">Total Views</span>
            <div className="text-xl font-bold text-white mt-0.5">48.5k</div>
          </div>
          <div>
            <span className="text-[10px] uppercase text-zinc-500">Followers</span>
            <div className="text-xl font-bold text-white mt-0.5">
              {profile.followersCount + (isFollowing ? 1 : 0)}
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase text-zinc-500">Following</span>
            <div className="text-xl font-bold text-white mt-0.5">{profile.followingCount}</div>
          </div>
        </div>
      </Card>

      {/* Featured Heatmaps */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
          Featured Visualizations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userHeatmaps.map((heatmap) => (
            <Card key={heatmap.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                      {heatmap.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                      {heatmap.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase">
                    {heatmap.type}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 mb-4">
                  <HeatmapGrid cells={heatmap.cells} config={heatmap.config} interactive={true} />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {heatmap.viewsCount} views
                </span>
                <Link href={`/h/${heatmap.id}`}>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open View
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
