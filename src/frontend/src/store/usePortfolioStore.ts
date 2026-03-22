import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface ToastNotification {
  id: string;
  achievementName: string;
  achievementIcon: string;
  achievementDescription: string;
}

interface PortfolioStore {
  // Achievements
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  isUnlocked: (id: string) => boolean;

  // World UI
  showMiniMap: boolean;
  toggleMiniMap: () => void;
  showRain: boolean;
  toggleRain: () => void;
  nearbyProject: string | null;
  setNearbyProject: (id: string | null) => void;
  boostCount: number;
  incrementBoost: () => void;

  // Toast queue
  toasts: ToastNotification[];
  addToast: (toast: ToastNotification) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "historic",
    name: "Historic Achievement",
    description: "Drove over the Charminar monument",
    icon: "🕌",
    unlocked: false,
  },
  {
    id: "foodie",
    name: "Foodie Developer",
    description: "Collected the hidden biryani bowl",
    icon: "🍛",
    unlocked: false,
  },
  {
    id: "road-rage",
    name: "Road Rage",
    description: "Honked the auto-rickshaw",
    icon: "🛺",
    unlocked: false,
  },
  {
    id: "chai-lover",
    name: "Chai Lover",
    description: "Hit the chai cart for a speed boost",
    icon: "☕",
    unlocked: false,
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Used the boost 5 times",
    icon: "⚡",
    unlocked: false,
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Visited all 3 project buildings",
    icon: "🗺️",
    unlocked: false,
  },
  {
    id: "whisper-master",
    name: "Whisper Master",
    description: "Left a whisper in Nidhii's world",
    icon: "💬",
    unlocked: false,
  },
  {
    id: "night-rider",
    name: "Night Rider",
    description: "Drove in the rain",
    icon: "🌧️",
    unlocked: false,
  },
];

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      achievements: DEFAULT_ACHIEVEMENTS,
      unlockAchievement: (id: string) => {
        const ach = get().achievements.find((a) => a.id === id);
        if (!ach || ach.unlocked) return;
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === id ? { ...a, unlocked: true } : a,
          ),
        }));
        const toastId = `toast-${id}-${Date.now()}`;
        get().addToast({
          id: toastId,
          achievementName: ach.name,
          achievementIcon: ach.icon,
          achievementDescription: ach.description,
        });
      },
      isUnlocked: (id: string) =>
        get().achievements.some((a) => a.id === id && a.unlocked),

      showMiniMap: true,
      toggleMiniMap: () => set((s) => ({ showMiniMap: !s.showMiniMap })),
      showRain: false,
      toggleRain: () => {
        const wasOff = !get().showRain;
        set((s) => ({ showRain: !s.showRain }));
        if (wasOff) get().unlockAchievement("night-rider");
      },
      nearbyProject: null,
      setNearbyProject: (id) => set({ nearbyProject: id }),
      boostCount: 0,
      incrementBoost: () => {
        const next = get().boostCount + 1;
        set({ boostCount: next });
        if (next >= 5) get().unlockAchievement("speed-demon");
      },

      toasts: [],
      addToast: (toast) => set((s) => ({ toasts: [...s.toasts, toast] })),
      removeToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: "nidhii-portfolio",
      partialize: (state) => ({
        achievements: state.achievements,
        boostCount: state.boostCount,
      }),
    },
  ),
);

// Track visited projects separately
export const visitedProjects = new Set<string>();
