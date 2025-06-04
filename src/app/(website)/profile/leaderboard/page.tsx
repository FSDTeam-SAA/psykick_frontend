import Leaderboard from "@/components/challanges/leaderboard";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="pt-16 container mx-auto">
      <div className="py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Leaderboards
        </h1>
        <Button className="btn">
          <Link href="/profile" className="flex items-center">
            <ArrowBigLeft /> Back to Profile
          </Link>
        </Button>
      </div>
      <Leaderboard />
    </div>
  );
}
