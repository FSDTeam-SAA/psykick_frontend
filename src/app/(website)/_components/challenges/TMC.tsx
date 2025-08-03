"use client";

import { useEffect } from "react";
// import Layout from "@/components/challanges/layout";
import EnhancedDrawingCanvas from "@/components/challanges/EnhancedDrawingCanvas";
import ImageSelection from "@/components/challanges/image-selection";
import TMCInfoModal from "@/components/challanges/tmc-info-modal";
import WaitingScreen from "@/components/challanges/waiting-screen";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useActiveTMCTarget } from "@/hooks/use-tmc-queries";
// import CountdownTimer from "@/components/ui/countrdown-timer";
import moment from "moment";
// import { toast } from "@/hooks/use-toast";
import Results from "@/components/challanges/results";
import CountdownDisplay from "@/components/challanges/countdown-display";

export default function TargetMatchChallenge() {
  const {
    showImageSelection,
    submitted,
    clearCanvas,
    submitImpression,
    setTargetData,
  } = useChallengeStore();

  const { data: activeTarget, isLoading } = useActiveTMCTarget(); // Set target data when it's loaded
  useEffect(() => {
    if (activeTarget) {
      setTargetData(activeTarget);
    }
  }, [activeTarget, setTargetData]);
  const now = moment();
  // const isBufferTime = now.isSameOrAfter(activeTarget?.bufferDuration);
  // const isGameTime = now.isSameOrAfter(activeTarget?.gameDuration);
  const isRevealTime = now.isSameOrAfter(activeTarget?.revealDuration);

  // console.log("Active Target:", activeTarget);
  // console.log("isBufferTime:", isBufferTime);
  // console.log("isgameTime:", isGameTime);
  // console.log("isRevealTime:", isRevealTime);

  if (isLoading) {
    // Show loading state
    return (
      // <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-xl">Loading challenge...</div>
      </div>
      // </Layout>
    );
  }

  // If no active target is available
  if (activeTarget === null) {
    return (
      // <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto px-4">
        <div className="text-white text-xl text-center mb-4">
          No active challenges available at the moment.
        </div>
        <div className="text-purple-300 text-center">
          You have no active targets at the moment. Please check back later
          {/* This could be because you&apos;ve completed all your targets for
            this cycle. Your tier will be updated and a new cycle will begin
            automatically. Check your notifications for updates about your tier
            changes! */}
        </div>
      </div>
      // </Layout>
    );
  }

  // Show waiting screen if submission is complete
  if (submitted) {
    return (
      // <Layout>
      <>
        {/* <h1>No active game available</h1> */}
        <WaitingScreen />
      </>
      // </Layout>
    );
  }

  if (!isRevealTime) {
    return <Results />;
  }

  // if (!isBufferTime) {
  //   return (
  //     // <Layout>
  //     <div className="flex items-center justify-center min-h-[60vh]">
  //       <div className="text-white text-xl">
  //         Waiting for the new game to start...
  //       </div>
  //       <CountdownDisplay
  //         minutes={activeTarget?.bufferDuration || "0"}
  //         // onComplete={handleCountdownComplete}
  //       />
  //     </div>
  //     // </Layout>
  //   );
  // }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="challange-title mb-6">
          Clear your thoughts, tune in, and let your perception guide you.
        </h1>

        <div className="flex flex-col md:flex-row gap-[58px] mb-10">
          <div className="flex justify-center items-center w-full md:w-1/2 gap-6 ">
            <div>
              <p className="challange-subTitle mb-2">
                Code: {activeTarget?.code}
              </p>
              <p className="challange-subTitle mb-2">
                Reveal Time:
                {/* {activeTarget?.revealDuration
                  ? new Date(activeTarget.revealDuration).toLocaleString()
                  : ""} */}
              </p>
            </div>
            <CountdownDisplay
              minutes={activeTarget?.revealDuration || "0"}
              // startTime={activeTarget?.revealTime} // Pass the reveal start time
              // onComplete={handleCountdownComplete}
            />
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
    </div>
  );
}
