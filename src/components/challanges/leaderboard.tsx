/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface LeaderboardEntry {
  _id: string;
  user: {
    screenName: string;
    fullName?: string;
  };
  tierRank: string;
  totalPoints?: number;
  totalARVPoints?: number;
}

interface LeaderboardData {
  data: LeaderboardEntry[];
}

export default function Leaderboard() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const { data: tmsleaderboardData, refetch: tmsleaderboardDataFatching } = useQuery<LeaderboardData>({
    queryKey: ["tmsleaderboardData"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard/get-TMCLeaderboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!token,
  });

  const { data: arvleaderboardData, isLoading, refetch: arvleaderboardDataFatching } = useQuery<LeaderboardData>({
    queryKey: ["arvleaderboardData"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard/get-ARVLeaderboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!token,
  });

  const { data: totalLeaderboard, refetch: totalleaderboardDataFatching } = useQuery<LeaderboardData>({
    queryKey: ["totalLeaderboardData"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard/get-totalLeaderboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!token,
  });

  const fetchLeaderbardData = () => {
    if (token) {
      totalleaderboardDataFatching();
      arvleaderboardDataFatching();
      tmsleaderboardDataFatching();
    }
  };

  const getRowColor = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return "bg-[#2a904c]";

    switch (rank) {
      case 0:
        return "bg-[#ec762c]";
      case 1:
        return "bg-[#5ec9c0]";
      case 2:
        return "bg-[#3a51e9]";
      default:
        return "bg-[#4a2c7e]";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* TMC Leaderboard */}
        <div>
          <div className="bg-[#B268FA] rounded-t-lg p-4 flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">TMC Leaderboard</h2>
          </div>

          <div className="rounded-b-lg overflow-hidden">
            <div className="grid bg-white my-4 grid-cols-4 text-center py-2 border-b border-gray-200">
              <div className="text-gray-600 font-medium">Rank</div>
              <div className="text-gray-600 font-medium text-left pl-4">Profile</div>
              <div className="text-gray-600 font-medium">RV Tier</div>
              <div className="text-gray-600 font-medium">Score</div>
            </div>

            <div className="max-h-[500px] px-4 overflow-y-auto flex flex-col gap-4 relative">
              {tmsleaderboardData?.data.map((entry, i) => (
                <div key={entry._id} className={`grid rounded-lg grid-cols-4 items-center text-center py-3 ${getRowColor(i, false)}`}>
                  <div className="font-medium text-[16px] text-white">{i + 1}</div>
                  <div className="flex items-center text-left">
                    <div>
                      <div className="font-medium text-[16px] text-white">{entry.user.screenName}</div>
                    </div>
                  </div>
                  <div className="text-white">{entry.tierRank}</div>
                  <div className="font-bold text-white">{entry.totalPoints}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ARV Leaderboard */}
        <div>
          <div className="bg-[#9186FF] rounded-t-lg p-4 flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v8" />
                <path d="m16 6-4 4-4-4" />
                <path d="M8 16H6a2 2 0 0 0-2 2" />
                <path d="M16 16h2a2 2 0 0 1 2 2" />
                <path d="M12 22v-8" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">ARV Leaderboard</h2>
          </div>

          <div className="rounded-b-lg overflow-hidden">
            <div className="grid bg-white my-4 grid-cols-4 text-center py-2 border-b border-gray-200">
              <div className="text-gray-600 font-medium">Rank</div>
              <div className="text-gray-600 font-medium text-left pl-4">Profile</div>
              <div className="text-gray-600 font-medium">RV Tier</div>
              <div className="text-gray-600 font-medium">Score</div>
            </div>

            <div className="max-h-[500px] px-4 flex flex-col gap-4 overflow-y-auto relative">
              {arvleaderboardData?.data.map((entry, i) => (
                <div key={entry._id} className={`grid rounded-lg grid-cols-4 items-center text-center py-3 ${getRowColor(i, false)}`}>
                  <div className="font-bold text-white">{i + 1}</div>
                  <div className="flex items-center text-left">
                    <div>
                      <div className="font-medium text-white">{entry.user.screenName}</div>
                    </div>
                  </div>
                  <div className="text-white">{entry.tierRank}</div>
                  <div className="font-bold text-white">{entry.totalARVPoints}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Combined Leaderboard */}
      <div className="mt-8 col-span-2 bg-[#FFFFFF1A]">
        <div className="bg-[linear-gradient(90deg,_#8F37FF_0%,_#2D17FF_100%)] mb-10 rounded-t-lg p-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#8a2be2] mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 3v18h18" />
              <path d="m18 9-2-2" />
              <path d="m8 17-2-2" />
              <path d="m13 12-2-2" />
              <path d="m18 14-2-2" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white">Combined Leaderboard</h2>
        </div>

        <div className="rounded-b-lg px-3 overflow-hidden">
          <div className="grid bg-[#F4EBFF] mb-4 grid-cols-4 text-center py-2 border-b border-gray-200">
            <div className="text-gray-600 font-medium">Rank</div>
            <div className="text-gray-600 font-medium text-left pl-4">Profile</div>
            <div className="text-gray-600 font-medium">RV Tier</div>
            <div className="text-gray-600 font-medium">Score</div>
          </div>

          <div className="max-h-[500px] pr-3 flex flex-col gap-4 overflow-y-auto relative">
            {totalLeaderboard?.data.map((entry, i) => (
              <div key={entry._id} className={`grid grid-cols-4 border items-center rounded-lg text-center py-3 ${getRowColor(i, false)}`}>
                <div className="font-bold text-white">{i + 1}</div>
                <div className="flex items-center text-left">
                  <div>
                    <div className="font-medium text-white">{entry.user.screenName}</div>
                    <div className="text-xs text-white/70">{entry.user.fullName}</div>
                  </div>
                </div>
                <div className="text-white">{entry.tierRank}</div>
                <div className="font-bold text-white">{entry.totalPoints}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Refresh button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={fetchLeaderbardData}
          className="flex items-center px-4 py-2 bg-[#8a2be2] text-white rounded-lg hover:bg-[#7a1bd2] transition-colors"
          disabled={isLoading}
        >
          <RefreshCw size={18} className={`mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Leaderboards
        </button>
      </div>
    </div>
  );
}
