"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useActiveTMCTarget } from "@/hooks/use-tmc-queries";
import CountdownDisplay from "@/components/challanges/countdown-display";

export default function BufferScreen() {
  const router = useRouter();
  const { targetId, submitted } = useChallengeStore();
  const { data: activeTarget } = useActiveTMCTarget();

  useEffect(() => {
    // if (!submitted || !activeTarget || !targetId) {
    //   router.replace("/challenges/");
    //   return;
    // }
    // Check if we're actually in buffer phase
    // if (activeTarget.status !== "buffer" && !activeTarget.bufferDuration) {
    //   // If not in buffer phase, redirect back to waiting screen
    //   router.push(`/challenges/tmc/waiting?id=${targetId}`);
    //   return;
    // }
  }, [activeTarget, router, submitted, targetId]);

  // const handleBufferComplete = () => {
  //   // When buffer ends, go to results
  //   router.push(`/challenges/`);
  // };

  if (!activeTarget || !submitted) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col items-center justify-center text-[#ECECEC] h-screen">
      <h2 className="md:text-3xl text-xl lg:text-5xl text-center font-semibold  mb-8 ">
        Game has been Finished!
      </h2>
      <p className="text-lg mb-4">Please wait for the next Game</p>
      <CountdownDisplay
        minutes={activeTarget?.bufferDuration || "0"}
        // onComplete={handleBufferComplete}
      />
    </div>
  );
}
