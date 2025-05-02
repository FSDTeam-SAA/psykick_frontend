"use client";

import { useState, useEffect } from "react";
import { useARVStore } from "@/store/use-arv-store";

export default function WaitingStage() {
  const { activeTarget, moveToReveal } = useARVStore();
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (activeTarget?.gameTime) {
      const updateTimer = () => {
        const now = new Date();
        const gameTime = new Date(activeTarget.gameTime);
        const diff = Math.max(0, gameTime.getTime() - now.getTime());

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining({ hours, minutes, seconds });

        // If time is up, move to reveal stage
        if (diff <= 0) {
          console.log(
            "Game time reached in waiting stage, moving to reveal stage",
          );
          moveToReveal();
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTarget, moveToReveal]);

  // Check if we should immediately move to reveal stage
  useEffect(() => {
    if (activeTarget?.gameTime) {
      const now = new Date().getTime();
      const gameTime = new Date(activeTarget.gameTime).getTime();

      if (now >= gameTime) {
        console.log(
          "Game time already passed, immediately moving to reveal stage",
        );
        moveToReveal();
      }
    }
  }, [activeTarget, moveToReveal]);

  const formattedGameDate = activeTarget?.gameTime
    ? new Date(activeTarget.gameTime).toLocaleDateString()
    : "";
  const formattedGameTime = activeTarget?.gameTime
    ? new Date(activeTarget.gameTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white">
      <div className="bg-purple-300/30 rounded-lg p-6 mb-8 w-full max-w-md text-center">
        <h2 className="text-xl mb-2">Results reveal in:</h2>
        <div className="flex justify-center">
          <div className="text-5xl font-bold">
            <span>{timeRemaining.hours.toString().padStart(2, "0")}</span>
            <span className="mx-2">:</span>
            <span>{timeRemaining.minutes.toString().padStart(2, "0")}</span>
            <span className="mx-2">:</span>
            <span>{timeRemaining.seconds.toString().padStart(2, "0")}</span>
          </div>
        </div>
        <div className="flex justify-center mt-2 text-sm">
          <span className="w-16 text-center">Hours</span>
          <span className="w-16 text-center">Mins</span>
          <span className="w-16 text-center">Secs</span>
        </div>
      </div>

      <p className="text-center text-lg mb-2">
        Congratulations on completing the target. Please wait for the result.
      </p>
      <p className="text-center mb-4">
        This target will be revealed on {formattedGameDate} at{" "}
        {formattedGameTime}.
      </p>
      <p className="text-center">Game Code: {activeTarget?.code}</p>
      {activeTarget?.eventName && (
        <p className="text-center mt-2">Event: {activeTarget.eventName}</p>
      )}
    </div>
  );
}
