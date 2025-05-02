/* eslint-disable react-hooks/exhaustive-deps */
// "use client";

// import { useEffect } from "react";
// import { useARVStore } from "@/store/use-arv-store";
// import { useActiveARVTarget } from "@/hooks/use-arv-queries";
// import dynamic from "next/dynamic";

// // Dynamic imports to fix hydration issues with canvas
// const ARVDrawing = dynamic(
//   () => import("@/components/challenges/arv/ARVDrawing"),
//   { ssr: false },
// );
// const ARVImageSelection = dynamic(
//   () => import("@/components/challenges/arv/ARVImageSelection"),
//   { ssr: false },
// );
// const ARVWaitingScreen = dynamic(
//   () => import("@/components/challenges/arv/ARVWaitingScreen"),
//   { ssr: false },
// );
// const ARVResults = dynamic(
//   () => import("@/components/challenges/arv/ARVResults"),
//   { ssr: false },
// );

// export default function ARVChallenge() {
//   const { stage, setActiveTarget } = useARVStore();
//   const { data: activeTarget, isLoading, error } = useActiveARVTarget();

//   useEffect(() => {
//     if (activeTarget?.data) {
//       setActiveTarget(activeTarget.data);
//     }
//   }, [activeTarget, setActiveTarget]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-2xl">Loading challenge...</div>
//       </div>
//     );
//   }

//   if (error || !activeTarget?.data) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-2xl text-red-500">
//           No active challenge available
//         </div>
//       </div>
//     );
//   }

//   const renderStage = () => {
//     switch (stage) {
//       case "drawing":
//         return <ARVDrawing />;
//       case "selection":
//         return <ARVImageSelection />;
//       case "waiting":
//         return <ARVWaitingScreen />;
//       case "results":
//         return <ARVResults />;
//       default:
//         return <div>Invalid stage</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
//       {renderStage()}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import ARVPrediction from "@/components/arv-stages/arv-prediction";
import { useARVStore } from "@/store/use-arv-store";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { setActiveTarget } = useARVStore();

  useEffect(() => {
    const fetchActiveARVTarget = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("authToken");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ARVTarget/get-activeARVTarget`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();

        if (data.status && data.data) {
          console.log("Active ARV target data:", data.data);

          // Pass the entire data object to setActiveTarget
          // The store will handle mapping it to the correct structure
          // and will reset the game state if this is a new game
          setActiveTarget(data.data);

          // For testing purposes, you can override the game time and reveal time to be sooner
          // Uncomment the following lines for testing
          /*
          const testGameTime = new Date()
          testGameTime.setMinutes(testGameTime.getMinutes() + 1)
          
          const testRevealTime = new Date()
          testRevealTime.setMinutes(testRevealTime.getMinutes() + 2)
          
          const activeTarget = useARVStore.getState().activeTarget
          if (activeTarget) {
            const updatedTarget = {
              ...activeTarget,
              gameTime: testGameTime.toISOString(),
              revealTime: testRevealTime.toISOString()
            }
            useARVStore.getState().setActiveTarget(updatedTarget)
          }
          
          console.log("Set test times:", {
            gameTime: testGameTime.toLocaleString(),
            revealTime: testRevealTime.toLocaleString()
          })
          */
        } else {
          console.error("Invalid data format received:", data);
          // Set a default state or show an error message
        }
      } catch (error) {
        console.error("Error fetching active ARV target:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveARVTarget();
  }, [setActiveTarget]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <ARVPrediction />
    </main>
  );
}
