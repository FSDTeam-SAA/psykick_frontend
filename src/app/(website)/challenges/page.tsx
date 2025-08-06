"use client";

import Layout from "@/components/challanges/layout";
import Leaderboard from "@/components/challanges/leaderboard";
import TargetMatchChallenge from "../_components/challenges/TMC";
import { useChallengeStore } from "@/store/use-challenge-store";
import ArvTarget from "../_components/challenges/arv-target";

export default function ChallengesPage() {
  const { activeTab } = useChallengeStore();

  return (
    <Layout>
      <div className=" mx-auto p-4 mt-20">
        {/* Tab navigation */}

        {/* Target Match Challenge Content */}
        {activeTab === "tmc" && <TargetMatchChallenge />}

        {/* ARV Prediction Mode Content */}
        {activeTab === "arv" && <ArvTarget />}

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
