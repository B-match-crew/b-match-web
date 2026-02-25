"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/shared/ui/dialog";
import { Button } from "@/src/shared/ui/button";
import { CircleCheckBig } from "lucide-react";

interface MatchingCreateCompletePopupProps {
  open: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onGoManage: () => void;
}

export function MatchingCreateCompletePopup({
  open,
  onClose,
  onGoHome,
  onGoManage,
}: MatchingCreateCompletePopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CircleCheckBig className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle>매칭 등록 완료!</DialogTitle>
          <DialogDescription>
            매칭이 성공적으로 등록되었습니다.
            <br />
            게스트들의 참여를 기다려보세요!
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3">
          <Button onClick={onGoManage} className="w-full">
            매칭 관리하기
          </Button>
          <Button variant="outline" onClick={onGoHome} className="w-full">
            메인으로
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
