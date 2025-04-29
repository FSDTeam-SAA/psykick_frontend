import Image from "next/image"

interface LevelIndicatorProps {
    title: string
    bgColor: string
    imageSrc: string
  }
  
  export function LevelIndicator({ title, bgColor, imageSrc }: LevelIndicatorProps) {
    return (
      <div className="flex flex-col items-center ">
        <h3 className="text-[#ff9d4d] text-2xl font-bold mb-2">{title}</h3>
        <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center overflow-hidden`}>
          <Image src={imageSrc || "/placeholder.svg"} alt="apprentice" width={76} height={76} className="w-[76px] h-[76px]" />
        </div>
      </div>
    )
  }
  