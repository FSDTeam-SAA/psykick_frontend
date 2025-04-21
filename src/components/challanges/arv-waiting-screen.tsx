"use client";

import { useARVStore } from "@/store/use-arv-store";
import ARVTimer from "./arv-timer";

export default function ARVWaitingScreen() {
  const { challengeCode, revealResults } = useARVStore();

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <div className="mb-16">
        <ARVTimer />
      </div>

      <div className="text-3xl font-bold text-white mb-6">
        <h2 className="text-4xl font-bold text-[#7cfc00] mb-4">
          Congratulations!
        </h2>{" "}
        on completing the target. Please wait for the result.
      </div>

      <p className="text-xl text-white mb-4">
        This target will be revealed on 20-10-25 at 07.30 PM.
      </p>

      <p className="text-xl text-white">Game Code: {challengeCode}</p>

      {/* For demo purposes, add a button to reveal results */}
      <button
        onClick={revealResults}
        className="mt-8 px-6 py-3 bg-[#8a2be2] text-white rounded-lg hover:bg-[#7a1bd2] transition-colors"
      >
        Reveal Results (Demo)
      </button>
    </div>
  );
}
