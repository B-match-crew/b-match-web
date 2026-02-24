"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { Button } from "@/src/shared/ui/button";
import { RadioGroup, RadioGroupItem } from "@/src/shared/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui/select";
import { profileSchema, type ProfileFormData } from "../model/profile.schema";
import { SKILL_LEVELS } from "@/src/shared/config/constants";
import { cn } from "@/src/shared/lib/utils";

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
}

const AGE_OPTIONS = [
  "10대", "20대 초반", "20대 후반", "30대 초반", "30대 후반",
  "40대", "50대", "60대 이상",
];

export function ProfileForm({ onSubmit }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const selectedGender = watch("gender");
  const selectedSkillLevel = watch("skillLevel");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          placeholder="이름을 입력해주세요"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>성별</Label>
        <RadioGroup
          value={selectedGender}
          onValueChange={(value) => setValue("gender", value as "남성" | "여성", { shouldValidate: true })}
          className="flex gap-4"
        >
          {(["남성", "여성"] as const).map((gender) => (
            <Label
              key={gender}
              className={cn(
                "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-3 transition-colors",
                selectedGender === gender
                  ? "border-primary bg-primary/5"
                  : "border-border"
              )}
            >
              <RadioGroupItem value={gender} className="sr-only" />
              <span className="text-sm font-medium">{gender}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>나이</Label>
        <Select onValueChange={(value) => setValue("age", value, { shouldValidate: true })}>
          <SelectTrigger>
            <SelectValue placeholder="나이대를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {AGE_OPTIONS.map((age) => (
              <SelectItem key={age} value={age}>
                {age}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>급수</Label>
        <div className="grid grid-cols-4 gap-2">
          {SKILL_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setValue("skillLevel", level, { shouldValidate: true })}
              className={cn(
                "rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors",
                selectedSkillLevel === level
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className="mt-4 w-full py-6 text-base font-semibold"
        size="lg"
      >
        입력 완료
      </Button>
    </form>
  );
}
