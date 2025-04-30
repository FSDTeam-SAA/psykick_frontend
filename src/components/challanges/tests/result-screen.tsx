import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";

interface ResultScreenProps {
  arvTarget: {
    code: string;
    eventName: string;
    eventDescription: string;
    controlImage?: string;
    resultImage?: string;
  };
  arvResult?: {
    points: number;
  };
}

export default function ResultScreen({ arvTarget, arvResult }: ResultScreenProps) {
  const points = arvResult?.points || 0;
  const isSuccessful = points > 0;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl text-white mb-6">
        Feedback for Target ID: {arvTarget.code}
      </h2>

      <div className="mb-6">
        <h3 className="text-xl text-white mb-2">Event Name</h3>
        <p className="text-yellow-300 text-lg font-medium">
          {arvTarget.eventName}
        </p>
      </div>

      <div className="mb-8">
        <p className="text-yellow-300">{arvTarget.eventDescription}</p>
      </div>

      <div className="bg-purple-900 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden mb-8">
        <Image
          src={arvTarget.controlImage || "/placeholder.svg"}
          alt="Control image"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-xl text-white mb-4">Outcome Event</h3>
        <p className="text-yellow-300">{arvTarget.eventDescription}</p>
      </div>

      <div className="bg-purple-900 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden mb-8">
        <Image
          src={arvTarget.resultImage || "/placeholder.svg"}
          alt="Result image"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      <div
        className={`${isSuccessful ? "bg-green-900" : "bg-red-900"} bg-opacity-20 backdrop-blur-sm rounded-xl p-8 mb-8 text-center`}
      >
        <h2
          className={`text-4xl font-bold mb-4 ${isSuccessful ? "text-green-400" : "text-red-400"}`}
        >
          {isSuccessful ? "Congratulations!" : "Better luck next time!"}
        </h2>
        <p className="text-white text-xl mb-6">
          {isSuccessful
            ? `You have successfully predicted the outcome for this event. You received ${points} points!`
            : "Your prediction did not match the outcome for this event. Keep practicing!"}
        </p>

        {isSuccessful && (
          <div className="flex justify-center items-center gap-3 mb-6">
            <Trophy className="text-yellow-400 w-8 h-8" />
            <span className="text-yellow-400 text-2xl font-bold">
              +{points} points
            </span>
          </div>
        )}

        <Link
          href="/leaderboard"
          className="inline-block px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full transition"
        >
          See Leaderboard
        </Link>
      </div>
    </div>
  );
}
