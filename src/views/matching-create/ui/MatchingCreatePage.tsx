"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/src/widgets/app-bar";
import { Button } from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import { ROUTES } from "@/src/shared/config/routes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/shared/ui/dialog";
import {
  DateTimePicker,
  LocationSearch,
  MemberCountStepper,
  QualificationSettings,
  FeeSettings,
  FacilityFeeSettings,
  ShuttlecockSettings,
  DescriptionInput,
  RefundDeadlineSettings,
  MatchingPreview,
} from "@/src/features/matching/create";
import type {
  FeeSettings as FeeSettingsType,
  FacilityFeeSettings as FacilityFeeSettingsType,
  ShuttlecockSettings as ShuttlecockSettingsType,
} from "@/src/features/matching/create/model/matching-create.types";
import type {
  GenderFilter,
  SkillCutoff,
} from "@/src/shared/config/constants";
import { MatchingCreateCompletePopup } from "@/src/widgets/matching-create-complete-popup";
import { toast } from "sonner";

const TOTAL_STEPS = 11;

const STEP_TITLES = [
  "일시 및 시간을 선택해주세요",
  "장소를 설정해주세요",
  "모집 인원을 설정해주세요",
  "참가 자격을 설정해주세요",
  "게스트비를 설정해주세요",
  "모임 참가비를 설정해주세요",
  "시설 이용료를 설정해주세요",
  "지정콕을 설정해주세요",
  "모임 소개글을 작성해주세요",
  "환불 마감 시간을 설정해주세요",
  "등록 내용을 확인해주세요",
];

const STEP_DESCRIPTIONS = [
  "매칭 날짜와 시작/종료 시간을 선택하세요",
  "매칭이 진행될 장소를 검색하세요",
  "참가할 수 있는 최대 인원을 설정하세요",
  "성별, 나이, 급수 등 참가 조건을 설정하세요",
  "게스트가 지불할 비용을 설정하세요",
  "모임 참가 시 필요한 비용을 설정하세요",
  "체육관 등 시설 이용료를 설정하세요",
  "모임에서 사용할 셔틀콕 정보를 입력하세요",
  "모임 분위기와 유의사항을 알려주세요",
  "환불이 불가능한 마감 시간을 설정하세요",
  "입력한 내용을 확인하고 등록하세요",
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

  // POST-08: 지정콕
  const [shuttlecock, setShuttlecock] = useState<ShuttlecockSettingsType>({
    brand: "",
    allowSinglePurchase: false,
    pricePerKok: 0,
  });

  // POST-09: 모임 소개글
  const [description, setDescription] = useState("");

  // POST-10: 환불 마감 시간
  const [refundDeadlineDate, setRefundDeadlineDate] = useState("");
  const [refundDeadlineTime, setRefundDeadlineTime] = useState("");

  // POST-11: 등록 관련 다이얼로그
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);

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
      case 8:
        return shuttlecock.brand.length > 0;
      case 9:
        return true; // 소개글은 선택사항
      case 10:
        return refundDeadlineDate !== "" && refundDeadlineTime !== "";
      case 11:
        return true; // 미리보기는 항상 유효
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      // POST-11-3: 운영 정책 동의 다이얼로그
      setShowPolicyDialog(true);
    }
  };

  const handlePolicyAgree = () => {
    setShowPolicyDialog(false);
    // POST-11-4: 정보 저장 여부 확인
    setShowSaveDialog(true);
  };

  const handleSaveAndSubmit = (saveAsTemplate: boolean) => {
    setShowSaveDialog(false);

    if (saveAsTemplate) {
      // TODO: [POST-11-5] 템플릿으로 저장 API 호출
    }

    // TODO: [POST] 매칭 등록 API 호출
    // - 모든 폼 데이터를 서버에 전송

    // POST-11-6: 등록 완료 팝업
    setShowCompletePopup(true);
  };

  const handleEditStep = (targetStep: number) => {
    setStep(targetStep);
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

        {step === 8 && (
          <ShuttlecockSettings
            settings={shuttlecock}
            onChange={setShuttlecock}
          />
        )}

        {step === 9 && (
          <DescriptionInput value={description} onChange={setDescription} />
        )}

        {step === 10 && (
          <RefundDeadlineSettings
            date={refundDeadlineDate}
            time={refundDeadlineTime}
            matchDate={date}
            matchStartTime={startTime}
            onDateChange={setRefundDeadlineDate}
            onTimeChange={setRefundDeadlineTime}
          />
        )}

        {step === 11 && (
          <MatchingPreview
            date={date}
            startTime={startTime}
            endTime={endTime}
            location={location}
            maxMembers={maxMembers}
            isMembersUndecided={isMembersUndecided}
            gender={gender}
            ageStart={ageStart}
            ageEnd={ageEnd}
            skillCutoff={skillCutoff}
            maleSkillCutoff={maleSkillCutoff}
            femaleSkillCutoff={femaleSkillCutoff}
            isBeginnerWelcome={isBeginnerWelcome}
            guestFee={guestFee}
            participationFee={participationFee}
            facilityFee={facilityFee}
            shuttlecock={shuttlecock}
            description={description}
            refundDeadlineDate={refundDeadlineDate}
            refundDeadlineTime={refundDeadlineTime}
            onEditStep={handleEditStep}
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

      {/* POST-11-3: 운영 정책 동의 다이얼로그 */}
      <Dialog open={showPolicyDialog} onOpenChange={setShowPolicyDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>매칭 운영 정책 동의</DialogTitle>
            <DialogDescription>
              아래 정책을 확인하고 동의해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 rounded-lg border bg-muted/50 p-4 text-sm">
            <p>
              - 설정한 마감 시간 이후에는 <strong>환불이 불가</strong>합니다.
            </p>
            <p>
              - 참가 승인 후 <strong>3시간 유예 정책</strong>이 적용됩니다.
            </p>
            <p>
              - 노쇼 발생 시 해당 게스트에게 패널티가 부여될 수 있습니다.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPolicyDialog(false)}
              className="flex-1"
            >
              취소
            </Button>
            <Button onClick={handlePolicyAgree} className="flex-1">
              동의하고 등록
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* POST-11-4: 모집글 정보 저장 팝업 */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>모집글 정보 저장</DialogTitle>
            <DialogDescription>
              이번에 작성한 모집글의 정보를 기본 정보로 저장할까요?
              <br />
              다음 모집글 작성 시 날짜와 시간만 수정해서 올릴 수 있어요.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => handleSaveAndSubmit(false)}
              className="flex-1"
            >
              저장 안함
            </Button>
            <Button
              onClick={() => handleSaveAndSubmit(true)}
              className="flex-1"
            >
              저장하고 등록
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* POST-11-6, 11-7: 등록 완료 팝업 */}
      <MatchingCreateCompletePopup
        open={showCompletePopup}
        onClose={() => {}}
        onGoHome={() => {
          setShowCompletePopup(false);
          router.replace(ROUTES.HOME);
        }}
        onGoManage={() => {
          // TODO: [POST-11-7] 매칭 관리 페이지로 이동
          setShowCompletePopup(false);
          toast.info("매칭 관리 페이지는 준비 중입니다");
          router.replace(ROUTES.HOME);
        }}
      />
    </div>
  );
}
