"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircleQuestionIcon as QuestionMarkCircle } from "lucide-react";

interface GameCardProps {
  avatarSrc?: string;
  tier?: string;
  seekerStatus?: string;
  showQuestionMark?: boolean;
}

export default function ProfileCard({
  avatarSrc = "/assets/img/profile.png",
  tier = "RV TIER",
  seekerStatus = "NOVICE SEEKER",
  showQuestionMark = true,
}: GameCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto bg-[#FFFFFF1A] border-2 border-white rounded-2xl shadow-lg">
      <div className="text-center py-6 px-4">
        <h1 className="text-3xl text-white font-semibold">Darlene Robertson</h1>
        <p className="text-white text-sm">@darlenerobertson</p>
      </div>

      <CardContent className="flex flex-col items-center space-y-5 pb-6 px-6">
        {/* Avatar */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src={avatarSrc}
            alt="Avatar"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Tier Badge */}
        <div className="w-full bg-[#2d1e4f] border-2 border-white rounded-lg py-3 px-5 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-white font-semibold text-lg">{tier}</h3>
            {showQuestionMark && (
              <QuestionMarkCircle className="h-5 w-5 text-white" />
            )}
          </div>
          <p className="text-amber-400 font-bold text-xl">{seekerStatus}</p>
        </div>
      </CardContent>
    </Card>
  );
}
