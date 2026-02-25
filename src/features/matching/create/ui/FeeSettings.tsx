"use client";

import { Button } from "@/src/shared/ui/button";
import { Checkbox } from "@/src/shared/ui/checkbox";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { Minus, Plus } from "lucide-react";
import { FEE_TYPES, type FeeType } from "@/src/shared/config/constants";
import type { FeeSettings as FeeSettingsType } from "../model/matching-create.types";

interface FeeSettingsProps {
  title: string;
  settings: FeeSettingsType;
  onChange: (settings: FeeSettingsType) => void;
}

export function FeeSettings({ title, settings, onChange }: FeeSettingsProps) {
  const toggleType = (type: FeeType) => {
    const hasType = settings.types.includes(type);
    let newTypes: FeeType[];
    if (type === "없음") {
      newTypes = hasType ? [] : ["없음"];
    } else {
      newTypes = hasType
        ? settings.types.filter((t) => t !== type)
        : [...settings.types.filter((t) => t !== "없음"), type];
    }
    onChange({ ...settings, types: newTypes });
  };

  const showKok = settings.types.includes("콕 제출");
  const showCash = settings.types.includes("현금");
  const kok = settings.kokSettings;

  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold">{title}</Label>
      <div className="grid grid-cols-3 gap-2">
        {FEE_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => toggleType(type)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              settings.types.includes(type)
                ? "border-primary bg-primary/10 font-semibold text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {showKok && (
        <div className="space-y-4 rounded-lg border border-border p-4">
          <p className="text-sm font-medium">콕 제출 설정</p>

          {/* 남녀 동일 */}
          <div className="flex items-center gap-2">
            <Checkbox
              id={`${title}-sameGender`}
              checked={kok.sameGender}
              onCheckedChange={(checked) =>
                onChange({
                  ...settings,
                  kokSettings: {
                    ...kok,
                    sameGender: checked === true,
                    femaleCount: checked === true ? kok.maleCount : kok.femaleCount,
                  },
                })
              }
            />
            <Label htmlFor={`${title}-sameGender`} className="text-sm">
              남녀 동일
            </Label>
          </div>

          {/* 남성 콕 개수 */}
          <div className="flex items-center justify-between">
            <span className="text-sm">남성</span>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  onChange({
                    ...settings,
                    kokSettings: {
                      ...kok,
                      maleCount: Math.max(0, kok.maleCount - 1),
                      ...(kok.sameGender && {
                        femaleCount: Math.max(0, kok.maleCount - 1),
                      }),
                    },
                  })
                }
                disabled={kok.maleCount === 0}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">
                {kok.maleCount}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  onChange({
                    ...settings,
                    kokSettings: {
                      ...kok,
                      maleCount: kok.maleCount + 1,
                      ...(kok.sameGender && {
                        femaleCount: kok.maleCount + 1,
                      }),
                    },
                  })
                }
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* 여성 콕 개수 */}
          <div className="flex items-center justify-between">
            <span className="text-sm">여성</span>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  onChange({
                    ...settings,
                    kokSettings: {
                      ...kok,
                      femaleCount: Math.max(0, kok.femaleCount - 1),
                    },
                  })
                }
                disabled={kok.sameGender || kok.femaleCount === 0}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">
                {kok.femaleCount}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  onChange({
                    ...settings,
                    kokSettings: {
                      ...kok,
                      femaleCount: kok.femaleCount + 1,
                    },
                  })
                }
                disabled={kok.sameGender}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* 낱개 구매 */}
          <div className="flex items-center gap-2">
            <Checkbox
              id={`${title}-singlePurchase`}
              checked={kok.allowSinglePurchase}
              onCheckedChange={(checked) =>
                onChange({
                  ...settings,
                  kokSettings: {
                    ...kok,
                    allowSinglePurchase: checked === true,
                  },
                })
              }
            />
            <Label htmlFor={`${title}-singlePurchase`} className="text-sm">
              낱개 구매 가능
            </Label>
          </div>

          {kok.allowSinglePurchase && (
            <div className="space-y-2">
              <Label className="text-sm">콕 1개당 가격</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={kok.pricePerKok || ""}
                  onChange={(e) =>
                    onChange({
                      ...settings,
                      kokSettings: {
                        ...kok,
                        pricePerKok: Number(e.target.value),
                      },
                    })
                  }
                  placeholder="0"
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  원
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {showCash && (
        <div className="space-y-2">
          <Label className="text-sm">현금 금액</Label>
          <div className="relative">
            <Input
              type="number"
              value={settings.cashAmount || ""}
              onChange={(e) =>
                onChange({ ...settings, cashAmount: Number(e.target.value) })
              }
              placeholder="0"
              className="pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              원
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
