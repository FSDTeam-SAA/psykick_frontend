"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircleQuestionIcon as QuestionMarkCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface GameCardProps {
  avatarSrc?: string;
  tier?: string;
  seekerStatus?: string;
  showQuestionMark?: boolean;
}

export default function ProfileCard({
  avatarSrc = "/assets/img/profile.png     ",
  showQuestionMark = true,
}: GameCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [isLoaded]);

  const { user } = useAuth();
  console.log("user", user);

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

        {/* Status Badge */}
        <div className="w-full bg-[#2d1e4f] border-2 border-white rounded-lg py-2 px-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <h3 className="text-white font-bold text-[28px] tracking-wide">
              {user?.screenName}
            </h3>
            {showQuestionMark && (
              <Link href="profile-info"> <QuestionMarkCircle className="h-5 w-5 text-white" /></Link>
             
            )}
          </div>
          <p className="text-amber-400 font-bold text-[28px] tracking-wide">
            {user?.tierRank}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
