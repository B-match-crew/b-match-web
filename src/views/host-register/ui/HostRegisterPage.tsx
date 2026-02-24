"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/src/widgets/app-bar";
import { HostCompletePopup } from "@/src/widgets/host-complete-popup";
import {
  GenderRatioSlider,
  AgeDistributionChips,
  SkillCountInput,
} from "@/src/features/host/register";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { Button } from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import { useUserStore } from "@/src/entities/user";
import { ROUTES } from "@/src/shared/config/routes";
import {
  CLUB_NAME_MAX_LENGTH,
  CLUB_NAME_PATTERN,
  AGE_GROUPS,
  SKILL_LEVELS,
  type AgeGroup,
  type AgeDistributionLevel,
  type SkillLevel,
} from "@/src/shared/config/constants";
import { toast } from "sonner";

const TOTAL_STEPS = 4;

const initialAgeDistribution: Record<AgeGroup, AgeDistributionLevel> = {
  "20대": "없음",
  "30대": "없음",
  "40대": "없음",
  "50대": "없음",
  "60대": "없음",
  "기타": "없음",
};

const initialSkillCounts: Record<SkillLevel, number> = {
  S: 0, A: 0, B: 0, C: 0, D: 0, "초심": 0, "입문": 0,
};

export function HostRegisterPage() {
  const router = useRouter();
  const { setUser, user } = useUserStore();
  const [step, setStep] = useState(1);
  const [showComplete, setShowComplete] = useState(false);

  const [clubName, setClubName] = useState("");
  const [maleRatio, setMaleRatio] = useState(50);
  const [ageDistribution, setAgeDistribution] = useState(initialAgeDistribution);
  const [skillCounts, setSkillCounts] = useState(initialSkillCounts);

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          clubName.length > 0 &&
          clubName.length <= CLUB_NAME_MAX_LENGTH &&
          CLUB_NAME_PATTERN.test(clubName)
        );
      case 2:
        return true;
      case 3:
        return AGE_GROUPS.some((g) => ageDistribution[g] !== "없음");
      case 4:
        return SKILL_LEVELS.some((l) => skillCounts[l] > 0);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // TODO: [HOST-05] 호스트 정보 서버 저장 API 호출
    // - clubName, maleRatio, femaleRatio, ageDistribution, skillCounts 전송
    // - 해당 계정에 호스트 권한 부여

    if (user) {
      setUser({ ...user, isHost: true });
    }
    toast.success("호스트 등록이 완료되었습니다");
    setShowComplete(true);
  };

  const handleComplete = () => {
    setShowComplete(false);
    router.replace(ROUTES.HOME);
  };

  const handleAgeChange = (group: AgeGroup, level: AgeDistributionLevel) => {
    setAgeDistribution((prev) => ({ ...prev, [group]: level }));
  };

  const handleSkillChange = (level: SkillLevel, count: number) => {
    setSkillCounts((prev) => ({ ...prev, [level]: count }));
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <AppBar title="호스트 정보 입력" showBack />
      <div className="px-6 pt-4">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {step} / {TOTAL_STEPS}
          </span>
        </div>
        <Progress value={(step / TOTAL_STEPS) * 100} className="h-1.5" />
      </div>

      <div className="flex-1 px-6 py-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">클럽/모임명을 입력해주세요</h2>
            <p className="text-sm text-muted-foreground">
              한글, 영문, 숫자 포함 {CLUB_NAME_MAX_LENGTH}자 이내
            </p>
            <div className="space-y-2">
              <Label htmlFor="clubName">클럽/모임명</Label>
              <Input
                id="clubName"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="예: 서울 배드민턴 클럽"
                maxLength={CLUB_NAME_MAX_LENGTH}
              />
              <p className="text-right text-xs text-muted-foreground">
                {clubName.length}/{CLUB_NAME_MAX_LENGTH}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">성비 분포를 설정해주세요</h2>
            <p className="text-sm text-muted-foreground">
              슬라이더를 조절하여 남녀 비율을 설정하세요
            </p>
            <div className="pt-4">
              <GenderRatioSlider
                maleRatio={maleRatio}
                onChange={setMaleRatio}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">연령 분포를 선택해주세요</h2>
            <p className="text-sm text-muted-foreground">
              각 연령대별로 인원 분포를 선택하세요
            </p>
            <AgeDistributionChips
              distribution={ageDistribution}
              onChange={handleAgeChange}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">급수별 인원을 입력해주세요</h2>
            <p className="text-sm text-muted-foreground">
              각 급수별 대략적인 인원을 입력하세요
            </p>
            <SkillCountInput
              counts={skillCounts}
              onChange={handleSkillChange}
            />
          </div>
        )}
      </div>

      <div className="px-6 pb-8">
        <Button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="w-full py-6 text-base font-semibold"
          size="lg"
        >
          {step < TOTAL_STEPS ? "다음" : "입력 완료"}
        </Button>
      </div>

      <HostCompletePopup open={showComplete} onConfirm={handleComplete} />
    </div>
  );
}
