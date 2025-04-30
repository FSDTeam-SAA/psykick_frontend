/* eslint-disable */
// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery, useMutation } from "@tanstack/react-query";
import CountdownTimer from "@/components/countdown-timer"; // Update import path

// Add type for API response
interface ARVResult {
  targetId: string;
  targetDescription: string;
  submittedImage: string;
  resultImage: string;
  outcomeDescription: string;
  points?: number;
  endTime: string;
  status: string;
}

// New type for the update ARV points API response
type ArvResultResponse = {
  status: boolean;
  message: string;
  data: {
    ARVId: string;
    submittedImage: string;
    points: number;
    submissionTime: string;
    _id: string;
    resultImage: string;
  };
};

// Function to fetch ARV result data
async function fetchARVResult(arvId: string) {
  if (!arvId) throw new Error("No ARV ID provided");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/get-ARVResult/${arvId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch ARV result");
    }

    const data: ARVResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ARV result:", error);
    throw error;
  }
}

// Function to update ARV points
async function updateARVPoints(arvId: string) {
  if (!arvId) throw new Error("No ARV ID provided");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/update-ARVPoints/${arvId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText || "Failed to update ARV points");
    }

    const data: ArvResultResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating ARV points:", error);
    throw error;
  }
}

export default function ArvReveal() {
  // Get arvId from URL params
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const arvId = searchParams.get("id") || "681232fa747b93ada2bbe294";

  // State for points data
  const [pointsData, setPointsData] = useState<
    ArvResultResponse["data"] | null
  >(null);
  const [timeExpired, setTimeExpired] = useState(false);

  // Fetch ARV result data
  const { data, isLoading, error } = useQuery({
    queryKey: ["arvResult", arvId],
    queryFn: () => fetchARVResult(arvId),
    refetchInterval: 30000,
    enabled: !!arvId,
  });

  console.log(data, "ARV Data");

  // Mutation for updating ARV points
  const updatePointsMutation = useMutation({
    mutationFn: () => updateARVPoints(arvId),
    onSuccess: (response) => {
      setPointsData(response.data);
    },
  });

  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    mins: "00",
    secs: "00",
  });

  // Update timer based on endTime from API
  useEffect(() => {
    if (!data?.endTime) return;

    const endTime = new Date(data.endTime).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        setTimeLeft({ hours: "00", mins: "00", secs: "00" });
        setTimeExpired(true);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: hours.toString().padStart(2, "0"),
        mins: minutes.toString().padStart(2, "0"),
        secs: seconds.toString().padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data?.endTime]);

  // Automatically update points when timer expires
  useEffect(() => {
    if (timeExpired && !pointsData && data?.status === "completed") {
      updatePointsMutation.mutate();
    }
  }, [timeExpired, pointsData, data?.status, updatePointsMutation]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <div className="text-center text-white">
          <div className="mb-4 text-2xl">Loading...</div>
          <div className="text-sm">Fetching your ARV challenge data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <div className="rounded-lg bg-white p-8 text-center">
          <div className="mb-4 text-2xl text-red-600">Error</div>
          <div className="text-gray-800">
            {error instanceof Error
              ? error.message
              : "Failed to load challenge data. Please try again later."}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Determine points to display (from either original data or updated points data)
  const displayPoints = pointsData?.points || data?.points;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <main className="container mx-auto px-4 py-8">
        {/* Timer Section */}
        <div className="mb-8 rounded-lg bg-purple-800 bg-opacity-60 p-6">
          <div className="mb-4 rounded-lg bg-purple-200 bg-opacity-20 p-4 text-center">
            <h2 className="text-xl font-semibold text-white">
              {timeExpired ? "Time Expired:" : "Time Remaining:"}
            </h2>
            <CountdownTimer targetDate={timeLeft} />
          </div>

          {/* Target Information */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl text-white">
              Target ID: {data?.targetId || arvId}
            </h3>
            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={data?.submittedImage || "/placeholder.jpg"}
                alt="Target image"
                width={400}
                height={250}
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="mb-6 text-xl text-white">
              The Target with Target ID: {data?.targetId || arvId} concerns the
              outcome of the following event:
            </p>
            <p className="mb-8 text-xl text-yellow-400">
              {data?.targetDescription || "No target description available."}
            </p>
          </div>

          {/* Outcome Information */}
          <div className="mb-8">
            <p className="mb-4 text-xl text-white">
              Your image selection corresponds to the following Outcome:
            </p>
            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={
                  pointsData?.resultImage ||
                  data?.data?.resultImage ||
                  "/placeholder.jpg"
                }
                alt="Outcome image"
                width={400}
                height={250}
                className="h-auto w-80 object-cover"
              />
            </div>
            <p className="text-xl text-yellow-400">
              {data?.outcomeDescription || "No outcome description available."}
            </p>
          </div>
        </div>

        {/* Results Section - Only show if available */}
        {displayPoints !== undefined && (
          <div className="mb-8 rounded-lg bg-purple-800 bg-opacity-60 p-6 text-center">
            <h2 className="text-3xl font-bold text-green-400">
              Congratulations!
            </h2>
            <p className="mt-2 text-xl text-white">
              You have successfully predicted the outcome for this event. You
              received {displayPoints} points!
            </p>
            {updatePointsMutation.isLoading && (
              <p className="mt-2 text-sm text-white">Updating your points...</p>
            )}
            {updatePointsMutation.isError && (
              <p className="mt-2 text-sm text-red-300">
                There was an issue updating your points. Your results are still
                valid.
              </p>
            )}
          </div>
        )}

        {/* Manual Update Button - Show only if timer expired and no points yet */}
        {timeExpired && !displayPoints && data?.status === "completed" && (
          <div className="mb-8 rounded-lg bg-purple-800 bg-opacity-60 p-6 text-center">
            <p className="mb-4 text-xl text-white">
              Time has expired. Click below to see your results:
            </p>
            <button
              onClick={() => updatePointsMutation.mutate()}
              disabled={updatePointsMutation.isLoading}
              className="rounded-full bg-green-500 px-6 py-3 text-lg font-bold text-white hover:bg-green-600 disabled:opacity-50"
            >
              {updatePointsMutation.isLoading ? "Loading..." : "Reveal Results"}
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-lg bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-red-600">
            Disclaimer: ⚠
          </h3>
          <p className="mb-4 text-sm text-gray-800">
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
            </span>
          </p>
          <p className="mb-4 text-sm text-gray-800">
            Psykick Club assumes no responsibility for any decisions made by
            users regarding gambling, sports betting, or other speculative
            activities based on ARV results. If you choose to engage in such
            activities, you{" "}
            <span className="font-bold">do so at your own risk</span> and
            acknowledge that Psykick Club and its affiliates bear no liability
            for any losses incurred.
          </p>
          <p className="text-sm text-gray-800">
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
