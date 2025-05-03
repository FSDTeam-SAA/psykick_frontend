"use client";

import { useEffect, useState } from "react";
import { calculateTimeLeft } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string | Date;
  onComplete?: () => void;
}

export default function CountdownTimer({
  targetDate,
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  return (
    <div className="mt-4 flex items-center justify-center gap-4 text-4xl font-bold">
      <div className="flex flex-col items-center">
        <span className="text-white">
          {timeLeft.hours.toString().padStart(2, "0")}
        </span>
        <span className="text-sm text-gray-300">Hours</span>
      </div>
      <span className="text-white">:</span>
      <div className="flex flex-col items-center">
        <span className="text-white">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </span>
        <span className="text-sm text-gray-300">Minutes</span>
      </div>
      <span className="text-white">:</span>
      <div className="flex flex-col items-center">
        <span className="text-white">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
        <span className="text-sm text-gray-300">Seconds</span>
      </div>
    </div>
  );
}
