"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import moment from "moment";
import { useChallengeStore } from "../../store/use-challenge-store";
import { useTMCResult } from "../../hooks/use-tmc-queries";

export default function Results() {
  const router = useRouter();
  const { targetId, revealTime } = useChallengeStore();
  const { data: results } = useTMCResult(targetId || "");

  // Check if reveal time has passed
  useEffect(() => {
    const now = moment();
    const reveal = moment(revealTime);

    if (now.isBefore(reveal)) {
      router.push(`/challenges/tmc/waiting`);
    }
  }, [revealTime, router]);

  if (!results?.data) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Loading results...
        </h2>
      </div>
    );
  }

  const { firstChoiceImage, secondChoiceImage, points } = results.data;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        Target Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Your First Choice
          </h3>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={firstChoiceImage}
              alt="First choice"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Your Second Choice
          </h3>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={secondChoiceImage}
              alt="Second choice"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Points Earned
          </h3>
          <div className="aspect-square bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{points}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
