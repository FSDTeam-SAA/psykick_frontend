import React from "react";

export default function HeroSection() {
  return (
    <div
      className="h-[1920px] w-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <h1 className="title flex items-center justify-center">HeroSection</h1>
    </div>
  );
}
