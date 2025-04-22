"use client"

import Image from "next/image"
import { useChallengeStore } from "@/store/use-challenge-store"

export default function ImageSelection() {
  const { imageChoices, selectImage, showImageSelection, submitChoices } = useChallengeStore()

  if (!showImageSelection) return null

  return (
    <div className="mt-8">
      <h3 className="text-xl text-white mb-4">Select the 2 most appropriate images in order of relevance:</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {imageChoices.map((image) => (
          <div
            key={image.id}
            className="relative cursor-pointer rounded-lg overflow-hidden"
            onClick={() => selectImage(image.id)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={`Option ${image.id}`}
              width={300}
              height={200}
              className="w-full h-32 object-cover"
            />

            {image.selected && (
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                {image.order}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={submitChoices} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Submit
        </button>
      </div>
    </div>
  )
}

