"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/shared/ui/dialog";
import { Button } from "@/src/shared/ui/button";

interface HostInvitationPopupProps {
  open: boolean;
  onHostSelect: () => void;
  onGuestSelect: () => void;
}

export function HostInvitationPopup({
  open,
  onHostSelect,
  onGuestSelect,
}: HostInvitationPopupProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-[360px] rounded-2xl" showCloseButton={false}>
        <DialogHeader className="items-center text-center">
          <div className="mb-2 text-5xl">🏸</div>
          <DialogTitle className="text-lg">호스트로 활동해보세요!</DialogTitle>
          <DialogDescription className="text-sm">
            나만의 배드민턴 모임을 만들고{"\n"}게스트를 초대할 수 있어요
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-2">
          <Button
            onClick={onHostSelect}
            className="w-full py-5 text-sm font-semibold"
          >
            호스트로도 가입할래요
          </Button>
          <Button
            onClick={onGuestSelect}
            variant="ghost"
            className="w-full py-5 text-sm text-muted-foreground"
          >
            게스트로만 참여할래요
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          언제든지 마이페이지에서 호스트로 전환할 수 있어요!
        </p>
      </DialogContent>
    </Dialog>
  );
}
