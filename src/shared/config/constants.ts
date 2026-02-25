export const SKILL_LEVELS = ["S", "A", "B", "C", "D", "초심", "입문"] as const;
export type SkillLevel = (typeof SKILL_LEVELS)[number];

export const AGE_GROUPS = ["20대", "30대", "40대", "50대", "60대", "기타"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export const AGE_DISTRIBUTION_LEVELS = ["많음", "보통", "적음", "없음"] as const;
export type AgeDistributionLevel = (typeof AGE_DISTRIBUTION_LEVELS)[number];

export const AGE_DISTRIBUTION_WEIGHTS: Record<AgeDistributionLevel, number> = {
  "많음": 3,
  "보통": 2,
  "적음": 1,
  "없음": 0,
};

export const GENDERS = ["남성", "여성"] as const;
export type Gender = (typeof GENDERS)[number];

export const GENDER_FILTER_OPTIONS = ["남자만", "여자만", "남녀모두"] as const;
export type GenderFilter = (typeof GENDER_FILTER_OPTIONS)[number];

export const SKILL_FILTER_OPTIONS = ["D조 이상", "C조 이상", "B조 이상", "A조 이상"] as const;
export type SkillFilter = (typeof SKILL_FILTER_OPTIONS)[number];

export const CLUB_NAME_MAX_LENGTH = 20;
export const CLUB_NAME_PATTERN = /^[가-힣a-zA-Z0-9\s]+$/;

// 매칭 등록 관련
export const FEE_TYPES = ["콕 제출", "현금", "없음"] as const;
export type FeeType = (typeof FEE_TYPES)[number];

export const FACILITY_FEE_OPTIONS = ["있음", "없음"] as const;
export type FacilityFeeOption = (typeof FACILITY_FEE_OPTIONS)[number];

export const FACILITY_PAYMENT_METHODS = ["구장 별도 결제", "모임에 입금"] as const;
export type FacilityPaymentMethod = (typeof FACILITY_PAYMENT_METHODS)[number];

export const SKILL_CUTOFF_OPTIONS = ["S조 이상", "A조 이상", "B조 이상", "C조 이상", "D조 이상", "제한 없음"] as const;
export type SkillCutoff = (typeof SKILL_CUTOFF_OPTIONS)[number];
