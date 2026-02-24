"use client";

import { useRouter } from "next/navigation";
import { MatchingFilter } from "@/src/widgets/matching-filter";
import { MatchingList } from "@/src/widgets/matching-list";
import { Button } from "@/src/shared/ui/button";
import { useUserStore } from "@/src/entities/user";
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
          onClick={() => {
            // TODO: [HOME-01] 매칭 생성 페이지로 이동
            console.log("매칭 생성 페이지 이동");
          }}
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg md:right-[calc(50%-215px+16px)]"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
