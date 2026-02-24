"use client";

import { create } from "zustand";

interface FilterState {
  date: string | null;
  region: string | null;
  gender: "남자만" | "여자만" | "남녀모두";
  skillLevel: string | null;
  setDate: (date: string | null) => void;
  setRegion: (region: string | null) => void;
  setGender: (gender: "남자만" | "여자만" | "남녀모두") => void;
  setSkillLevel: (level: string | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  date: null,
  region: null,
  gender: "남녀모두",
  skillLevel: null,
  setDate: (date) => set({ date }),
  setRegion: (region) => set({ region }),
  setGender: (gender) => set({ gender }),
  setSkillLevel: (skillLevel) => set({ skillLevel }),
  resetFilters: () =>
    set({ date: null, region: null, gender: "남녀모두", skillLevel: null }),
}));
