"use client";

import { useEffect } from "react";
import { useChallengeStore } from "@/store/use-challenge-store";

export default function Timer() {
  const { timer, setTimer } = useChallengeStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
        clearInterval(interval);
        return;
      }

      let newHours = timer.hours;
      let newMinutes = timer.minutes;
      let newSeconds = timer.seconds - 1;

      if (newSeconds < 0) {
        newSeconds = 59;
        newMinutes -= 1;
      }

      if (newMinutes < 0) {
        newMinutes = 59;
        newHours -= 1;
      }

      setTimer(newHours, newMinutes, newSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setTimer]);

  return (
    <div className="bg-purple-200 rounded-lg p-4 text-center">
      <p className="text-purple-900 mb-2">Your Time ends In:</p>
      <div className="flex justify-center items-center text-5xl font-bold text-black">
        <div className="flex flex-col items-center">
          <span>{String(timer.hours).padStart(2, "0")}</span>
          <span className="text-xs mt-1">Hours</span>
        </div>
        <span className="mx-2">:</span>
        <div className="flex flex-col items-center">
          <span>{String(timer.minutes).padStart(2, "0")}</span>
          <span className="text-xs mt-1">Mins</span>
        </div>
        <span className="mx-2">:</span>
        <div className="flex flex-col items-center">
          <span>{String(timer.seconds).padStart(2, "0")}</span>
          <span className="text-xs mt-1">Secs</span>
        </div>
      </div>
    </div>
  );
}
