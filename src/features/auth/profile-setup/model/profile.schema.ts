import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요").max(20, "20자 이내로 입력해주세요"),
  gender: z.enum(["남성", "여성"], { message: "성별을 선택해주세요" }),
  age: z.string().min(1, "나이를 선택해주세요"),
  skillLevel: z.string().min(1, "급수를 선택해주세요"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
