import { z } from "zod";
import { CLUB_NAME_MAX_LENGTH, CLUB_NAME_PATTERN } from "@/src/shared/config/constants";

export const hostFormSchema = z.object({
  clubName: z
    .string()
    .min(1, "클럽/모임명을 입력해주세요")
    .max(CLUB_NAME_MAX_LENGTH, `${CLUB_NAME_MAX_LENGTH}자 이내로 입력해주세요`)
    .regex(CLUB_NAME_PATTERN, "한글, 영문, 숫자만 입력 가능합니다"),
  maleRatio: z.number().min(0).max(100),
  femaleRatio: z.number().min(0).max(100),
  ageDistribution: z.record(z.string(), z.string()),
  skillCounts: z.record(z.string(), z.number()),
});

export type HostFormData = z.infer<typeof hostFormSchema>;
