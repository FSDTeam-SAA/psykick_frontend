"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTierInfoData } from "@/hooks/useTierInfo";
import { TIER_CONFIG, getColorState } from "@/lib/tier-config";

const ProgressTrackerCard = dynamic(
  () => import("@/components/common/card/ProgressTrackerCard"),
);

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Map tier names to image paths
// const tierImageMap: Record<string, string> = {
//   "NOVICE SEEKER": "/assets/img/novice.png",
//   INITIATE: "/assets/img/initiate.png",
//   APPRENTICE: "/assets/img/apperentice.png",
//   EXPLORER: "/assets/img/explorer.png",
//   VISIONARY: "/assets/img/visionary.png",
//   ADEPT: "/assets/img/adept.png",
//   SEER: "/assets/img/seer.png",
//   ORACLE: "/assets/img/oracle.png",
//   "MASTER REMOTE VIEWER": "/assets/img/master_remote_viewer.png",
//   "ASCENDING MASTER": "/assets/img/ascending_master.png",
// };

// Fetch function
const fetchUserProfile = async (userId: string) => {
  const res = await axios.get(`${baseURL}/profile/get-user/${userId}`);
  return res.data.data;
};

// Skeleton component for loading state
function ProfileSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto pt-[80px] p-6 rounded-lg h-screen flex flex-col text-white">
      {/* Top badges row skeleton */}
      <div className="flex flex-wrap gap-4 mb-8 justify-between items-baseline">
        <Skeleton className="h-8 w-32 rounded-full bg-white/10" />
        <Skeleton className="h-8 w-40 rounded-full bg-white/10" />
        <Skeleton className="h-8 w-44 rounded-full bg-white/10" />
        <Skeleton className="h-8 w-36 rounded-full bg-white/10" />
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-end justify-between">
        {/* Left side - Progress meter skeleton */}
        <div className="md:col-span-3">
          <Skeleton className="h-[400px] w-full rounded-lg bg-white/10" />
        </div>

        {/* Right side - Stats skeleton */}
        <div className="md:col-span-2">
          <div className="flex flex-col justify-between">
            <div className="text-center w-80 mx-auto mb-4">
              <Skeleton className="h-8 w-full mx-auto bg-white/10" />
            </div>

            {/* Hexagonal container skeleton */}
            <div className="relative mt-4">
              <div className="rounded-lg p-8 relative mx-auto bg-[url('/assets/img/profileBg.png')] bg-cover bg-center bg-no-repeat w-[500px] h-[500px]">
                <Skeleton className="h-8 w-32 mx-auto mt-4 bg-white/10" />
                <Skeleton className="h-20 w-40 mx-auto my-2 bg-white/10" />
                <Skeleton className="h-8 w-64 mx-auto mb-4 bg-white/10" />

                <div className="mb-4 mx-auto flex justify-around items-center">
                  <Skeleton className="h-24 w-[200px] rounded-lg bg-white/10" />
                  <Skeleton className="h-[120px] w-[120px] rounded-full bg-white/10" />
                </div>

                <div className="flex justify-center mt-4">
                  <Skeleton className="h-10 w-40 rounded-md bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GamifiedProfile() {
  const { user } = useAuth();
  const userId = user?._id;

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId!),
    enabled: !!userId,
  });

  const { tierData } = useTierInfoData(userId || "");

  // console.log(tierData);

  if (isLoading || !tierData) {
    return <ProfileSkeleton />;
  }

  // const avatarSrc =
  //   tierImageMap[tierData.tierRank?.toUpperCase()] ||
  //   "/assets/img/placeholder.png";

  return (
    <div className="w-full max-w-6xl mx-auto pt-[80px] p-6 rounded-lg h-screen flex flex-col text-white">
      {/* Top badges row */}
      <div className="flex flex-wrap gap-4 mb-8 justify-between items-baseline">
        <div className="border border-green-400 rounded-full px-4 py-1">
          @{profileData.screenName}
        </div>
        <div className="border border-orange-400 rounded-full px-4 py-1">
          RV TIER:{" "}
          <span className="text-orange-400 font-bold">{tierData.tierRank}</span>
        </div>
        <div className="border border-purple-400 rounded-full px-4 py-1">
          TARGETS LEFT:{" "}
          <span className="text-green-400">{tierData.targetsLeft}/10</span>
        </div>
        <div className="border border-yellow-400 rounded-full px-4 py-1">
          TOTAL POINTS:{" "}
          <span className="text-yellow-400">{tierData.currentScore}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-end justify-between">
        {/* Left side - Progress meter */}
        <div className="md:col-span-3">
          <Suspense>
            <ProgressTrackerCard
              up={tierData?.tierThresholds.up}
              down={tierData?.tierThresholds.down}
              currentScore={tierData?.currentScore || 0}
              completedChallenges={tierData?.completedChallenges || 0}
              tierImages={tierData?.tierImages as object}
              currentTierName={tierData.tierRank || "N/A"}
            />
          </Suspense>
        </div>

        {/* Right side - Stats */}
        <div className="md:col-span-2">
          <div className="flex flex-col justify-between">
            <div className="text-2xl text-center w-80 mx-auto">
              <p>
                You have {tierData.targetsLeft} challenges remaining in this
                cycle.
              </p>
            </div>

            {/* Hexagonal container */}
            <div className="relative mt-4">
              <div className="rounded-lg p-8 relative mx-auto bg-[url('/assets/img/profileBg.png')] bg-cover bg-center bg-no-repeat w-[500px] h-[500px]">
                <div className="text-center text-2xl mt-4 font-bold">
                  YOU NEED
                </div>
                <div className="text-center text-7xl font-bold text-yellow-500 my-2">
                  {tierData.nextTierPoint}
                </div>
                <div className="text-center text-2xl mb-4 font-bold">
                  MORE POINTS TO ACHIEVE NEXT TIER
                </div>

                <div className="mb-4 mx-auto flex justify-around items-center">
                  <div
                    className={`border-2 w-[200px] rounded-lg p-2 text-center mb-4 max-w-xs ${
                      getColorState(
                        tierData.currentScore,
                        TIER_CONFIG.find((t) => t.name === tierData.tierRank)!,
                      ) === "green"
                        ? "bg-green-900/50 border-green-400"
                        : getColorState(
                              tierData.currentScore,
                              TIER_CONFIG.find(
                                (t) => t.name === tierData.tierRank,
                              )!,
                            ) === "red"
                          ? "bg-red-900/50 border-red-400"
                          : "bg-blue-900/50 border-blue-400"
                    }`}
                  >
                    <div className="text-lg font-bold">RV TIER</div>
                    <div
                      className={`text-xl font-bold ${
                        getColorState(
                          tierData.currentScore,
                          TIER_CONFIG.find(
                            (t) => t.name === tierData.tierRank,
                          )!,
                        ) === "green"
                          ? "text-green-400"
                          : getColorState(
                                tierData.currentScore,
                                TIER_CONFIG.find(
                                  (t) => t.name === tierData.tierRank,
                                )!,
                              ) === "red"
                            ? "text-red-400"
                            : "text-blue-400"
                      }`}
                    >
                      {tierData.tierRank || "N/A"}
                    </div>
                    <div
                      className={`text-xs mt-2 ${
                        getColorState(
                          tierData.currentScore,
                          TIER_CONFIG.find(
                            (t) => t.name === tierData.tierRank,
                          )!,
                        ) === "green"
                          ? "text-green-300"
                          : getColorState(
                                tierData.currentScore,
                                TIER_CONFIG.find(
                                  (t) => t.name === tierData.tierRank,
                                )!,
                              ) === "red"
                            ? "text-red-300"
                            : "text-blue-300"
                      }`}
                    >
                      {getColorState(
                        tierData.currentScore,
                        TIER_CONFIG.find((t) => t.name === tierData.tierRank)!,
                      ) === "green"
                        ? "Ready to Level Up!"
                        : getColorState(
                              tierData.currentScore,
                              TIER_CONFIG.find(
                                (t) => t.name === tierData.tierRank,
                              )!,
                            ) === "red"
                          ? "Risk of Level Down"
                          : "Maintaining Tier"}
                    </div>
                  </div>

                  <div className="relative w-[120px] h-[120px] rounded-full bg-orange-400 overflow-hidden flex items-center justify-center">
                    <Image
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      src={tierData.tierImages.current.image}
                      alt={`${profileData.tierRank} avatar`}
                      width={400}
                      height={400}
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
