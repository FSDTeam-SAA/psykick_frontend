"use client";

import { useRef } from "react";
import { Confetti, ConfettiRef } from "../magicui/confetti";

export function ConfettiDemo() {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <span className="text-green-500 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Congratulations! 🎉🎊🎊 You matched the Target on your 1st choice. You
        received 25 points!
      </span>

      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </div>
  );
}
