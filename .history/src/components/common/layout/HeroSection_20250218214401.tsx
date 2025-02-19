import React from "react";

export default function HeroSection() {
  return (
    <div
      className="h-[1920px] w-screen bg-cover bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <div>
        <h1 className="title ">HeroSection</h1>
        <p className="paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At quas
          repellendus ducimus ipsa tempore in a possimus nostrum eligendi
          corrupti? Reiciendis incidunt minus explicabo, facere officia magni
          iusto totam aperiam?
        </p>
      </div>
    </div>
  );
}
