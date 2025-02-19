import React from "react";

export default function HeroSection() {
  return (
    <div
      className="h-[1920px] w-screen bg-cover bg-no-repeat flex  justify-center "
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <div className="container">
        <div className="">
        <h1 className="title pt-20">Discover the unseen...</h1>
          <article className="w-[400px] pt-[24px]">
            Beyond the ordinary lies a realm of hidden knowledge, waiting to be
            explored. Psykick Club is more than just a gathering—it&apos;s a
            sanctuary for seekers of the unknown, a place where intuition is
            sharpened, and perception is tested. Engage in thrilling remote
            viewing challenges, uncover the secrets of the mind, and connect
            with a community that dares to see beyond.
          </article>
          <article>
            &apos;The intuitive mind is a sacred gift and the rational mind is a
            faithful servant. We have created a society that honors the servant
            and has forgotten the gift. &apos; — Carl Jung
          </article>
        </div>
      </div>
    </div>
  );
}
