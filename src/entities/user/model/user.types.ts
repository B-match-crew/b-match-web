import type { SkillLevel, Gender } from "@/src/shared/config/constants";

export interface User {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  skillLevel: SkillLevel;
  isHost: boolean;
  profileImageUrl?: string;
}
