/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useCallback } from "react";
import { useARVStore } from "@/store/use-arv-store";
import { useUpdateARVPoints } from "@/hooks/use-arv-queries";
import moment from "moment";

export default function ARVWaitingScreen() {
  const { revealTime, submissionId, setStage } = useARVStore();
  const updatePoints = useUpdateARVPoints(submissionId || "");

  const handleRevealTimeReached = useCallback(async () => {
    try {
      await updatePoints.mutateAsync();
      setStage("results");
    } catch (error) {
      console.error("Error updating points:", error);
    }
  }, [updatePoints, setStage]);

  useEffect(() => {
    if (!revealTime) return;

    const interval = setInterval(() => {
      const now = moment();
      const reveal = moment(revealTime);
      const duration = moment.duration(reveal.diff(now));

      if (duration.asMilliseconds() <= 0) {
        clearInterval(interval);
        handleRevealTimeReached();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [revealTime, handleRevealTimeReached]);

  const formatTimeLeft = () => {
    if (!revealTime) return "Loading...";

    const now = moment();
    const reveal = moment(revealTime);
    const duration = moment.duration(reveal.diff(now));

    if (duration.asMilliseconds() <= 0) {
      return "Time's up!";
    }

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Waiting for Results</h1>
      <div className="text-6xl font-mono mb-8">{formatTimeLeft()}</div>
      <p className="text-lg text-center max-w-md">
        Your submission has been recorded. The results will be revealed when the
        countdown ends.
      </p>
    </div>
  );
}
