"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/entities/user";
import { ROUTES } from "@/src/shared/config/routes";

export function useAutoLogin() {
  const router = useRouter();
  const { token, isAuthenticated } = useUserStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // 약간의 스플래시 표시 시간
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (token && isAuthenticated) {
        // TODO: [ENT-01] 서버에 토큰 유효성 검증 API 호출
        // const isValid = await verifyToken(token);
        // if (!isValid) { logout(); router.replace(ROUTES.HOME); return; }
      }

      router.replace(ROUTES.HOME);

      setIsChecking(false);
    };

    checkAuth();
  }, [token, isAuthenticated, router]);

  return { isChecking };
}
