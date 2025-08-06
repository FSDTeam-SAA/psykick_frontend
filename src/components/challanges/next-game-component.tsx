/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import moment from "moment";

interface NextGameMessageProps {
  activeTarget: any;
}

interface QueuedGame {
  _id: string;
  code: string;
  targetImage: string;
  controlImages: string[];
  gameDuration: number;
  revealDuration: number;
  bufferDuration: number;
  isQueued: boolean;
  status: string;
  startTime?: string;
}

interface QueuedGamesResponse {
  status: boolean;
  data: QueuedGame[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  message: string;
}

export default function NextGameMessage({
  activeTarget,
}: NextGameMessageProps) {
  const [bufferEndTime, setBufferEndTime] = useState<moment.Moment | null>(
    null,
  );
//   const [queuedGames, setQueuedGames] = useState<QueuedGame[]>([]);
  const [isLoadingQueue, setIsLoadingQueue] = useState(true);
  const [hasQueuedGames, setHasQueuedGames] = useState(false);

  // Calculate buffer end time
  useEffect(() => {
    if (!activeTarget) return;

    const start = moment(activeTarget.startTime);
    const gameEnd = start
      .clone()
      .add(activeTarget.gameDuration || 0, "minutes");
    const revealEnd = gameEnd
      .clone()
      .add(activeTarget.revealDuration || 0, "minutes");
    const bufferEnd = revealEnd
      .clone()
      .add(activeTarget.bufferDuration || 0, "minutes");

    setBufferEndTime(bufferEnd);
  }, [activeTarget]);

  // Fetch queued games
  useEffect(() => {
    const fetchQueuedGames = async () => {
      try {
        setIsLoadingQueue(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/TMCTarget/get-allQueuedTMCTargets?page=1&limit=5`,
        );
        const data: QueuedGamesResponse = await response.json();

        if (data.status && data.data && data.data.length > 0) {
        //   setQueuedGames(data.data);
          setHasQueuedGames(true);
        } else {
          setHasQueuedGames(false);
        }
      } catch (error) {
        console.error("Error fetching queued games:", error);
        setHasQueuedGames(false);
      } finally {
        setIsLoadingQueue(false);
      }
    };

    fetchQueuedGames();
  }, []);

  const handleCountdownComplete = () => {
    if (hasQueuedGames) {
      // Redirect to challenges page for new game
      window.location.href = "/challenges";
    } else {
      // Refresh to check for new games
      window.location.reload();
    }
  };

  if (!bufferEndTime) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-xl">
          Loading next game information...
        </div>
      </div>
    );
  }

  if (isLoadingQueue) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-xl">
          Checking for available games...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-4xl mx-auto">
        <h1 className="text-white text-4xl mb-6 text-center font-bold">
          Challenge Complete! 🎉
        </h1>

        <div className="text-purple-300 text-center mb-8 text-xl">
          Thank you for participating in challenge:{" "}
          <span className="font-bold text-white">{activeTarget.code}</span>
        </div>

        {hasQueuedGames ? (
          <div className="bg-purple-900/20 p-8 rounded-lg mb-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Next Challenge Available Soon
            </h2>

            <div className="text-center mb-6">
              <p className="text-green-300 text-lg mb-2">
                🎮 New games are queued and ready!
              </p>
              <p className="text-gray-300">Buffer phase ends in:</p>
            </div>

            {/* Custom countdown for buffer phase only */}
            <BufferCountdown
              bufferEndTime={bufferEndTime}
              onComplete={handleCountdownComplete}
            />

            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                You will be automatically redirected to participate in the next
                game
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/30 p-8 rounded-lg mb-8 max-w-2xl w-full text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              No More Games Available
            </h2>

            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <span className="text-3xl">⏰</span>
              </div>
              <p className="text-yellow-300 text-lg mb-4">
                No more games available for now
              </p>
              <p className="text-gray-300">
                Check back later for new challenges!
              </p>
            </div>

            <div className="bg-yellow-900/20 p-4 rounded-lg mb-6">
              <p className="text-yellow-200 text-sm">
                💡 Tip: New challenges are added regularly. Follow our updates
                for announcements about upcoming games.
              </p>
            </div>
          </div>
        )}

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-green-800/30 px-6 py-3 rounded-full mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-300 font-medium text-lg">
              Results Submitted Successfully
            </span>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-lg max-w-md mx-auto mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              What happened?
            </h3>
            <ul className="text-gray-300 text-left space-y-2">
              <li>• Your submissions have been recorded</li>
              <li>• Results are being processed</li>
              <li>
                •{" "}
                {hasQueuedGames
                  ? "New challenges are queued and ready"
                  : "Check back for new challenges"}
              </li>
              <li>• Thank you for participating!</li>
            </ul>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => (window.location.href = "/challenges")}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold text-lg"
            >
              Back to Challenges
            </button>

            {!hasQueuedGames && (
              <button
                onClick={() => window.location.reload()}
                className="block mx-auto px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Check for New Games
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom countdown component for buffer phase only
function BufferCountdown({
  bufferEndTime,
  onComplete,
}: {
  bufferEndTime: moment.Moment;
  onComplete: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = moment();
      const difference = bufferEndTime.diff(now);

      if (difference <= 0) {
        onComplete();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const duration = moment.duration(difference);
      return {
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      };
    };

    const result = calculateTimeLeft();
    setTimeLeft(result);

    const timer = setInterval(() => {
      const newResult = calculateTimeLeft();
      setTimeLeft(newResult);

      if (
        newResult.days === 0 &&
        newResult.hours === 0 &&
        newResult.minutes === 0 &&
        newResult.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [bufferEndTime, onComplete]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="text-center">
      <div className="mb-4 p-3 rounded-lg bg-yellow-800/30 border border-yellow-600/50">
        <h3 className="text-lg font-bold text-white">Buffer Phase Ending</h3>
        <p className="text-sm text-gray-300">Time remaining in buffer phase</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-purple-800/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-white">
            {formatNumber(timeLeft.days)}
          </div>
          <div className="text-sm text-gray-300">Days</div>
        </div>
        <div className="bg-purple-800/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-white">
            {formatNumber(timeLeft.hours)}
          </div>
          <div className="text-sm text-gray-300">Hours</div>
        </div>
        <div className="bg-purple-800/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-white">
            {formatNumber(timeLeft.minutes)}
          </div>
          <div className="text-sm text-gray-300">Minutes</div>
        </div>
        <div className="bg-purple-800/30 p-4 rounded-lg">
          <div className="text-2xl font-bold text-white">
            {formatNumber(timeLeft.seconds)}
          </div>
          <div className="text-sm text-gray-300">Seconds</div>
        </div>
      </div>
    </div>
  );
}
