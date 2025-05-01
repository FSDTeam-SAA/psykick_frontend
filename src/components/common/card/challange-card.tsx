"use client";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import target from "../../../../public/assets/img/image 4.png";
import { useRouter } from "next/navigation";
import { useChallengeStore } from "@/store/use-challenge-store";
// import bgImg from "../../../../public/assets/img/challange_card-bg.png";
interface ChallengeCardProps {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function ChallengeCard({
  className,
  title = "ARV Prediction Mode",
  description = "One future event… choose 1 image, match the outcome, and score points!",
  buttonText = "Click Here",
}: ChallengeCardProps) {
  const router = useRouter();
  const { setActiveTab } = useChallengeStore();

  const handleClick = () => {
    setActiveTab("arv");
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push("/challenges");
  };

  return (
    <div
      className={cn(
        "lg:w-[370px] backdrop-blur-sm bg-[url(/assets/img/challange_card-bg.png)] backdrop-blur-300 bg-white/30 border-[3px] p-6 rounded-[20px] border-[#c3a1e9]",
        className,
      )}
    >
      {/* Content */}
      <div className="space-y-6 text-center">
        <div className="flex items-center justify-center">
          <div className="w-[50px] h-[50px]">
            <Image
              className="w-full h-full"
              src={target}
              width={100}
              height={100}
              alt="target image"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-[#FFFFFF]">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>

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

// /** Reusable Corner Accent Component */
// function CornerAccent({ position }: { position: string }) {
//   const positions: Record<string, string> = {
//     "top-left": "top-3 left-3",
//     "top-right": "top-3 right-3",
//     "bottom-left": "bottom-3 left-3",
//     "bottom-right": "bottom-3 right-3",
//   };

//   return (
//     <div
//       className={cn(
//         "absolute w-2 h-2 rounded-full bg-emerald-500/50",
//         positions[position],
//       )}
//     />
//   );
// }
