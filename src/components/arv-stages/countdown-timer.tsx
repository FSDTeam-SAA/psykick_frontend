"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetTime: string; // ISO timestamp
  onComplete?: () => void;
  className?: string;
}

export function CountdownTimer({
  targetTime,
  onComplete,
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  }>({ hours: 0, minutes: 0, seconds: 0, total: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetTime).getTime();
      const difference = target - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds, total: difference });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, total: 0 });
        if (onComplete) {
          onComplete();
        }
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetTime, onComplete]);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div className={`text-center ${className}`}>
      <div className="flex gap-2 text-white justify-center items-center">
        <div className="bg-[#170a2c42] px-4 py-2 rounded">
          <span className="text-lg">{formatTime(timeLeft.hours)}</span>
          <span className="text-xs block">Hours</span>
        </div>
        <span className="text-lg">:</span>
        <div className="bg-[#170a2c42] px-4 py-2 rounded">
          <span className="text-lg">{formatTime(timeLeft.minutes)}</span>
          <span className="text-xs block">Mins</span>
        </div>
        <span className="text-lg">:</span>
        <div className="bg-[#170a2c42] px-4 py-2 rounded">
          <span className="text-lg">{formatTime(timeLeft.seconds)}</span>
          <span className="text-xs block">Secs</span>
        </div>
      </div>
    </div>
  );
}
