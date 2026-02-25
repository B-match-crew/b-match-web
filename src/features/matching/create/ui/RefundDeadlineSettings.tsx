"use client";

import { useState } from "react";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { CircleHelp } from "lucide-react";

interface RefundDeadlineSettingsProps {
  date: string;
  time: string;
  matchDate: string;
  matchStartTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export function RefundDeadlineSettings({
  date,
  time,
  matchDate,
  matchStartTime,
  onDateChange,
  onTimeChange,
}: RefundDeadlineSettingsProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label>환불 마감 시간</Label>
          <button
            type="button"
            onClick={() => setShowTooltip(!showTooltip)}
            className="text-muted-foreground hover:text-foreground"
          >
            <CircleHelp className="h-4 w-4" />
          </button>
        </div>

        {showTooltip && (
          <div className="rounded-lg border bg-muted/50 p-4 text-sm">
            <p className="mb-2 font-semibold">마감 정책 안내</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                - 마감 시간 전 취소 시 <strong>100% 자동 환불</strong>
              </li>
              <li>
                - 마감 시간 후 취소 시 <strong>환불 불가</strong>
              </li>
              <li>
                - 단, 승인 시점 기준 <strong>3시간 유예 정책</strong> 적용
              </li>
            </ul>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="refund-date">마감 날짜</Label>
          <Input
            id="refund-date"
            type="date"
            value={date}
            min={today}
            max={matchDate || undefined}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="refund-time">마감 시간</Label>
          <Input
            id="refund-time"
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
          />
        </div>

        {matchDate && matchStartTime && (
          <p className="text-xs text-muted-foreground">
            모임 시작: {matchDate} {matchStartTime} 이전으로 설정해주세요
          </p>
        )}
      </div>
    </div>
  );
}
