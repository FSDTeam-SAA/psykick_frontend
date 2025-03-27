"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

// Sample data that matches the trends in the image
const initialData = [
  { month: "Jan", TMC: 80, ARV: 40 },
  { month: "Feb", TMC: 100, ARV: 60 },
  { month: "Mar", TMC: 140, ARV: 90 },
  { month: "Apr", TMC: 180, ARV: 110 },
  { month: "May", TMC: 200, ARV: 120 },
  { month: "Jun", TMC: 190, ARV: 140 },
  { month: "Jul", TMC: 160, ARV: 150 },
  { month: "Aug", TMC: 120, ARV: 160 },
  { month: "Sep", TMC: 60, ARV: 170 },
  { month: "Oct", TMC: 40, ARV: 180 },
  { month: "Nov", TMC: 100, ARV: 190 },
  { month: "Dec", TMC: 180, ARV: 200 },
]

export function AboutGraph() {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      // In a real application, you would fetch data from an API here
      // For demo purposes, we'll just use a timeout to simulate loading
      setTimeout(() => {
        setData(initialData)
        setLoading(false)
      }, 1000)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center h-[300px]">
        <div className="animate-pulse">Loading chart data...</div>
      </Card>
    )
  }

  return (
    <Card className="p-4 rounded-3xl max-w-[630px] overflow-hidden bg-transparent ">
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

      <div className="h-[300px] w-full">
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
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
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
  )
}

