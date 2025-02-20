import { ArrowRight, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import bgImg from '../../../../public/' 
interface ChallengeCardProps {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function ChallengeCard({
  className,
  title = "Target Match Challenge",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at mi nec quam.",
  buttonText = "Click Here",
}: ChallengeCardProps) {
  return (
    <div
      className={cn(
        " w-[300px] p-8 rounded-3xl bg-gray-900/80 backdrop-blur-sm",
        className,
      )}
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      {/* Content */}
      <div className="space-y-4 text-center">
        <Target
          className="w-12 h-12 mx-auto text-amber-400"
          strokeWidth={1.5}
        />

        <h3 className="text-xl font-semibold text-amber-400">{title}</h3>
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

/** Reusable Corner Accent Component */
function CornerAccent({ position }: { position: string }) {
  const positions: Record<string, string> = {
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3",
    "bottom-left": "bottom-3 left-3",
    "bottom-right": "bottom-3 right-3",
  };

  return (
    <div
      className={cn(
        "absolute w-2 h-2 rounded-full bg-emerald-500/50",
        positions[position],
      )}
    />
  );
}
