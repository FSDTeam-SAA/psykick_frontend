"use client";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Logout from "./logout";

const ProfileRoutes = () => {
  const [logoutOpen, setShowLogout] = useState(false);

  const profileRoute = [
    { name: "Personal Information", path: "/profile/personal-information" },
    { name: "Notifications", path: "/notifications" },
    { name: "Leaderboard", path: "/profile/leaderboard" },
    { name: "Help", path: "/profile/help" },
    { name: "Change Password", path: "/profile/chnage-password" },
    { name: "Sing Out", path: "/Sing Out" },
  ];

  const handelClick = (name: string): void => {
    if (name === "Sing Out") {
      setShowLogout(true);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-9 pt-10">
        {profileRoute.map((route, index) => {
          const isSignOut = route.name === "Sing Out"; // Adjust to "Sign Out" if that's correct
          const item = (
            <div
              onClick={() => {
                if (isSignOut) {
                  setShowLogout(true);
                } else {
                  handelClick(route.name);
                }
              }}
              className="flex justify-between items-center mt-4 border border-[#C5C5C5] rounded-lg py-5 px-4 text-center backdrop-blur-md bg-[#FFFFFF1A] cursor-pointer"
            >
              <h3
                className={`font-bold text-lg tracking-wide ${
                  isSignOut ? "text-red-500" : "text-white"
                }`}
              >
                {route.name}
              </h3>
              <ArrowRightCircle
                className={`h-5 w-5 ${isSignOut ? "text-red-500" : "text-white"}`}
              />
            </div>
          );

          return isSignOut ? (
            <div key={index}>{item}</div>
          ) : (
            <Link key={index} href={route.path}>
              {item}
            </Link>
          );
        })}

        <Logout logoutOpen={logoutOpen} setShowLogout={setShowLogout} />
      </div>
    </div>
  );
};

export default ProfileRoutes;
