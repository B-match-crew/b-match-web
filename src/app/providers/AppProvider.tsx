"use client";

import type { ReactNode } from "react";
import { Toaster } from "@/src/shared/ui/sonner";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
}
