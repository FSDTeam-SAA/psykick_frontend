"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

interface TemperatureBarProps {
  temperature: number;
}

export function TemperatureBar({ temperature }: TemperatureBarProps) {
  const controls = useAnimation();
  const prevTemp = useRef(temperature);
  const { user } = useAuth();
  // Calculate temperature percentage for the progress bar
  const tempPercentage = ((temperature - -100) / (275 - -100)) * 100;

  useEffect(() => {
    if (prevTemp.current !== temperature) {
      controls.start({
        height: `${100 - tempPercentage}%`,
        transition: { type: "spring", stiffness: 100, damping: 15 },
      });
      prevTemp.current = temperature;
    }
  }, [temperature, tempPercentage, controls]);

  const userId = user?._id;

  const { data } = useQuery({
    queryKey: ["nextTierInfo", userId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/get-nextTierInfo/${userId}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch tier info");
      }
      const result = await res.json();
      return result.data;
    },
    enabled: !!userId,
  });

  console.log("data rank", data);

  return (
    <div className="flex flex-col items-center">
      <span className="text-lime-400 text-3xl font-bold mb-4">
        {/* {data?.up2} */}
        300
      </span>
      {/* <span className="text-white text-3xl font-bold mb-4">{useRank}</span> */}
      <div className="relative h-96 flex items-center">
        <div className="relative h-full w-16">
          <div className="absolute inset-0 bg-gradient-to-t from-red-500 via-yellow-400 to-green-500 rounded-md">
            <motion.div
              className="absolute inset-0 bg-[#2e1a6a]"
              initial={{ height: `${100 - tempPercentage}%` }}
              animate={controls}
              style={{ originY: 0 }}
            />
          </div>
          <div className="absolute inset-0 border-2 border-white/20 rounded-md" />

          {/* Temperature markers */}
          {/* <div className="absolute -left-8 top-0 text-white text-2xl font-bold">275</div> */}
          <div className="absolute -left-14 top-[100px] -translate-y-1/2 text-yellow-400 text-2xl font-bold">
            {data?.tierDetails?.up}
            {/* 81 */}
          </div>
          <div className="absolute -left-10 bottom-1/4 text-white text-2xl font-bold">
            {data?.tierDetails?.down}
            {/* 30 */}
          </div>
          <div className="absolute left-2 -bottom-10 text-red-500 text-2xl font-bold">
            {/* {data?.down} */} -100
          </div>

          {/* Temperature indicator line */}
          <motion.div
            className="absolute inset-x-0 h-0.5 bg-white"
            initial={{ top: `${100 - tempPercentage}%` }}
            animate={{ top: `${100 - tempPercentage}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-white overflow-hidden ">
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 bg-[#2e1a6a]"
              initial={{ height: `${100 - tempPercentage}%` }}
              animate={{ height: `${100 - tempPercentage}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
          </div>

          {/* Indicator diamonds */}
          <div className=" absolute -right-3 top-[96px] -translate-y-1/2 w-6 h-6 bg-white rotate-45 transform" />
          <div className="absolute -right-3 bottom-[106px] w-6 h-6 bg-white rotate-45 transform" />
        </div>

        {/* Dotted lines */}
        <div className="absolute top-[97px] -translate-y-1/2 left-16 w-full border-t-2 border-dashed border-white" />
        <div className="absolute bottom-[116px] left-16 w-full border-t-2 border-dashed border-white" />
      </div>
    </div>
  );
}
