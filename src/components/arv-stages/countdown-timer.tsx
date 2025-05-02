"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  hours: number
  minutes: number
  seconds: number
  large?: boolean
}

export default function CountdownTimer({ hours, minutes, seconds, large = false }: CountdownTimerProps) {
  const [displayHours, setDisplayHours] = useState(hours)
  const [displayMinutes, setDisplayMinutes] = useState(minutes)
  const [displaySeconds, setDisplaySeconds] = useState(seconds)

  useEffect(() => {
    setDisplayHours(hours)
    setDisplayMinutes(minutes)
    setDisplaySeconds(seconds)
  }, [hours, minutes, seconds])

  return (
    <div className="flex justify-center items-center">
      <div className={`flex space-x-2 ${large ? "text-4xl" : "text-xl"} font-bold`}>
        <div className="w-10 text-center">{displayHours.toString().padStart(2, "0")}</div>
        <div className="text-center">:</div>
        <div className="w-10 text-center">{displayMinutes.toString().padStart(2, "0")}</div>
        <div className="text-center">:</div>
        <div className="w-10 text-center">{displaySeconds.toString().padStart(2, "0")}</div>
      </div>
    </div>
  )
}
