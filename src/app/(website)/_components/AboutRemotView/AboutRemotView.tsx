"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
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
        },1000);
      }, []);


  return (
    <div className="  text-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Learn more about Remote Viewing
            </h1>

            <p className="text-sm md:text-base lg:text-lg text-gray-200">
              Remote Viewing (RV) is a fascinating practice that allows individuals to perceive distant or unseen
              targets using only their mind. Rooted in scientific research and intuitive exploration, RV has been used
              for everything from personal discovery to practical applications in problem-solving and prediction.
              Whether you&apos;re a beginner or looking to refine your skills, understanding the fundamentals of remote
              viewing can unlock new ways of perceiving information beyond the five senses. Click to explore the
              principles, techniques, and real-world applications of remote viewing.
            </p>

           <Link href="/learn-more-about">
           <button className=" btn rhover:bg-[#7C3AED] text-white rounded-full px-6 py-2 flex items-center gap-2 text-sm md:text-base">
              Click Here
              <ArrowRight className="w-4 h-4" />
            </button>
           </Link>

            <div className="grid grid-cols-3 gap-4 pt-6">
      <div className="space-y-2">
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold">{data.totalParticipants}</div>
        <div className="text-xs md:text-sm text-gray-300">Total Participant</div>
      </div>
      <div className="space-y-2">
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold">{data.activeUsers}</div>
        <div className="text-xs md:text-sm text-gray-300">Active User</div>
      </div>
      <div className="space-y-2">
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold">{data.runningEvents}</div>
        <div className="text-xs md:text-sm text-gray-300">Running Event</div>
      </div>
    </div>
          </div>

          <div className="order-first lg:order-last">
            <div className="rounded-3xl max-w-[470px] overflow-hidden">
              <Image
                src="https://s3-alpha-sig.figma.com/img/4dac/3ddb/485a52bc8028edb904dbd247fd0396c4?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gJzJkPRWFqB0eGLxpL1W0PxQAx3M7~mwLdoH-9Uz5IxtSAAdLcBIxvpNQXr4Pz681CM9kmM9jdZpsYqDxQlzTvZWwlHLYaYIdiqwc~RqESoxnXa-AiYxwPDhIX4dHS-inJZa4L8mzI5MSBCAcIApCI487Qrh3U0RGgpPGibaS6yVEWpyb0T1FJSoUVkMV7c4aePixXzgRBOxYPDf2ytGf6SFFbazBFOLb0gC4FAQqr~c4~dn0jF~aDVacgro7x1XHQuvjUNazhWeePP2c9M~5JTLqceGo3LjKzqWdHQ462v6s6Rhgpf6-BnKL0etvT2-a4LIXWGn8ibUrzssXbZcHg__"
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
  )
}

