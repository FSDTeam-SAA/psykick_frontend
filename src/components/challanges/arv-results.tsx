"use client";
import Link from "next/link";
import { useARVStore } from "@/store/use-arv-store";
import Image from "next/image";

export default function ARVResults() {
  const { challengeCode, eventInfo, pointsEarned } = useARVStore();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-8">
        Feedback for Target ID: {challengeCode}
      </h1>

      <div className="mb-8">
        <h2 className="text-xl text-white mb-4">Event Name</h2>
        <p className="text-yellow-300 text-xl mb-4">{eventInfo.description}</p>

        <div className="rounded-lg overflow-hidden mb-8">
          <Image
            src={eventInfo.outcomeImage || "/placeholder.svg"}
            width={500}
            height={500}
            alt="Target image"
            className="w-full max-w-md h-64 object-cover"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl text-white mb-4">Outcome Event</h2>
        <p className="text-yellow-300 text-xl mb-4">{eventInfo.outcome}</p>

        <div className="rounded-lg overflow-hidden mb-8">
          <Image
            src={eventInfo.outcomeImage || "/placeholder.svg"}
            alt="Outcome image"
            className="w-full max-w-md h-64 object-cover"
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-4xl font-bold text-[#7cfc00] mb-4">
          Congratulations!
        </h2>
        <p className="text-white text-xl">
          You have successfully predicted the outcome for this event. You
          received {pointsEarned} points!
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/challenges/leaderboard">
          <button className="px-6 py-3 bg-[#8a2be2] text-white rounded-lg hover:bg-[#7a1bd2] transition-colors">
            See Leaderboard
          </button>
        </Link>
      </div>
    </div>
  );
}
