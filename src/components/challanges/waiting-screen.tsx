"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useActiveTMCTarget } from "@/hooks/use-tmc-queries";
import CountdownDisplay from "./countdown-display";

type WaitingPhase =
  | "waiting-for-reveal"
  | "waiting-for-buffer"
  | "ready-for-results";

export default function WaitingScreen() {
  const router = useRouter();
  const { challengeCode, targetId, submitted } = useChallengeStore();
  const { data: activeTarget } = useActiveTMCTarget();
  const [waitingPhase, setWaitingPhase] =
    useState<WaitingPhase>("waiting-for-reveal");

  // Calculate phase times
  const startTime = activeTarget?.startTime
    ? moment(activeTarget.startTime)
    : null;
  const gameEnd = startTime
    ?.clone()
    .add(activeTarget?.gameDuration || 0, "minutes");
  const revealEnd = gameEnd
    ?.clone()
    .add(activeTarget?.revealDuration || 0, "minutes");
  const bufferEnd = revealEnd
    ?.clone()
    .add(activeTarget?.bufferDuration || 0, "minutes");

  useEffect(() => {
    if (!submitted || !activeTarget || !targetId) {
      router.replace("/challenges/");
      return;
    }
  }, [activeTarget, router, submitted, targetId]);

  // Update waiting phase based on current time
  useEffect(() => {
    if (!startTime || !gameEnd || !revealEnd || !bufferEnd) return;

    const updateWaitingPhase = () => {
      const now = moment();

      if (now.isBefore(revealEnd)) {
        setWaitingPhase("waiting-for-reveal");
      } else if (now.isBefore(bufferEnd)) {
        setWaitingPhase("waiting-for-buffer");
      } else {
        setWaitingPhase("ready-for-results");
      }
    };

    updateWaitingPhase();
    const interval = setInterval(updateWaitingPhase, 1000);
    return () => clearInterval(interval);
  }, [startTime, gameEnd, revealEnd, bufferEnd]);

  const handleCountdownComplete = () => {
    // Only redirect when buffer phase is reached
    if (
      waitingPhase === "ready-for-results" ||
      moment().isSameOrAfter(bufferEnd)
    ) {
      router.push(`/challenges/tmc/results?id=${targetId}`);
    }
  };

  const handlePhaseChange = (
    phase: "waiting" | "game" | "reveal" | "buffer" | "completed",
  ) => {
    // This component handles its own phase detection
    console.log("Phase changed in waiting screen:", phase);
  };

  if (!activeTarget || !submitted) return null;

  const getWaitingMessage = () => {
    switch (waitingPhase) {
      case "waiting-for-reveal":
        return {
          title: "Submission Recorded!",
          subtitle: "Processing your submission...",
          description:
            "Please wait while all submissions are being processed. Results will be available during the buffer phase.",
          statusColor: "text-blue-400",
          statusText: "Processing Phase",
        };
      case "waiting-for-buffer":
        return {
          title: "Almost Ready!",
          subtitle: "Preparing results...",
          description:
            "All submissions have been processed. Results will be revealed shortly.",
          statusColor: "text-yellow-400",
          statusText: "Preparing Results",
        };
      case "ready-for-results":
        return {
          title: "Results Ready!",
          subtitle: "View your challenge results",
          description:
            "The challenge is complete and results are now available.",
          statusColor: "text-green-400",
          statusText: "Results Available",
        };
      default:
        return {
          title: "Please Wait",
          subtitle: "Processing...",
          description: "Please wait for the results phase.",
          statusColor: "text-gray-400",
          statusText: "Waiting",
        };
    }
  };

  const message = getWaitingMessage();

  return (
    <div className="max-w-4xl mx-auto p-4 text-center">
      {/* Countdown Display */}
      <div className="mb-12">
        <CountdownDisplay
          startTime={activeTarget.startTime}
          gameDuration={Number(activeTarget?.gameDuration)}
          revealDuration={Number(activeTarget?.revealDuration)}
          bufferDuration={Number(activeTarget?.bufferDuration)}
          onComplete={handleCountdownComplete}
          onPhaseChange={handlePhaseChange}
        />
      </div>

      {/* Main Message */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-[#7cfc00] mb-4">
          Congratulations!
        </h2>
        <div className="text-3xl font-bold text-white mb-6">
          {message.title}
        </div>
        <p className="text-xl text-white mb-4">{message.subtitle}</p>
      </div>

      {/* Status Indicator */}
      <div className="mb-8">
        <div
          className={`inline-flex items-center space-x-2 bg-gray-800/30 px-6 py-3 rounded-full mb-4`}
        >
          <div
            className={`w-3 h-3 rounded-full animate-pulse ${
              waitingPhase === "waiting-for-reveal"
                ? "bg-blue-500"
                : waitingPhase === "waiting-for-buffer"
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
          ></div>
          <span className={`font-medium ${message.statusColor}`}>
            {message.statusText}
          </span>
        </div>
        <p className="text-gray-300 text-lg mb-6">{message.description}</p>
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
      </div>

      {/* Results Button (only show when ready) */}
      {waitingPhase === "ready-for-results" && (
        <div className="mt-8">
          <button
            onClick={() =>
              router.push(`/challenges/tmc/results?id=${targetId}`)
            }
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-lg"
          >
            View Results
          </button>
        </div>
      )}
    </div>
  );
}
