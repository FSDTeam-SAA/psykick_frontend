"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = targetDate.getTime() - now.getTime();

      if (distance <= 0) {
        setHours("00");
        setMinutes("00");
        setSeconds("00");
        clearInterval(interval);
        return;
      }

      const hoursValue = Math.floor(distance / (1000 * 60 * 60));
      const minutesValue = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60),
      );
      const secondsValue = Math.floor((distance % (1000 * 60)) / 1000);

      setHours(hoursValue.toString().padStart(2, "0"));
      setMinutes(minutesValue.toString().padStart(2, "0"));
      setSeconds(secondsValue.toString().padStart(2, "0"));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-purple-200 bg-opacity-30 rounded-xl p-6 mb-8 max-w-md mx-auto">
      <h2 className="text-center text-xl text-purple-100 mb-2">
        Your Time ends In:
      </h2>
      <div className="flex justify-center gap-2 text-6xl font-bold text-center">
        <div className="flex flex-col items-center">
          <span className="text-purple-900">{hours}</span>
          <span className="text-sm text-purple-300 font-normal">Hours</span>
        </div>
        <span className="text-purple-900">:</span>
        <div className="flex flex-col items-center">
          <span className="text-purple-900">{minutes}</span>
          <span className="text-sm text-purple-300 font-normal">Mins</span>
        </div>
        <span className="text-purple-900">:</span>
        <div className="flex flex-col items-center">
          <span className="text-purple-900">{seconds}</span>
          <span className="text-sm text-purple-300 font-normal">Secs</span>
        </div>
      </div>
    </div>
  );
}
