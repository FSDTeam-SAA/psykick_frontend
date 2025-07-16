/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useARVStore } from "@/store/use-arv-store";
import Image from "next/image";

export default function RevealStage() {
  const {
    activeTarget,
    selectedImageId,
    imageChoices,
    moveToResults,
    updatePoints,
  } = useARVStore();
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [revealTimeRemaining, setRevealTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        const { submissionId } = useARVStore.getState();
        if (!submissionId) return;

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
          setResult(data.data);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, []);

  // Effect to handle the reveal time countdown and transition
  useEffect(() => {
    if (!activeTarget?.revealTime) return;

    const updateTimer = () => {
      const now = new Date();
      const revealTime = new Date(activeTarget.revealTime);
      const diff = Math.max(0, revealTime.getTime() - now.getTime());

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRevealTimeRemaining({ hours, minutes, seconds });

      // If time is up, move to results stage
      if (diff <= 0) {
        console.log(
          "Reveal time reached in reveal stage, moving to results stage",
        );
        updatePoints();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeTarget, updatePoints]);

  // Check if we should immediately move to results stage
  useEffect(() => {
    if (activeTarget?.revealTime) {
      const now = new Date().getTime();
      const revealTime = new Date(activeTarget.revealTime).getTime();

      if (now >= revealTime) {
        console.log(
          "Reveal time already passed, immediately moving to results stage",
        );
        moveToResults();
        updatePoints();
      }
    }
  }, [activeTarget, updatePoints, moveToResults]);

  const selectedImage = imageChoices.find((img) => img.id === selectedImageId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-white max-w-4xl mx-auto">
      {/* <div className="bg-purple-300/30 rounded-lg p-6 mb-8 w-full max-w-md text-center">
        <h2 className="text-xl mb-2">Your Time ends In:</h2>
        <div className="flex justify-center">
          <div className="text-5xl font-bold">
            <span>{revealTimeRemaining.hours.toString().padStart(2, "0")}</span>
            <span className="mx-2">:</span>
            <span>
              {revealTimeRemaining.minutes.toString().padStart(2, "0")}
            </span>
            <span className="mx-2">:</span>
            <span>
              {revealTimeRemaining.seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-2 text-sm">
          <span className="w-16 text-center">Hours</span>
          <span className="w-16 text-center">Mins</span>
          <span className="w-16 text-center">Secs</span>
        </div>
      </div> */}

      <h2 className="text-2xl font-semibold mb-6 text-lime-500">
        Congratulations on completing the round! When the Outcome image is set,
        You will get notify.
      </h2>
      <h2 className="text-xl mb-6">Target ID: {activeTarget?.code}</h2>

      {/* <div className="mb-6 w-full">
        <Image
          src={
            activeTarget?.controlImage ||
            "/placeholder.svg?height=300&width=400"
          }
          alt="Target Image"
          width={500}
          height={300}
          className="w-full h-80 object-cover rounded-lg"
        />
      </div> */}

      <div className="mb-6 w-full">
        <p className="mb-2">
          The Target with Target ID: {activeTarget?.code} concerns the outcome
          of the following event:
        </p>
        <p className="text-yellow-300 font-medium">
          {activeTarget?.eventDescription}
        </p>
      </div>

      {selectedImage && (
        <div className="mb-6 w-full">
          <p className="mb-2">
            Your image selection corresponds to the following Outcome:
          </p>
          <Image
            src={selectedImage.src || "/placeholder.svg?height=300&width=400"}
            alt="Selected Image"
            width={500}
            height={300}
            className="w-full h-80 object-cover rounded-lg mb-2"
          />
          <p className="text-yellow-300 font-medium">
            {selectedImage.description}
          </p>
        </div>
      )}

      <div className="mt-6 w-full text-xs text-gray-300 border border-red-500 p-4 rounded-lg">
        <h3 className="text-red-500 text-center mb-2">Disclaimer: ⚠</h3>
        <p>
          The <span className="font-bold">Psykick Club</span> platform and the{" "}
          <span className="font-bold">
            Associative Remote Viewing (ARV) Challenge
          </span>{" "}
          are intended solely for entertainment and personal development
          purposes. The results of any ARV session do not constitute financial,
          investment advice, and{" "}
          <span className="font-bold">
            Psykick Club does not endorse, promote, or encourage users to place
            wagers based on their predictions.
          </span>{" "}
          Participation in this challenge is strictly voluntary and should not
          be interpreted as a tool for financial gain or risk-taking.
        </p>
        <p className="mt-2">
          By participating in the ARV Challenge, you acknowledge and agree that
          this experience is purely experimental and recreational. Always engage
          responsibly and within the boundaries of legal and ethical conduct in
          your jurisdiction.
        </p>
      </div>
    </div>
  );
}
