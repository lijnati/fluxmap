'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import { AuthModal } from '@/components/auth/AuthModal';
import { useSession, signOut } from '@/lib/auth-client';
import { Grid3X3, Sun, Moon, Plus, Compass, LayoutDashboard, User, LogIn, LogOut, BookOpen } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const userProfileHref = user
    ? `/profile/${user.name ? user.name.toLowerCase().replace(/\s+/g, '') : 'user'}`
    : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 shadow-sm transition-transform group-hover:scale-105">
              <Grid3X3 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
                Heatmap<span className="text-zinc-500 font-normal">Hub</span>
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono leading-tight">
                Analytics
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80">
            <Link
              href="/dashboard"
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                pathname?.startsWith('/dashboard')
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>

            <Link
              href="/explore"
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                pathname === '/explore'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Explore Gallery
            </Link>

            <Link
              href="/docs"
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                pathname?.startsWith('/docs')
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Docs
            </Link>

            {userProfileHref && (
              <Link
                href={userProfileHref}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                  pathname?.startsWith('/profile')
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Profile
              </Link>
            )}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                title="Toggle Light/Dark Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={userProfileHref || '#'}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center text-[10px] font-bold">
                      {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 max-w-[120px] truncate">
                    {user.name || user.email?.split('@')[0]}
                  </span>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => signOut()} title="Sign Out">
                  <LogOut className="w-4 h-4 text-zinc-500 hover:text-rose-500" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsAuthOpen(true)}>
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Button>
            )}

            <Link href="/dashboard/create">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4" />
                <span>Create Heatmap</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
