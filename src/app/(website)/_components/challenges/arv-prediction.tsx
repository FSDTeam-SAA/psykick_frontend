/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CountdownTimer from "@/components/countdown-timer";
import { useARVStore } from "@/store/use-arv-store";

interface TargetData {
  targetId: string;
  imageUrl: string;
  eventDescription: string;
  revealTime?: string;
  outcomeTime?: string;
}

// Helper function to convert milliseconds to seconds
const msToSeconds = (ms: number | null) => Math.floor((ms || 0) / 1000);

// API functions
const fetchARVResult = async (arvId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/userSubmission/get-ARVResult/${arvId}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch ARV result");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ARV result:", error);
    throw error;
  }
};

const updateARVPoints = async (arvId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/userSubmission/update-ARVPoints/${arvId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to update ARV points");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating ARV points:", error);
    throw error;
  }
};

export default function ARVPredictionPage() {
  const router = useRouter();
  const [stage, setStage] = useState<"waiting" | "event-revealed" | "result">(
    "waiting",
  );
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { activeTarget } = useARVStore();
  const [targetData, setTargetData] = useState<TargetData>({
    targetId: "",
    imageUrl: "",
    eventDescription: "",
  });

  useEffect(() => {
    if (activeTarget) {
      const currentTime = new Date();
      const eventTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

      setTargetData({
        targetId: activeTarget.targetId,
        imageUrl: activeTarget.image1.url,
        eventDescription: activeTarget.eventDescription,
        revealTime: eventTime.toISOString(),
        outcomeTime: new Date(
          eventTime.getTime() + 12 * 60 * 60 * 1000,
        ).toISOString(), // 12 hours after reveal
      });
    }
  }, [activeTarget]);

  // Query to fetch ARV result
  const {
    data: arvResult,
    isLoading,
    error,
  } = useQuery<any>({
    queryKey: ["arvResult", activeTarget?.targetId],
    queryFn: () =>
      activeTarget?.targetId
        ? fetchARVResult(activeTarget.targetId)
        : Promise.reject("No ARV ID"),
    enabled: !!activeTarget?.targetId,
    refetchInterval: 5000, // Poll every 5 seconds
  });

  // Mutation to update points
  const updatePointsMutation = useMutation({
    mutationFn: () => updateARVPoints(activeTarget?.targetId as string),
    onSuccess: () => {
      console.log("Points updated successfully");
    },
  });

  // Effect to handle stage transitions based on time
  useEffect(() => {
    if (!targetData) return;

    const now = new Date();
    const revealTime = new Date(targetData.revealTime || "");
    const outcomeTime = new Date(targetData.outcomeTime || "");

    if (now < revealTime) {
      setStage("waiting");
      const timeUntilReveal = revealTime.getTime() - now.getTime();
      setTimeLeft(timeUntilReveal);
    } else if (now < outcomeTime) {
      setStage("event-revealed");
      const timeUntilOutcome = outcomeTime.getTime() - now.getTime();
      setTimeLeft(timeUntilOutcome);
    } else {
      setStage("result");
      setTimeLeft(null);
      // Update points when result is displayed
      if (arvResult?.status && !updatePointsMutation.isSuccess) {
        updatePointsMutation.mutate();
      }
    }

    // Set interval to update time
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      if (currentTime < revealTime) {
        setTimeLeft(revealTime.getTime() - currentTime.getTime());
      } else if (currentTime < outcomeTime) {
        setStage("event-revealed");
        setTimeLeft(outcomeTime.getTime() - currentTime.getTime());
      } else {
        setStage("result");
        setTimeLeft(null);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetData, arvResult, updatePointsMutation]);

  if (!isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-purple-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Loading ARV Challenge...
          </h2>
          <div className="mt-4">
            <div className="h-2 w-32 animate-pulse rounded bg-purple-400"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-purple-900">
        <div className="rounded-lg bg-red-100 p-6 text-center">
          <h2 className="text-xl font-bold text-red-800">
            Error Loading Challenge
          </h2>
          {/* <p className="mt-2 text-red-600">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p> */}
          <Button
            className="mt-4 bg-purple-600 hover:bg-purple-700"
            onClick={() => router.push("/challenges")}
          >
            Return to Challenges
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-900 bg-opacity-90 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center space-x-4">
          <Button
            variant="outline"
            className="border-purple-400 text-white hover:bg-purple-800"
          >
            Target Match Challenge
          </Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            ARV Prediction Mode
          </Button>
          <Button
            variant="outline"
            className="border-purple-400 text-white hover:bg-purple-800"
          >
            Leaderboards
          </Button>
        </div>

        {stage === "waiting" && (
          <div className="rounded-lg bg-purple-800 bg-opacity-60 p-6">
            <div className="mb-8 rounded-lg bg-purple-200 bg-opacity-20 p-4 text-center">
              <h2 className="text-xl font-semibold text-white">
                Your Time ends In:
              </h2>
              <CountdownTimer
                secs={msToSeconds(timeLeft)}
                onComplete={() => setStage("event-revealed")}
                className="text-2xl"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-white">
                Target ID: {targetData.targetId}
              </h3>
            </div>

            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={targetData.imageUrl}
                alt="Target Image"
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="mb-6">
              <p className="text-lg">
                The Target with Target ID: {targetData.targetId} concerns the
                outcome of the following event:
              </p>
              <p className="mt-2 text-lg font-bold text-yellow-300">
                {stage === "waiting"
                  ? "Event details will be revealed when the timer ends"
                  : targetData.eventDescription}
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-2 text-lg">
                Your image selection corresponds to the following Outcome:
              </p>
              <div className="mb-4 overflow-hidden rounded-lg">
                <Image
                  src={arvResult?.data?.submittedImage || targetData.imageUrl}
                  alt="Submitted Image"
                  width={400}
                  height={300}
                  className="h-auto  object-cover"
                />
              </div>
              <p className="text-lg font-bold text-yellow-300">
                Outcome will be revealed after the timer ends
              </p>
            </div>
          </div>
        )}

        {stage === "event-revealed" && (
          <div className="rounded-lg bg-purple-800 bg-opacity-60 p-6">
            <div className="mb-8 rounded-lg bg-purple-200 bg-opacity-20 p-4 text-center">
              <h2 className="text-xl font-semibold text-white">
                Outcome Reveals In:
              </h2>
              <CountdownTimer
                seconds={msToSeconds(timeLeft)}
                onComplete={() => setStage("result")}
                className="text-2xl"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-white">
                Target ID: {targetData.targetId}
              </h3>
            </div>

            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={targetData.imageUrl}
                alt="Target Image"
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="mb-6">
              <p className="text-lg">
                The Target with Target ID: {targetData.targetId} concerns the
                outcome of the following event:
              </p>
              <p className="mt-2 text-lg font-bold text-yellow-300">
                {targetData.eventDescription}
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-2 text-lg">
                Your image selection corresponds to the following Outcome:
              </p>
              <div className="mb-4 overflow-hidden rounded-lg">
                <Image
                  src={arvResult?.data?.submittedImage || targetData.imageUrl}
                  alt="Submitted Image"
                  width={400}
                  height={300}
                  className="h-auto w-full object-cover"
                />
              </div>
              <p className="text-lg font-bold text-yellow-300">
                {targetData.eventDescription}
              </p>
            </div>
          </div>
        )}

        {stage === "result" && (
          <div className="rounded-lg bg-purple-800 bg-opacity-60 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Feedback for Target ID: {targetData.targetId}
              </h2>
            </div>

            <div className="mb-4">
              <h3 className="text-xl">Event Name</h3>
              <p className="mt-2 text-lg font-bold text-yellow-300">
                {targetData.eventDescription}
              </p>
            </div>

            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={targetData.imageUrl}
                alt="Target Image"
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-xl">Outcome Event</h3>
              <p className="mt-2 text-lg font-bold text-yellow-300">
                {targetData.eventDescription}
              </p>
            </div>

            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={arvResult?.data?.submittedImage || targetData.imageUrl}
                alt="Outcome Image"
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-green-400">
                Congratulations!
              </h2>
              <p className="mt-2 text-xl">
                You have successfully predicted the outcome for this event. You
                received {arvResult?.data?.points || "30"} points!
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                className="bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => router.push("/leaderboards")}
              >
                See Leaderboard
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-lg bg-white p-6 text-black">
          <div className="mb-2 flex items-center">
            <span className="font-bold text-red-600">Disclaimer: ⚠</span>
          </div>
          <p className="mb-2 text-sm">
            The <span className="font-bold">Psykick Club</span> platform and the{" "}
            <span className="font-bold">
              Associative Remote Viewing (ARV) Challenge
            </span>{" "}
            are intended solely for entertainment and personal development
            purposes. The results of any ARV session do not constitute
            financial, betting, or gambling advice, and{" "}
            <span className="font-bold">
              Psykick Club does not endorse, promote, or encourage users to
              place wagers based on their predictions.
            </span>{" "}
            Participation in this challenge is strictly voluntary and should not
            be interpreted as a tool for financial gain or risk-taking.
          </p>
          <p className="mb-2 text-sm">
            Psykick Club assumes no responsibility for any decisions made by
            users regarding gambling, sports betting, or other speculative
            activities based on ARV results. If you choose to engage in such
            activities, you do so at{" "}
            <span className="font-bold">your own risk</span> and acknowledge
            that Psykick Club and its affiliates bear no liability for any
            losses incurred.
          </p>
          <p className="text-sm">
            By participating in the ARV Challenge, you acknowledge and agree
            that this experience is{" "}
            <span className="font-bold">
              purely experimental and recreational
            </span>
            . Always engage responsibly and within the boundaries of legal and
            ethical conduct in your jurisdiction.
          </p>
        </div>
      </main>
    </div>
  );
}
