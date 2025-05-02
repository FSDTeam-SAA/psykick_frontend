/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useARVStore } from "@/store/use-arv-store";
import { useARVResult } from "@/hooks/use-arv-queries";

export default function ARVResults() {
  const { submissionId, selectedImageId, challengeCode } = useARVStore();
  const { data: result, isLoading, error } = useARVResult(submissionId || "");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading results...</div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl text-red-500 mb-4">Failed to load results</div>
        <Link href="/challenges" className="text-blue-500 hover:underline">
          Back to Challenges
        </Link>
      </div>
    );
  }

  const isCorrect = selectedImageId === result.data.correctImageId;
  const pointsEarned = isCorrect ? result.data.points : -10;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Challenge Results</h1>
          <p className="text-xl mb-2">Challenge Code: {challengeCode}</p>
          <div className="text-2xl font-semibold">
            Points Earned:{" "}
            <span className={isCorrect ? "text-green-500" : "text-red-500"}>
              {pointsEarned}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Selection</h2>
            {result.data.submittedImage && (
              <div className="relative aspect-square w-full">
                <Image
                  src={result.data.submittedImage}
                  alt="Your selection"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Correct Image</h2>
            {result.data.correctImage && (
              <div className="relative aspect-square w-full">
                <Image
                  src={result.data.correctImage}
                  alt="Correct image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/challenges"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Back to Challenges
          </Link>
        </div>
      </div>
    </div>
  );
}
