"use client";

import { useEffect, useState } from "react";
import EnhancedDrawingCanvas from "@/components/challanges/EnhancedDrawingCanvas";
import ImageSelection from "@/components/challanges/image-selection";
import TMCInfoModal from "@/components/challanges/tmc-info-modal";
import WaitingScreen from "@/components/challanges/waiting-screen";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useActiveTMCTarget } from "@/hooks/use-tmc-queries";
import moment from "moment";
import Results from "@/components/challanges/results";
import CountdownDisplay from "@/components/challanges/countdown-display";
import NextGameMessage from "@/components/challanges/next-game-component";

type GamePhase = "waiting" | "game" | "reveal" | "buffer" | "completed";

export default function TargetMatchChallenge() {
  const { submitted, clearCanvas, submitImpression, setTargetData } =
    useChallengeStore();

  const [currentPhase, setCurrentPhase] = useState<GamePhase>("waiting");
  const [phaseTransitioning, setPhaseTransitioning] = useState(false);
  const { data: activeTarget, isLoading } = useActiveTMCTarget();

  // Set target data when it's loaded
  useEffect(() => {
    if (activeTarget) {
      setTargetData(activeTarget);
    }
  }, [activeTarget, setTargetData]);

  // Calculate phase times using moment
  const startTime = activeTarget?.startTime
    ? moment(activeTarget.startTime)
    : null;
  const gameEnd = startTime
    ?.clone()
    .add(activeTarget?.gameDuration || 0, "minutes");
  const revealEnd = gameEnd
    ?.clone()
    .add(activeTarget?.revealDuration || 0, "minutes");
  const bufferEnd = revealEnd
    ?.clone()
    .add(activeTarget?.bufferDuration || 0, "minutes");

  // Determine current phase based on time
  useEffect(() => {
    if (!startTime) return;

    const updatePhase = () => {
      const now = moment();
      let newPhase: GamePhase;

      if (now.isBefore(startTime)) {
        newPhase = "waiting";
      } else if (now.isBefore(gameEnd)) {
        newPhase = "game";
      } else if (now.isBefore(revealEnd)) {
        newPhase = "reveal";
      } else if (now.isBefore(bufferEnd)) {
        newPhase = "buffer";
      } else {
        newPhase = "completed";
      }

      if (newPhase !== currentPhase) {
        setPhaseTransitioning(true);
        setTimeout(() => {
          setCurrentPhase(newPhase);
          setPhaseTransitioning(false);
        }, 500); // Smooth transition delay
      }
    };

    // Update immediately
    updatePhase();

    // Set up interval to check phase changes
    const interval = setInterval(updatePhase, 1000);
    return () => clearInterval(interval);
  }, [startTime, gameEnd, revealEnd, bufferEnd, currentPhase]);

  const handlePhaseChange = (phase: GamePhase) => {
    console.log("Phase changing to:", phase);
    if (phase !== currentPhase) {
      setPhaseTransitioning(true);
      setTimeout(() => {
        setCurrentPhase(phase);
        setPhaseTransitioning(false);
      }, 300);
    }
  };

  const handleCountdownComplete = () => {
    console.log("Countdown completed");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-xl">Loading challenge...</div>
      </div>
    );
  }

  // No active target
  if (!activeTarget) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto px-4">
        <div className="text-white text-xl text-center mb-4">
          No active challenges available at the moment.
        </div>
        <div className="text-purple-300 text-center">
          You have no active targets at the moment. Please check back later
        </div>
      </div>
    );
  }

  // Show transition overlay
  if (phaseTransitioning) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-xl animate-pulse">
          Transitioning to next phase...
        </div>
      </div>
    );
  }

  // Render based on current phase
  const renderPhaseContent = () => {
    switch (currentPhase) {
      case "waiting":
        return (
          <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <h1 className="text-white text-3xl mb-6 text-center">
                Challenge Starting Soon
              </h1>
              <div className="text-purple-300 text-center mb-8 text-lg">
                Code: <span className="font-bold">{activeTarget.code}</span>
              </div>
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
              <div className="text-center text-gray-300">
                <p>
                  Get ready to draw your impressions and select matching images!
                </p>
              </div>
            </div>
          </div>
        );

      case "game":
        // If user has submitted, show waiting screen during game phase
        if (submitted) {
          return <WaitingScreen />;
        }

        return (
          <div className="container mx-auto p-4">
            <h1 className="challange-title mb-6">
              Clear your thoughts, tune in, and let your perception guide you.
            </h1>

            {/* Event Details  */}
            <div className="flex justify-between items-center w-full md:w-1/2 gap-6 my-12">
              <div>
                <p className="challange-subTitle mb-2">
                  Code: {activeTarget.code}
                </p>
                <p className="challange-subTitle mb-2">
                  Start Time: {startTime?.format("MMM DD, YYYY HH:mm")}
                </p>
              </div>
              <CountdownDisplay
                startTime={activeTarget.startTime}
                gameDuration={Number(activeTarget?.gameDuration)}
                revealDuration={Number(activeTarget?.revealDuration)}
                bufferDuration={Number(activeTarget?.bufferDuration)}
                onComplete={handleCountdownComplete}
                onPhaseChange={handlePhaseChange}
                mode="game-only"
              />
            </div>

            {/* Game Phase Content - Drawing and Image Selection */}
            <div className="space-y-8">
              {/* Drawing Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Step 1: Draw Your Impressions
                </h2>
                <div className="bg-purple-900/20 p-6 rounded-lg">
                  <EnhancedDrawingCanvas mode="tmc" />
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={clearCanvas}
                      className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors"
                    >
                      Clear Canvas
                    </button>
                    <button
                      onClick={submitImpression}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Submit Drawing
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Selection Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Step 2: Select Matching Images
                </h2>
                <div className="bg-purple-900/20 p-6 rounded-lg">
                  <ImageSelection />
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="text-center py-4">
                <div className="inline-flex items-center space-x-2 bg-green-800/30 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-medium">
                    Game Phase Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "reveal":
        // Show results immediately after game phase ends
        return <Results />;

      case "buffer":
        // Show next game message during buffer phase
        return <NextGameMessage activeTarget={activeTarget} />;

      case "completed":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-white text-3xl mb-6 text-center">
              Challenge Completed
            </h1>
            <div className="text-purple-300 text-center">
              <p>Thank you for participating! Check back for new challenges.</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-white text-xl">Unknown phase</div>
          </div>
        );
    }
  };

  return (
    <>
      {renderPhaseContent()}
      <TMCInfoModal />
    </>
  );
}
