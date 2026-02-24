"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/ui/button";
import { OnboardingSlide } from "./OnboardingSlide";
import { ONBOARDING_SLIDES } from "../model/onboarding.constants";
import { ROUTES } from "@/src/shared/config/routes";
import { cn } from "@/src/shared/lib/utils";

export function OnboardingPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isLast = currentIndex === ONBOARDING_SLIDES.length - 1;

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex items-center justify-end p-4">
        <button
          onClick={() => router.replace(ROUTES.HOME)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          건너뛰기
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div
          className="relative w-full overflow-hidden"
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX;
            const handleTouchEnd = (ev: TouchEvent) => {
              const endX = ev.changedTouches[0].clientX;
              const diff = startX - endX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) handleNext();
                else handlePrev();
              }
              document.removeEventListener("touchend", handleTouchEnd);
            };
            document.addEventListener("touchend", handleTouchEnd);
          }}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {ONBOARDING_SLIDES.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <OnboardingSlide {...slide} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 py-6">
        {ONBOARDING_SLIDES.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30"
            )}
          />
        ))}
      </div>

      <div className="px-6 pb-8">
        {isLast ? (
          <Button
            onClick={() => router.push(ROUTES.LOGIN)}
            className="w-full py-6 text-base font-semibold"
            size="lg"
          >
            로그인하기
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="outline"
            className="w-full py-6 text-base font-semibold"
            size="lg"
          >
            다음
          </Button>
        )}
      </div>
    </div>
  );
}
