"use client";

import Layout from "@/components/challanges/layout";
import Leaderboard from "@/components/challanges/leaderboard";
import TargetMatchChallenge from "../_components/challenges/TMC";
import { useChallengeStore } from "@/store/use-challenge-store";
import Home from "./arv/page";

export default function ChallengesPage() {
  const { activeTab } = useChallengeStore();

  return (
    <Layout>
      <div className=" mx-auto p-4 mt-20">
        {/* Tab navigation */}

        {/* Target Match Challenge Content */}
        {activeTab === "tmc" && <TargetMatchChallenge />}

        {/* ARV Prediction Mode Content */}
        {activeTab === "arv" && <Home />}

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
