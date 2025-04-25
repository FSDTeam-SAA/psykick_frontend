import { ChallengeCard } from "../card/challange-card";
import { ChallengeCardThree } from "../card/Challange-card-three";
import { ChallangeCardTwo } from "../card/challange-cart-two";

export default function HeroSection() {
  return (
    <div
      className="h-[1262px] max-w-screen bg-cover bg-no-repeat flex justify-center overflow-x-hidden rounded-b-[20px] mb-[120px]"
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <div className="">
        <div className="h-[50%] container">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="textLargeShadow pt-20 mb-6 title">
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

        <div className=" border-[#c3a1e9] border-[5px] rounded-[40px]">
          <h2 className="font-black title rounded-t-[35px] bg-[#D9D9D980] w-screen text-center textLargeShadow text-[#CB9191] py-5 ">
            Challanges
          </h2>
          <div className="flex justify-between container py-10">
            <div className="mr-[30px]">
              {/* <ChallengeCard /> */}
              <ChallangeCardTwo />
            </div>
            <div className="mr-[30px]">
              <ChallengeCardThree />
            </div>

            <div>
              <ChallengeCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
