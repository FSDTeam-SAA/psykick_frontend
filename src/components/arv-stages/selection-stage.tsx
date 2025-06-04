"use client";

import { useState, useEffect } from "react";
import { useARVStore } from "@/store/use-arv-store";
import CountdownTimer from "./countdown-timer";
import Image from "next/image";

export default function SelectionStage() {
  const {
    activeTarget,
    imageChoices,
    selectImage,
    selectedImageId,
    submitSelection,
    setSubmissionId,
    setHasSubmitted,
  } = useARVStore();
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (activeTarget?.gameTime) {
      const updateTimer = () => {
        const now = new Date();
        const gameTime = new Date(activeTarget.gameTime);
        const diff = Math.max(0, gameTime.getTime() - now.getTime());

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining({ hours, minutes, seconds });
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTarget]);

  const handleSubmit = async () => {
    if (!selectedImageId) return;

    setIsSubmitting(true);
    try {
      const selectedImage = imageChoices.find(
        (img) => img.id === selectedImageId,
      );
      if (!selectedImage) return;

      const token = localStorage.getItem("authToken");

      // Prepare the submission data according to the required format
      const submissionData = {
        submittedImage: selectedImage.src,
        ARVTargetId: activeTarget?.targetId,
      };

      console.log("Submitting selection:", submissionData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/submit-ARVTarget`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submissionData),
        },
      );
      // Move to waiting stage
      submitSelection();

      const data = await response.json();
      if (data.status) {
        console.log("Submission successful:", data);

        // Store submission ID for later use
        setSubmissionId(data.data._id);

        // Mark as submitted
        setHasSubmitted(true);
      } else {
        console.error("Submission failed:", data);
        throw new Error(data.message || "Failed to submit selection");
      }
    } catch (error) {
      console.error("Error submitting selection:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-xl font-semibold mb-4">
        Step inside, trust your senses, and begin your journey into the unseen.
      </h1>

      <div className="flex flex-col sm:flex-row justify-between w-full mb-4">
        <div>
          <p>Code: {activeTarget?.code}</p>
          <p>Event: {activeTarget?.eventName}</p>
          <p>
            Reveal Time:{" "}
            {new Date(activeTarget?.revealTime || "").toLocaleString()}
          </p>
        </div>

        <div className="bg-purple-800 rounded-lg p-2 text-center">
          <p className="text-xs mb-1">Your Time ends in:</p>
          <CountdownTimer
            hours={timeRemaining.hours}
            minutes={timeRemaining.minutes}
            seconds={timeRemaining.seconds}
          />
        </div>
      </div>

      <h2 className="text-lg mb-4">
        Select the image that best matches your impressions:
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {imageChoices.map((image) => (
          <div
            key={image.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-4 aspect-square  ${
              image.selected ? "border-purple-400" : "border-transparent"
            }`}
            onClick={() => selectImage(image.id)}
          >
            <Image
              src={image.src || "/placeholder.svg?height=300&width=400"}
              alt={`Option ${image.id}: ${image.description}`}
              fill
              className="object-cover"
            />
            {/* {image.description && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                <p className="text-sm text-white">{image.description}</p>
              </div>
            )} */}
          </div>
        ))}
      </div>

      <div className="mt-6 w-full flex justify-end">
        <button
          className={`px-6 py-2 rounded-lg ${
            selectedImageId
              ? "bg-purple-600 hover:bg-purple-500"
              : "bg-gray-500 cursor-not-allowed"
          } transition`}
          disabled={!selectedImageId || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
