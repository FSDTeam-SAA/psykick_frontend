"use client";

import { useEffect } from "react";
import Layout from "@/components/challanges/layout";
import EnhancedDrawingCanvas from "@/components/challanges/EnhancedDrawingCanvas";
import ImageSelection from "@/components/challanges/image-selection";
import TMCInfoModal from "@/components/challanges/tmc-info-modal";
import WaitingScreen from "@/components/challanges/waiting-screen";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useActiveTMCTarget } from "@/hooks/use-tmc-queries";

export default function TargetMatchChallenge() {
  const {
    showImageSelection,
    submitted,
    clearCanvas,
    submitImpression,
    setTargetData,
  } = useChallengeStore();

  const { data: activeTarget, isLoading } = useActiveTMCTarget();

  // Set target data when it's loaded
  useEffect(() => {
    if (activeTarget) {
      setTargetData(activeTarget);
    }
  }, [activeTarget, setTargetData]);

  // Show loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-xl">Loading challenge...</div>
        </div>
      </Layout>
    );
  }

  // If no active target is available
  if (!activeTarget) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto px-4">
          <div className="text-white text-xl text-center mb-4">
            No active challenges available at the moment.
          </div>
          <div className="text-purple-300 text-center">
            This could be because you&apos;ve completed all your targets for
            this cycle. Your tier will be updated and a new cycle will begin
            automatically. Check your notifications for updates about your tier
            changes!
          </div>
        </div>
      </Layout>
    );
  }

  // Show waiting screen if submission is complete
  if (submitted) {
    return (
      <Layout>
        <WaitingScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="challange-title mb-6">
          Clear your thoughts, tune in, and let your perception guide you.
        </h1>

        <div className="flex flex-col md:flex-row gap-[58px] mb-6">
          <div>
            <p className="challange-subTitle mb-2">Code: {activeTarget.code}</p>
            <p className="challange-subTitle">
              Game ends: {new Date(activeTarget.gameTime).toLocaleString()}
            </p>
          </div>
        </div>

        {!showImageSelection && (
          <div className="space-y-6">
            <div className="mb-6 relative">
              <h2 className="text-xl font-bold text-white mb-4">
                Draw Your Impressions:
              </h2>
              <EnhancedDrawingCanvas mode="tmc" />

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={clearCanvas}
                  className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800"
                >
                  Clear Canvas
                </button>
                <button
                  onClick={submitImpression}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Submit Impression
                </button>
              </div>
            </div>
          </div>
        )}

        {showImageSelection && <ImageSelection />}
      </div>

      <TMCInfoModal />
    </Layout>
  );
}
