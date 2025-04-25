import React from "react";
import { AboutGraph } from "./_components/AboutGraph";
import ProfileCard from "./_components/ProfileCard";
import ProfileGroth from "./_components/ProfileGroth";
import { ArrowRightCircle } from "lucide-react";

const page = () => {
  const profileRoute = [
    { name: "Personal Information", path: "/profile/personal-information" },
    { name: "Notifications", path: "/profile/notifications" },
    { name: "Leaderboard", path: "/profile/leaderboard" },
    { name: "Help", path: "/profile/help" },
    { name: "Change Password", path: "/profile/changePassword" },
    { name: "Sing Out", path: "/Sing Out" },
  ];

  return (
    <div className="container pb-10">
      <div className="mt-10">
        <h1 className="text-center smallTextShadow font-normal !text-5xl mb-4">
          Profile
        </h1>
        <p className="container text-white text-center">
          Welcome to your profile! Here, you can view and manage your personal
          information, track your performance in Remote Viewing challenges, and
          monitor your progress over time. Check your RV tier status, success
          rates, leaderboard rankings, and other key stats that reflect your
          journey in the Psykick Club. Keep pushing your limits and see how far
          your intuition can take you!
        </p>
      </div>
      <div className="flex justify-items-center pt-[40px]  mx-auto gap-8">
        <ProfileCard />
        <div className="flex flex-col gap-4 w-full  bg-[#FFFFFF1A] border border-white rounded-lg">
          <ProfileGroth />
          <AboutGraph />
        </div>
      </div>
      <div className="flex flex-col gap-9 pt-10">
        {profileRoute.map((route, index) => (
          <div
            key={index}
            className="flex justify-between items-center mt-4 border border-[#C5C5C5] rounded-lg py-2 px-4 text-center backdrop-blur-md bg-[#FFFFFF1A]"
          >
            <h3
              className={`font-bold text-lg tracking-wide ${
                route.name === "Sing Out"
                  ? "text-red-500"
                  : "text-white"
              }`}
            >
              {route.name}
            </h3>
            <ArrowRightCircle
              className={`h-5 w-5 ${
                route.name.toLowerCase() === "logout"
                  ? "text-red-500"
                  : "text-white"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
