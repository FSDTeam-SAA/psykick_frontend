import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import target3 from "../../../../public/assets/img/c-star.png";
// import bgImg from "../../../../public/assets/img/challange_card-bg.png";
interface ChallengeCardProps {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function ChallengeCardThree({
  className,
  title = "Target Match Challenge",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at mi nec quam.",
  buttonText = "Click Here",
}: ChallengeCardProps) {
  return (
    <div
      className={cn(
        " lg:w-[370px] p-8 rounded-3xl bg-gray-900/80 backdrop-blur-sm bg-[url(/assets/img/challange_card-bg.png)] backdrop-blur-300 bg-white/30 border-[3px] p-6 rounded-[20px] border-[#c3a1e9] lg:mt-[140px] mt-0",
        className,
      )}
      
    >
      {/* Content */}
      <div className="space-y-6 text-center">
        

        <div className="flex items-center justify-center">
          <div className="w-[50px] h-[50px]">
            <Image
              className="w-full h-full"
              src={target3}
              width={100}
              height={100}
              alt="target image"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-[#00A991]">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>

        <button className="w-full group relative ">
          <span className="flex items-center justify-center gap-2 !px-9 !py-5 btn">
            {buttonText}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    </div>
  );
}
