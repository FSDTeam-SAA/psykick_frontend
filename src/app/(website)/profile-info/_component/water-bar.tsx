"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface WaterBarProps {
  totalScore: number;
}

export function WaterBar({ totalScore }: WaterBarProps) {
  const controls = useAnimation();

  const min = -100;
  const max = 300;
  const percentage = Math.max(
    0,
    Math.min(100, ((totalScore - min) / (max - min)) * 100),
  );

  useEffect(() => {
    controls.start({
      height: `${percentage}%`,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        restDelta: 0.001,
      },
    });
  }, [percentage, controls]);

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-[440px] w-16">
        <div className="absolute inset-0 bg-black overflow-hidden border-4 border-[#605E5E]">
          <motion.div
            className="absolute bottom-0 inset-x-0"
            style={{ backgroundColor: "#00c2c2" }}
            initial={{ height: `${percentage}%` }}
            animate={controls}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 animate-bubble-effect"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className=" absolute -left-3 top-[151px] -translate-y-1/2 w-6 h-6 bg-white rotate-45 transform" />
        <div className="absolute -left-3 bottom-[108px] w-6 h-6 bg-white rotate-45 transform" />
        <div className="absolute top-[151px] -translate-y-1/2 right-16 w-full border-t-2 border-dashed border-white" />
        <div className="absolute bottom-[118px] right-16 w-full border-t-2 border-dashed border-white" />
      </div>
      <div className="flex flex-col items-center mb-4">
        <h3 className="text-white text-xl font-bold">YOUR</h3>
        <h3 className="text-white text-xl font-bold">CURRENT</h3>
        <h3 className="text-white text-xl font-bold">SCORE</h3>
        <span className="text-white text-3xl font-bold">{totalScore}</span>
      </div>
    </div>
  );
}
