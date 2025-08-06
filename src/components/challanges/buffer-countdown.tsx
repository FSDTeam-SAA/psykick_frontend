"use client";

import { useEffect, useState } from "react";

interface BufferCountdownProps {
  nextGameStartTime: Date;
  onComplete: () => void;
}

export default function BufferCountdown({
  nextGameStartTime,
  onComplete,
}: BufferCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = nextGameStartTime.getTime() - now.getTime();

      if (difference <= 0) {
        onComplete();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / (24 * 3600));
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return { days, hours, minutes, seconds };
    };

    const result = calculateTimeLeft();
    setTimeLeft(result);

    const timer = setInterval(() => {
      const newResult = calculateTimeLeft();
      setTimeLeft(newResult);
    }, 1000);

    return () => clearInterval(timer);
  }, [nextGameStartTime, onComplete]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="text-center">
      <div className="mb-4 p-3 rounded-lg bg-purple-800/30 border border-purple-600/50">
        <h3 className="text-lg font-bold text-white">Next Game Starts In</h3>
        <p className="text-sm text-gray-300">
          {nextGameStartTime.toLocaleString()}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
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
    </div>
  );
}
