"use client";

import { useRouter } from "next/navigation";
import { MatchingFilter } from "@/src/widgets/matching-filter";
import { MatchingList } from "@/src/widgets/matching-list";
import { Button } from "@/src/shared/ui/button";
import { useUserStore } from "@/src/entities/user";
import { ROUTES } from "@/src/shared/config/routes";
import { Plus } from "lucide-react";

export function HomePage() {
  const router = useRouter();
  const { isHost } = useUserStore();

  return (
    <div className="relative">
      <MatchingFilter />
      <MatchingList />

      {isHost && (
        <Button
          onClick={() => router.push(ROUTES.MATCHING_CREATE)}
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg md:right-[calc(50%-215px+16px)]"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
