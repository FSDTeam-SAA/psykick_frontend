"use client";

import { useEffect } from "react";
import { useARVStore } from "@/store/use-arv-store";
import { DrawingStage } from "./drawing-stage";
import { SelectionStage } from "./selection-stage";
import { WaitingStage } from "./waiting-stage";
import { RevealStage } from "./reveal-stage";
import { ResultsStage } from "./results-stage";

export function ARVPrediction() {
  const {
    currentEvent,
    currentStage,
    setCurrentStage,
    getCurrentPhase,
    shouldForceExit,
    selectedImage,
  } = useARVStore();

  useEffect(() => {
    const checkPhaseTransition = () => {
      if (!currentEvent) return;

      const currentPhase = getCurrentPhase();

      // Force exit users who didn't participate
      // if (shouldForceExit()) {
      //   alert("You did not participate in the game time. Exiting...");
      //   return;
      // }

      // Auto-transition stages based on current phase
      switch (currentPhase) {
        case "game":
          // During game time, allow manual transitions between draw/select/waiting
          // Don't auto-transition within game phase
          if (currentStage === "reveal" || currentStage === "results") {
            setCurrentStage("draw");
          }
          break;
        case "reveal":
          if (currentStage !== "reveal") {
            setCurrentStage("reveal");
          }
          break;
        case "outcome":
          if (currentStage !== "results") {
            setCurrentStage("results");
          }
          break;
      }
    };

    const interval = setInterval(checkPhaseTransition, 1000);
    return () => clearInterval(interval);
  }, [
    currentEvent,
    currentStage,
    getCurrentPhase,
    shouldForceExit,
    setCurrentStage,
  ]);

  if (!currentEvent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto px-4">
        <div className="text-white text-xl text-center mb-4">
          No active challenges available at the moment.
        </div>
        <div className="text-purple-300 text-center">
          You have no active targets at the moment. Please check back later or
          contact support if you believe this is an error.
        </div>
      </div>
    );
  }

  const currentPhase = getCurrentPhase();

  if (currentPhase !== "game" && !selectedImage) {
    return (
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-yellow-400 md:text-4xl text-xl font-black">
          You didn&apos;t participate in the current game!
        </h1>
        <p className="text-white ml-4">
          Please wait for the next game or check back later!
        </p>
      </div>
    );
  }

  switch (currentStage) {
    case "draw":
      return <DrawingStage />;
    case "select":
      return <SelectionStage />;
    case "waiting":
      return <WaitingStage />;
    case "reveal":
      return <RevealStage />;
    case "results":
      return <ResultsStage />;
    default:
      return <DrawingStage />;
  }
}
