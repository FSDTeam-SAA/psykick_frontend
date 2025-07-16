"use client";

import { useState, useEffect } from "react";
import { useARVStore } from "@/store/use-arv-store";
import DrawingStage from "./drawing-stage";
import SelectionStage from "./selection-stage";
import WaitingStage from "./waiting-stage";
import RevealStage from "./reveal-stage";
import ResultsStage from "./results-stage";
import { RefreshCw } from "lucide-react";
import moment from "moment";

export default function ARVPrediction() {
  const { stage, activeTarget, resetGameState, moveToReveal, updatePoints } =
    useARVStore();
  const [mounted, setMounted] = useState(false);

  const now = moment();
  // const isRevealTime = activeTarget?.revealDuration;
  // const isGameTime = ;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check stage transitions on component mount
  useEffect(() => {
    if (!mounted || !activeTarget) return;

    // const now = new Date().getTime();

    console.log("Current time:", now.toISOString());

    // Check if we should be in waiting stage
    if (stage === "drawing" || stage === "selection") {
      const hasSubmitted = useARVStore.getState().hasSubmitted;
      if (hasSubmitted) {
        console.log("User has already submitted, moving to waiting stage");
        useARVStore.getState().setStage("waiting");
      }
    }

    // Check if we should be in reveal stage
    if (stage === "waiting" && !activeTarget?.gameDuration) {
      // const gameTime = new Date(activeTarget.gameTime).getTime();
      if (!activeTarget?.gameDuration) {
        console.log("Game time already passed, moving to reveal stage");
        moveToReveal();
      }
    }

    // Check if we should be in results stage
    if (stage === "reveal" && !activeTarget.revealDuration) {
      // const revealTime = new Date(activeTarget.revealTime).getTime();
      if (activeTarget.revealDuration) {
        console.log("Reveal time already passed, moving to results stage");
        updatePoints();
      }
    }
  }, [
    mounted,
    stage,
    activeTarget,
    moveToReveal,
    updatePoints,
    now,
    activeTarget?.gameDuration,
    activeTarget?.revealDuration,
  ]);

  // Continuous check for stage transitions
  useEffect(() => {
    if (!activeTarget) return;

    const checkTimesInterval = setInterval(() => {
      const now = new Date().getTime();

      // Check for waiting -> reveal transition
      if (stage === "waiting" && activeTarget.gameTime) {
        const gameTime = new Date(activeTarget.gameTime).getTime();

        console.log("Checking game time:", {
          now: new Date(now).toLocaleString(),
          gameTime: new Date(gameTime).toLocaleString(),
          timeLeft: Math.floor((gameTime - now) / 1000) + " seconds",
          stage: stage,
        });

        if (now >= gameTime) {
          console.log("Game time reached, moving to reveal stage");
          moveToReveal();
        }
      }

      // Check for reveal -> results transition
      if (stage === "reveal" && activeTarget.revealTime) {
        const revealTime = new Date(activeTarget.revealTime).getTime();

        console.log("Checking reveal time:", {
          now: new Date(now).toLocaleString(),
          revealTime: new Date(revealTime).toLocaleString(),
          timeLeft: Math.floor((revealTime - now) / 1000) + " seconds",
          stage: stage,
        });

        if (now >= revealTime) {
          console.log("Reveal time reached, moving to results stage");
          updatePoints();
        }
      }
    }, 1000);

    return () => clearInterval(checkTimesInterval);
  }, [stage, activeTarget, moveToReveal, updatePoints]);

  console.warn(activeTarget);

  if (!mounted) return null;

  if (activeTarget === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
        <h1 className="text-2xl font-bold mb-4">No Active ARV Challenge</h1>
        <p>
          There are no active ARV challenges at the moment. Please check back
          later.
        </p>
      </div>
    );
  }

  console.log("Current stage:", stage);

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-white">
          ARV Prediction Challenge
        </h1>
        {stage !== "drawing" && (
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to restart this challenge? All your progress will be lost.",
                )
              ) {
                resetGameState();
              }
            }}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
            aria-label="Restart challenge"
          >
            <RefreshCw size={16} />
            <span>Restart</span>
          </button>
        )}
      </div>

      {stage === "drawing" && <DrawingStage />}
      {stage === "selection" && <SelectionStage />}
      {stage === "waiting" && <WaitingStage />}
      {stage === "reveal" && <RevealStage />}
      {stage === "results" && <ResultsStage />}
    </div>
  );
}
