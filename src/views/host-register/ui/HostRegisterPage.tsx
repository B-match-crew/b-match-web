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
import { Separator } from "@/src/shared/ui/separator";
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

interface FormErrors {
  clubName?: string;
  ageDistribution?: string;
  skillCounts?: string;
}

export function HostRegisterPage() {
  const router = useRouter();
  const { setUser, user } = useUserStore();
  const [showComplete, setShowComplete] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [clubName, setClubName] = useState("");
  const [maleRatio, setMaleRatio] = useState(50);
  const [ageDistribution, setAgeDistribution] = useState(initialAgeDistribution);
  const [skillCounts, setSkillCounts] = useState(initialSkillCounts);

  const scrollToSection = (name: string) => {
    document
      .querySelector(`[data-section="${name}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (clubName.length === 0) {
      newErrors.clubName = "클럽/모임명을 입력해주세요";
    } else if (clubName.length > CLUB_NAME_MAX_LENGTH) {
      newErrors.clubName = `${CLUB_NAME_MAX_LENGTH}자 이내로 입력해주세요`;
    } else if (!CLUB_NAME_PATTERN.test(clubName)) {
      newErrors.clubName = "한글, 영문, 숫자만 입력 가능합니다";
    }

    if (!AGE_GROUPS.some((g) => ageDistribution[g] !== "없음")) {
      newErrors.ageDistribution = "최소 1개 연령대를 선택해주세요";
    }

    if (!SKILL_LEVELS.some((l) => skillCounts[l] > 0)) {
      newErrors.skillCounts = "최소 1개 급수의 인원을 입력해주세요";
    }

    setErrors(newErrors);

    const firstError = Object.keys(newErrors)[0];
    if (firstError) {
      scrollToSection(firstError);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

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
    if (errors.ageDistribution) {
      setErrors((prev) => ({ ...prev, ageDistribution: undefined }));
    }
  };

  const handleSkillChange = (level: SkillLevel, count: number) => {
    setSkillCounts((prev) => ({ ...prev, [level]: count }));
    if (errors.skillCounts) {
      setErrors((prev) => ({ ...prev, skillCounts: undefined }));
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <AppBar title="호스트 정보 입력" showBack />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <section data-section="clubName" className="space-y-2">
          <h3 className="text-lg font-semibold">클럽/모임명</h3>
          <p className="text-sm text-muted-foreground">
            한글, 영문, 숫자 포함 {CLUB_NAME_MAX_LENGTH}자 이내
          </p>
          <div className="space-y-2 pt-2">
            <Label htmlFor="clubName">클럽/모임명</Label>
            <Input
              id="clubName"
              value={clubName}
              onChange={(e) => {
                setClubName(e.target.value);
                if (errors.clubName) {
                  setErrors((prev) => ({ ...prev, clubName: undefined }));
                }
              }}
              placeholder="예: 서울 배드민턴 클럽"
              maxLength={CLUB_NAME_MAX_LENGTH}
              className={errors.clubName ? "border-destructive" : ""}
            />
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">
                {clubName.length}/{CLUB_NAME_MAX_LENGTH}
              </span>
              {errors.clubName && (
                <span className="text-destructive">{errors.clubName}</span>
              )}
            </div>
          </div>
        </section>

        <Separator className="my-6" />

        <section data-section="maleRatio" className="space-y-2">
          <h3 className="text-lg font-semibold">성비 분포</h3>
          <p className="text-sm text-muted-foreground">
            슬라이더를 조절하여 남녀 비율을 설정하세요
          </p>
          <div className="pt-2">
            <GenderRatioSlider
              maleRatio={maleRatio}
              onChange={setMaleRatio}
            />
          </div>
        </section>

        <Separator className="my-6" />

        <section data-section="ageDistribution" className="space-y-2">
          <h3 className="text-lg font-semibold">연령 분포</h3>
          <p className="text-sm text-muted-foreground">
            각 연령대별로 인원 분포를 선택하세요
          </p>
          <div className="pt-2">
            <AgeDistributionChips
              distribution={ageDistribution}
              onChange={handleAgeChange}
            />
          </div>
          {errors.ageDistribution && (
            <p className="text-xs text-destructive">{errors.ageDistribution}</p>
          )}
        </section>

        <Separator className="my-6" />

        <section data-section="skillCounts" className="space-y-2">
          <h3 className="text-lg font-semibold">급수별 인원</h3>
          <p className="text-sm text-muted-foreground">
            각 급수별 대략적인 인원을 입력하세요
          </p>
          <div className="pt-2">
            <SkillCountInput
              counts={skillCounts}
              onChange={handleSkillChange}
            />
          </div>
          {errors.skillCounts && (
            <p className="text-xs text-destructive">{errors.skillCounts}</p>
          )}
        </section>
      </div>

      <div className="sticky bottom-0 border-t bg-background px-6 py-4">
        <Button
          onClick={handleSubmit}
          className="w-full py-6 text-base font-semibold"
          size="lg"
        >
          입력 완료
        </Button>
      </div>

      <HostCompletePopup open={showComplete} onConfirm={handleComplete} />
    </div>
  );
}
