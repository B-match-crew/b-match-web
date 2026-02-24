"use client";

import { MapPin } from "lucide-react";

export function MapPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      {/* TODO: [NAV-02] 지도 API 연동
          - 카카오맵 또는 네이버 지도 SDK 선택
          - npm install react-kakao-maps-sdk 또는 @vis.gl/react-naver-maps
          - NEXT_PUBLIC_MAP_API_KEY 환경변수 설정
          - 현재 위치 기반 매칭 핀 표시
          - 핀 클릭 시 매칭 미리보기 카드 표시 */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <MapPin className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-lg font-semibold">지도 뷰</h2>
      <p className="text-sm text-muted-foreground">
        내 주변 배드민턴 매칭을{"\n"}지도에서 확인할 수 있어요
      </p>
      <p className="mt-4 text-xs text-muted-foreground/50">
        지도 API 연동 후 활성화됩니다
      </p>
    </div>
  );
}
