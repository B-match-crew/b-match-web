"use client";

import { useState, useCallback } from "react";
import { useUserStore } from "@/src/entities/user";

export function useAuthGuard() {
  const { isAuthenticated } = useUserStore();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const requireAuth = useCallback(
    (action: () => void) => {
      if (isAuthenticated) {
        action();
      } else {
        setShowLoginDialog(true);
      }
    },
    [isAuthenticated]
  );

  return {
    showLoginDialog,
    setShowLoginDialog,
    requireAuth,
  };
}
