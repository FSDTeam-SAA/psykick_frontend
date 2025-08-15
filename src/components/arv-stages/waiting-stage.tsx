"use client";

import { useARVStore } from "@/store/use-arv-store";
import { CountdownTimer } from "./countdown-timer";
import { CheckCircle } from "lucide-react";

export function WaitingStage() {
  const { currentEvent, getGameTimeRemaining } = useARVStore();

  if (!currentEvent) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-green-400">
          Congratulations on completing the ARV challenge!
        </h1>

        <p className="text-lg text-gray-300">
          You have successfully submitted your drawing and image selection.
          Please wait for the reveal phase to begin.
        </p>

        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-400">
            Game Time Remaining:
          </p>
          <CountdownTimer
            targetTime={new Date(
              Date.now() + getGameTimeRemaining(),
            ).toISOString()}
            className="text-blue-400 text-2xl font-mono"
          />
        </div>

        <div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-900/50">
          <p className="text-sm font-medium mb-2 text-gray-400">
            Reveal Phase Starts:
          </p>
          <p className="text-xl font-mono text-white">
            {new Date(currentEvent.revealTime).toLocaleString()}
          </p>
        </div>

        <div className="text-sm text-gray-500">
          The page will automatically redirect when the reveal phase begins.
        </div>
      </div>
    </div>
  );
}
