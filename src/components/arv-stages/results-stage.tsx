"use client";

import { useARVStore } from "@/store/use-arv-store";
import { Clock, Trophy } from "lucide-react";
import Image from "next/image";

export function ResultsStage() {
  const { currentEvent, selectedImage } = useARVStore();

  if (!currentEvent) return null;

  const hasOutcomeImage = !!currentEvent.resultImage;

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white">
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
              <h2 className="text-3xl font-bold text-white">
                Challenge Complete!
              </h2>
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
            <div className="text-center p-6 border border-gray-700 rounded-lg bg-gray-900/50">
              <p className="text-xl text-white">
                {selectedImage?.url === currentEvent.resultImage
                  ? "🎉 Congratulations! Your prediction was correct!"
                  : "Thanks for participating! Better luck next time."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
