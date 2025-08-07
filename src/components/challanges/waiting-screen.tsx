"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useActiveTMCTarget } from "@/hooks/use-tmc-queries";
import CountdownDisplay from "./countdown-display";

export default function WaitingScreen() {
  const router = useRouter();
  const { challengeCode, targetId, submitted } = useChallengeStore();
  const { data: activeTarget } = useActiveTMCTarget();

  // Calculate phase times
  const startTime = activeTarget?.startTime
    ? moment(activeTarget.startTime)
    : null;
  const gameEnd = startTime
    ?.clone()
    .add(activeTarget?.gameDuration || 0, "minutes");

  useEffect(() => {
    if (!submitted || !activeTarget || !targetId) {
      router.replace("/challenges/");
      return;
    }
  }, [activeTarget, router, submitted, targetId]);

  // Check if game phase has ended, if so redirect to results
  useEffect(() => {
    if (!startTime || !gameEnd) return;

    const checkGameEnd = () => {
      const now = moment();
      if (now.isSameOrAfter(gameEnd)) {
        // Game phase has ended, results should be available
        router.push(`/challenges/tmc/results?id=${targetId}`);
      }
    };

    checkGameEnd();
    const interval = setInterval(checkGameEnd, 1000);
    return () => clearInterval(interval);
  }, [startTime, gameEnd, router, targetId]);

  const handleCountdownComplete = () => {
    // When game time ends, redirect to results
    router.push(`/challenges/tmc/results?id=${targetId}`);
  };

  const handlePhaseChange = (
    phase: "waiting" | "game" | "reveal" | "buffer" | "completed",
  ) => {
    console.log("Phase changed in waiting screen:", phase);
    // When game phase ends, redirect to results
    if (phase === "reveal") {
      router.push(`/challenges/tmc/results?id=${targetId}`);
    }
  };

  if (!activeTarget || !submitted) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 text-center">
      {/* Countdown Display - Only showing game time remaining */}
      <div className="mb-12">
        <h4></h4>
        <CountdownDisplay
          startTime={activeTarget.startTime}
          gameDuration={Number(activeTarget?.gameDuration)}
          revealDuration={Number(activeTarget?.revealDuration)}
          bufferDuration={Number(activeTarget?.bufferDuration)}
          onComplete={handleCountdownComplete}
          onPhaseChange={handlePhaseChange}
          mode="game-only"
        />
      </div>

      {/* Main Message */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-[#7cfc00] mb-4">
          Congratulations!
        </h2>
        <div className="text-3xl font-bold text-white mb-6">
          Submission Recorded!
        </div>
        <p className="text-xl text-white mb-4">
          Your drawing and selections have been submitted successfully
        </p>
      </div>

      {/* Status Indicator */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 bg-green-800/30 px-6 py-3 rounded-full mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="font-medium text-green-400">
            Results will be available in the next phase
          </span>
        </div>
        <p className="text-gray-300 text-lg mb-6">
          Please wait for the game phase to end. Results will be available
          immediately when the game is over.
        </p>
      </div>

      {/* Challenge Info */}
      <div className="bg-purple-900/20 p-6 rounded-lg max-w-md mx-auto">
        <p className="text-xl text-white mb-2">
          <span className="text-purple-300">Target Code:</span>{" "}
          {challengeCode || activeTarget.code}
        </p>
        <p className="text-lg text-gray-300">
          <span className="text-purple-300">Started:</span>{" "}
          {startTime?.format("MMM DD, YYYY HH:mm")}
        </p>
        <p className="text-lg text-gray-300 mt-2">
          <span className="text-purple-300">Game Ends:</span>{" "}
          {gameEnd?.format("MMM DD, YYYY HH:mm")}
        </p>
      </div>

      {/* Waiting Animation */}
      <div className="mt-8">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        <p className="text-gray-400 mt-2">
          Waiting for game phase to complete...
        </p>
      </div>
    </div>
  );
}
