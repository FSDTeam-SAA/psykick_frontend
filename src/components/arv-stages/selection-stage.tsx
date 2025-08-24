"use client";

import { useARVStore } from "@/store/use-arv-store";
import { CountdownTimer } from "./countdown-timer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSubmitARVTarget } from "@/hooks/use-arv-queries";

export function SelectionStage() {
  const {
    currentEvent,
    selectedImage,
    setSelectedImage,
    setCurrentStage,
    isGameTimeActive,
    getGameTimeRemaining,
    getImages,
  } = useARVStore();

  const { mutate: submitARV, isPending } = useSubmitARVTarget();

  const handleImageSelect = (image: { url: string; description: string }) => {
    if (!isGameTimeActive()) {
      alert("Image selection is only allowed during game time!");
      return;
    }
    setSelectedImage(image);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please select an image before submitting!");
      return;
    }

    if (!isGameTimeActive()) {
      alert("Submission is only allowed during game time!");
      return;
    }

    if (!currentEvent) {
      alert("No active event found!");
      return;
    }

    try {
      await submitARV({
        submittedImage: selectedImage.url,
        ARVTargetId: currentEvent._id,
      });
      setCurrentStage("waiting");
    } catch (error) {
      console.error("Error submitting selection:", error);
      alert("Failed to submit selection. Please try again.");
    }
  };

  if (!currentEvent) return null;

  const canSelect = isGameTimeActive();
  const images = getImages();

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 container mx-auto">
      <div className="text-center space-y-8 w-full">
        <h1 className="text-3xl font-bold text-white">
          Select Your Prediction Image
        </h1>
        <p className="text-gray-300">
          Choose the image that best represents your prediction
        </p>

        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-400">
            Game Time Remaining:
          </p>
          <CountdownTimer
            targetTime={new Date(
              Date.now() + getGameTimeRemaining(),
            ).toISOString()}
            className="text-blue-400 text-2xl font-mono"
          />
        </div>

        {!canSelect && (
          <div className="p-4 border border-red-500/50 rounded-lg bg-red-900/20">
            <p className="text-red-400 font-medium">
              Image selection is only allowed during game time!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer transition-all border rounded-lg p-4 bg-gray-900/50 hover:bg-gray-800/50 ${
                selectedImage?.url === image.url
                  ? "border-blue-500 shadow-lg shadow-blue-500/20"
                  : "border-gray-700"
              } ${!canSelect ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleImageSelect(image)}
            >
              <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.description}
                  fill
                  className="object-cover max-h-[500px] w-[500px]"
                />
              </div>
              {/* <p className="text-sm text-gray-400 text-center">
                {image.description}
              </p> */}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!selectedImage || isPending || !canSelect}
            size="lg"
            className="px-8"
          >
            {isPending ? "Submitting..." : "Submit Selection"}
          </Button>
        </div>
      </div>
    </div>
  );
}
