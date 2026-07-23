'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { AuthModal } from '@/components/auth/AuthModal';
import { LayoutDashboard, Grid3X3, Layers, BarChart3, Settings, Sparkles, LogIn, LogOut, UserCheck } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const user = session?.user;

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Heatmaps', href: '/dashboard/heatmaps', icon: Grid3X3 },
    { label: 'Templates', href: '/dashboard/templates', icon: Layers },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      <aside className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50 min-h-[calc(100vh-3.5rem)] p-4 flex flex-col justify-between hidden md:flex">
        <div className="flex flex-col gap-6">
          {/* Navigation Group */}
          <div className="flex flex-col gap-1">
            <div className="px-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Platform Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* AI Insight Card Widget */}
          <div className="p-3.5 rounded-xl border border-purple-500/20 bg-linear-to-b from-purple-500/5 to-transparent text-purple-900 dark:text-purple-100 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              AI Insights Ready
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-normal">
              Your team activity peaked 37% higher this week during Tuesday evening windows.
            </p>
          </div>
        </div>

        {/* Bottom Real User Session Profile */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
          {user ? (
            <Link
              href={`/profile/${user.name ? user.name.toLowerCase().replace(/\s+/g, '') : 'user'}`}
              className="flex items-center gap-2.5 group overflow-hidden max-w-[170px]"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 object-cover shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center text-xs font-bold shrink-0">
                  {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline truncate">
                  {user.name || user.email?.split('@')[0]}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono truncate">
                  {user.email}
                </span>
              </div>
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <LogIn className="w-4 h-4 text-emerald-500" />
              <span>Sign In Account</span>
            </button>
          )}

          {user && (
            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="text-zinc-400 hover:text-rose-500 transition-colors p-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
