'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  Plus,
  Compass,
  BookOpen,
  Code2,
  GitBranch,
  Sun,
  Moon,
  Command,
  ArrowRight
} from 'lucide-react';
import { showToast } from './Toast';

export interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  perform: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Listen for Cmd+K or Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands: CommandItem[] = [
    {
      id: 'cmd_create',
      label: 'Create New Heatmap',
      category: 'Actions',
      icon: <Plus className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        router.push('/dashboard/create');
        setIsOpen(false);
      },
    },
    {
      id: 'cmd_sync_github',
      label: 'Sync GitHub Profile Activity',
      category: 'Actions',
      icon: <GitBranch className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        router.push('/dashboard/create');
        showToast('Opened Heatmap Builder GitHub Importer', 'info');
        setIsOpen(false);
      },
    },
    {
      id: 'cmd_dashboard',
      label: 'Go to Dashboard Overview',
      category: 'Navigation',
      icon: <LayoutDashboard className="w-4 h-4 text-blue-400" />,
      perform: () => {
        router.push('/dashboard');
        setIsOpen(false);
      },
    },
    {
      id: 'cmd_explore',
      label: 'Explore Public Gallery',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-purple-400" />,
      perform: () => {
        router.push('/explore');
        setIsOpen(false);
      },
    },
    {
      id: 'cmd_docs',
      label: 'Fluxmap Documentation Portal',
      category: 'Documentation',
      icon: <BookOpen className="w-4 h-4 text-amber-400" />,
      perform: () => {
        router.push('/docs');
        setIsOpen(false);
      },
    },
    {
      id: 'cmd_api',
      label: 'REST API Reference & Webhooks',
      category: 'Documentation',
      icon: <Code2 className="w-4 h-4 text-amber-400" />,
      perform: () => {
        router.push('/docs/api-reference');
        setIsOpen(false);
      },
    },
    {
      id: 'cmd_theme',
      label: `Toggle Theme (${theme === 'dark' ? 'Light Mode' : 'Dark Mode'})`,
      category: 'Settings',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />,
      perform: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        showToast(`Switched theme to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
        setIsOpen(false);
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDownInMenu = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((idx) => (idx + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((idx) => (idx - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].perform();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl p-0 shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800/80 h-12">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                autoFocus
                placeholder="Type a command or search (e.g. Create, Sync, Docs)..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDownInMenu}
                className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-[10px] font-mono text-zinc-500">
                ESC
              </kbd>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-xs text-zinc-500 font-mono">
                  No matching commands found for "{query}"
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.perform}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all ${
                        isSelected
                          ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono opacity-75">
                        <span>{item.category}</span>
                        {isSelected && <ArrowRight className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" />
                Press <kbd className="px-1 bg-zinc-200 dark:bg-zinc-800 rounded">↑</kbd> <kbd className="px-1 bg-zinc-200 dark:bg-zinc-800 rounded">↓</kbd> to navigate
              </span>
              <span><kbd className="px-1 bg-zinc-200 dark:bg-zinc-800 rounded">↵</kbd> Select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
