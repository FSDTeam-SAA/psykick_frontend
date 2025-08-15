"use client";

import { useEffect, useState } from "react";
import { useARVStore } from "@/store/use-arv-store";
import { ARVPrediction } from "@/components/arv-stages/arv-prediction";

export default function ArvTarget() {
  const [isLoading, setIsLoading] = useState(true);
  const { setActiveTarget } = useARVStore();

  useEffect(() => {
    const fetchActiveARVTarget = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("authToken");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/ARVTarget/get-activeARVTarget`,
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
