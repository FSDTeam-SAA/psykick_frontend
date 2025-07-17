"use client";

import { useEffect, useState } from "react";

interface CountdownDisplayProps {
  minutes: string;
  onComplete?: () => void;
}

export default function CountdownDisplay({
  minutes,
  onComplete,
}: CountdownDisplayProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Parse minutes string to number
    const totalMinutes = parseInt(minutes, 10);

    // Validate input
    if (isNaN(totalMinutes) || totalMinutes <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      onComplete?.();
      return;
    }

    // Calculate target date from minutes
    const targetDate = new Date();
    targetDate.setMinutes(targetDate.getMinutes() + totalMinutes);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        onComplete?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, onComplete]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      <div className="bg-purple-800/30 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">
          {formatNumber(timeLeft.days)}
        </div>
        <div className="text-sm text-gray-300">Days</div>
      </div>
      <div className="bg-purple-800/30 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">
          {formatNumber(timeLeft.hours)}
        </div>
        <div className="text-sm text-gray-300">Hours</div>
      </div>
      <div className="bg-purple-800/30 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">
          {formatNumber(timeLeft.minutes)}
        </div>
        <div className="text-sm text-gray-300">Minutes</div>
      </div>
      <div className="bg-purple-800/30 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">
          {formatNumber(timeLeft.seconds)}
        </div>
        <div className="text-sm text-gray-300">Seconds</div>
      </div>
    </div>
  );
}
