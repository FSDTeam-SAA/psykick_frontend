/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useCallback } from "react";
import { useARVStore } from "@/store/use-arv-store";
import CountdownTimer from "@/components/countdown-timer";
import { calculateTimeLeft } from "@/lib/utils";

export default function ARVWaitingScreen() {
  const { activeTarget, submissionId, moveToReveal } = useARVStore();
  const gameTime = activeTarget?.gameTime;

  const handleTimeUp = useCallback(() => {
    moveToReveal();
  }, [moveToReveal]);

  useEffect(() => {
    if (!gameTime) return;

    const now = new Date().getTime();
    const gameDateTime = new Date(gameTime).getTime();

    if (now >= gameDateTime) {
      handleTimeUp();
      return;
    }

    // Set up interval to check time
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(gameTime);
      if (timeLeft.total <= 0) {
        clearInterval(interval);
        handleTimeUp();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameTime, handleTimeUp]);

  if (!gameTime || !submissionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">
            Missing game time or submission information.
          </p>
          <button
            onClick={() => useARVStore.getState().resetChallenge()}
            className="mt-4 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Return to Drawing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Your Prediction is Locked In!
        </h1>

        <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl text-white mb-6">Time Until Reveal:</h2>
          <div className="flex justify-center">
            <CountdownTimer targetDate={gameTime} onComplete={handleTimeUp} />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <p className="text-lg text-gray-800 mb-4">
            Your prediction has been successfully recorded. The result will be
            revealed when the countdown reaches zero.
          </p>
          <p className="text-gray-600">
            You can close this window and come back later - we&apos;ll send you
            a notification when the results are ready!
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => useARVStore.getState().resetChallenge()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Another Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
