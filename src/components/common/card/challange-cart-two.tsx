"use client";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import target1 from "../../../../public/assets/img/target-04.png";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useRouter } from "next/navigation";
// import bgImg from "../../../../public/assets/img/challange_card-bg.png";
interface ChallengeCardProps {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function ChallangeCardTwo({
  className,
  title = "Target Match Challenge",
  description = "1 target, 6 images… choose 2, match the target, and score points!",
  buttonText = "Click Here",
}: ChallengeCardProps) {
  const router = useRouter();
  const { setActiveTab } = useChallengeStore();

  const handleClick = () => {
    setActiveTab("tmc");
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push("/challenges");
  };

  return (
    <div
      className={cn(
        " lg:w-[370px]  backdrop-blur-sm bg-[url(/assets/img/challange_card-bg.png)] backdrop-blur-300 bg-white/30 border-[3px] p-6 rounded-[20px] border-[#c3a1e9]",
        className,
      )}
    >
      {/* Content */}
      <div className="space-y-6 text-center">
        <div className="flex items-center justify-center">
          <div className="w-[50px] h-[50px]">
            <Image
              className="w-full h-full"
              src={target1}
              width={100}
              height={100}
              alt="target image"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-amber-400">{title}</h3>
        <p className="text-sm text-gray-400  px-4">{description}</p>

        <button className="w-full group relative " onClick={handleClick}>
          <span className="flex items-center justify-center gap-2 !px-9 !py-5 btn">
            {buttonText}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    </div>
  );
}
