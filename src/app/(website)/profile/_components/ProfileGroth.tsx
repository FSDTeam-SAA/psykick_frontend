"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
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
  totalCompletedTargets: number
  successRate: string
}

async function fetchProfileStats(): Promise<StatsData> {
  const token = localStorage.getItem("authToken")
  if (!token) throw new Error("No auth token found")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/completed-targets-count`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch profile stats")

  const json = await res.json()
  if (!json.status) throw new Error(json.message || "API error")

  return json.data
}

export default function ProfileGroth() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profileStats"],
    queryFn: fetchProfileStats,
    enabled: isClient, // prevent mismatch by deferring to client
  })

  return (
    <main className="w-full py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <StatCard
            title="Completed Target"
            value={
              !isClient || isLoading
                ? "..."
                : isError
                ? "0"
                : data?.totalCompletedTargets ?? 0
            }
            icon={<Target className="h-8 w-8" />}
            className="bg-[linear-gradient(90deg,rgba(143,55,255,0.6)_0%,rgba(45,23,255,0.6)_100%)]"
          />
          <StatCard
            title="Success Rate"
            value={
              !isClient || isLoading
                ? "..."
                : isError
                ? "0"
                : `${data?.successRate ?? "0"}%`
            }
            icon={<Activity className="h-8 w-8" />}
            className="bg-[linear-gradient(90deg,rgba(143,55,255,0.6)_0%,rgba(45,23,255,0.6)_100%)]"
          />
        </div>
      </div>
    </main>
  )
}
