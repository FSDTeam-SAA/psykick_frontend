"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useTMCResult, useActiveTMCTarget } from "@/hooks/use-tmc-queries";
import { Button } from "../ui/button";
import CountdownDisplay from "./countdown-display";
import NextGameMessage from "./next-game-component";

export default function Results() {
  const { setActiveTab, targetId } = useChallengeStore();
  const { data: results, isLoading } = useTMCResult(targetId || "");
  const { data: activeTarget } = useActiveTMCTarget();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Calculate phase times
  const startTime = activeTarget?.startTime
    ? moment(activeTarget.startTime)
    : null;
  const gameEnd = startTime
    ?.clone()
    .add(activeTarget?.gameDuration || 0, "minutes");
  const revealEnd = gameEnd
    ?.clone()
    .add(activeTarget?.revealDuration || 0, "minutes");

  // Check if we should redirect to buffer phase
  useEffect(() => {
    if (!startTime || !revealEnd) return;

    const checkPhaseEnd = () => {
      const now = moment();
      if (now.isSameOrAfter(revealEnd)) {
        setShouldRedirect(true);
      }
    };

    checkPhaseEnd();
    const interval = setInterval(checkPhaseEnd, 1000);
    return () => clearInterval(interval);
  }, [startTime, revealEnd]);

  const handleCountdownComplete = () => {
    // When reveal phase ends, redirect to buffer phase (handled by parent component)
    setShouldRedirect(true);
  };

  const handlePhaseChange = (
    phase: "waiting" | "game" | "reveal" | "buffer" | "completed",
  ) => {
    // When buffer phase starts, trigger redirect
    if (phase === "buffer") {
      setShouldRedirect(true);
    }
  };

  // If should redirect, let parent component handle it
  if (shouldRedirect) {
    return <NextGameMessage activeTarget={activeTarget} />;
  }

  if (isLoading || !results?.data) {
    return (
      <div className="max-w-4xl mx-auto p-4 flex flex-col items-center justify-center text-[#ECECEC] min-h-[60vh]">
        <h2 className="md:text-3xl text-xl lg:text-5xl text-center font-semibold mb-8">
          Loading Results...
        </h2>
        <p className="text-lg mb-8">
          Please wait while we process your results
        </p>

        {activeTarget && (
          <div className="mb-8">
            <CountdownDisplay
              startTime={activeTarget.startTime}
              gameDuration={Number(activeTarget?.gameDuration)}
              revealDuration={Number(activeTarget?.revealDuration)}
              bufferDuration={Number(activeTarget?.bufferDuration)}
              onComplete={handleCountdownComplete}
              onPhaseChange={handlePhaseChange}
              mode="full"
            />
          </div>
        )}

        <div className="flex justify-center items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    );
  }

  const { firstChoiceImage, secondChoiceImage, points } = results.data;

  return (
    <div className="container mx-auto p-4">
      {/* Reveal Phase Countdown */}
      {activeTarget && (
        <div className="mb-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient px-6 py-3 rounded-full mb-6">
            <div className="w-2 h-2  bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">Reveal Phase Active</span>
          </div>
          <CountdownDisplay
            startTime={activeTarget.startTime}
            gameDuration={Number(activeTarget?.gameDuration)}
            revealDuration={Number(activeTarget?.revealDuration)}
            bufferDuration={0}
            onComplete={handleCountdownComplete}
            onPhaseChange={handlePhaseChange}
            mode="full"
          />
        </div>
      )}

      <h2 className="text-3xl font-semibold text-[#ECECEC] mb-8 text-center">
        Feedback for Target Code: {activeTarget?.code}
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-8">
        {/* First Choice */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-medium text-[#ECECEC]">
            Your 1st choice was:
          </h3>
          <div className="aspect-[4/3] relative w-[370px] h-[278px] rounded-xl overflow-hidden">
            <Image
              src={firstChoiceImage}
              alt="First choice"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Second Choice */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-medium text-[#ECECEC]">
            Your 2nd choice was:
          </h3>
          <div className="aspect-[4/3] relative w-[370px] h-[278px] rounded-xl overflow-hidden">
            <Image
              src={secondChoiceImage}
              alt="Second choice"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Result Summary */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-medium text-[#ECECEC]">
              Target Image:
            </h3>
            <div className="aspect-[4/3] relative w-[370px] h-[278px] rounded-xl overflow-hidden">
              <Image
                src={activeTarget?.targetImage || ""}
                alt="Target image"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-end gap-8 w-[370px] h-[278px]">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-red-400">
                {points === 25 ? (
                  <span className="text-green-500">
                    Congratulations! 🎉🎊🎊 You matched the Target on your 1st
                    choice. You received 25 points!
                  </span>
                ) : points === 15 ? (
                  <span className="text-lime-500">
                    Good job! You matched the Target on your 2nd choice. You
                    received 15 points!
                  </span>
                ) : (
                  "Unfortunately, you didn't match the Target. -10 points."
                )}
              </h3>
            </div>

            <Button
              onClick={() => setActiveTab("leaderboard")}
              className="inline-flex justify-center items-center px-6 py-4 bg-[#8F37FF] text-white rounded-xl hover:bg-[#7B2CE0] transition-colors w-[270px] font-medium text-xl"
            >
              See Leaderboard
            </Button>
          </div>
        </div>
      </div>

      {/* Time remaining notification */}
      {/* <div className="text-center mt-8">
        <div className="bg-blue-900/20 p-4 rounded-lg max-w-md mx-auto">
          <p className="text-blue-300 font-medium mb-2">Results Phase Active</p>
          <p className="text-gray-300 text-sm">
            You can view your results until the buffer phase begins. The next
            challenge information will be available after this phase ends.
          </p>
        </div>
      </div> */}
    </div>
  );
}
