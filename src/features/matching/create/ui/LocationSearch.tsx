"use client";

import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { MapPin } from "lucide-react";

interface LocationSearchProps {
  location: string;
  onLocationChange: (location: string) => void;
}

export function LocationSearch({
  location,
  onLocationChange,
}: LocationSearchProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location">장소 검색</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="location"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="장소명 또는 주소 검색"
            className="pl-9"
          />
        </div>
      </div>
      {/* TODO: [POST-02] 카카오/네이버 지도 API 연동 - 검색 결과 리스트 및 지도 핀 노출 */}
      <div className="flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 py-12">
        <p className="text-sm text-muted-foreground">
          지도 API 연동 후 검색 결과가 표시됩니다
        </p>
      </div>
    </div>
  );
}
