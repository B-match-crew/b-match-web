"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/src/widgets/app-bar";
import { ProfileForm, type ProfileFormData } from "@/src/features/auth/profile-setup";
import { HostInvitationPopup } from "@/src/widgets/host-invitation-popup";
import { useUserStore } from "@/src/entities/user";
import { ROUTES } from "@/src/shared/config/routes";
import { toast } from "sonner";

export function ProfileSetupPage() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [showHostPopup, setShowHostPopup] = useState(false);

  const handleProfileSubmit = (data: ProfileFormData) => {
    // TODO: [AUTH-02] 프로필 정보 서버 저장 API 호출
    setUser({
      id: "temp-user-id",
      name: data.name,
      gender: data.gender as "남성" | "여성",
      age: parseInt(data.age),
      skillLevel: data.skillLevel as "S" | "A" | "B" | "C" | "D" | "초심" | "입문",
      isHost: false,
    });

    toast.success("프로필이 저장되었습니다");
    setShowHostPopup(true);
  };

  const handleHostSelect = () => {
    setShowHostPopup(false);
    router.push(ROUTES.HOST_REGISTER);
  };

  const handleGuestSelect = () => {
    setShowHostPopup(false);
    router.replace(ROUTES.HOME);
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <AppBar title="프로필 설정" showBack />
      <div className="flex-1 px-6 py-6">
        <h2 className="mb-1 text-xl font-bold">기본 정보를 입력해주세요</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          매칭에 필요한 정보를 알려주세요
        </p>
        <ProfileForm onSubmit={handleProfileSubmit} />
      </div>

      <HostInvitationPopup
        open={showHostPopup}
        onHostSelect={handleHostSelect}
        onGuestSelect={handleGuestSelect}
      />
    </div>
  );
}
