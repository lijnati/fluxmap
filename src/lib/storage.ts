import { HeatmapData, UserProfile } from '@/types';
import { SAMPLE_HEATMAPS, MOCK_USER_PROFILE } from './sample-data';

const STORAGE_KEY_HEATMAPS = 'fluxmap_heatmaps_v1';
const STORAGE_KEY_PROFILE = 'fluxmap_profile_v1';

export function getStoredHeatmaps(): HeatmapData[] {
  if (typeof window === 'undefined') return SAMPLE_HEATMAPS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HEATMAPS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_HEATMAPS, JSON.stringify(SAMPLE_HEATMAPS));
      return SAMPLE_HEATMAPS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load heatmaps from storage:', e);
    return SAMPLE_HEATMAPS;
  }
}

export function saveHeatmapsToStorage(heatmaps: HeatmapData[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_HEATMAPS, JSON.stringify(heatmaps));
  } catch (e) {
    console.error('Failed to save heatmaps to storage:', e);
  }
}

export function getHeatmapById(id: string): HeatmapData | undefined {
  const all = getStoredHeatmaps();
  return all.find((h) => h.id === id);
}

export function saveHeatmap(heatmap: HeatmapData): void {
  const all = getStoredHeatmaps();
  const index = all.findIndex((h) => h.id === heatmap.id);
  if (index >= 0) {
    all[index] = { ...heatmap, updatedAt: new Date().toISOString() };
  } else {
    all.unshift(heatmap);
  }
  saveHeatmapsToStorage(all);
}

export function deleteHeatmap(id: string): void {
  const all = getStoredHeatmaps();
  const filtered = all.filter((h) => h.id !== id);
  saveHeatmapsToStorage(filtered);
}

export function incrementHeatmapViews(id: string): void {
  const all = getStoredHeatmaps();
  const index = all.findIndex((h) => h.id === id);
  if (index >= 0) {
    all[index].viewsCount += 1;
    saveHeatmapsToStorage(all);
  }
}

export function getStoredUserProfile(): UserProfile {
  if (typeof window === 'undefined') return MOCK_USER_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(MOCK_USER_PROFILE));
      return MOCK_USER_PROFILE;
    }
    return JSON.parse(raw);
  } catch (e) {
    return MOCK_USER_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
}
