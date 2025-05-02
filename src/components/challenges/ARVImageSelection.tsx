/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { useARVStore } from "@/store/use-arv-store";
import { useSubmitARVTarget } from "@/hooks/use-arv-queries";

export default function ARVImageSelection() {
  const {
    imageChoices,
    selectedImageId,
    selectImage,
    setStage,
    activeTarget,
    currentDrawing,
    setSubmissionId,
  } = useARVStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitTarget = useSubmitARVTarget();

  const handleSelect = (imageId: string) => {
    selectImage(imageId);
  };

  const handleSubmit = async () => {
    if (!selectedImageId || !activeTarget || !currentDrawing) return;

    try {
      setIsSubmitting(true);
      const result = await submitTarget.mutateAsync({
        submittedImage: currentDrawing,
        ARVTargetId: activeTarget.targetId,
      });

      if (result.data._id) {
        setSubmissionId(result.data._id);
        setStage("waiting");
      }
    } catch (error) {
      console.error("Error submitting target:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-6">
          Select Your Prediction
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {imageChoices.map((image) => (
            <div
              key={image.id}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedImageId === image.id
                  ? "ring-4 ring-blue-500 scale-105"
                  : "hover:scale-102"
              }`}
              onClick={() => handleSelect(image.id)}
            >
              <Image
                src={image.src}
                alt={`Target image ${image.id}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setStage("drawing")}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Drawing
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedImageId || isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Selection"}
          </button>
        </div>
      </div>
    </div>
  );
}
