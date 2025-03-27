"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Target, Activity } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  className?: string
}

function StatCard({ title, value, icon, className = "" }: StatCardProps) {
  return (
    <div className={`rounded-lg p-4 bg-transparent w-[305px] border-2 border-white ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="mt-2 text-4xl font-bold text-white">{value}</p>
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
    // Simulate fetching data from an API
    const fetchData = async () => {
      setLoading(true)
      try {
        // In a real app, replace this with your actual API call
        // const response = await fetch('/api/stats')
        // const data = await response.json()

        // Simulating API response with setTimeout
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
    <main className=" w-full mx-auto py-4  ">
      <div className="w-full p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Completed Target"
            value={loading ? "..." : stats.completedTarget}
            icon={<Target className="h-8 w-8" />}
            className="bg-transparent"
          />
          <StatCard
            title="Success Rate"
            value={loading ? "..." : `${stats.successRate}%`}
            icon={<Activity className="h-8 w-8" />}
            className=""
          />
        </div>
      </div>
    </main>
  )
}

