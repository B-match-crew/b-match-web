"use client";

import Image from "next/image";
import { useAutoLogin } from "@/src/features/auth/auto-login";

export function SplashPage() {
  useAutoLogin();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background">
      <Image
        src="/images/logo-symbol.png"
        alt="B-match"
        width={120}
        height={120}
        className="h-28 w-28 animate-pulse"
        priority
      />
      <Image
        src="/images/logo-text.png"
        alt="B-match"
        width={160}
        height={40}
        className="h-10 w-auto"
        priority
      />
      <div className="mt-8 h-1 w-24 overflow-hidden rounded-full bg-muted">
        <div className="h-full animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-primary" />
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0; }
          50% { width: 100%; margin-left: 0; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
