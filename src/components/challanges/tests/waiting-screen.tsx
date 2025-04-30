"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { formatCountdown } from "@/lib/utils";

interface ArvTarget {
  gameTime: { $date: string };
  code: string;
  controlImage: string;
  eventName: string;
  eventDescription: string;
  image1: { url: string; description: string };
  image2: { url: string; description: string };
  image3: { url: string; description: string };
}

export default function WaitingScreen({ arvTarget }: { arvTarget: ArvTarget }) {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const gameTime = new Date(arvTarget.gameTime.$date).getTime();
      const timeLeft = gameTime - now;

      if (timeLeft <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const { hours, minutes, seconds } = formatCountdown(timeLeft);
      setTimeRemaining({ hours, minutes, seconds });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [arvTarget]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-purple-200 bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mb-8">
        <h2 className="text-center text-2xl text-white mb-2">
          Your Time ends In:
        </h2>
        <div className="flex justify-center gap-2 text-6xl font-bold text-center">
          <div className="flex flex-col items-center">
            <span className="text-white">
              {String(timeRemaining.hours).padStart(2, "0")}
            </span>
            <span className="text-sm text-purple-300 font-normal">Hours</span>
          </div>
          <span className="text-white">:</span>
          <div className="flex flex-col items-center">
            <span className="text-white">
              {String(timeRemaining.minutes).padStart(2, "0")}
            </span>
            <span className="text-sm text-purple-300 font-normal">Mins</span>
          </div>
          <span className="text-white">:</span>
          <div className="flex flex-col items-center">
            <span className="text-white">
              {String(timeRemaining.seconds).padStart(2, "0")}
            </span>
            <span className="text-sm text-purple-300 font-normal">Secs</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl text-white mb-4">Target ID: {arvTarget.code}</h2>

      <div className="bg-purple-900 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden mb-6">
        <Image
          src={arvTarget.controlImage || "/placeholder.svg"}
          alt="Target control image"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="bg-purple-800 bg-opacity-30 backdrop-blur-sm rounded-xl p-6 mb-8">
        <h3 className="text-lg text-white mb-2">
          The Target with Target ID: {arvTarget.code} concerns the outcome of
          the following event:
        </h3>
        <p className="text-yellow-300 text-lg font-medium">
          {arvTarget.eventName}
        </p>
        <p className="text-yellow-300 mt-2">{arvTarget.eventDescription}</p>
      </div>

      <div className="bg-purple-800 bg-opacity-30 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-lg text-white mb-4">
          Select the image that you believe corresponds to the outcome:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImageOption
            imageUrl={arvTarget.image1.url}
            description={arvTarget.image1.description}
            index={1}
          />
          <ImageOption
            imageUrl={arvTarget.image2.url}
            description={arvTarget.image2.description}
            index={2}
          />
          <ImageOption
            imageUrl={arvTarget.image3.url}
            description={arvTarget.image3.description}
            index={3}
          />
        </div>
      </div>
    </div>
  );
}

interface ImageOptionProps {
  imageUrl: string;
  description: string;
  index: number;
}

function ImageOption({ imageUrl, description, index }: ImageOptionProps) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`relative rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 ${
        selected ? "ring-4 ring-green-400 scale-105" : ""
      }`}
      onClick={() => setSelected(!selected)}
    >
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={`Option ${index}`}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
        <p className="text-white text-sm">{description}</p>
      </div>
      {selected && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          ✓
        </div>
      )}
    </div>
  );
}
