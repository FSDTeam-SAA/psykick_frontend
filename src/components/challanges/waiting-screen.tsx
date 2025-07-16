"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useActiveTMCTarget } from "@/hooks/use-tmc-queries";
import CountdownDisplay from "./countdown-display";

export default function WaitingScreen() {
  const router = useRouter();
  const { challengeCode, targetId, submitted } = useChallengeStore();
  const { data: activeTarget } = useActiveTMCTarget();

  useEffect(() => {
    if (!submitted || !activeTarget || !targetId) {
      router.replace("/challenges/");
      return;
    }
  }, [activeTarget, router, submitted, targetId]);

  const handleCountdownComplete = () => {
    router.push(`/challenges/tmc/results?id=${targetId}`);
  };

  if (!activeTarget || !submitted) return null;

  return (
    <div className="max-w-2xl mx-auto p-4 text-center mt-16">
      <div className="mb-16">
        <CountdownDisplay
          targetDate={new Date(activeTarget.revealDuration)}
          onComplete={handleCountdownComplete}
        />
      </div>

      <div className="text-3xl font-bold text-white mb-6">
        <h2 className="text-4xl font-bold text-[#7cfc00] mb-4">
          Congratulations!
        </h2>
        on completing the target. Please wait for the result.
      </div>

      <p className="text-xl text-white mb-4">
        Target will be revealed in:{" "}
        {new Date(activeTarget.revealDuration).toLocaleString()}
      </p>

      <p className="text-xl text-white">Target ID: {challengeCode}</p>
    </div>
  );
}
