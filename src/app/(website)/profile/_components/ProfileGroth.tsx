"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Target, Activity } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  className?: string
}

function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div className={`rounded-2xl p-5 w-full border-2 border-white shadow-md ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium text-white">{title}</h3>
          <p className="mt-1 text-4xl font-bold text-white">{value}</p>
        </div>
        <div className="text-white/80">{icon}</div>
      </div>
    </div>
  )
}

interface StatsData {
  completedTarget: number
  successRate: number
}

export default function ProfileGroth() {
  const [stats, setStats] = useState<StatsData>({
    completedTarget: 0,
    successRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        setTimeout(() => {
          setStats({
            completedTarget: 211,
            successRate: 70,
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching stats:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="w-full py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-6">
          <StatCard
            title="Completed Target"
            value={loading ? "..." : stats.completedTarget}
            icon={<Target className="h-8 w-8" />}
            className="bg-[linear-gradient(90deg,rgba(143,55,255,0.6)_0%,rgba(45,23,255,0.6)_100%)] w-full"
          />
          <StatCard
            title="Success Rate"
            value={loading ? "..." : `${stats.successRate}%`}
            icon={<Activity className="h-8 w-8" />}
            className="bg-[linear-gradient(90deg,rgba(143,55,255,0.6)_0%,rgba(45,23,255,0.6)_100%)] w-full"
          />
        </div>
      </div>
    </main>
  )
}
