"use client";

import { useRouter } from "next/navigation";
import { MatchingFilter } from "@/src/widgets/matching-filter";
import { MatchingList } from "@/src/widgets/matching-list";
import { Button } from "@/src/shared/ui/button";
import { useUserStore } from "@/src/entities/user";
import {
  LoginRequiredDialog,
  useAuthGuard,
} from "@/src/features/auth/login-required-dialog";
import { ROUTES } from "@/src/shared/config/routes";
import { Plus } from "lucide-react";

export function HomePage() {
  const router = useRouter();
  const { isHost } = useUserStore();
  const { showLoginDialog, setShowLoginDialog, requireAuth } = useAuthGuard();

  const handleMatchingCreate = () => {
    requireAuth(() => {
      router.push(ROUTES.MATCHING_CREATE);
    });
  };

  return (
    <div className="relative">
      <MatchingFilter />
      <MatchingList />

      {isHost && (
        <Button
          onClick={handleMatchingCreate}
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg md:right-[calc(50%-215px+16px)]"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      <LoginRequiredDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />
    </div>
  );
}
