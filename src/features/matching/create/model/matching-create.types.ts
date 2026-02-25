import type {
  FeeType,
  GenderFilter,
  SkillCutoff,
  FacilityFeeOption,
  FacilityPaymentMethod,
} from "@/src/shared/config/constants";

export interface KokFeeSettings {
  maleCount: number;
  femaleCount: number;
  sameGender: boolean;
  allowSinglePurchase: boolean;
  pricePerKok: number;
}

export interface FeeSettings {
  types: FeeType[];
  cashAmount: number;
  kokSettings: KokFeeSettings;
}

export interface FacilityFeeSettings {
  hasfee: FacilityFeeOption;
  paymentMethod: FacilityPaymentMethod | null;
  amount: number;
}

export interface ShuttlecockSettings {
  brand: string;
  allowSinglePurchase: boolean;
  pricePerKok: number;
}

export interface MatchingCreateForm {
  // POST-01: 일시 및 시간
  date: string;
  startTime: string;
  endTime: string;
  // POST-02: 장소
  location: string;
  latitude: number | null;
  longitude: number | null;
  // POST-03: 모집 인원
  maxMembers: number;
  isMembersUndecided: boolean;
  // POST-04: 참가 자격
  gender: GenderFilter;
  ageStart: number;
  ageEnd: number;
  skillCutoff: SkillCutoff;
  maleSkillCutoff: SkillCutoff;
  femaleSkillCutoff: SkillCutoff;
  isBeginnerWelcome: boolean;
  // POST-05: 게스트비
  guestFee: FeeSettings;
  // POST-06: 모임 참가비
  participationFee: FeeSettings;
  // POST-07: 시설 이용료
  facilityFee: FacilityFeeSettings;
  // POST-08: 지정콕
  shuttlecock: ShuttlecockSettings;
  // POST-09: 모임 소개글
  description: string;
  // POST-10: 환불 마감 시간
  refundDeadlineDate: string;
  refundDeadlineTime: string;
}
