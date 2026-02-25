"use client";

import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import {
  FACILITY_FEE_OPTIONS,
  FACILITY_PAYMENT_METHODS,
  type FacilityFeeOption,
  type FacilityPaymentMethod,
} from "@/src/shared/config/constants";
import type { FacilityFeeSettings as FacilityFeeSettingsType } from "../model/matching-create.types";

interface FacilityFeeSettingsProps {
  settings: FacilityFeeSettingsType;
  onChange: (settings: FacilityFeeSettingsType) => void;
}

export function FacilityFeeSettings({
  settings,
  onChange,
}: FacilityFeeSettingsProps) {
  const handleHasFeeChange = (option: FacilityFeeOption) => {
    onChange({
      ...settings,
      hasfee: option,
      paymentMethod: option === "없음" ? null : settings.paymentMethod,
      amount: option === "없음" ? 0 : settings.amount,
    });
  };

  const handlePaymentMethodChange = (method: FacilityPaymentMethod) => {
    onChange({ ...settings, paymentMethod: method });
  };

  const guideText =
    settings.paymentMethod === "구장 별도 결제"
      ? "체육관에 직접 낼 금액"
      : "호스트에게 입금할 금액";

  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold">시설 이용료</Label>

      {/* 있음 / 없음 */}
      <div className="grid grid-cols-2 gap-2">
        {FACILITY_FEE_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleHasFeeChange(option)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              settings.hasfee === option
                ? "border-primary bg-primary/10 font-semibold text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {settings.hasfee === "있음" && (
        <div className="space-y-4 rounded-lg border border-border p-4">
          {/* 지불 방식 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">지불 방식</Label>
            <div className="grid grid-cols-2 gap-2">
              {FACILITY_PAYMENT_METHODS.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => handlePaymentMethodChange(method)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    settings.paymentMethod === method
                      ? "border-primary bg-primary/10 font-semibold text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* 금액 입력 */}
          {settings.paymentMethod && (
            <div className="space-y-2">
              <Label className="text-sm">{guideText}</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={settings.amount || ""}
                  onChange={(e) =>
                    onChange({ ...settings, amount: Number(e.target.value) })
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
    </div>
  );
}
