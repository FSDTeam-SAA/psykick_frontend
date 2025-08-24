/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { X, Telescope } from "lucide-react";
import { useARVStore } from "@/store/use-arv-store";

export default function ARVInfoModal() {
  const {
    showARVInfo,
    closeARVInfo,
    dontShowARVAgain,
    setDontShowARVAgain,
    currentStage,
  } = useARVStore();

  if (!showARVInfo) return null;

  const handleClose = () => {
    closeARVInfo();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-[#8a2be2] text-white p-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center">
            <Telescope className="mr-2" />
            <h2 className="text-xl font-semibold">About ARV</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 text-black">
          <p className="mb-4">
            The Associative Remote Viewing (ARV) challenge is a unique test of
            intuitive perception that connects your impressions to a future
            event. Each ARV session begins with a hidden target—a future outcome
            represented by an image that you must perceive without any prior
            knowledge. You will start by focusing your mind and recording your
            impressions through sketches or descriptions. Once submitted, you
            will be presented with <strong>four images</strong>, each
            potentially linked to a real outcome, but{" "}
            <strong>one or more may be decoys</strong>. Your task is to select{" "}
            <strong>one image</strong>
            that best matches your impressions.
          </p>

          <p className="mb-4">
            After selection, your choice will be recorded, but you will not
            receive immediate feedback. At a predetermined{" "}
            <strong>reveal time</strong>, the actual target will be unveiled,
            and you will be notified of the relevance of your choice (e.g.,
            "Your selected image corresponds to Team X winning"). However, your
            score will still depend on the final outcome of the event. Once the
            event concludes, if your chosen image matches the actual result, you
            will earn <strong>30 points</strong>. If your choice was incorrect,{" "}
            <strong>10 points will be deducted</strong>.
          </p>

          <p className="mb-4">
            The ARV challenge is an exciting way to explore remote viewing's
            predictive potential, allowing you to test your intuitive abilities,
            refine your accuracy, and compete with others in the Psykick Club.
            Focus your mind, trust your instincts, and see if you can anticipate
            the future!
          </p>

          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowARVAgain}
              onChange={(e) => setDontShowARVAgain(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="dontShowAgain" className="text-sm">
              Don't show this again!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
