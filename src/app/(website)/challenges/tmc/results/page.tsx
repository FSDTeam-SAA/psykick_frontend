"use client";

import GameTabNavigation from "@/app/(website)/_components/challenges/tab-navigation";
import Results from "@/components/challanges/results";

export default function ResultsPage() {
  return (
    // <Layout>
    <div className="bg-[#3a1c6e]">
      <GameTabNavigation />
      <Results />
    </div>
    // </Layout>
  );
}
