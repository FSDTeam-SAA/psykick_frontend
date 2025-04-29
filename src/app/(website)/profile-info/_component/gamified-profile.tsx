"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameDashboard from "./GameDashboard";
import Link from "next/link";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Fetch function using Axios
const fetchUserProfile = async (userId: string) => {
  const res = await axios.get(`${baseURL}/profile/get-user/${userId}`);
  return res.data.data;
};

// Component to render the tier avatar
const TierAvatar = ({ tier }: { tier: string }) => {
  const getAvatarForTier = (tier: string) => {
    switch (tier.toUpperCase()) {
      case "NOVICE SEEKER":
      case "INITIATE":
      case "APPRENTICE":
        return "/placeholder.svg?height=60&width=60";
      default:
        return "/placeholder.svg?height=60&width=60";
    }
  };

  return (
    <div className="relative w-16 h-16 rounded-full bg-orange-400 overflow-hidden">
      <Image
        src={getAvatarForTier(tier)}
        alt={`${tier} avatar`}
        width={60}
        height={60}
        className="object-cover"
      />
    </div>
  );
};

export default function GamifiedProfile() {
  const userId = "680b13fe952ccea102170b34"; // Replace this with dynamic user ID from context or props

  const { data: profileData, isLoading,  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId),
  });

  useEffect(() => {
    if (profileData) {
      console.log("User profile data:", profileData);
    }
  }, [profileData]);

  if (isLoading || !profileData) {
    return <div className="p-8 text-center">Loading profile data...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto pt-[80px] p-6 rounded-lg h-screen text-white">
      {/* Top badges row */}
      <div className="flex flex-wrap gap-4 mb-8 justify-between">
        <div className="border border-green-400 rounded-full px-4 py-1">
          @{profileData.screenName}
        </div>
        <div className="border border-orange-400 rounded-full px-4 py-1">
          RV TIER:{" "}
          <span className="text-orange-400">{profileData.tierRank}</span>
        </div>
        <div className="border border-purple-400 rounded-full px-4 py-1">
          TARGETS LEFT:{" "}
          <span className="text-green-400">{profileData.targetsLeft}/10</span>
        </div>
        <div className="border border-yellow-400 rounded-full px-4 py-1">
          TOTAL POINTS:{" "}
          <span className="text-yellow-400">
            {profileData.totalPoints}
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
            <div className="text-2xl text-center w-80 mx-auto">
              <p>
                You have {profileData.targetsLeft} challenges remaining in this
                cycle.
              </p>
            </div>

            {/* Hexagonal container */}
            <div className="relative mt-4">
              <div
                className="rounded-lg p-8 relative mx-auto
                bg-[url('/assets/img/profileBg.png')] bg-cover bg-center bg-no-repeat 
                w-[500px] h-[500px]"
              >
                <div className="text-center text-2xl mt-4">YOU NEED</div>
                <div className="text-center text-7xl font-bold text-yellow-500 my-2">
                  {/* Just example: You can calculate needed points based on logic */}
                  {Math.max(0, 100 - profileData.totalPoints)}
                </div>
                <div className="text-center text-2xl mb-4">
                  MORE POINTS TO LEVEL UP
                </div>

                <div className="mb-4 mx-auto flex justify-around items-center">
                  <div className="border-2 bg-[#372759] border-white/40 rounded-lg p-2 text-center mb-4 max-w-xs">
                    <div className="text-lg">NEXT TIER</div>
                    <div className="text-2xl text-yellow-500">
                      Apprentice
                    </div>
                  </div>

                  <div className="">
                    <TierAvatar tier="Apprentice" />
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Link href="/profile">
                    <Button variant="secondary" className="btn">
                      Back to profile <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
