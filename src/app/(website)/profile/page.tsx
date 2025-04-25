import React from "react";
import { AboutGraph } from "./_components/AboutGraph";
import ProfileCard from "./_components/ProfileCard";
import ProfileGroth from "./_components/ProfileGroth";
import ProfileRoutes from "./_components/profileRoutes";

const Page = () => {
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
        <div className="flex flex-col px-3  pb-6 gap-4 w-full  bg-[#FFFFFF1A] border border-white rounded-lg">
          <ProfileGroth />
          <AboutGraph />
        </div>
      </div>
      <ProfileRoutes />
    </div>
  );
};

export default Page;
