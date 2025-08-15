"use client";

import { useARVStore } from "@/store/use-arv-store";
import { CountdownTimer } from "./countdown-timer";
import Image from "next/image";

export function RevealStage() {
  const { currentEvent, selectedImage, getRevealTimeRemaining } = useARVStore();

  if (!currentEvent) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white">Event Reveal</h1>

        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-400">
            Reveal Time Remaining:
          </p>
          <CountdownTimer
            targetTime={new Date(
              Date.now() + getRevealTimeRemaining(),
            ).toISOString()}
            className="text-blue-400 text-2xl font-mono"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white">
            {currentEvent.eventName}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {currentEvent.eventDescription}
          </p>
        </div>

        {selectedImage && (
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Your Selected Image
            </h3>
            <div className="border border-gray-700 rounded-lg p-4 bg-gray-900/50">
              <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.description}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-400 text-center">
                {selectedImage.description}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <p className="text-xl font-medium text-white">
            Please wait for the outcome time.
          </p>

          <div className="p-6 border border-gray-700 rounded-lg bg-gray-900/50 max-w-md mx-auto">
            <p className="text-sm font-medium mb-2 text-gray-400">
              Outcome Phase Starts:
            </p>
            <p className="text-xl font-mono text-white">
              {new Date(currentEvent.outcomeTime).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
