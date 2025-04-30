/* eslint-disable */
// @ts-nocheck
"use client";

import { useARVStore } from "@/store/use-arv-store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSubmitARVTarget } from "@/hooks/use-arv-queries";

export default function ARVImageSelection() {
  const {
    imageChoices,
    selectImage,
    submitSelection,
    selectedImageId,
    activeTarget,
  } = useARVStore();
  const { mutate: submitARV } = useSubmitARVTarget();

  const handleSubmit = async () => {
    if (!selectedImageId || !activeTarget) return;

    const selectedImage = imageChoices.find(
      (img) => img.id === selectedImageId,
    );
    if (!selectedImage?.src) {
      console.error("Selected image or image URL not found");
      return;
    }

    try {
      // Send the URL of the selected image directly from the choices
      const imageUrl = selectedImage.src;
      await submitARV({
        submittedImage: imageUrl,
        ARVTargetId: activeTarget.targetId,
      });
      submitSelection();
    } catch (error) {
      console.error("Failed to submit selection:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">
        Select the image that best matches your impressions:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {imageChoices.map((image) => (
          <button
            key={image.id}
            onClick={() => selectImage(image.id)}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden transition-all",
              "hover:ring-4 hover:ring-[#8a2be2] hover:ring-opacity-50",
              image.selected && "ring-4 ring-[#8a2be2]",
            )}
          >
            <Image
              src={image.src}
              alt={`Choice ${image.id}`}
              fill
              className="object-cover"
            />
            {image.controlImage && (
              <Image src={image.controlImage} alt="Control Image" fill />
            )}
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedImageId}
          className={cn(
            "px-6 py-3 rounded-lg transition-colors",
            selectedImageId
              ? "bg-[#8a2be2] hover:bg-[#7a1bd2] text-white"
              : "bg-gray-500 cursor-not-allowed text-gray-300",
          )}
        >
          Submit Selection
        </button>
      </div>
    </div>
  );
}
