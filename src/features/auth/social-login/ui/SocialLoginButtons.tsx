"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/ui/button";
import { useUserStore } from "@/src/entities/user";
import {
  loginWithKakao,
  loginWithApple,
  loginWithGoogle,
} from "../api/social-login.api";
import { ROUTES } from "@/src/shared/config/routes";
import { toast } from "sonner";

export function SocialLoginButtons() {
  const router = useRouter();
  const { setToken } = useUserStore();

  const handleLogin = async (
    provider: "kakao" | "apple" | "google",
    loginFn: typeof loginWithKakao
  ) => {
    try {
      const result = await loginFn();
      setToken(result.token);

      if (result.isNewUser) {
        router.push(ROUTES.PROFILE_SETUP);
      } else {
        router.replace(ROUTES.HOME);
      }
    } catch {
      toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        onClick={() => handleLogin("kakao", loginWithKakao)}
        className="h-12 w-full rounded-xl text-sm font-semibold"
        style={{ backgroundColor: "#FEE500", color: "#191919" }}
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.48 3 2 6.36 2 10.44c0 2.66 1.78 4.98 4.44 6.3l-1.14 4.22c-.1.36.3.66.62.46l4.96-3.28c.36.04.74.06 1.12.06 5.52 0 10-3.36 10-7.76S17.52 3 12 3z" />
        </svg>
        카카오로 시작하기
      </Button>

      <Button
        onClick={() => handleLogin("apple", loginWithApple)}
        className="h-12 w-full rounded-xl bg-black text-sm font-semibold text-white hover:bg-black/90"
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        Apple로 시작하기
      </Button>

      <Button
        onClick={() => handleLogin("google", loginWithGoogle)}
        variant="outline"
        className="h-12 w-full rounded-xl text-sm font-semibold"
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Google로 시작하기
      </Button>
    </div>
  );
}
