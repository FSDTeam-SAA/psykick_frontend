"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AboutRemotView() {
  const [data, setData] = useState({
    totalParticipants: "0",
    activeUsers: "0",
    runningEvents: "0",
  });

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setData({
        totalParticipants: "30K",
        activeUsers: "150+",
        runningEvents: "10",
      });
    }, 1000);
  }, []);

  return (
    <div className="  text-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-[130px] items-center">
          <div className="space-y-6">
            <h1 className="title textLargeShadow">
              Learn more about Remote Viewing
            </h1>

            <p className="text-sm md:text-base lg:text-lg text-gray-200">
              Remote Viewing (RV) is a fascinating practice that allows
              individuals to perceive distant or unseen targets using only their
              mind. Rooted in scientific research and intuitive exploration, RV
              has been used for everything from personal discovery to practical
              applications in problem-solving and prediction. Whether
              you&apos;re a beginner or looking to refine your skills,
              understanding the fundamentals of remote viewing can unlock new
              ways of perceiving information beyond the five senses. Click to
              explore the principles, techniques, and real-world applications of
              remote viewing.
            </p>

            <Link href="/learn-more-about">
              <button className=" mt-[18px] lg:mt-[32px] btn hover:bg-[#7C3AED] text-white rounded-full px-6 py-2 flex items-center gap-2 text-sm md:text-base">
                Click Here
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className=" mt-[60px]">
                <div className="text-2xl md:text-3xl lg:text-[48px] font-semibold">
                  {data.totalParticipants}
                </div>
                <div className="text-xs md:text-sm text-gray-300">
                  Total Participant
                </div>
              </div>
              <div className=" mt-[60px]">
                <div className="text-2xl md:text-3xl lg:text-[48px] font-semibold">
                  {data.activeUsers}
                </div>
                <div className="text-xs md:text-sm text-gray-300">
                  Active User
                </div>
              </div>
              <div className=" mt-[60px]">
                <div className="text-2xl md:text-3xl lg:text-[48px] font-semibold">
                  {data.runningEvents}
                </div>
                <div className="text-xs md:text-sm text-gray-300">
                  Running Event
                </div>
              </div>
            </div>
          </div>

          <div className="order-first lg:order-last">
            <div className="rounded-3xl max-w-[470px] overflow-hidden">
              <Image
                src="/assets/img/about-img.png"
                alt="People looking at night sky"
                width={470}
                height={520}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
