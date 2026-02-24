"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/ui/button";
import { Avatar, AvatarFallback } from "@/src/shared/ui/avatar";
import { Separator } from "@/src/shared/ui/separator";
import { useUserStore } from "@/src/entities/user";
import { ROUTES } from "@/src/shared/config/routes";
import { ChevronRight, LogOut, Shield } from "lucide-react";

export default function MyPage() {
  const router = useRouter();
  const { user, isHost, isAuthenticated, logout } = useUserStore();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-sm text-muted-foreground">로그인이 필요합니다</p>
        <Button onClick={() => router.push(ROUTES.LOGIN)}>로그인하기</Button>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex items-center gap-4 p-6">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
            {user?.name?.charAt(0) ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-bold">{user?.name ?? "사용자"}</h2>
          <p className="text-sm text-muted-foreground">
            {user?.skillLevel} | {user?.gender}
            {isHost && " | 호스트"}
          </p>
        </div>
      </div>

      <Separator />

      {!isHost && (
        <button
          onClick={() => router.push(ROUTES.HOST_REGISTER)}
          className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-muted/50"
        >
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">호스트 신청</p>
              <p className="text-xs text-muted-foreground">
                나만의 모임을 만들어보세요
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      )}

      <Separator />

      <button
        onClick={() => {
          logout();
          router.replace(ROUTES.SPLASH);
        }}
        className="flex w-full items-center gap-3 px-6 py-4 text-left text-destructive hover:bg-muted/50"
      >
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">로그아웃</span>
      </button>
    </div>
  );
}
