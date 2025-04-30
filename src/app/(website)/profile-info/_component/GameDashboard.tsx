"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TemperatureBar } from "./temperature-bar";
import { LevelIndicator } from "./level-indicator";
import { WaterBar } from "./water-bar";

type GameDashboardProps = {
  totalScore: number; // or `number | undefined` if profileData.totalPoints might be undefined
};
export default function GameDashboard({ totalScore }: GameDashboardProps) {
  const [temperature, setTemperature] = useState(275);

  console.log(setTemperature);
  console.log("tota",totalScore);

  return (
    <div className="w-full flex items-center justify-center">
      <Card className="p-16 w-full max-w-3xl bg-transparent border-none">
        <div className="flex flex-col md:flex-row items-center justify-between gap-0">
          {/* Left side - Temperature Bar */}
          <TemperatureBar temperature={temperature} />

          {/* Middle section - Levels */}
          <div className="flex flex-col items-center justify-center h-80 py-4 ">
            <div className="w-full border-dashed border-b-2 border-white py-8">
              <LevelIndicator
                title="APPRENTICE"
                bgColor="bg-yellow-400"
                imageSrc="/assets/profile/apprentice.png"
              />
            </div>

            <div className="w-full border-dashed border-b-2 border-white py-8">
              <LevelIndicator
                title="INITIATE"
                bgColor="bg-orange-400"
                imageSrc="/assets/profile/initiate.png"
              />
            </div>

            <div className="pt-8">
              <LevelIndicator
                title="NOVICE SEEKER"
                bgColor="bg-red-500"
                imageSrc="/assets/profile/novice.png"
              />
            </div>
          </div>

          {/* Right side - Bud Bud Bar */}
          <WaterBar  totalScore={totalScore} />
        </div>
      </Card>
    </div>
  );
}
