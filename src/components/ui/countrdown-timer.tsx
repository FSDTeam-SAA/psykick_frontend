"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: string | Date;
  onComplete?: () => void;
}

export default function CountdownTimer({
  endTime,
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  //   const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();

      if (difference <= 0) {
        // setIsComplete(true);
        onComplete?.();
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onComplete]);

  // Format numbers to always have two digits
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-white/70 *:text-black rounded-lg p-3 inline-block">
      <div className="text-center">
        <p className="text-nowrap">Hurry up! Time ends in:</p>
        <div className="flex items-center justify-center gap-1 font-bold">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-medium">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="text-xs">Hours</span>
          </div>
          <span className="text-2xl mx-1">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-medium">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="text-xs">Mins</span>
          </div>
          <span className="text-2xl mx-1">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-medium">
              {formatNumber(timeLeft.seconds)}
            </span>
            <span className="text-xs">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
