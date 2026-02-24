"use client";

import Image from "next/image";
import { SocialLoginButtons } from "@/src/features/auth/social-login";

export function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-between bg-background px-6 py-12">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Image
          src="/images/logo-symbol.png"
          alt="B-match"
          width={100}
          height={100}
          className="h-24 w-24"
          priority
        />
        <Image
          src="/images/logo-text.png"
          alt="B-match"
          width={140}
          height={36}
          className="h-9 w-auto"
          priority
        />
        <p className="mt-2 text-sm text-muted-foreground">
          배드민턴 매칭의 시작
        </p>
      </div>

      <div className="w-full space-y-4 pb-4">
        <SocialLoginButtons />
        <p className="text-center text-xs text-muted-foreground">
          로그인 시 서비스 이용약관과 개인정보 처리방침에 동의합니다.
        </p>
      </div>
    </div>
  );
}
