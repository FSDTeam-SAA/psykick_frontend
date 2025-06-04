"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

const Toastbynotification = () => {
  const lastToastTimestamp = useRef<number | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ["getarvtarget"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ARVTarget/get-activeARVTarget`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch ARV target");
      }

      return res.json();
    },
  });

  setInterval(() => {
    refetch();
  }, 2000);

  useEffect(() => {
    const revealTimeStr = data?.data?.revealTime;
    if (!revealTimeStr) return;

    const revealTime = new Date(revealTimeStr).getTime();
    const now = Date.now();
    const diffInMinutes = (revealTime - now) / 1000 / 60; // Difference in minutes
    console.log(diffInMinutes);
    // If the revealTime is within the next 60 minutes and in the future
    if (diffInMinutes > 0 && diffInMinutes <= 60) {
      const nowSeconds = Math.floor(now / 1000);

      console.log(lastToastTimestamp)
      // Immediately show the toast if no toast has been shown before
      if (!lastToastTimestamp.current) {
        toast.info("⏳ Reveal is happening within 1 hour! Stay ready!");
        lastToastTimestamp.current = nowSeconds; // Mark the timestamp
      }

      // Show toast every 30 seconds if it has been more than 30 seconds
      else if (nowSeconds - lastToastTimestamp.current >= 30) {
        toast.info("⏳ Reveal is happening within 1 2 hour! Stay ready!");
        lastToastTimestamp.current = nowSeconds; // Update the timestamp
      }
    } else {
      // Reset the toast display if the revealTime is outside of 60 minutes
      lastToastTimestamp.current = null;
    }
  }, [data]);

  return <></>; // No UI is needed for this component
};

export default Toastbynotification;
