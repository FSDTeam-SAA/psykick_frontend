"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameDashboard from "./GameDashboard";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Map tier names to image paths
const tierImageMap: Record<string, string> = {
  "NOVICE SEEKER": "/assets/img/novice.png",
  "INITIATE": "/assets/img/initiate.png",
  "APPRENTICE": "/assets/img/apprentice.png",
  "EXPLORER": "/assets/img/explorer.png",
  "VISIONARY": "/assets/img/visionary.png",
  "ADEPT": "/assets/img/adept.png",
  "SEER": "/assets/img/seer.png",
  "ORACLE": "/assets/img/oracle.png",
  "MASTER REMOTE VIEWER": "/assets/img/master_remote_viewer.png",
  "ASCENDING MASTER": "/assets/img/ascending_master.png",
};

// Fetch function
const fetchUserProfile = async (userId: string) => {
  const res = await axios.get(`${baseURL}/profile/get-user/${userId}`);
  return res.data.data;
};

export default function GamifiedProfile() {
  const { user } = useAuth();
  const userId = user?._id;

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (profileData) {
      console.log("User profile data:", profileData);
    }
  }, [profileData]);

  if (isLoading || !profileData) {
    return <div className="p-8 text-center">Loading profile data...</div>;
  }

  const avatarSrc =
    tierImageMap[profileData.tierRank?.toUpperCase()] ||
    "/assets/img/placeholder.png";

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
          <span className="text-yellow-400">{profileData.totalPoints}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left side - Progress meter */}
        <div className="md:col-span-3">
          <GameDashboard totalScore={profileData.totalPoints} />
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
                <div className="text-center text-2xl mt-4 font-bold">YOU NEED</div>
                <div className="text-center text-7xl font-bold text-yellow-500 my-2">
                  {profileData.nextTierPoint}
                </div>
                <div className="text-center text-2xl mb-4 font-bold">
                MORE POINTS TO ACHIEVE
                </div>

                <div className="mb-4 mx-auto flex justify-around items-center">
                  <div className="border-2 w-[200px] bg-[#372759] border-white/40 rounded-lg p-2 text-center mb-4 max-w-xs">
                    <div className="text-lg font-bold">RV TIER</div>
                    <div className="text-2xl text-yellow-500">
                      {profileData.tierRank || "N/A"}
                    </div>
                  </div>

                  <div className="relative w-[120px] h-[120px] rounded-full bg-orange-400 overflow-hidden flex items-center justify-center">
                    <Image
                      src={avatarSrc}
                      alt={`${profileData.tierRank} avatar`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
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
