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
  } = useARVStore();

  useEffect(() => {
    const checkPhaseTransition = () => {
      if (!currentEvent) return;

      const currentPhase = getCurrentPhase();

      // Force exit users who didn't participate
      if (shouldForceExit()) {
        alert("You did not participate in the game time. Exiting...");
        return;
      }

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-4">Loading ARV Challenge...</h2>
          <p className="text-purple-200">Connecting to server...</p>
        </div>
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
