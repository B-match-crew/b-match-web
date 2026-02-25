"use client";

import { Label } from "@/src/shared/ui/label";
import { Checkbox } from "@/src/shared/ui/checkbox";
import { Input } from "@/src/shared/ui/input";
import {
  GENDER_FILTER_OPTIONS,
  SKILL_CUTOFF_OPTIONS,
  type GenderFilter,
  type SkillCutoff,
} from "@/src/shared/config/constants";

interface QualificationSettingsProps {
  gender: GenderFilter;
  ageStart: number;
  ageEnd: number;
  skillCutoff: SkillCutoff;
  maleSkillCutoff: SkillCutoff;
  femaleSkillCutoff: SkillCutoff;
  isBeginnerWelcome: boolean;
  onGenderChange: (gender: GenderFilter) => void;
  onAgeStartChange: (year: number) => void;
  onAgeEndChange: (year: number) => void;
  onSkillCutoffChange: (cutoff: SkillCutoff) => void;
  onMaleSkillCutoffChange: (cutoff: SkillCutoff) => void;
  onFemaleSkillCutoffChange: (cutoff: SkillCutoff) => void;
  onBeginnerWelcomeChange: (checked: boolean) => void;
}

export function QualificationSettings({
  gender,
  ageStart,
  ageEnd,
  skillCutoff,
  maleSkillCutoff,
  femaleSkillCutoff,
  isBeginnerWelcome,
  onGenderChange,
  onAgeStartChange,
  onAgeEndChange,
  onSkillCutoffChange,
  onMaleSkillCutoffChange,
  onFemaleSkillCutoffChange,
  onBeginnerWelcomeChange,
}: QualificationSettingsProps) {
  const currentYear = new Date().getFullYear();
  const isMixed = gender === "남녀모두";

  return (
    <div className="space-y-6">
      {/* 성별 */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">성별</Label>
        <div className="grid grid-cols-3 gap-2">
          {GENDER_FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onGenderChange(option)}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                gender === option
                  ? "border-primary bg-primary/10 font-semibold text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* 나이 */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">나이 (출생년도)</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">시작</span>
            <Input
              type="number"
              value={ageStart}
              onChange={(e) => onAgeStartChange(Number(e.target.value))}
              min={1950}
              max={currentYear}
              placeholder="1990"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">종료</span>
            <Input
              type="number"
              value={ageEnd}
              onChange={(e) => onAgeEndChange(Number(e.target.value))}
              min={1950}
              max={currentYear}
              placeholder="2005"
            />
          </div>
        </div>
      </div>

      {/* 급수 */}
      <div className="space-y-2">
        {isMixed ? (
          <>
            <Label className="text-sm font-semibold">급수 (남성)</Label>
            <div className="grid grid-cols-3 gap-2">
              {SKILL_CUTOFF_OPTIONS.map((option) => (
                <button
                  key={`male-${option}`}
                  type="button"
                  onClick={() => onMaleSkillCutoffChange(option)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    maleSkillCutoff === option
                      ? "border-primary bg-primary/10 font-semibold text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <Label className="mt-3 text-sm font-semibold">급수 (여성)</Label>
            <div className="grid grid-cols-3 gap-2">
              {SKILL_CUTOFF_OPTIONS.map((option) => (
                <button
                  key={`female-${option}`}
                  type="button"
                  onClick={() => onFemaleSkillCutoffChange(option)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    femaleSkillCutoff === option
                      ? "border-primary bg-primary/10 font-semibold text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <Label className="text-sm font-semibold">급수</Label>
            <div className="grid grid-cols-3 gap-2">
              {SKILL_CUTOFF_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSkillCutoffChange(option)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    skillCutoff === option
                      ? "border-primary bg-primary/10 font-semibold text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 초보환영 */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="beginnerWelcome"
          checked={isBeginnerWelcome}
          onCheckedChange={(checked) =>
            onBeginnerWelcomeChange(checked === true)
          }
        />
        <Label htmlFor="beginnerWelcome" className="text-sm">
          초보환영
        </Label>
      </div>
    </div>
  );
}
