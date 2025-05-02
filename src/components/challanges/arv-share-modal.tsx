/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { X } from "lucide-react";
import { useARVStore } from "@/store/use-arv-store";
import { useEffect } from "react";
import Image from "next/image";

export default function ARVShareModal() {
  const {
    showShareModal,
    toggleShareModal,
    currentDrawing,
    imageChoices,
    // selectedImageId,
    submitSelection,
  } = useARVStore();

  useEffect(() => {
    if (showShareModal && !currentDrawing) {
      const storeDrawing = useARVStore.getState().currentDrawing;
      if (storeDrawing) {
        useARVStore.getState().updateDrawing(storeDrawing);
      }
    }
  }, [showShareModal, currentDrawing]);

  if (!showShareModal) return null;

  // const selectedImage = imageChoices.find((img) => img.id === selectedImageId)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#3a1c6e] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Share With Friends!
            </h2>
            <button
              onClick={toggleShareModal}
              className="text-white hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="opinion" className="block text-white mb-2">
              Type Your Opinion
            </label>
            <textarea
              id="opinion"
              className="w-full p-3 rounded-lg bg-[#4a2c7e] text-white placeholder-purple-300 border border-purple-700"
              rows={4}
              placeholder="Guys, what do you think about this? What choice should I make? What should be my choice? What Do You Think Guys Which option is more similar to my drawn impression, would you guys help me to figure it out properly?"
            />
          </div>

          <div className="mb-4">
            <h3 className="text-white mb-2">My Drawn Impressions:</h3>
            <div className="relative bg-white rounded-lg overflow-hidden">
              <div className="w-full h-64 relative">
                <Image
                  width={600}
                  height={400}
                  src={
                    currentDrawing || "/placeholder.svg?height=400&width=600"
                  }
                  alt="Your drawing"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.svg?height=400&width=600";
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white mb-2">Select Your Choice:</h3>
            <div className="grid grid-cols-2 gap-2">
              {imageChoices.map((image) => (
                <div
                  key={image.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden ${image.selected ? "ring-2 ring-[#8a2be2]" : ""}`}
                  onClick={() => useARVStore.getState().selectImage(image.id)}
                >
                  <Image
                    width={500}
                    height={500}
                    src={image.src || "/placeholder.svg"}
                    alt={`Option ${image.id}`}
                    className="w-full h-32 object-cover"
                  />

                  {image.selected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#8a2be2] flex items-center justify-center text-white font-bold text-xs">
                      1
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={submitSelection}
              className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
