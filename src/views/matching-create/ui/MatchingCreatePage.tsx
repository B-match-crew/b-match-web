"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/src/widgets/app-bar";
import { Button } from "@/src/shared/ui/button";
import { Separator } from "@/src/shared/ui/separator";
import { ROUTES } from "@/src/shared/config/routes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/shared/ui/dialog";
import { ScrollArea } from "@/src/shared/ui/scroll-area";
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

const defaultKokSettings = {
  maleCount: 0,
  femaleCount: 0,
  sameGender: true,
  allowSinglePurchase: false,
  pricePerKok: 0,
};

interface FormErrors {
  datetime?: string;
  location?: string;
  members?: string;
  guestFee?: string;
  participationFee?: string;
  facilityFee?: string;
  shuttlecock?: string;
  refundDeadline?: string;
}

export function MatchingCreatePage() {
  const router = useRouter();

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

  // 다이얼로그 상태
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);

  // 에러 상태
  const [errors, setErrors] = useState<FormErrors>({});

  const scrollToSection = (name: string) => {
    document
      .querySelector(`[data-section="${name}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!date || !startTime || !endTime) {
      newErrors.datetime = "날짜와 시작/종료 시간을 모두 선택해주세요";
    }

    if (location.length === 0) {
      newErrors.location = "장소를 입력해주세요";
    }

    if (!isMembersUndecided && maxMembers <= 0) {
      newErrors.members = "모집 인원을 설정해주세요";
    }

    if (guestFee.types.length === 0) {
      newErrors.guestFee = "게스트비 유형을 선택해주세요";
    }

    if (participationFee.types.length === 0) {
      newErrors.participationFee = "모임 참가비 유형을 선택해주세요";
    }

    if (
      facilityFee.hasfee !== "없음" &&
      (facilityFee.paymentMethod === null || facilityFee.amount <= 0)
    ) {
      newErrors.facilityFee = "시설 이용료 정보를 모두 입력해주세요";
    }

    if (shuttlecock.brand.length === 0) {
      newErrors.shuttlecock = "지정콕 브랜드/모델명을 입력해주세요";
    }

    if (!refundDeadlineDate || !refundDeadlineTime) {
      newErrors.refundDeadline = "환불 마감 날짜와 시간을 모두 선택해주세요";
    }

    setErrors(newErrors);

    const firstError = Object.keys(newErrors)[0];
    if (firstError) {
      scrollToSection(firstError);
      return false;
    }

    return true;
  };

  const clearError = (key: keyof FormErrors) => {
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowPreviewDialog(true);
  };

  const handlePreviewConfirm = () => {
    setShowPreviewDialog(false);
    setShowPolicyDialog(true);
  };

  const handlePolicyAgree = () => {
    setShowPolicyDialog(false);
    setShowSaveDialog(true);
  };

  const handleSaveAndSubmit = (saveAsTemplate: boolean) => {
    setShowSaveDialog(false);

    if (saveAsTemplate) {
      // TODO: [POST-11-5] 템플릿으로 저장 API 호출
    }

    // TODO: [POST] 매칭 등록 API 호출
    // - 모든 폼 데이터를 서버에 전송

    setShowCompletePopup(true);
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <AppBar title="매칭 등록" showBack />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* 일시 및 시간 */}
        <section data-section="datetime" className="space-y-2">
          <h3 className="text-lg font-semibold">일시 및 시간</h3>
          <p className="text-sm text-muted-foreground">
            매칭 날짜와 시작/종료 시간을 선택하세요
          </p>
          <div className="pt-2">
            <DateTimePicker
              date={date}
              startTime={startTime}
              endTime={endTime}
              onDateChange={(v) => { setDate(v); clearError("datetime"); }}
              onStartTimeChange={(v) => { setStartTime(v); clearError("datetime"); }}
              onEndTimeChange={(v) => { setEndTime(v); clearError("datetime"); }}
            />
          </div>
          {errors.datetime && (
            <p className="text-xs text-destructive">{errors.datetime}</p>
          )}
        </section>

        <Separator className="my-6" />

        {/* 장소 */}
        <section data-section="location" className="space-y-2">
          <h3 className="text-lg font-semibold">장소</h3>
          <p className="text-sm text-muted-foreground">
            매칭이 진행될 장소를 검색하세요
          </p>
          <div className="pt-2">
            <LocationSearch
              location={location}
              onLocationChange={(v) => { setLocation(v); clearError("location"); }}
            />
          </div>
          {errors.location && (
            <p className="text-xs text-destructive">{errors.location}</p>
          )}
        </section>

        <Separator className="my-6" />

        {/* 모집 인원 */}
        <section data-section="members" className="space-y-2">
          <h3 className="text-lg font-semibold">모집 인원</h3>
          <p className="text-sm text-muted-foreground">
            참가할 수 있는 최대 인원을 설정하세요
          </p>
          <div className="pt-2">
            <MemberCountStepper
              count={maxMembers}
              isUndecided={isMembersUndecided}
              onCountChange={(v) => { setMaxMembers(v); clearError("members"); }}
              onUndecidedChange={(v) => { setIsMembersUndecided(v); clearError("members"); }}
            />
          </div>
          {errors.members && (
            <p className="text-xs text-destructive">{errors.members}</p>
          )}
        </section>

        <Separator className="my-6" />

        {/* 참가 자격 */}
        <section data-section="qualification" className="space-y-2">
          <h3 className="text-lg font-semibold">참가 자격</h3>
          <p className="text-sm text-muted-foreground">
            성별, 나이, 급수 등 참가 조건을 설정하세요
          </p>
          <div className="pt-2">
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
          </div>
        </section>

        <Separator className="my-6" />

        {/* 게스트비 */}
        <section data-section="guestFee" className="space-y-2">
          <h3 className="text-lg font-semibold">게스트비</h3>
          <p className="text-sm text-muted-foreground">
            게스트가 지불할 비용을 설정하세요
          </p>
          <div className="pt-2">
            <FeeSettings
              title="게스트비"
              settings={guestFee}
              onChange={(v) => { setGuestFee(v); clearError("guestFee"); }}
            />
          </div>
          {errors.guestFee && (
            <p className="text-xs text-destructive">{errors.guestFee}</p>
          )}
        </section>

        <Separator className="my-6" />

        {/* 모임 참가비 */}
        <section data-section="participationFee" className="space-y-2">
          <h3 className="text-lg font-semibold">모임 참가비</h3>
          <p className="text-sm text-muted-foreground">
            모임 참가 시 필요한 비용을 설정하세요
          </p>
          <div className="pt-2">
            <FeeSettings
              title="모임 참가비"
              settings={participationFee}
              onChange={(v) => { setParticipationFee(v); clearError("participationFee"); }}
            />
          </div>
          {errors.participationFee && (
            <p className="text-xs text-destructive">{errors.participationFee}</p>
          )}
        </section>

        <Separator className="my-6" />

        {/* 시설 이용료 */}
        <section data-section="facilityFee" className="space-y-2">
          <h3 className="text-lg font-semibold">시설 이용료</h3>
          <p className="text-sm text-muted-foreground">
            체육관 등 시설 이용료를 설정하세요
          </p>
          <div className="pt-2">
            <FacilityFeeSettings
              settings={facilityFee}
              onChange={(v) => { setFacilityFee(v); clearError("facilityFee"); }}
            />
          </div>
          {errors.facilityFee && (
            <p className="text-xs text-destructive">{errors.facilityFee}</p>
          )}
        </section>

        <Separator className="my-6" />

        {/* 지정콕 */}
        <section data-section="shuttlecock" className="space-y-2">
          <h3 className="text-lg font-semibold">지정콕</h3>
          <p className="text-sm text-muted-foreground">
            모임에서 사용할 셔틀콕 정보를 입력하세요
          </p>
          <div className="pt-2">
            <ShuttlecockSettings
              settings={shuttlecock}
              onChange={(v) => { setShuttlecock(v); clearError("shuttlecock"); }}
            />
          </div>
          {errors.shuttlecock && (
            <p className="text-xs text-destructive">{errors.shuttlecock}</p>
          )}
        </section>

        <Separator className="my-6" />

        {/* 모임 소개글 */}
        <section data-section="description" className="space-y-2">
          <h3 className="text-lg font-semibold">모임 소개글</h3>
          <p className="text-sm text-muted-foreground">
            모임 분위기와 유의사항을 알려주세요 (선택)
          </p>
          <div className="pt-2">
            <DescriptionInput value={description} onChange={setDescription} />
          </div>
        </section>

        <Separator className="my-6" />

        {/* 환불 마감 시간 */}
        <section data-section="refundDeadline" className="space-y-2">
          <h3 className="text-lg font-semibold">환불 마감 시간</h3>
          <p className="text-sm text-muted-foreground">
            환불이 불가능한 마감 시간을 설정하세요
          </p>
          <div className="pt-2">
            <RefundDeadlineSettings
              date={refundDeadlineDate}
              time={refundDeadlineTime}
              matchDate={date}
              matchStartTime={startTime}
              onDateChange={(v) => { setRefundDeadlineDate(v); clearError("refundDeadline"); }}
              onTimeChange={(v) => { setRefundDeadlineTime(v); clearError("refundDeadline"); }}
            />
          </div>
          {errors.refundDeadline && (
            <p className="text-xs text-destructive">{errors.refundDeadline}</p>
          )}
        </section>
      </div>

      {/* 하단 고정 등록 버튼 */}
      <div className="sticky bottom-0 border-t bg-background px-6 py-4">
        <Button
          onClick={handleSubmit}
          className="w-full py-6 text-base font-semibold"
          size="lg"
        >
          등록하기
        </Button>
      </div>

      {/* 프리뷰 모달 */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-h-[80dvh] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>등록 내용 확인</DialogTitle>
            <DialogDescription>
              입력한 내용을 확인하고 등록하세요
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[55dvh] pr-4">
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
            />
          </ScrollArea>
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setShowPreviewDialog(false)}
              className="flex-1"
            >
              수정하기
            </Button>
            <Button onClick={handlePreviewConfirm} className="flex-1">
              등록하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 운영 정책 동의 다이얼로그 */}
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

      {/* 모집글 정보 저장 팝업 */}
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

      {/* 등록 완료 팝업 */}
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
