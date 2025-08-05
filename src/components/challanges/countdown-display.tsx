"use client";

import { useEffect, useState } from "react";
import moment from "moment";

interface CountdownDisplayProps {
  startTime: string;
  gameDuration: number;
  revealDuration: number;
  bufferDuration: number;
  onComplete?: () => void;
  onPhaseChange?: (
    phase: "waiting" | "game" | "reveal" | "buffer" | "completed",
  ) => void;
}

export default function CountdownDisplay({
  startTime,
  gameDuration,
  revealDuration,
  bufferDuration,
  onComplete,
  onPhaseChange,
}: CountdownDisplayProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [currentPhase, setCurrentPhase] = useState<
    "waiting" | "game" | "reveal" | "buffer" | "completed"
  >("waiting");
  const [phaseLabel, setPhaseLabel] = useState<string>("Waiting to Start");

  useEffect(() => {
    // Calculate all phase end times
    const start = moment(startTime);
    const gameEnd = start.clone().add(gameDuration, "minutes");
    const revealEnd = gameEnd.clone().add(revealDuration, "minutes");
    const bufferEnd = revealEnd.clone().add(bufferDuration, "minutes");

    const calculateTimeLeft = () => {
      const now = moment();
      let targetTime: moment.Moment;
      let phase: "waiting" | "game" | "reveal" | "buffer" | "completed";
      let label: string;

      // Determine current phase and target time
      if (now.isBefore(start)) {
        phase = "waiting";
        label = "Challenge Starting Soon";
        targetTime = start;
      } else if (now.isBefore(gameEnd)) {
        phase = "game";
        label = "Game Phase - Draw & Select";
        targetTime = gameEnd;
      } else if (now.isBefore(revealEnd)) {
        phase = "reveal";
        label = "Processing Results";
        targetTime = revealEnd;
      } else if (now.isBefore(bufferEnd)) {
        phase = "buffer";
        label = "Viewing Results";
        targetTime = bufferEnd;
      } else {
        phase = "completed";
        label = "Challenge Completed";
        onComplete?.();
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          phase,
          label,
        };
      }

      // Update phase if changed
      if (phase !== currentPhase) {
        setCurrentPhase(phase);
        setPhaseLabel(label);
        onPhaseChange?.(phase);
      }

      const difference = targetTime.diff(now);

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          phase,
          label,
        };
      }

      const duration = moment.duration(difference);

      return {
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
        phase,
        label,
      };
    };

    const result = calculateTimeLeft();
    setTimeLeft({
      days: result.days,
      hours: result.hours,
      minutes: result.minutes,
      seconds: result.seconds,
    });

    const timer = setInterval(() => {
      const newResult = calculateTimeLeft();
      setTimeLeft({
        days: newResult.days,
        hours: newResult.hours,
        minutes: newResult.minutes,
        seconds: newResult.seconds,
      });

      if (newResult.phase === "completed") {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [
    startTime,
    gameDuration,
    revealDuration,
    bufferDuration,
    onComplete,
    onPhaseChange,
    currentPhase,
  ]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "waiting":
        return "bg-gray-800/30 border border-gray-600/50";
      case "game":
        return "bg-green-800/30 border border-green-600/50";
      case "reveal":
        return "bg-blue-800/30 border border-blue-600/50";
      case "buffer":
        return "bg-yellow-800/30 border border-yellow-600/50";
      case "completed":
        return "bg-purple-800/30 border border-purple-600/50";
      default:
        return "bg-purple-800/30";
    }
  };

  return (
    <div className="text-center">
      <div className={`mb-4 p-3 rounded-lg ${getPhaseColor()}`}>
        <h3 className="text-lg font-bold text-white">{phaseLabel}</h3>
        <p className="text-sm text-gray-300">
          {currentPhase === "completed"
            ? "All phases completed"
            : `Time remaining in ${phaseLabel.toLowerCase()}`}
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
