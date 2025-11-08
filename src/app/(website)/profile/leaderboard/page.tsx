import Leaderboard from "@/components/challanges/leaderboard";
import { Button } from "@/components/ui/button";
import {  ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="pt-16 container mx-auto">
      <div className="md:py-8 py-4 flex items-center justify-between">
        <h1 className="md:text-3xl text-2xl font-bold text-center text-white md:mb-8">
          Leaderboards
        </h1>
        <Button className="bg-gradient">
          <Link href="/profile" className="flex items-center">
            <ArrowLeft /> Back to Profile
          </Link>
        </Button>
      </div>
      <Leaderboard />
    </div>
  );
}
