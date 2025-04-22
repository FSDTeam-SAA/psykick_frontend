"use client";

import { useARVStore } from "@/store/use-arv-store";
import Image from "next/image";

export default function ARVImageSelection() {
  const { imageChoices, selectImage, selectedImageId, toggleShareModal } =
    useARVStore();

  const handleSubmit = () => {
    if (selectedImageId) {
      toggleShareModal();
    } else {
      alert("Please select an image before submitting");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl text-white mb-4">
        Select the image that best matches your impressions:
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {imageChoices.map((image) => (
          <div
            key={image.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden ${image.selected ? "ring-2 ring-[#8a2be2]" : ""}`}
            onClick={() => selectImage(image.id)}
          >
            <Image
              width={500}
              height={500}
              src={image.src || "/placeholder.svg"}
              alt={`Option ${image.id}`}
              className="w-full h-64 object-cover"
            />

            {image.selected && (
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#8a2be2] flex items-center justify-center text-white font-bold">
                1
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!selectedImageId}
          className={`px-6 py-3 rounded-lg text-white ${
            selectedImageId
              ? "bg-[#8a2be2] hover:bg-[#7a1bd2]"
              : "bg-gray-500 cursor-not-allowed"
          } transition-colors`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
