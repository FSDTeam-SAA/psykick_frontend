import React from "react";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useRouter } from "next/navigation";

export default function GameTabNavigation() {
  const { activeTab, setActiveTab } = useChallengeStore();
  const router = useRouter();
  return (
    <div className="flex justify-center space-x-4 mt-20">
      <button
        onClick={() => {
          setActiveTab("tmc");
          window.scrollTo({ top: 0, behavior: "smooth" });
          router.push("/challenges");
        }}
        className={`px-6 py-3 rounded-lg transition-colors ${
          activeTab === "tmc"
            ? "bg-[#8a2be2] text-white"
            : "border border-white/30 bg-[#3a1c6e] text-white"
        }`}
      >
        Target Match Challenge
      </button>
      <button
        onClick={() => {
          setActiveTab("arv");
          window.scrollTo({ top: 0, behavior: "smooth" });
          router.push("/challenges");
        }}
        className={`px-6 py-3 rounded-lg transition-colors ${
          activeTab === "arv"
            ? "bg-[#8a2be2] text-white"
            : "border border-white/30 bg-[#3a1c6e] text-white"
        }`}
      >
        ARV Prediction Mode
      </button>
      <button
        onClick={() => {
          setActiveTab("leaderboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
          router.push("/challenges");
        }}
        className={`px-6 py-3 rounded-lg transition-colors ${
          activeTab === "leaderboard"
            ? "bg-[#8a2be2] text-white"
            : "border border-white/30 bg-[#3a1c6e] text-white"
        }`}
      >
        Leaderboards
      </button>
    </div>
  );
}
