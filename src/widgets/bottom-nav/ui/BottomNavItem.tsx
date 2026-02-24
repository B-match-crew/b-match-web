"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/src/shared/lib/utils";

interface BottomNavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

export function BottomNavItem({
  href,
  icon: Icon,
  label,
  isActive,
}: BottomNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
