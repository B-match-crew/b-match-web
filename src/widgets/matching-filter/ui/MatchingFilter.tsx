"use client";

import { Badge } from "@/src/shared/ui/badge";
import { Button } from "@/src/shared/ui/button";
import { useFilterStore } from "@/src/features/matching/filter";
import { GENDER_FILTER_OPTIONS, SKILL_FILTER_OPTIONS } from "@/src/shared/config/constants";
import { cn } from "@/src/shared/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";

function generateDates(): { label: string; value: string }[] {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const weekday = weekdays[d.getDay()];
    dates.push({
      label: i === 0 ? "오늘" : `${month}/${day}(${weekday})`,
      value: d.toISOString().split("T")[0],
    });
  }
  return dates;
}

export function MatchingFilter() {
  const { date, gender, skillLevel, setDate, setGender, setSkillLevel, resetFilters } =
    useFilterStore();

  const dates = generateDates();
  const hasActiveFilter = date || gender !== "남녀모두" || skillLevel;

  return (
    <div className="space-y-3 border-b border-border bg-background px-4 pb-3 pt-3">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {dates.map((d) => (
          <button
            key={d.value}
            onClick={() => setDate(date === d.value ? null : d.value)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              date === d.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/50"
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 rounded-full text-xs"
        >
          <SlidersHorizontal className="h-3 w-3" />
          지역
        </Button>

        {GENDER_FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setGender(option)}
            className={cn(
              "h-8 rounded-full border px-3 text-xs font-medium transition-colors",
              gender === option
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground"
            )}
          >
            {option}
          </button>
        ))}

        {SKILL_FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() =>
              setSkillLevel(skillLevel === option ? null : option)
            }
            className={cn(
              "hidden h-8 shrink-0 rounded-full border px-3 text-xs font-medium transition-colors sm:block",
              skillLevel === option
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground"
            )}
          >
            {option}
          </button>
        ))}

        {hasActiveFilter && (
          <button
            onClick={resetFilters}
            className="flex h-8 items-center gap-1 rounded-full border border-border px-2 text-xs text-muted-foreground hover:bg-muted"
          >
            <X className="h-3 w-3" />
            초기화
          </button>
        )}
      </div>
    </div>
  );
}
