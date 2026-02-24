"use client";

import { Slider } from "@/src/shared/ui/slider";

interface GenderRatioSliderProps {
  maleRatio: number;
  onChange: (maleRatio: number) => void;
}

export function GenderRatioSlider({ maleRatio, onChange }: GenderRatioSliderProps) {
  const femaleRatio = 100 - maleRatio;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm">
            👨
          </div>
          <span className="text-sm font-medium">남성 {maleRatio}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">여성 {femaleRatio}%</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-sm">
            👩
          </div>
        </div>
      </div>

      <Slider
        value={[maleRatio]}
        onValueChange={([value]) => onChange(value)}
        max={100}
        min={0}
        step={5}
        className="w-full"
      />

      <div className="flex justify-between">
        <div
          className="h-2 rounded-l-full bg-blue-400 transition-all"
          style={{ width: `${maleRatio}%` }}
        />
        <div
          className="h-2 rounded-r-full bg-pink-400 transition-all"
          style={{ width: `${femaleRatio}%` }}
        />
      </div>
    </div>
  );
}
