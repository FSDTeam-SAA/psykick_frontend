import { ChallengeCard } from "../card/challange-card";

export default function HeroSection() {
  return (
    <div
      className="h-[1920px] w-screen bg-cover bg-no-repeat flex  justify-center "
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <div className="">
        <div className="h-[50%] container">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="title pt-20 mb-6 text-">
                Kick your Psy into Gear!
              </h1>
              <article className="w-[400px] paragraph !font-inter p-5 bg-[#F8F8F8]/10 backdrop-blur-md rounded-2xl border-2 border-[#7c4bb8]">
                Beyond the ordinary lies a realm of hidden knowledge, waiting to
                be explored. Psykick Club is more than just a
                gathering—it&apos;s a sanctuary for seekers of the unknown, a
                place where intuition is sharpened, and perception is tested.
                Engage in thrilling remote viewing challenges, uncover the
                secrets of the mind, and connect with a community that dares to
                see beyond.
              </article>
            </div>
            <article className="w-[400px] paragraph !font-inter p-8 bg-[#F8F8F8]/10 backdrop-blur-md rounded-2xl border-2 border-[#7c4bb8]">
              &apos;The intuitive mind is a sacred gift and the rational mind is
              a faithful servant. We have created a society that honors the
              servant and has forgotten the gift. &apos; <br /> — Carl Jung
            </article>
          </div>
        </div>

        <div className=" border border-[#F8F8F8] ">
          <h2 className="title bg-[#D9D9D980] w-screen text-center text-[#CB9191] py-5 textshadow">
            Challanges
          </h2>
          <div className="flex justify-between container py-10">
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
          </div>
        </div>
      </div>
    </div>
  );
}
