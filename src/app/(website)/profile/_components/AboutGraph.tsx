"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const fetchGraphData = async (userId: string): Promise<
  { month: string; TMC: number; ARV: number }[]
> => {
  const token = localStorage.getItem("authToken");
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${baseURL}/userSubmission/user-graph-data/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch graph data");

  const json = await res.json();

  return json.data.map((item: { month: string; tmc: number; arv: number }) => ({
    month: item.month,
    TMC: item.tmc,
    ARV: item.arv,
  }));
};

export function AboutGraph() {
  const { user } = useAuth();
  const userId = user?._id;

  const { data, isLoading } = useQuery({
    queryKey: ["userGraphData", userId],
    queryFn: () => fetchGraphData(userId!),
    enabled: !!userId, // avoids running the query until userId is available
  });

  if (isLoading || !data) {
    return (
      <Card className="p-6 flex items-center justify-center h-[300px]">
        <div className="animate-pulse">Loading chart data...</div>
      </Card>
    );
  }

  return (
    <Card className="p-4 rounded-3xl overflow-hidden bg-[#FFFFFF1A]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-white">About Graph</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">TMC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">ARV</span>
          </div>
        </div>
      </div>

      <div className="h-[150px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorTMC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorARV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              domain={[0, 240]}
              ticks={[0, 40, 80, 120, 160, 200, 240]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
            />
            <Line
              type="monotone"
              dataKey="TMC"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              fillOpacity={1}
              fill="url(#colorTMC)"
            />
            <Line
              type="monotone"
              dataKey="ARV"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              fillOpacity={1}
              fill="url(#colorARV)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
