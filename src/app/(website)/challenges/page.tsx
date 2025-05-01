"use client";

import Layout from "@/components/challanges/layout";
import Leaderboard from "@/components/challanges/leaderboard";
import ARVPredictionMode from "../_components/challenges/ARV";
import TargetMatchChallenge from "../_components/challenges/TMC";
import { useChallengeStore } from "@/store/use-challenge-store";

export default function ChallengesPage() {
  const { activeTab, setActiveTab } = useChallengeStore();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 mt-20">
        {/* Tab navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("tmc")}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeTab === "tmc"
                ? "bg-[#8a2be2] text-white"
                : "border border-white/30 bg-[#3a1c6e] text-white"
            }`}
          >
            Target Match Challenge
          </button>
          <button
            onClick={() => setActiveTab("arv")}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeTab === "arv"
                ? "bg-[#8a2be2] text-white"
                : "border border-white/30 bg-[#3a1c6e] text-white"
            }`}
          >
            ARV Prediction Mode
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeTab === "leaderboard"
                ? "bg-[#8a2be2] text-white"
                : "border border-white/30 bg-[#3a1c6e] text-white"
            }`}
          >
            Leaderboards
          </button>
        </div>

        {/* Target Match Challenge Content */}
        {activeTab === "tmc" && <TargetMatchChallenge />}

        {/* ARV Prediction Mode Content */}
        {activeTab === "arv" && <ARVPredictionMode />}

        {/* Leaderboard Content */}
        {activeTab === "leaderboard" && (
          <div>
            <Leaderboard />
          </div>
        )}
      </div>
    </Layout>
  );
}
