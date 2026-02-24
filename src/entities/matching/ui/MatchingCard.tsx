"use client";

import Link from "next/link";
import { Card, CardContent } from "@/src/shared/ui/card";
import { Badge } from "@/src/shared/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";
import { ROUTES } from "@/src/shared/config/routes";
import type { Matching } from "../model/matching.types";

interface MatchingCardProps {
  matching: Matching;
}

export function MatchingCard({ matching }: MatchingCardProps) {
  return (
    <Link href={ROUTES.MATCHING_DETAIL(matching.id)}>
      <Card className="border-border transition-shadow hover:shadow-md">
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-base font-semibold leading-tight">
              {matching.title}
            </h3>
            {matching.isBeginnerWelcome && (
              <Badge variant="secondary" className="ml-2 shrink-0 text-xs">
                초보환영
              </Badge>
            )}
          </div>

          <p className="mb-3 text-sm text-muted-foreground">
            {matching.hostName}
          </p>

          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>
                {matching.date} {matching.time}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{matching.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>
                {matching.currentMembers}/{matching.maxMembers}명
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {matching.skillLevels.map((level) => (
              <Badge
                key={level}
                variant="outline"
                className="text-xs font-normal"
              >
                {level}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs font-normal">
              {matching.gender}
            </Badge>
          </div>

          {matching.fee > 0 && (
            <p className="mt-2 text-sm font-medium text-primary">
              {matching.fee.toLocaleString()}원
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
