import React from "react";

export default function HeroSection() {
  return (
    <div
      className="h-[1920px] w-screen bg-cover bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <h1 className="title ">HeroSection</h1>
    </div>
  );
}
