"use client";

import { useState, useEffect } from "react";
import { useARVStore } from "@/store/use-arv-store";
import EnhancedDrawingCanvas from "./enhanced-drawing-canvas";
import CountdownTimer from "./countdown-timer";

export default function DrawingStage() {
  const { activeTarget, submitImpression } = useARVStore();
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (activeTarget?.gameDuration) {
      const updateTimer = () => {
        const now = new Date();
        const gameTime = new Date(activeTarget.gameDuration);
        const diff = Math.max(0, gameTime.getTime() - now.getTime());

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining({ hours, minutes, seconds });
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTarget]);

  const handleSubmitImpression = () => {
    console.log("Submit impression button clicked");
    submitImpression();
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-xl font-semibold mb-4">
        Step inside, trust your senses, and begin your journey into the unseen.
      </h1>

      <div className="flex flex-col sm:flex-row justify-between w-full mb-4">
        <div>
          <p>Code: {activeTarget?.code}</p>
          <p>
            Reveal Time:{" "}
            {new Date(activeTarget?.gameTime || "").toLocaleDateString()}
          </p>
        </div>

        <div className="bg-purple-800 rounded-lg p-2 text-center">
          <p className="text-xs mb-1">Your Time ends in:</p>
          <CountdownTimer
            hours={timeRemaining.hours}
            minutes={timeRemaining.minutes}
            seconds={timeRemaining.seconds}
          />
        </div>
      </div>

      <h2 className="text-lg mb-4">Draw Your Impressions:</h2>

      <div className="w-full bg-white rounded-lg overflow-hidden">
        <EnhancedDrawingCanvas mode="arv" />
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          onClick={() => {
            // Clear canvas functionality is handled in the canvas component
          }}
        >
          Clear Canvas
        </button>

        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
          onClick={handleSubmitImpression}
        >
          Submit Impression
        </button>
      </div>
    </div>
  );
}
