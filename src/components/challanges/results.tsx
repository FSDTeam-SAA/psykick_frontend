"use client";

import Image from "next/image";
import Link from "next/link";
import { useChallengeStore } from "@/store/use-challenge-store";

export default function Results() {
  const {
    challengeCode,
    targetMatched,
    pointsEarned,
    targetImage,
    imageChoices,
  } = useChallengeStore();

  // Get the selected images
  const firstChoice = imageChoices.find((img) => img.order === 1);
  const secondChoice = imageChoices.find((img) => img.order === 2);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-8">
        Feedback for Target ID: {challengeCode}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl text-white mb-4">Your 1st choice was:</h2>
          {firstChoice && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={firstChoice.src || "/placeholder.svg"}
                alt="First choice"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl text-white mb-4">Your 2nd choice was:</h2>
          {secondChoice && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={secondChoice.src || "/placeholder.svg"}
                alt="Second choice"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl text-white mb-4">Target Image</h2>
        {targetImage && (
          <div className="rounded-lg overflow-hidden">
            <Image
              src={targetImage || "/placeholder.svg"}
              alt="Target image"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
        )}
      </div>

      <div className="bg-purple-900/50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">
          {targetMatched
            ? `Congratulations! You matched the Target on your 1st choice. You received ${pointsEarned} points!`
            : "Sorry, your choices did not match the target."}
        </h2>

        <div className="flex justify-center mt-4">
          <Link href="/challenges/leaderboard">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              See Leaderboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
