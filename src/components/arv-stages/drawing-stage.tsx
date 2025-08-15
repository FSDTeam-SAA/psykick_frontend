"use client";

import { useState } from "react";
import { useARVStore } from "@/store/use-arv-store";
import { EnhancedDrawingCanvas } from "./enhanced-drawing-canvas";
import { CountdownTimer } from "./countdown-timer";
import { Button } from "@/components/ui/button";

export function DrawingStage() {
  const {
    currentEvent,
    setCurrentStage,
    setUserDrawing,
    isGameTimeActive,
    getGameTimeRemaining,
  } = useARVStore();

  const [drawing, setDrawing] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isGameTimeActive()) {
      alert("Drawing is only allowed during game time!");
      return;
    }

    if (!drawing) {
      alert("Please draw something before submitting!");
      return;
    }

    setIsSubmitting(true);

    try {
      setUserDrawing(drawing);
      setCurrentStage("select");
    } catch (error) {
      console.error("Error submitting drawing:", error);
      alert("Failed to submit drawing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentEvent) return null;

  const canDraw = isGameTimeActive();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white">
          {currentEvent.eventName}
        </h1>
        <p className="text-gray-300 text-lg">{currentEvent.eventDescription}</p>

        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-400">
            Game Time Remaining:
          </p>
          <CountdownTimer
            targetTime={new Date(
              Date.now() + getGameTimeRemaining(),
            ).toISOString()}
            className="text-blue-400 text-2xl font-mono"
          />
        </div>

        {!canDraw && (
          <div className="p-4 border border-red-500/50 rounded-lg bg-red-900/20">
            <p className="text-red-400 font-medium">
              Drawing is only allowed during game time!
            </p>
          </div>
        )}

        <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/50">
          <EnhancedDrawingCanvas
            onDrawingChange={setDrawing}
            disabled={!canDraw}
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!drawing || isSubmitting || !canDraw}
            size="lg"
            className="px-8"
          >
            {isSubmitting ? "Submitting..." : "Submit Drawing"}
          </Button>
        </div>
      </div>
    </div>
  );
}
