"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useARVStore } from "@/store/use-arv-store";
import { useActiveARVTarget } from "@/hooks/use-arv-queries";
import CountdownDisplay from "./countdown-display";

export default function ARVWaitingScreen() {
  const router = useRouter();
  const { challengeCode, stage } = useARVStore();
  const { data: activeTarget } = useActiveARVTarget();
  const targetId = activeTarget?.targetId;

  useEffect(() => {
    if (stage !== "waiting" || !activeTarget || !targetId) {
      router.replace("/challenges/arv");
      return;
    }
  }, [activeTarget, router, stage, targetId]);

  const handleCountdownComplete = () => {
    router.push(`/challenges/arv/results?id=${targetId}`);
  };

  if (!activeTarget || stage !== "waiting") return null;

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <div className="mb-16">
        <CountdownDisplay
          targetDate={new Date(activeTarget.revealTime)}
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
        {new Date(activeTarget.revealTime).toLocaleString()}
      </p>

      <p className="text-xl text-white">Target ID: {challengeCode}</p>
    </div>
  );
}
