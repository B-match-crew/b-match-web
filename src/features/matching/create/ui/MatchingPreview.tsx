"use client";

import { Badge } from "@/src/shared/ui/badge";
import { Separator } from "@/src/shared/ui/separator";
import { MapPin, Clock, Users, Wallet, Pencil, Feather, Timer } from "lucide-react";
import type {
  FeeSettings,
  FacilityFeeSettings,
  ShuttlecockSettings,
} from "../model/matching-create.types";
import type { GenderFilter, SkillCutoff } from "@/src/shared/config/constants";

interface MatchingPreviewProps {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxMembers: number;
  isMembersUndecided: boolean;
  gender: GenderFilter;
  ageStart: number;
  ageEnd: number;
  skillCutoff: SkillCutoff;
  maleSkillCutoff: SkillCutoff;
  femaleSkillCutoff: SkillCutoff;
  isBeginnerWelcome: boolean;
  guestFee: FeeSettings;
  participationFee: FeeSettings;
  facilityFee: FacilityFeeSettings;
  shuttlecock: ShuttlecockSettings;
  description: string;
  refundDeadlineDate: string;
  refundDeadlineTime: string;
  onEditStep?: (step: number) => void;
}

function SectionHeader({
  title,
  step,
  onEdit,
}: {
  title: string;
  step: number;
  onEdit?: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">{title}</h3>
      {onEdit && (
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <Pencil className="h-3 w-3" />
          수정
        </button>
      )}
    </div>
  );
}

function formatFee(fee: FeeSettings): string {
  if (fee.types.includes("없음")) return "없음";
  const parts: string[] = [];
  if (fee.types.includes("콕 제출")) {
    const kokParts = [];
    if (fee.kokSettings.sameGender) {
      kokParts.push(`콕 ${fee.kokSettings.maleCount}개`);
    } else {
      kokParts.push(
        `남 ${fee.kokSettings.maleCount}개 / 여 ${fee.kokSettings.femaleCount}개`
      );
    }
    if (fee.kokSettings.allowSinglePurchase && fee.kokSettings.pricePerKok > 0) {
      kokParts.push(`(낱개 ${fee.kokSettings.pricePerKok.toLocaleString()}원)`);
    }
    parts.push(`콕 제출: ${kokParts.join(" ")}`);
  }
  if (fee.types.includes("현금") && fee.cashAmount > 0) {
    parts.push(`현금: ${fee.cashAmount.toLocaleString()}원`);
  }
  return parts.join(" + ") || "미설정";
}

export function MatchingPreview({
  date,
  startTime,
  endTime,
  location,
  maxMembers,
  isMembersUndecided,
  gender,
  ageStart,
  ageEnd,
  skillCutoff,
  maleSkillCutoff,
  femaleSkillCutoff,
  isBeginnerWelcome,
  guestFee,
  participationFee,
  facilityFee,
  shuttlecock,
  description,
  refundDeadlineDate,
  refundDeadlineTime,
  onEditStep,
}: MatchingPreviewProps) {
  return (
    <div className="space-y-5">
      {/* POST-01: 일시 */}
      <div className="space-y-2">
        <SectionHeader title="일시 및 시간" step={1} onEdit={onEditStep} />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            {date} {startTime} ~ {endTime}
          </span>
        </div>
      </div>

      <Separator />

      {/* POST-02: 장소 */}
      <div className="space-y-2">
        <SectionHeader title="장소" step={2} onEdit={onEditStep} />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location || "미설정"}</span>
        </div>
      </div>

      <Separator />

      {/* POST-03: 모집 인원 */}
      <div className="space-y-2">
        <SectionHeader title="모집 인원" step={3} onEdit={onEditStep} />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{isMembersUndecided ? "인원 미정" : `${maxMembers}명`}</span>
        </div>
      </div>

      <Separator />

      {/* POST-04: 참가 자격 */}
      <div className="space-y-2">
        <SectionHeader title="참가 자격" step={4} onEdit={onEditStep} />
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{gender}</Badge>
          <Badge variant="outline">
            {ageStart}년생 ~ {ageEnd}년생
          </Badge>
          {gender === "남녀모두" ? (
            <>
              <Badge variant="outline">남 {maleSkillCutoff}</Badge>
              <Badge variant="outline">여 {femaleSkillCutoff}</Badge>
            </>
          ) : (
            <Badge variant="outline">{skillCutoff}</Badge>
          )}
          {isBeginnerWelcome && <Badge variant="secondary">초보환영</Badge>}
        </div>
      </div>

      <Separator />

      {/* POST-05: 게스트비 */}
      <div className="space-y-2">
        <SectionHeader title="게스트비" step={5} onEdit={onEditStep} />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wallet className="h-4 w-4" />
          <span>{formatFee(guestFee)}</span>
        </div>
      </div>

      <Separator />

      {/* POST-06: 모임 참가비 */}
      <div className="space-y-2">
        <SectionHeader title="모임 참가비" step={6} onEdit={onEditStep} />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wallet className="h-4 w-4" />
          <span>{formatFee(participationFee)}</span>
        </div>
      </div>

      <Separator />

      {/* POST-07: 시설 이용료 */}
      <div className="space-y-2">
        <SectionHeader title="시설 이용료" step={7} onEdit={onEditStep} />
        <p className="text-sm text-muted-foreground">
          {facilityFee.hasfee === "없음"
            ? "없음"
            : `${facilityFee.paymentMethod} - ${facilityFee.amount.toLocaleString()}원`}
        </p>
      </div>

      <Separator />

      {/* POST-08: 지정콕 */}
      <div className="space-y-2">
        <SectionHeader title="지정콕" step={8} onEdit={onEditStep} />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Feather className="h-4 w-4" />
          <span>{shuttlecock.brand || "미설정"}</span>
        </div>
        {shuttlecock.allowSinglePurchase && shuttlecock.pricePerKok > 0 && (
          <p className="pl-6 text-xs text-muted-foreground">
            낱개 구매 가능 (개당 {shuttlecock.pricePerKok.toLocaleString()}원)
          </p>
        )}
      </div>

      <Separator />

      {/* POST-09: 소개글 */}
      <div className="space-y-2">
        <SectionHeader title="모임 소개글" step={9} onEdit={onEditStep} />
        <p className="whitespace-pre-wrap text-sm text-muted-foreground">
          {description || "없음"}
        </p>
      </div>

      <Separator />

      {/* POST-10: 환불 마감 */}
      <div className="space-y-2">
        <SectionHeader title="환불 마감 시간" step={10} onEdit={onEditStep} />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Timer className="h-4 w-4" />
          <span>
            {refundDeadlineDate && refundDeadlineTime
              ? `${refundDeadlineDate} ${refundDeadlineTime}`
              : "미설정"}
          </span>
        </div>
      </div>
    </div>
  );
}
