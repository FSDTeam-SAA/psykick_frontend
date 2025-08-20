"use client";

import { X, Target } from "lucide-react";
import { useChallengeStore } from "@/store/use-challenge-store";

export default function TMCInfoModal() {
  const { showTMCInfo, closeTMCInfo, dontShowTMCAgain, setDontShowTMCAgain } =
    useChallengeStore();

  if (!showTMCInfo) return null;

  const handleClose = () => {
    closeTMCInfo();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#8F37FF] to-[#2D17FF] text-white p-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center">
            <Target className="mr-2" />
            <h2 className="text-xl font-semibold">About TMC</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-4">
            The Target Match Challenge (TMC) is a structured remote viewing
            exercise designed to test and strengthen your intuitive perception.
            Each session begins with a hidden target—an unknown image that you
            must attempt to perceive without any prior knowledge. Using your
            intuition, you will sketch or describe the impressions that come to
            you. After submitting your impressions, you will be presented with
            six images, one of which is the actual target while the others act
            as decoys.
          </p>

          <p className="mb-4">
            Your task is to select <strong>two images</strong> in order of
            relevance: your <strong>first choice</strong> being the one that
            best matches your impressions and your{" "}
            <strong>second choice</strong> as a backup. Scoring is based on
            accuracy—if your first choice is correct, you earn{" "}
            <strong>25 points</strong>; if your second choice is correct, you
            receive <strong>15 points</strong>; and if neither choice is
            correct, <strong>10 points are deducted</strong>. Once the target is
            revealed, you will receive feedback on your performance, and your
            results will be recorded on the leaderboard.
          </p>

          <p className="mb-4">
            The TMC challenge is a powerful way to refine your perception,
            develop confidence in your intuitive skills, and compete with others
            in the Psykick Club community. Trust your instincts, focus your
            mind, and see if you can match the hidden target!
          </p>

          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowTMCAgain}
              onChange={(e) => setDontShowTMCAgain(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="dontShowAgain" className="text-sm">
              Don&apos;t show this again!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
