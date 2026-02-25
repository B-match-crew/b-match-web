"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/src/widgets/app-bar";
import { Button } from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import { ROUTES } from "@/src/shared/config/routes";
import {
  DateTimePicker,
  LocationSearch,
  MemberCountStepper,
  QualificationSettings,
  FeeSettings,
  FacilityFeeSettings,
} from "@/src/features/matching/create";
import type {
  FeeSettings as FeeSettingsType,
  FacilityFeeSettings as FacilityFeeSettingsType,
} from "@/src/features/matching/create/model/matching-create.types";
import type {
  GenderFilter,
  SkillCutoff,
} from "@/src/shared/config/constants";
import { toast } from "sonner";

const TOTAL_STEPS = 7;

const STEP_TITLES = [
  "일시 및 시간을 선택해주세요",
  "장소를 설정해주세요",
  "모집 인원을 설정해주세요",
  "참가 자격을 설정해주세요",
  "게스트비를 설정해주세요",
  "모임 참가비를 설정해주세요",
  "시설 이용료를 설정해주세요",
];

const STEP_DESCRIPTIONS = [
  "매칭 날짜와 시작/종료 시간을 선택하세요",
  "매칭이 진행될 장소를 검색하세요",
  "참가할 수 있는 최대 인원을 설정하세요",
  "성별, 나이, 급수 등 참가 조건을 설정하세요",
  "게스트가 지불할 비용을 설정하세요",
  "모임 참가 시 필요한 비용을 설정하세요",
  "체육관 등 시설 이용료를 설정하세요",
];

const defaultKokSettings = {
  maleCount: 0,
  femaleCount: 0,
  sameGender: true,
  allowSinglePurchase: false,
  pricePerKok: 0,
};

export function MatchingCreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // POST-01: 일시 및 시간
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // POST-02: 장소
  const [location, setLocation] = useState("");

  // POST-03: 모집 인원
  const [maxMembers, setMaxMembers] = useState(10);
  const [isMembersUndecided, setIsMembersUndecided] = useState(false);

  // POST-04: 참가 자격
  const [gender, setGender] = useState<GenderFilter>("남녀모두");
  const [ageStart, setAgeStart] = useState(1990);
  const [ageEnd, setAgeEnd] = useState(2005);
  const [skillCutoff, setSkillCutoff] = useState<SkillCutoff>("제한 없음");
  const [maleSkillCutoff, setMaleSkillCutoff] = useState<SkillCutoff>("제한 없음");
  const [femaleSkillCutoff, setFemaleSkillCutoff] = useState<SkillCutoff>("제한 없음");
  const [isBeginnerWelcome, setIsBeginnerWelcome] = useState(false);

  // POST-05: 게스트비
  const [guestFee, setGuestFee] = useState<FeeSettingsType>({
    types: [],
    cashAmount: 0,
    kokSettings: { ...defaultKokSettings },
  });

  // POST-06: 모임 참가비
  const [participationFee, setParticipationFee] = useState<FeeSettingsType>({
    types: [],
    cashAmount: 0,
    kokSettings: { ...defaultKokSettings },
  });

  // POST-07: 시설 이용료
  const [facilityFee, setFacilityFee] = useState<FacilityFeeSettingsType>({
    hasfee: "없음",
    paymentMethod: null,
    amount: 0,
  });

  const isStepValid = () => {
    switch (step) {
      case 1:
        return date !== "" && startTime !== "" && endTime !== "";
      case 2:
        return location.length > 0;
      case 3:
        return isMembersUndecided || maxMembers > 0;
      case 4:
        return true;
      case 5:
        return guestFee.types.length > 0;
      case 6:
        return participationFee.types.length > 0;
      case 7:
        return (
          facilityFee.hasfee === "없음" ||
          (facilityFee.paymentMethod !== null && facilityFee.amount > 0)
        );
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
    // TODO: [POST] 매칭 등록 API 호출
    // - 모든 폼 데이터를 서버에 전송
    // - 성공 시 매칭 상세 페이지로 이동

    toast.success("매칭이 등록되었습니다");
    router.replace(ROUTES.HOME);
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <AppBar title="매칭 등록" showBack />
      <div className="px-6 pt-4">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {step} / {TOTAL_STEPS}
          </span>
        </div>
        <Progress value={(step / TOTAL_STEPS) * 100} className="h-1.5" />
      </div>

      <div className="flex-1 px-6 py-6">
        <h2 className="text-xl font-bold">{STEP_TITLES[step - 1]}</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          {STEP_DESCRIPTIONS[step - 1]}
        </p>

        {step === 1 && (
          <DateTimePicker
            date={date}
            startTime={startTime}
            endTime={endTime}
            onDateChange={setDate}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />
        )}

        {step === 2 && (
          <LocationSearch
            location={location}
            onLocationChange={setLocation}
          />
        )}

        {step === 3 && (
          <MemberCountStepper
            count={maxMembers}
            isUndecided={isMembersUndecided}
            onCountChange={setMaxMembers}
            onUndecidedChange={setIsMembersUndecided}
          />
        )}

        {step === 4 && (
          <QualificationSettings
            gender={gender}
            ageStart={ageStart}
            ageEnd={ageEnd}
            skillCutoff={skillCutoff}
            maleSkillCutoff={maleSkillCutoff}
            femaleSkillCutoff={femaleSkillCutoff}
            isBeginnerWelcome={isBeginnerWelcome}
            onGenderChange={setGender}
            onAgeStartChange={setAgeStart}
            onAgeEndChange={setAgeEnd}
            onSkillCutoffChange={setSkillCutoff}
            onMaleSkillCutoffChange={setMaleSkillCutoff}
            onFemaleSkillCutoffChange={setFemaleSkillCutoff}
            onBeginnerWelcomeChange={setIsBeginnerWelcome}
          />
        )}

        {step === 5 && (
          <FeeSettings
            title="게스트비"
            settings={guestFee}
            onChange={setGuestFee}
          />
        )}

        {step === 6 && (
          <FeeSettings
            title="모임 참가비"
            settings={participationFee}
            onChange={setParticipationFee}
          />
        )}

        {step === 7 && (
          <FacilityFeeSettings
            settings={facilityFee}
            onChange={setFacilityFee}
          />
        )}
      </div>

      <div className="px-6 pb-8">
        <Button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="w-full py-6 text-base font-semibold"
          size="lg"
        >
          {step < TOTAL_STEPS ? "다음" : "등록하기"}
        </Button>
      </div>
    </div>
  );
}
