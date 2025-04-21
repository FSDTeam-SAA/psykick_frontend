"use client";

import Image from "next/image";
import { Maximize } from "lucide-react";
import { useChallengeStore } from "@/store/use-challenge-store";

export default function ShareModal() {
  const { currentDrawing, imageChoices, submitChoices, selectImage } =
    useChallengeStore();

  return (
    <div className="bg-purple-900 rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">
        Share With Friends!
      </h2>

      <div className="mb-4">
        <label htmlFor="opinion" className="block text-white mb-2">
          Type Your Opinion
        </label>
        <textarea
          id="opinion"
          className="w-full p-3 rounded-lg bg-purple-800 text-white placeholder-purple-300 border border-purple-700"
          rows={4}
          placeholder="Guys, what do you think about this? What choice should I make? What should be my 1st choice, What should be my second choice? What Do You Think Guys Which options is more similar to my drawn impression, whould you guys help me to figure it out properly ?"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-white mb-2">My Drawn Impressions:</h3>
        <div className="relative bg-white rounded-lg overflow-hidden">
          <div className="absolute top-2 right-2 z-10">
            <button className="p-1 bg-white/20 rounded">
              <Maximize size={16} />
            </button>
          </div>

          <div className="w-full h-64 relative">
            {currentDrawing ? (
              <Image
                width={500}
                height={500}
                src={currentDrawing || "/placeholder.svg"}
                alt="Your drawing"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No drawing available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-white mb-2">Select Your Choice(any 2):</h3>
        <div className="grid grid-cols-3 gap-2">
          {imageChoices.map((image) => (
            <div
              key={image.id}
              className="relative cursor-pointer rounded-lg overflow-hidden"
              onClick={() => selectImage(image.id)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`Option ${image.id}`}
                width={150}
                height={100}
                className="w-full h-20 object-cover"
              />

              {image.selected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                  {image.order}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={submitChoices}
          className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          Share
        </button>
      </div>
    </div>
  );
}
