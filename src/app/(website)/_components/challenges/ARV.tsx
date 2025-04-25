"use client";

import Layout from "@/components/challanges/layout";
import EnhancedDrawingCanvas from "@/components/challanges/EnhancedDrawingCanvas";
import ARVImageSelection from "@/components/challanges/arv-image-selection";
import ARVInfoModal from "@/components/challanges/arv-info-modal";
import ARVShareModal from "@/components/challanges/arv-share-modal";
import ARVWaitingScreen from "@/components/challanges/arv-waiting-screen";
import ARVResults from "@/components/challanges/arv-results";
// import ARVTimer from "@/components/challanges/arv-timer";
import ARVDisclaimer from "@/components/challanges/arv-disclaimer";
import { useARVStore } from "@/store/use-arv-store";
import { useEffect } from "react";

export default function ARVPredictionMode() {
  const {
    challengeCode,
    revealTime,
    stage,
    submitImpression,
    clearCanvas,
    eventInfo,
    toggleARVInfo,
  } = useARVStore();

  // Show ARV info modal on first visit
  useEffect(() => {
    if (!useARVStore.getState().dontShowARVAgain) {
      toggleARVInfo();
    }
  }, [toggleARVInfo]);

  // If waiting for results, show waiting screen
  if (stage === "waiting") {
    return (
      <Layout>
        <ARVWaitingScreen />
      </Layout>
    );
  }

  // If results are available, show results
  if (stage === "results") {
    return (
      <Layout>
        <ARVResults />
        <ARVDisclaimer />
      </Layout>
    );
  }
 
  const clearCanva = () => {
    clearCanvas();
   localStorage.removeItem("psykick-challenge-storage");
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-white mb-6">
          Step inside, trust your senses, and begin your journey into the
          unseen.
        </h1>

        <div className="flex flex-col md:flex-row gap-[58px] mb-6">
          <div>
            <p className="challange-subTitle mb-2">Code: {challengeCode}</p>
            <p className="challange-subTitle">Reveal Time: {revealTime}</p>
          </div>

          <div className="mt-4 md:mt-0 bg-[#e4d0ff] rounded-lg p-2 text-black">
            <p className=" text-base leading-[120%] font-normal mb-1">
              Hurry up! Time ends In:
            </p>
            <div className="flex justify-center ">
              <div className="text-center">
                <span className="text-xl font-bold">
                  {String(19).padStart(2, "0")}
                </span>
                <p className="text-xs">Hours</p>
              </div>
              <span className="mx-2 text-xl font-bold">:</span>
              <div className="text-center">
                <span className="text-xl font-bold">
                  {String(50).padStart(2, "0")}
                </span>
                <p className="text-xs">Mins</p>
              </div>
              <span className="mx-2 text-xl font-bold">:</span>
              <div className="text-center">
                <span className="text-xl font-bold">
                  {String(25).padStart(2, "0")}
                </span>
                <p className="text-xs">Secs</p>
              </div>
            </div>
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
              onClick={submitImpression}
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
