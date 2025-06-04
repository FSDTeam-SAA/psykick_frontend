/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useARVStore } from "@/store/use-arv-store";
import Image from "next/image";
// import { getAuthToken } from "@/utils/auth";

export default function ResultsStage() {
  const { activeTarget, selectedImageId, imageChoices } = useARVStore();
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        const { submissionId, activeTarget } = useARVStore.getState();
        if (!submissionId || !activeTarget) return;

        console.log("Fetching result with submission ID:", submissionId);
        console.log("Active target ID:", activeTarget.targetId);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/get-ARVResult/${submissionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        );
        const data = await response.json();

        if (data.status) {
          console.log("Result data:", data.data);
          setResult(data.data);
        } else {
          console.error("Error in result data:", data);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, []);

  const selectedImage = imageChoices.find((img) => img.id === selectedImageId);
  const isCorrect = result?.isCorrect || false;
  const pointsEarned = result?.pointsEarned || 30; // Default to 30 for the example

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-white max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Feedback for Target ID: {activeTarget?.code}
      </h1>

      <div className="w-full mb-6">
        <h2 className="text-xl mb-2">Event Name</h2>
        <p className="text-yellow-300 font-medium mb-4">
          {activeTarget?.eventDescription}
        </p>

        {result?.targetImage ? (
          <Image
            src={result.targetImage || "/placeholder.svg"}
            alt="Target Image"
            width={500}
            height={300}
            className="w-full h-auto rounded-lg mb-6"
          />
        ) : activeTarget?.resultImage ? (
          <Image
            src={activeTarget.resultImage || "/placeholder.svg"}
            alt="Target Image"
            width={500}
            height={300}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
        ) : (
          <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
            <p>No target image available</p>
          </div>
        )}
      </div>

      <div className="w-full mb-6">
        <h2 className="text-xl mb-2">Outcome Event</h2>
        <p className="text-yellow-300 font-medium mb-4">
          {selectedImage?.description || activeTarget?.eventDescription}
        </p>

        {selectedImage ? (
          <Image
            src={selectedImage.src || "/placeholder.svg"}
            alt="Selected Image"
            width={500}
            height={300}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
        ) : (
          <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
            <p>No selection image available</p>
          </div>
        )}
      </div>

      <div className="w-full text-center mb-8">
        <h2
          className={`text-4xl font-bold mb-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}
        >
          {isCorrect ? "Congratulations!" : "Better luck next time!"}
        </h2>
        <p className="text-xl">
          {isCorrect
            ? `You have successfully predicted the outcome for this event. You received ${pointsEarned} points!`
            : "Your prediction did not match the outcome for this event."}
        </p>
      </div>

      <button
        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition text-white font-medium"
        onClick={() => (window.location.href = "/leaderboard")}
      >
        See Leaderboard
      </button>
    </div>
  );
}
