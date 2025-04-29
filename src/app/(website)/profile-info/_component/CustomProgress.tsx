"use client"

import { useState, useEffect } from "react"
import type * as React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"

// CustomProgress component
interface CustomProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max: number
  direction?: "horizontal" | "vertical"
  fillColor?: string
  emptyColor?: string
}

function CustomProgress({
  value,
  max,
  direction = "horizontal",
  fillColor = "bg-primary",
  emptyColor = "bg-secondary",
  className,
  ...props
}: CustomProgressProps) {
  const percentage = (value / max) * 100

  if (direction === "vertical") {
    return (
      <div className={cn("relative h-full w-full overflow-hidden rounded-md", emptyColor, className)} {...props}>
        <div
          className={cn("absolute bottom-0 w-full transition-all", fillColor)}
          style={{ height: `${percentage}%` }}
        />
      </div>
    )
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-md", emptyColor, className)} {...props}>
      <div className={cn("absolute h-full transition-all", fillColor)} style={{ width: `${percentage}%` }} />
    </div>
  )
}

// GameDashboard page
export default function GameDashboard() {
  const [temperature, setTemperature] = useState(30)
  const [budBudPercentage, setBudBudPercentage] = useState(8)
  const [score, setScore] = useState(8)

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => {
        const newValue = prev + Math.floor(Math.random() * 21) - 10
        return Math.min(Math.max(newValue, -100), 275)
      })

      setBudBudPercentage((prev) => {
        const newValue = prev + Math.floor(Math.random() * 5) - 2
        return Math.min(Math.max(newValue, 0), 100)
      })

      setScore((prev) => {
        const newValue = prev + Math.floor(Math.random() * 3) - 1
        return Math.max(newValue, 0)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Calculate temperature percentage
  const tempPercentage = ((temperature - -100) / (275 - -100)) * 100

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2e1a6a]">
      <Card className="p-8 w-full max-w-3xl bg-[#2e1a6a] border-none shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Temperature */}
          <div className="flex flex-col items-center">
            <span className="text-white text-3xl font-bold mb-4">{temperature}</span>
            <div className="relative h-96 flex items-center">
              <div className="relative h-full w-16">
                <CustomProgress
                  value={temperature}
                  max={275}
                  direction="vertical"
                  fillColor="bg-gradient-to-t from-red-500 via-yellow-400 to-green-500"
                  emptyColor="bg-transparent"
                />
                <div className="absolute inset-0 border-2 border-white/20 rounded-md" />

                {/* Temperature markers */}
                <div className="absolute -left-8 top-0 text-white text-2xl font-bold">275</div>
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-white text-2xl font-bold">30</div>
                <div className="absolute -left-8 bottom-1/4 text-white text-2xl font-bold">0</div>
                <div className="absolute -left-8 bottom-0 text-white text-2xl font-bold">-100</div>

                {/* Temperature indicator line */}
                <div className="absolute inset-x-0 h-0.5 bg-white" style={{ top: `${100 - tempPercentage}%` }} />
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-white"
                  style={{ clipPath: `inset(${100 - tempPercentage}% 0 0 0)` }}
                />

                {/* Diamonds */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rotate-45 transform" />
                <div className="absolute -right-3 bottom-1/4 w-6 h-6 bg-white rotate-45 transform" />
              </div>

              {/* Dotted Lines */}
              <div className="absolute top-1/2 -translate-y-1/2 left-16 w-[calc(100%-32px)] border-t-2 border-dashed border-white" />
              <div className="absolute bottom-1/4 left-16 w-[calc(100%-32px)] border-t-2 border-dashed border-white" />
            </div>
          </div>

          {/* Middle - Levels */}
          <div className="flex flex-col items-center justify-between h-80 py-4">
            {["APPRENTICE", "INITIATE", "NOVICE SEEKER"].map((title, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <h3 className="text-[#ff9d4d] text-2xl font-bold mb-2">{title}</h3>
                <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden" style={{
                  backgroundColor: idx === 0 ? "#facc15" : idx === 1 ? "#fb923c" : "#ef4444",
                }}>
                  <Image
                  fill
                    src="/placeholder.svg?height=64&width=64"
                    alt={`${title} character`}
                    className="w-14 h-14 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right - Bud Bud Progress */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-4">
              <h3 className="text-white text-xl font-bold">YOUR</h3>
              <h3 className="text-white text-xl font-bold">CURRENT</h3>
              <h3 className="text-white text-xl font-bold">SCORE</h3>
              <span className="text-white text-3xl font-bold">{score.toString().padStart(2, "0")}</span>
            </div>

            <div className="relative h-96 w-16">
              <CustomProgress
                value={budBudPercentage}
                max={100}
                direction="vertical"
                fillColor="bg-[#00c2c2]"
                emptyColor="bg-black"
                className="bg-[radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:8px_8px]"
              />
              {/* Diamonds */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rotate-45 transform" />
              <div className="absolute -left-3 bottom-1/4 w-6 h-6 bg-white rotate-45 transform" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
