"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./user.types";

interface UserState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isHost: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isHost: false,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      setUser: (user) =>
        set({ user, isHost: user?.isHost ?? false }),
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isHost: false,
        }),
    }),
    { name: "bmatch-user" }
  )
);
