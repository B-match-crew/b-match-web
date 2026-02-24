"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/shared/ui/dialog";
import { Button } from "@/src/shared/ui/button";

interface HostCompletePopupProps {
  open: boolean;
  onConfirm: () => void;
}

export function HostCompletePopup({ open, onConfirm }: HostCompletePopupProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-[360px] rounded-2xl" showCloseButton={false}>
        <DialogHeader className="items-center text-center">
          <div className="mb-2 text-5xl">🎉</div>
          <DialogTitle className="text-lg">호스트 등록 완료!</DialogTitle>
          <DialogDescription className="text-sm">
            이제 나만의 배드민턴 모임을{"\n"}만들 수 있어요
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={onConfirm}
          className="mt-2 w-full py-5 text-sm font-semibold"
        >
          시작하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}
