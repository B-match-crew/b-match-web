import type { AgeGroup, AgeDistributionLevel, SkillLevel } from "@/src/shared/config/constants";

export interface HostInfo {
  clubName: string;
  maleRatio: number;
  femaleRatio: number;
  ageDistribution: Record<AgeGroup, AgeDistributionLevel>;
  skillCounts: Record<SkillLevel, number>;
}
