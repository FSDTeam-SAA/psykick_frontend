"use client";

import Layout from "@/components/challanges/layout";
import Leaderboard from "@/components/challanges/leaderboard";

export default function LeaderboardPage() {
  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Leaderboards
        </h1>
        <Leaderboard />
      </div>
    </Layout>
  );
}
