"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface HomeCounts {
  activeUsers: number
  runningEvents: number
  totalParticipation: number
}

// API fetcher function
async function fetchHomeCounts(): Promise<HomeCounts> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home/counts`, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) throw new Error("Failed to fetch home counts")

  const json = await res.json()
  if (!json.success) throw new Error(json.message || "API error")

  return json.data
}

export default function AboutRemotView() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: ["homeCounts"],
    queryFn: fetchHomeCounts,
    enabled: isClient,
  })

  const totalParticipants = data?.totalParticipation ?? 0
  const activeUsers = data?.activeUsers ?? 0
  const runningEvents = data?.runningEvents ?? 0

  return (
    <div className="text-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-[130px] items-center">
          <div className="space-y-6">
            <h1 className="title textLargeShadow">
              Learn more about Remote Viewing
            </h1>

            <p className="text-sm md:text-base lg:text-lg text-gray-200">
              Remote Viewing (RV) is a fascinating practice that allows
              individuals to perceive distant or unseen targets using only their
              mind. Rooted in scientific research and intuitive exploration, RV
              has been used for everything from personal discovery to practical
              applications in problem-solving and prediction. Whether
              you&apos;re a beginner or looking to refine your skills,
              understanding the fundamentals of remote viewing can unlock new
              ways of perceiving information beyond the five senses. Click to
              explore the principles, techniques, and real-world applications of
              remote viewing.
            </p>

            <Link href="/learn-more-about">
              <button className="mt-[18px] lg:mt-[32px] btn hover:bg-[#7C3AED] text-white rounded-full px-6 py-2 flex items-center gap-2 text-sm md:text-base">
                Click Here
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="mt-[60px]">
                <div className="text-2xl md:text-3xl lg:text-[48px] font-semibold">
                  {isLoading ? "..." : totalParticipants}
                </div>
                <div className="text-xs md:text-sm text-gray-300">
                  Total Participant
                </div>
              </div>
              <div className="mt-[60px]">
                <div className="text-2xl md:text-3xl lg:text-[48px] font-semibold">
                  {isLoading ? "..." : activeUsers}
                </div>
                <div className="text-xs md:text-sm text-gray-300">
                  Active User
                </div>
              </div>
              <div className="mt-[60px]">
                <div className="text-2xl md:text-3xl lg:text-[48px] font-semibold">
                  {isLoading ? "..." : runningEvents}
                </div>
                <div className="text-xs md:text-sm text-gray-300">
                  Running Event
                </div>
              </div>
            </div>
          </div>

          <div className="order-first lg:order-last">
            <div className="rounded-3xl max-w-[470px] overflow-hidden">
              <Image
                src="/assets/img/about-img.png"
                alt="People looking at night sky"
                width={470}
                height={520}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
