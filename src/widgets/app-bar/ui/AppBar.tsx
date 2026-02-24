"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface AppBarProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightAction?: React.ReactNode;
}

export function AppBar({
  title,
  showBack = false,
  showLogo = false,
  rightAction,
}: AppBarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {showLogo && (
          <Image
            src="/images/logo-text.png"
            alt="B-match"
            width={100}
            height={28}
            className="h-7 w-auto"
            priority
          />
        )}
        {title && (
          <h1 className="text-lg font-semibold">{title}</h1>
        )}
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}
