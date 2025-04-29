"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameDashboard from "./GameDashboard";

// Define types for our profile data
interface ProfileData {
  username: string;
  rvTier: {
    current: string;
    next: string;
  };
  challenges: {
    completed: number;
    total: number;
    remaining: number;
  };
  score: {
    current: number;
    max: number;
    needed: number;
  };
  cycle: {
    daysRemaining: number;
  };
}

// This would typically come from an API or database
const fetchProfileData = async (): Promise<ProfileData> => {
  // Simulating API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: "darlenerobertson",
        rvTier: {
          current: "NOVICE SEEKER",
          next: "APPRENTICE",
        },
        challenges: {
          completed: 5,
          total: 10,
          remaining: 4,
        },
        score: {
          current: 8,
          max: 275,
          needed: 22,
        },
        cycle: {
          daysRemaining: 22,
        },
      });
    }, 500);
  });
};

// Component to render the tier avatar
const TierAvatar = ({ tier }: { tier: string }) => {
  const getAvatarForTier = (tier: string) => {
    switch (tier.toUpperCase()) {
      case "NOVICE SEEKER":
        return "/placeholder.svg?height=60&width=60";
      case "INITIATE":
        return "/placeholder.svg?height=60&width=60";
      case "APPRENTICE":
        return "/placeholder.svg?height=60&width=60";
      default:
        return "/placeholder.svg?height=60&width=60";
    }
  };

  return (
    <div className="relative w-16 h-16 rounded-full bg-orange-400 overflow-hidden">
      <Image
        src={getAvatarForTier(tier) || "/placeholder.svg"}
        alt={`${tier} avatar`}
        width={60}
        height={60}
        className="object-cover"
      />
    </div>
  );
};

export default function GamifiedProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !profileData) {
    return <div className="p-8 text-center">Loading profile data...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto pt-[80px] p-6 rounded-lg h-screen text-white">
      {/* Top badges row */}
      <div className="flex flex-wrap gap-4 mb-8 justify-between">
        <div className="border border-green-400 rounded-full px-4 py-1">
          @{profileData.username}
        </div>
        <div className="border border-orange-400 rounded-full px-4 py-1">
          RV TIER:{" "}
          <span className="text-orange-400">{profileData.rvTier.current}</span>
        </div>
        <div className="border border-purple-400 rounded-full px-4 py-1">
          CHALLENGES:{" "}
          <span className="text-green-400">
            {profileData.challenges.completed}/{profileData.challenges.total}
          </span>
        </div>
        <div className="border border-yellow-400 rounded-full px-4 py-1">
          CURRENT SCORE:{" "}
          <span className="text-yellow-400">
            {profileData.score.current.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left side - Progress meter */}
        <div className="md:col-span-3">
        <GameDashboard />
        </div>

        {/* Right side - Stats */}
        <div className="md:col-span-2">
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-2xl text-center w-80 mx-auto">
              <p>
                You have {profileData.challenges.remaining} challenges remaining
                in this cycle,This cycle ends in:{" "}
                {profileData.cycle.daysRemaining} days
              </p>
            </div>
            <div className="text-xl"></div>
          </div>

          {/* Hexagonal container */}
          <div className="relative mt-4">
            <div
              className=" rounded-lg p-8 relative mx-auto
              bg-[url('/assets/img/profileBg.png')] bg-cover bg-center bg-no-repeat 
              w-[500px] h-[500px]"
            >
              <div className="text-center text-2xl mt-4">YOU NEED</div>
              <div className="text-center text-7xl font-bold text-yellow-500 my-2">
                {profileData.score.needed}
              </div>
              <div className="text-center text-2xl mb-4">
                MORE POINTS TO ACHIEVE
              </div>

              <div className="mb-4  mx-auto flex justify-around items-center">
  <div className="border-2 bg-[#372759] border-white/40 rounded-lg p-2 text-center mb-4 max-w-xs">
    <div className="text-lg">RV TIER</div>
    <div className="text-2xl text-yellow-500">
      {profileData.rvTier.next}
    </div>
  </div>

  <div className="">
    <TierAvatar  tier={profileData.rvTier.next} />
  </div>
</div>

              <div className="flex justify-center mt-4">
                <Button
                  variant="secondary"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Back to profile <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}
