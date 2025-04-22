"use client"

import { useEffect } from "react"
import { useARVStore } from "@/store/use-arv-store"

export default function ARVTimer() {
  const { timer, setTimer, stage } = useARVStore()

  useEffect(() => {
    if (stage === "results") return // Don't count down if we're showing results

    const interval = setInterval(() => {
      if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
        clearInterval(interval)
        // If timer reaches zero, reveal results
        if (stage === "waiting") {
          useARVStore.getState().revealResults()
        }
        return
      }

      let newHours = timer.hours
      let newMinutes = timer.minutes
      let newSeconds = timer.seconds - 1

      if (newSeconds < 0) {
        newSeconds = 59
        newMinutes -= 1
      }

      if (newMinutes < 0) {
        newMinutes = 59
        newHours -= 1
      }

      setTimer(newHours, newMinutes, newSeconds)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer, setTimer, stage])

  return (
    <div className="bg-[#e0d0ff] rounded-lg p-4 text-center max-w-md mx-auto">
      <p className="text-[#3a1c6e] mb-2">Your Time ends In:</p>
      <div className="flex justify-center items-center text-5xl font-bold text-black">
        <div className="flex flex-col items-center">
          <span>{String(timer.hours).padStart(2, "0")}</span>
          <span className="text-xs mt-1">Hours</span>
        </div>
        <span className="mx-2">:</span>
        <div className="flex flex-col items-center">
          <span>{String(timer.minutes).padStart(2, "0")}</span>
          <span className="text-xs mt-1">Mins</span>
        </div>
        <span className="mx-2">:</span>
        <div className="flex flex-col items-center">
          <span>{String(timer.seconds).padStart(2, "0")}</span>
          <span className="text-xs mt-1">Secs</span>
        </div>
      </div>
    </div>
  )
}

