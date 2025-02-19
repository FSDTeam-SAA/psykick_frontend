import React from "react";

export default function HeroSection() {
  return (
    <div
      className="h-[1920px] w-screen bg-cover bg-no-repeat flex  justify-center "
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <div className="container">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="title pt-20 mb-6">Discover the unseen...</h1>
            <article className="w-[400px] pt-[24px] p-5 bg-[#F8F8F8]/10 backdrop-blur-lg paragraph rounded-2xl ">
              Beyond the ordinary lies a realm of hidden knowledge, waiting to
              be explored. Psykick Club is more than just a gathering—it&apos;s
              a sanctuary for seekers of the unknown, a place where intuition is
              sharpened, and perception is tested. Engage in thrilling remote
              viewing challenges, uncover the secrets of the mind, and connect
              with a community that dares to see beyond.
            </article>
          </div>
          <article className="w-[400px] paragraph !font-inter p-8 bg-[#F8F8F8]/10 backdrop-blur-lg rounded-2xl">
            &apos;The intuitive mind is a sacred gift and the rational mind is a
            faithful servant. We have created a society that honors the servant
            and has forgotten the gift. &apos; <br /> — Carl Jung
          </article>
          <article className="element w-[300px] text-white">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              incidunt sit nulla nam dolor dignissimos magni similique eius,
              doloremque nisi laudantium perspiciatis, natus quam quae.
              Assumenda animi a expedita debitis!
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
