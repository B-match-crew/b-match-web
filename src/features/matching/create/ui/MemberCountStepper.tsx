"use client";

import { Button } from "@/src/shared/ui/button";
import { Checkbox } from "@/src/shared/ui/checkbox";
import { Label } from "@/src/shared/ui/label";
import { Minus, Plus } from "lucide-react";

interface MemberCountStepperProps {
  count: number;
  isUndecided: boolean;
  onCountChange: (count: number) => void;
  onUndecidedChange: (checked: boolean) => void;
}

export function MemberCountStepper({
  count,
  isUndecided,
  onCountChange,
  onUndecidedChange,
}: MemberCountStepperProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-6">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => onCountChange(Math.max(1, count - 1))}
          disabled={isUndecided || count <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="min-w-[60px] text-center text-2xl font-bold">
          {isUndecided ? "미정" : `${count}명`}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => onCountChange(count + 1)}
          disabled={isUndecided}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Checkbox
          id="undecided"
          checked={isUndecided}
          onCheckedChange={(checked) => onUndecidedChange(checked === true)}
        />
        <Label htmlFor="undecided" className="text-sm text-muted-foreground">
          인원 미정
        </Label>
      </div>
    </div>
  );
}
