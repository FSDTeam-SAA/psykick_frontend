import React from "react";

export default function HeroSection() {
  return (
    <div
      className="h-[1920px] w-screen bg-cover bg-no-repeat flex  justify-center "
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <div className="container">
        <h1 className="title pt-20">Discover the unseen...</h1>
      </div>
    </div>
  );
}
