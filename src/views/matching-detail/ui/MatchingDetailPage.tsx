"use client";

import { AppBar } from "@/src/widgets/app-bar";
import { Button } from "@/src/shared/ui/button";
import { Badge } from "@/src/shared/ui/badge";
import { Separator } from "@/src/shared/ui/separator";
import { MapPin, Clock, Users, Wallet } from "lucide-react";
import type { Matching } from "@/src/entities/matching";

// TODO: [HOME-03] 서버에서 매칭 상세 데이터를 API로 가져오기
const MOCK_DETAIL: Matching = {
  id: "1",
  title: "강남 주말 배드민턴 모임",
  hostName: "배드민턴왕",
  location: "강남구민체육관",
  date: "2026-02-25",
  time: "14:00",
  currentMembers: 6,
  maxMembers: 12,
  skillLevels: ["B", "C"],
  gender: "남녀모두",
  isBeginnerWelcome: true,
  fee: 5000,
};

interface MatchingDetailPageProps {
  matchingId: string;
}

export function MatchingDetailPage({ matchingId }: MatchingDetailPageProps) {
  const matching = MOCK_DETAIL;

  return (
    <div className="flex min-h-dvh flex-col">
      <AppBar title="매칭 상세" showBack />

      <div className="flex-1 px-6 py-6">
        <div className="mb-4 flex items-start justify-between">
          <h1 className="text-xl font-bold">{matching.title}</h1>
          {matching.isBeginnerWelcome && (
            <Badge variant="secondary">초보환영</Badge>
          )}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          호스트: {matching.hostName}
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">날짜 및 시간</p>
              <p className="text-sm text-muted-foreground">
                {matching.date} {matching.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">장소</p>
              <p className="text-sm text-muted-foreground">
                {matching.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">참여 인원</p>
              <p className="text-sm text-muted-foreground">
                {matching.currentMembers}/{matching.maxMembers}명
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Wallet className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">참가비</p>
              <p className="text-sm text-muted-foreground">
                {matching.fee.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="mb-2 text-sm font-semibold">급수</h3>
          <div className="flex flex-wrap gap-2">
            {matching.skillLevels.map((level) => (
              <Badge key={level} variant="outline">
                {level}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold">성별</h3>
          <Badge variant="outline">{matching.gender}</Badge>
        </div>
      </div>

      <div className="px-6 pb-8">
        <Button
          className="w-full py-6 text-base font-semibold"
          size="lg"
          disabled={matching.currentMembers >= matching.maxMembers}
        >
          {matching.currentMembers >= matching.maxMembers
            ? "마감되었습니다"
            : "참여 신청하기"}
        </Button>
      </div>
    </div>
  );
}
