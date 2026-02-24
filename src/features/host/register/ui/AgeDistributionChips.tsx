"use client";

import {
  AGE_GROUPS,
  AGE_DISTRIBUTION_LEVELS,
  AGE_DISTRIBUTION_WEIGHTS,
  type AgeGroup,
  type AgeDistributionLevel,
} from "@/src/shared/config/constants";
import { cn } from "@/src/shared/lib/utils";

interface AgeDistributionChipsProps {
  distribution: Record<AgeGroup, AgeDistributionLevel>;
  onChange: (ageGroup: AgeGroup, level: AgeDistributionLevel) => void;
}

export function AgeDistributionChips({
  distribution,
  onChange,
}: AgeDistributionChipsProps) {
  const totalWeight = AGE_GROUPS.reduce(
    (sum, group) => sum + AGE_DISTRIBUTION_WEIGHTS[distribution[group]],
    0
  );

  const getPercentage = (group: AgeGroup) => {
    if (totalWeight === 0) return 0;
    return Math.round(
      (AGE_DISTRIBUTION_WEIGHTS[distribution[group]] / totalWeight) * 100
    );
  };

  return (
    <div className="space-y-3">
      {AGE_GROUPS.map((group) => (
        <div key={group} className="flex items-center gap-3">
          <span className="w-12 text-sm font-medium">{group}</span>
          <div className="flex flex-1 gap-1.5">
            {AGE_DISTRIBUTION_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => onChange(group, level)}
                className={cn(
                  "flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                  distribution[group] === level
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50"
                )}
              >
                {level}
              </button>
            ))}
          </div>
          <span className="w-10 text-right text-xs text-muted-foreground">
            {getPercentage(group)}%
          </span>
        </div>
      ))}
    </div>
  );
}
