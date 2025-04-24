"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircleQuestionIcon as QuestionMarkCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

interface GameCardProps {
  avatarSrc?: string
  tier?: string
  seekerStatus?: string
  showQuestionMark?: boolean
}

export default function ProfileCard({
  avatarSrc = "/assets/img/profile.png     ",
  showQuestionMark = true,
}: GameCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [isLoaded])

const  {user} = useAuth()
console.log("user", user)

  return (
    <Card className="w-full max-w-xs mx-auto bg-transparent  rounded-2xl shadow-md  border-2 border-white">
       <h1 className="text-[32px] text-[#FFFFFF] font-semibold text-center">Darlene Robertson</h1>
       <p className="text-center text-[#FFFFFF]">@darlenerobertson</p>
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
     
        {/* Avatar Circle */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-red-500">
          <Image
            src={avatarSrc || "/placeholder.svg"}
            alt="Avatar"
            fill
            className="object-cover"
            priority
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Status Badge */}
        <div className="w-full bg-[#2d1e4f] border-2 border-white rounded-lg py-2 px-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <h3 className="text-white font-bold text-lg tracking-wide">{user?.screenName}</h3>
            {showQuestionMark && <QuestionMarkCircle className="h-5 w-5 text-white" />}
          </div>
          <p className="text-amber-400 font-bold text-xl tracking-wide">{user?.tierRank}</p>
        </div>
      </CardContent>
    </Card>
  )
}

