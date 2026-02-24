"use client";

import { MatchingCard } from "@/src/entities/matching/ui/MatchingCard";
import { Skeleton } from "@/src/shared/ui/skeleton";
import type { Matching } from "@/src/entities/matching";

// TODO: [HOME-01] 서버에서 매칭 리스트 API로 교체
const MOCK_MATCHINGS: Matching[] = [
  {
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
  },
  {
    id: "2",
    title: "서초 평일 저녁 배드민턴",
    hostName: "셔틀콕마스터",
    location: "서초체육센터",
    date: "2026-02-26",
    time: "19:00",
    currentMembers: 4,
    maxMembers: 8,
    skillLevels: ["A", "B"],
    gender: "남녀모두",
    isBeginnerWelcome: false,
    fee: 7000,
  },
  {
    id: "3",
    title: "송파 초보 환영 배드민턴",
    hostName: "배드민턴사랑",
    location: "송파체육관",
    date: "2026-02-27",
    time: "10:00",
    currentMembers: 3,
    maxMembers: 10,
    skillLevels: ["C", "D", "초심"],
    gender: "남녀모두",
    isBeginnerWelcome: true,
    fee: 3000,
  },
  {
    id: "4",
    title: "마포 여성 전용 배드민턴",
    hostName: "레이디버드",
    location: "마포구민체육센터",
    date: "2026-02-28",
    time: "11:00",
    currentMembers: 5,
    maxMembers: 8,
    skillLevels: ["B", "C", "D"],
    gender: "여자만",
    isBeginnerWelcome: true,
    fee: 5000,
  },
  {
    id: "5",
    title: "강동 상급자 배드민턴",
    hostName: "스매쉬킹",
    location: "강동구민체육관",
    date: "2026-03-01",
    time: "09:00",
    currentMembers: 8,
    maxMembers: 12,
    skillLevels: ["S", "A"],
    gender: "남녀모두",
    isBeginnerWelcome: false,
    fee: 10000,
  },
];

interface MatchingListProps {
  isLoading?: boolean;
}

export function MatchingList({ isLoading = false }: MatchingListProps) {
  // TODO: [HOME-01] useIntersectionObserver로 무한 스크롤 구현
  // TODO: [HOME-02] useFilterStore와 연동하여 필터링된 리스트 표시

  if (isLoading) {
    return (
      <div className="space-y-3 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border p-4">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (MOCK_MATCHINGS.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-4xl">🔍</div>
        <p className="text-sm text-muted-foreground">
          조건에 맞는 매칭이 없어요
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      {MOCK_MATCHINGS.map((matching) => (
        <MatchingCard key={matching.id} matching={matching} />
      ))}
    </div>
  );
}
