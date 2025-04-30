"use client";
import Link from "next/link";
import { useARVStore } from "@/store/use-arv-store";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ARVResults() {
  const { challengeCode, eventInfo } = useARVStore();

  const { data: resultData, isLoading } = useQuery({
    queryKey: ["arvResult", challengeCode],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/get-ARVResult/${challengeCode}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch ARV result");
      }
      return res.json();
    },
    enabled: !!challengeCode,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (!resultData?.data) {
    return (
      <div className="p-4">
        <div className="text-red-500">Failed to load results</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1170px] mx-auto px-4">
      <div className="bg-[#170A2C]/50 backdrop-blur-md rounded-[20px] p-10">
        <h1 className="text-[40px] font-bold text-white mb-8">
          The Results Are In! 🎯
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Your Submission */}
          <div>
            <h2 className="text-2xl text-white font-semibold mb-6">
              Your Submission
            </h2>
            <div className="relative aspect-video w-full rounded-[20px] overflow-hidden mb-4">
              <Image
                src={resultData.data.submittedImage}
                alt="Your submission"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Target Outcome */}
          <div>
            <h2 className="text-2xl text-white font-semibold mb-6">
              Target Outcome
            </h2>
            <div className="relative aspect-video w-full rounded-[20px] overflow-hidden mb-4">
              <Image
                src={eventInfo.outcomeImage}
                alt="Target outcome"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#170A2C]/30 rounded-[20px] p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg text-[#C5C5C5] mb-2">Event Name</h3>
              <p className="text-xl text-white font-medium">
                {eventInfo.description}
              </p>
            </div>
            <div>
              <h3 className="text-lg text-[#C5C5C5] mb-2">Event Outcome</h3>
              <p className="text-xl text-white font-medium">
                {eventInfo.outcome}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className="text-[32px] font-bold text-white mb-2">
            You earned {resultData.data.points} points!
          </p>
          <p className="text-xl text-[#ECECEC]">
            {resultData.data.points > 0
              ? "Great job! Your intuition was spot on!"
              : "Keep practicing! Every attempt helps strengthen your intuitive abilities."}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/challenges">
            <button className="px-6 py-4 bg-gradient-to-r from-[#8F37FF] to-[#2D17FF] text-white rounded-[20px] hover:opacity-90 transition-opacity font-medium">
              Try Another Challenge
            </button>
          </Link>
          <Link href="/leaderboard">
            <button className="px-6 py-4 bg-[#170A2C]/20 text-white border-2 border-[#8F37FF] rounded-[20px] hover:bg-[#170A2C]/30 transition-colors font-medium">
              View Leaderboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
