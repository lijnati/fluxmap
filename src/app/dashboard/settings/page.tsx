'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MOCK_USER_PROFILE } from '@/lib/sample-data';
import { saveUserProfile } from '@/lib/storage';
import { UserProfile } from '@/types';
import { Settings, Save, Check, Key, User } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveUserProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-zinc-500" />
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Settings & Preferences
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your developer profile details, API tokens, and default export settings.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-500" />
                Developer Profile
              </CardTitle>
              <CardDescription>Public profile details visible on your community gallery cards.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Display Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
                <Input
                  label="Handle"
                  value={profile.handle}
                  onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
                />
              </div>

              <Input
                label="Bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Location"
                  value={profile.location || ''}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
                <Input
                  label="Website URL"
                  value={profile.website || ''}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                />
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex justify-end">
                <Button variant="primary" size="sm" onClick={handleSave}>
                  {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                API & Embed Keys
              </CardTitle>
              <CardDescription>Use your API token to programmatically push telemetry cells into Fluxmap.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Input
                label="Secret Telemetry Key"
                value="flux_live_9f8a2b3c4d5e6f7g8h9i0j"
                readOnly
                className="font-mono text-xs"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
