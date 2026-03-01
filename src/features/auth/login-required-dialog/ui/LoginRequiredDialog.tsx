"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/ui/dialog";
import { Button } from "@/src/shared/ui/button";
import { ROUTES } from "@/src/shared/config/routes";

interface LoginRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginRequiredDialog({
  open,
  onOpenChange,
}: LoginRequiredDialogProps) {
  const router = useRouter();

  const handleConfirm = () => {
    onOpenChange(false);
    router.push(ROUTES.LOGIN);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>로그인 필요</DialogTitle>
          <DialogDescription>
            로그인이 필요한 기능입니다. 로그인 하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button className="flex-1" onClick={handleConfirm}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
