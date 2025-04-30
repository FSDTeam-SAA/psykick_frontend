"use client";

interface CountdownTimerProps {
  targetDate: {
    hours: string;
    mins: string;
    secs: string;
  };
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  return (
    <div className="mt-4 flex items-center justify-center gap-4 text-4xl font-bold">
      <div className="flex flex-col items-center">
        <span className="text-white">{targetDate.hours}</span>
        <span className="text-sm text-gray-300">Hours</span>
      </div>
      <span className="text-white">:</span>
      <div className="flex flex-col items-center">
        <span className="text-white">{targetDate.mins}</span>
        <span className="text-sm text-gray-300">Minutes</span>
      </div>
      <span className="text-white">:</span>
      <div className="flex flex-col items-center">
        <span className="text-white">{targetDate.secs}</span>
        <span className="text-sm text-gray-300">Seconds</span>
      </div>
    </div>
  );
}
