"use client";

import { usePathname } from "next/navigation";
import { Home, Map, User } from "lucide-react";
import { BottomNavItem } from "./BottomNavItem";
import { ROUTES } from "@/src/shared/config/routes";

const NAV_ITEMS = [
  { href: ROUTES.HOME, icon: Home, label: "홈" },
  { href: ROUTES.MAP, icon: Map, label: "지도" },
  { href: ROUTES.MY, icon: User, label: "MY" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:max-w-[768px]">
      <div className="flex">
        {NAV_ITEMS.map((item) => (
          <BottomNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname.startsWith(item.href)}
          />
        ))}
      </div>
    </nav>
  );
}
