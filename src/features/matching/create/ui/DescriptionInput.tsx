"use client";

import { Label } from "@/src/shared/ui/label";

const PLACEHOLDER_GUIDE = `모임 분위기, 주차 정보, 오는 길, 유의사항 등을 자유롭게 작성해주세요.

예시)
- 주차: 건물 지하주차장 이용 가능 (2시간 무료)
- 라켓 대여: 가능 (1자루 2,000원)
- 오는 길: 지하철 2호선 OO역 3번 출구 도보 5분
- 실내화 필수, 논슬립 신발 권장
- 음료/간식 개별 준비`;

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DescriptionInput({ value, onChange }: DescriptionInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">모임 소개글</Label>
      <textarea
        id="description"
        className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={PLACEHOLDER_GUIDE}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
      />
      <p className="text-xs text-muted-foreground">
        게스트에게 전달할 모임 정보를 자세히 적어주세요 (선택사항)
      </p>
    </div>
  );
}
