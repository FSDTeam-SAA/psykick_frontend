/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Layout from "@/components/challanges/layout";
import EnhancedDrawingCanvas from "@/components/challanges/EnhancedDrawingCanvas";
import ARVImageSelection from "@/components/challanges/arv-image-selection";
import ARVInfoModal from "@/components/challanges/arv-info-modal";
import ARVShareModal from "@/components/challanges/arv-share-modal";
import ARVWaitingScreen from "@/components/challanges/arv-waiting-screen";
import ARVResults from "@/components/challanges/arv-results";
import ARVDisclaimer from "@/components/challanges/arv-disclaimer";
import { useARVStore } from "@/store/use-arv-store";
import { useEffect } from "react";
import {
  useActiveARVTarget,
  useSubmitARVTarget,
} from "@/hooks/use-arv-queries";
import { Loader2 } from "lucide-react";
import moment from "moment";

export default function ARVPredictionMode() {
  const arvStore = useARVStore();
  const {
    stage,
    submitImpression,
    clearCanvas,
    eventInfo,
    toggleARVInfo,
    setActiveTarget,
    currentDrawing,
  } = arvStore;

  const { data: activeTarget, isLoading } = useActiveARVTarget();
  const { mutate: submitARV } = useSubmitARVTarget();

  // Update store with active target data
  useEffect(() => {
    if (activeTarget) {
      setActiveTarget(activeTarget);
    }
  }, [activeTarget, setActiveTarget]);

  // Show ARV info modal on first visit
  useEffect(() => {
    if (!useARVStore.getState().dontShowARVAgain) {
      toggleARVInfo();
    }
  }, [toggleARVInfo]);

  useEffect(() => {
    // Use the store's getState() to access resetCanvasState
    useARVStore.getState().resetCanvasState();
  }, []);

  const now = moment();
  const isBufferTime = now.isSameOrAfter(activeTarget?.bufferTime);

  // If no active target is available
  if (!isBufferTime || !activeTarget) {
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

  // Show waiting screen
  if (stage === "waiting") {
    return (
      <Layout>
        <ARVWaitingScreen />
      </Layout>
    );
  }

  // Show reveal screen
  if (stage === "reveal") {
    return (
      <Layout>
        <ARVResults />
        <ARVDisclaimer />
      </Layout>
    );
  }

  // Show results screen
  if (stage === "results") {
    return (
      <Layout>
        <ARVResults />
        <ARVDisclaimer />
      </Layout>
    );
  }

  if (isLoading || !activeTarget) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      </Layout>
    );
  }

  const clearCanva = () => {
    clearCanvas();
    useARVStore.getState().resetCanvasState();
  };

  const handleSubmitImpression = async () => {
    if (!currentDrawing || stage !== "drawing") return;

    try {
      await submitARV({
        submittedImage: currentDrawing,
        ARVTargetId: activeTarget.targetId,
      });
      submitImpression();
    } catch (error) {
      console.error("Failed to submit impression:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-white mb-6">
          Step inside, trust your senses, and begin your journey into the
          unseen.
        </h1>

        <div className="flex flex-col md:flex-row gap-[58px] mb-6">
          <div>
            <p className="challange-subTitle mb-2">Code: {activeTarget.code}</p>
            <p className="challange-subTitle">
              Event: {activeTarget.eventName}
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-[#e4d0ff] rounded-lg p-2 text-black">
            <p className="text-base leading-[120%] font-normal mb-1">
              {activeTarget.eventDescription}
            </p>
          </div>
        </div>

        <div className="mb-6 relative">
          <h2 className="text-xl font-bold text-white mb-4">
            Draw Your Impressions:
          </h2>
          <EnhancedDrawingCanvas mode="arv" />

          <div className="flex space-x-4 mt-4">
            <button
              onClick={clearCanva}
              className="px-4 py-2 bg-[#3a1c6e] text-white rounded-lg hover:bg-[#4a2c7e]"
            >
              Clear Canvas
            </button>
            <button
              onClick={handleSubmitImpression}
              className="px-4 py-2 bg-[#8a2be2] text-white rounded-lg hover:bg-[#7a1bd2]"
            >
              Submit Impression
            </button>
          </div>
        </div>

        {stage === "selection" && (
          <>
            <ARVImageSelection />
            {eventInfo && (
              <div className="mt-8 p-4 bg-[#4a2c7e] rounded-lg">
                <h3 className="text-white font-bold mb-2">
                  Example Event Context:
                </h3>
                <p className="text-yellow-300">{eventInfo.description}</p>
              </div>
            )}
          </>
        )}
      </div>

      <ARVInfoModal />
      <ARVShareModal />
    </Layout>
  );
}
