"use client";

import { Button } from "@/src/shared/ui/button";
import { Minus, Plus } from "lucide-react";
import { SKILL_LEVELS, type SkillLevel } from "@/src/shared/config/constants";

interface SkillCountInputProps {
  counts: Record<SkillLevel, number>;
  onChange: (level: SkillLevel, count: number) => void;
}

export function SkillCountInput({ counts, onChange }: SkillCountInputProps) {
  const maxCount = Math.max(...Object.values(counts), 1);

  return (
    <div className="space-y-3">
      {SKILL_LEVELS.map((level) => (
        <div key={level} className="flex items-center gap-3">
          <span className="w-10 text-sm font-semibold">{level}</span>
          <div className="flex flex-1 items-center gap-2">
            <div
              className="h-6 rounded-full bg-primary/20 transition-all"
              style={{
                width: `${(counts[level] / maxCount) * 100}%`,
                minWidth: counts[level] > 0 ? "8px" : "0px",
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onChange(level, Math.max(0, counts[level] - 1))}
              disabled={counts[level] === 0}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {counts[level]}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onChange(level, counts[level] + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
