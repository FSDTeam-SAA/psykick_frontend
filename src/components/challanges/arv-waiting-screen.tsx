"use client";

// import { useARVStore } from "@/store/use-arv-store";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import moment from "moment";
// import ARVPredictionPage from "@/app/(website)/_components/challenges/arv-prediction";
import ArvReveal from "./tests/arv-reveal";

export default function ARVWaitingScreen() {
  // const { revealTime, challengeCode, gameTime } = useARVStore();
  // const [timeLeft, setTimeLeft] = useState({
  //   days: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });

  // useEffect(() => {
  //   if (!gameTime) return;

  //   const interval = setInterval(() => {
  //     const now = moment();
  //     const target = moment(gameTime);
  //     const duration = moment.duration(target.diff(now));

  //     if (duration.asMilliseconds() <= 0) {
  //       clearInterval(interval);
  //       setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  //     } else {
  //       setTimeLeft({
  //         days: Math.floor(duration.asDays()),
  //         hours: duration.hours(),
  //         minutes: duration.minutes(),
  //         seconds: duration.seconds(),
  //       });
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [gameTime]);

  return (
    // <ARVPredictionPage />
    <ArvReveal />
    // <div className="max-w-4xl mx-auto px-4">
    //   <div className="bg-[#170A2C]/50 backdrop-blur-md rounded-[20px] p-10">
    //     <div className="mb-8">
    //       <h1 className="text-[40px] font-bold text-white text-center mb-4">
    //         Time to let the universe work its magic! 🌟
    //       </h1>
    //       <p className="text-xl text-center text-[#ECECEC] mb-8">
    //         Your initial impressions have been recorded. Come back at the reveal
    //         time to see what the target was.
    //       </p>
    //     </div>

    //     <div className="flex justify-center gap-6 mb-12">
    //       <div className="bg-[#170A2C]/30 rounded-[20px] p-6 text-center min-w-[200px]">
    //         <p className="text-[#C5C5C5] text-lg mb-2">Challenge Code</p>
    //         <p className="text-white text-2xl font-semibold">{challengeCode}</p>
    //       </div>
    //       <div className="bg-[#170A2C]/30 rounded-[20px] p-6 text-center min-w-[300px]">
    //         <p className="text-[#C5C5C5] text-lg mb-4">
    //           Hurry up! Game ends in:
    //         </p>
    //         <div className="flex justify-center gap-4">
    //           {timeLeft.days > 0 && (
    //             <>
    //               <div className="text-center">
    //                 <span className="text-2xl font-bold text-white">
    //                   {String(timeLeft.days).padStart(2, "0")}
    //                 </span>
    //                 <p className="text-sm text-[#C5C5C5]">Days</p>
    //               </div>
    //               <span className="text-2xl font-bold text-white">:</span>
    //             </>
    //           )}
    //           <div className="text-center">
    //             <span className="text-2xl font-bold text-white">
    //               {String(timeLeft.hours).padStart(2, "0")}
    //             </span>
    //             <p className="text-sm text-[#C5C5C5]">Hours</p>
    //           </div>
    //           <span className="text-2xl font-bold text-white">:</span>
    //           <div className="text-center">
    //             <span className="text-2xl font-bold text-white">
    //               {String(timeLeft.minutes).padStart(2, "0")}
    //             </span>
    //             <p className="text-sm text-[#C5C5C5]">Mins</p>
    //           </div>
    //           <span className="text-2xl font-bold text-white">:</span>
    //           <div className="text-center">
    //             <span className="text-2xl font-bold text-white">
    //               {String(timeLeft.seconds).padStart(2, "0")}
    //             </span>
    //             <p className="text-sm text-[#C5C5C5]">Secs</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex justify-center gap-4">
    //       <Link href="/challenges">
    //         <button className="px-6 py-4 bg-gradient-to-r from-[#8F37FF] to-[#2D17FF] text-white rounded-[20px] hover:opacity-90 transition-opacity font-medium">
    //           Try Another Challenge
    //         </button>
    //       </Link>
    //       <Link href="/dashboard">
    //         <button className="px-6 py-4 bg-[#170A2C]/20 text-white border-2 border-[#8F37FF] rounded-[20px] hover:bg-[#170A2C]/30 transition-colors font-medium">
    //           Return to Dashboard
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}
