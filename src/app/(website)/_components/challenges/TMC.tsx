"use client";
import Layout from "@/components/challanges/layout";
import EnhancedDrawingCanvas from "@/components/challanges/EnhancedDrawingCanvas";
import ImageSelection from "@/components/challanges/image-selection";
import TMCInfoModal from "@/components/challanges/tmc-info-modal";
import WaitingScreen from "@/components/challanges/waiting-screen";
import Results from "@/components/challanges/results";
import { useChallengeStore } from "@/store/use-challenge-store";

export default function TargetMatchChallenge() {
  const {
    challengeCode,
    revealTime,
    timer,
    submitted,
    waitingForResults,
    // targetMatched,
    submitImpression,
    clearCanvas,
  } = useChallengeStore();

  // If waiting for results, show waiting screen
  if (submitted && waitingForResults) {
    return (
      <Layout>
        <WaitingScreen />
      </Layout>
    );
  }

  // If results are available, show results
  if (submitted && !waitingForResults) {
    return (
      <Layout>
        <Results />
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
                  {String(timer.hours).padStart(2, "0")}
                </span>
                <p className="text-xs">Hours</p>
              </div>
              <span className="mx-2 text-xl font-bold">:</span>
              <div className="text-center">
                <span className="text-xl font-bold">
                  {String(timer.minutes).padStart(2, "0")}
                </span>
                <p className="text-xs">Mins</p>
              </div>
              <span className="mx-2 text-xl font-bold">:</span>
              <div className="text-center">
                <span className="text-xl font-bold">
                  {String(timer.seconds).padStart(2, "0")}
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

        <ImageSelection />
      </div>

      <TMCInfoModal />
    </Layout>
  );
}
