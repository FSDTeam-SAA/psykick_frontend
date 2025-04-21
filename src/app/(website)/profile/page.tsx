import React from "react";
import { AboutGraph } from "./_components/AboutGraph";
import ProfileCard from "./_components/ProfileCard";
import ProfileGroth from "./_components/ProfileGroth";

const page = () => {
  return (
    <div className="w-full">
      <div className="flex justify-items-center items-center pt-[40px]  mx-auto">
        <ProfileCard />

        <div>
          <ProfileGroth />
          <AboutGraph />
        </div>
      </div>
    </div>
  );
};

export default page;
