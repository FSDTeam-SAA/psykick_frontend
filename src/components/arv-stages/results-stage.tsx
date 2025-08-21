"use client";

import { useARVStore } from "@/store/use-arv-store";
import { Clock, Trophy, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useRouter } from "next/navigation";

interface ARVResult {
  ARVId: string;
  submittedImage: string;
  points: number;
  submissionTime: string;
  resultImage: string;
}

export function ResultsStage() {
  const { currentEvent, selectedImage, setActiveTarget } = useARVStore();
  const [arvResult, setArvResult] = useState<ARVResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setActiveTab } = useChallengeStore();
  const router = useRouter();
  // Memoize the check game status function
  const checkGameStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch the latest game data
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ARVTarget/getARVGame/${currentEvent?.code}`,
      );
      const data = await response.json();

      if (data.status) {
        const gameData = data.data;

        // Update game data in store if there are changes
        if (JSON.stringify(gameData) !== JSON.stringify(currentEvent)) {
          setActiveTarget(gameData);
        }

        // If result image is available, fetch the results
        if (gameData.resultImage && !arvResult) {
          const resultResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/get-ARVResult/${currentEvent?._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            },
          );
          const resultData = await resultResponse.json();

          if (resultData.status) {
            setArvResult(resultData.data);
          }
        }
      }
    } catch (err) {
      console.error("Error checking game status:", err);
      setError("Failed to fetch latest game data");
    } finally {
      setIsLoading(false);
    }
  }, [currentEvent, setActiveTarget, arvResult]);

  // Poll for game updates
  useEffect(() => {
    if (!currentEvent?.code) return;

    // Run initial check
    checkGameStatus();

    // Set up polling interval
    const interval = setInterval(checkGameStatus, 10000);

    // Cleanup interval on unmount or when currentEvent changes
    return () => clearInterval(interval);
  }, [checkGameStatus, currentEvent?.code]);

  if (!currentEvent) return null;

  const hasOutcomeImage = !!currentEvent.resultImage;

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-white textLargeShadow">
          {hasOutcomeImage ? "Challenge Results" : "Outcome Phase"}
        </h1>

        {!hasOutcomeImage ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Clock className="h-20 w-20 text-yellow-500" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-yellow-400">
                Please wait for the Admin to set Outcome image
              </h2>
              <p className="text-gray-300">
                The results will be displayed or notified, once the admin
                uploads the outcome image!
              </p>
            </div>
          </div>
        ) : (
          /* Show results when outcome image is available */
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Trophy className="h-20 w-20 text-yellow-500" />
              </div>
              {/* <h2 className="text-3xl font-bold text-white">
                Challenge Complete!
              </h2> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Your Selection */}
              {selectedImage && (
                <div>
                  <h3 className="text-2xl font-semibold text-white text-center mb-6">
                    Your Selection
                  </h3>
                  <div className="border border-gray-700 rounded-lg p-4 bg-gray-900/50">
                    <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={selectedImage.url || "/placeholder.svg"}
                        alt={selectedImage.description}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-400 text-center">
                      {selectedImage.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Actual Outcome */}
              <div>
                <h3 className="text-2xl font-semibold text-white text-center mb-6">
                  Actual Outcome
                </h3>
                <div className="border border-gray-700 rounded-lg p-4 bg-gray-900/50">
                  <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={currentEvent.resultImage || "/placeholder.svg"}
                      alt="Actual outcome"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    Actual outcome image
                  </p>
                </div>
              </div>
            </div>

            {/* Result Analysis */}
            <div className="space-y-6">
              {/* Points & Time */}
              {arvResult && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 border border-gray-700 rounded-lg bg-gray-900/50">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Points Earned
                    </h4>
                    <p
                      className={`text-2xl font-bold ${
                        arvResult.points > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {arvResult.points > 0 ? "+" : ""}
                      {arvResult.points}
                    </p>
                  </div>
                  <div className="p-6 border border-gray-700 rounded-lg bg-gray-900/50">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Submission Time
                    </h4>
                    <p className="text-gray-300">
                      {moment(arvResult.submissionTime).format(
                        "MMMM D, YYYY h:mm A",
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Outcome Message */}
              <div className="text-center p-6 border border-gray-700 rounded-lg bg-gray-900/50">
                {/* <p className="text-xl text-white mb-4">
                  {selectedImage?.url === currentEvent.resultImage
                    ? "🎉 Congratulations! Your prediction was correct!"
                    : "Thanks for participating! Better luck next time."}
                </p> */}
                <div className="flex flex-col justify-end gap-8 ">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-400">
                      {arvResult?.points === 25 ? (
                        <span className="text-green-500">
                          Congratulations! 🎉🎊🎊 <br /> You matched the Target
                          on your 1st choice. You received +25 points!
                        </span>
                      ) : (
                        <span className="text-red-500">
                          {
                            "Unfortunately, you didn't match the Target. -10 points."
                          }
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                {arvResult && (
                  <div className="flex items-center justify-center gap-2">
                    {arvResult.points > 0 ? (
                      <CheckCircle2 className="h-6 w-6 text-green-400" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-400" />
                    )}
                    <span className="text-gray-300">
                      {arvResult.points > 0
                        ? "Great job on your prediction!"
                        : "Keep practicing to improve your predictions."}
                    </span>
                  </div>
                )}
              </div>

              <Button
                onClick={() => {
                  setActiveTab("leaderboard");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  router.push("/challenges");
                }}
                className="inline-flex justify-center items-center px-6 py-4 bg-[#8F37FF] text-white rounded-xl hover:bg-[#7B2CE0] transition-colors w-[270px] font-medium text-xl"
              >
                See Leaderboard
              </Button>

              {error && (
                <div className="text-center p-4 border border-red-700 rounded-lg bg-red-900/50">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              {isLoading && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
