"use client";

import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { Checkbox } from "@/src/shared/ui/checkbox";
import type { ShuttlecockSettings as ShuttlecockSettingsType } from "../model/matching-create.types";

interface ShuttlecockSettingsProps {
  settings: ShuttlecockSettingsType;
  onChange: (settings: ShuttlecockSettingsType) => void;
}

export function ShuttlecockSettings({
  settings,
  onChange,
}: ShuttlecockSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="shuttlecock-brand">브랜드 / 모델명</Label>
        <Input
          id="shuttlecock-brand"
          placeholder="예) 삼화블랙, KBB 5000"
          value={settings.brand}
          onChange={(e) => onChange({ ...settings, brand: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          모임에서 사용하는 셔틀콕 명칭을 입력해주세요
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="shuttlecock-single"
            checked={settings.allowSinglePurchase}
            onCheckedChange={(checked) =>
              onChange({
                ...settings,
                allowSinglePurchase: checked === true,
                pricePerKok: checked === true ? settings.pricePerKok : 0,
              })
            }
          />
          <Label htmlFor="shuttlecock-single" className="cursor-pointer">
            낱개 구매 가능
          </Label>
        </div>

        {settings.allowSinglePurchase && (
          <div className="space-y-2 pl-6">
            <Label htmlFor="shuttlecock-price">개당 가격</Label>
            <div className="relative">
              <Input
                id="shuttlecock-price"
                type="number"
                inputMode="numeric"
                placeholder="0"
                value={settings.pricePerKok || ""}
                onChange={(e) =>
                  onChange({
                    ...settings,
                    pricePerKok: Number(e.target.value) || 0,
                  })
                }
                className="pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                원
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              콕 미소지 게스트를 위한 현장 판매가를 설정하세요
            </p>
          </div>
        )}

        {!settings.allowSinglePurchase && (
          <p className="pl-6 text-xs text-muted-foreground">
            지정 콕을 반드시 개별 준비해주세요!
          </p>
        )}
      </div>
    </div>
  );
}
