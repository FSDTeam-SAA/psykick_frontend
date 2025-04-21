"use client";

import { useChallengeStore } from "@/store/use-challenge-store";
import Timer from "./timer";

export default function WaitingScreen() {
  const { challengeCode, revealResults } = useChallengeStore();

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <div className="mb-16">
        <Timer />
      </div>

      <div className="text-3xl font-bold text-white mb-6">
        <h2 className="text-4xl font-bold text-[#7cfc00] mb-4">
          Congratulations!
        </h2>{" "}
        on completing the target. Please wait for the result.
      </div>

      <p className="text-xl text-white mb-4">
        Target will be revealed in: 20-10-25 at 07.30 PM.
      </p>

      <p className="text-xl text-white">Target ID: {challengeCode}</p>

      {/* For demo purposes, add a button to reveal results */}
      <button
        onClick={revealResults}
        className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Reveal Results (Demo)
      </button>
    </div>
  );
}
