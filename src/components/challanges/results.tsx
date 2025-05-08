"use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import Image from "next/image";
// import moment from "moment";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useTMCResult, useActiveTMCTarget } from "@/hooks/use-tmc-queries";
import { Button } from "../ui/button";

export default function Results() {
  const { setActiveTab } = useChallengeStore();
  // const router = useRouter();
  const { targetId } = useChallengeStore();
  const { data: results, isLoading } = useTMCResult(targetId || "");
  const { data: activeTarget } = useActiveTMCTarget();
  if (isLoading || !results?.data) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-3xl font-semibold text-[#ECECEC] mb-8">
          Loading results...
        </h2>
      </div>
    );
  }

  const { firstChoiceImage, secondChoiceImage, points } = results.data;

  return (
    <div className="container mx-auto mt-28  ">
      <h2 className="text-3xl font-semibold text-[#ECECEC] mb-8">
        Feedback for Target Code: {activeTarget?.code}
      </h2>

      <div className="flex flex-wrap items-center gap-8">
        {/* First Choice */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-medium text-[#ECECEC]">
            Your 1st choice was:
          </h3>
          <div className="aspect-[4/3] relative w-[370px] h-[278px] rounded-xl overflow-hidden">
            <Image
              src={firstChoiceImage}
              alt="First choice"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Second Choice */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-medium text-[#ECECEC]">
            Your 2nd choice was:
          </h3>
          <div className="aspect-[4/3] relative w-[370px] h-[278px] rounded-xl overflow-hidden">
            <Image
              src={secondChoiceImage}
              alt="Second choice"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Result Summary */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-medium text-[#ECECEC]">
              Target Image:
            </h3>
            <div className="aspect-[4/3] relative w-[370px] h-[278px] rounded-xl overflow-hidden">
              <Image
                src={activeTarget?.targetImage || ""}
                alt="Target image"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-end gap-8 w-[370px] h-[278px]">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-red-400">
                {points === 25
                  ? "Congratulations! You matched the Target on your 1st choice. You received 25 points!"
                  : points === 15
                    ? "Good job! You matched the Target on your 2nd choice. You received 15 points!"
                    : "Unfortunately, you didn't match the Target. -10 points."}
              </h3>
            </div>

            <Button
              onClick={() => setActiveTab("leaderboard")}
              className="inline-flex justify-center items-center px-6 py-4 bg-[#8F37FF] text-white rounded-xl hover:bg-[#7B2CE0] transition-colors w-[270px] font-medium text-xl"
            >
              See Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
