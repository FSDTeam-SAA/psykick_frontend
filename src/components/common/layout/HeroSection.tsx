import { ChallengeCard } from "../card/challange-card";
import { ChallengeCardThree } from "../card/Challange-card-three";
import { ChallangeCardTwo } from "../card/challange-cart-two";

export default function HeroSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat flex justify-center overflow-x-hidden rounded-b-[20px] mb-12 md:mb-20 lg:mb-[120px] py-6 md:py-10"
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <div className="w-full mt-5 lg:mt-0">
        {/* Top section with title and articles */}
        <div className="px-4 sm:px-6 md:container mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 md:gap-8">
            <div className="max-w-full lg:max-w-[500px]">
              <h1 className="textLargeShadow pt-10 md:pt-20 mb-6 title text-center lg:text-left text-3xl md:text-4xl lg:text-5xl">
                Kick your Psy into Gear!
              </h1>
              <article className="w-full md:max-w-[400px] paragraph !font-inter p-4 md:p-5 bg-[#F8F8F8]/10 backdrop-blur-md rounded-2xl border-2 border-[#7c4bb8]">
                Beyond the ordinary lies a realm of hidden knowledge, waiting to
                be explored. Psykick Club is more than just a
                gathering—it&apos;s a sanctuary for seekers of the unknown, a
                place where intuition is sharpened, and perception is tested.
                Engage in thrilling remote viewing challenges, uncover the
                secrets of the mind, and connect with a community that dares to
                see beyond.
              </article>
            </div>

            <article className="w-full md:max-w-[400px] paragraph !font-inter p-4 md:p-8 bg-[#F8F8F8]/10 backdrop-blur-md rounded-2xl border-2 border-[#7c4bb8] mt-6 lg:mt-0">
              &apos;The intuitive mind is a sacred gift and the rational mind is
              a faithful servant. We have created a society that honors the
              servant and has forgotten the gift. &apos; <br /> — Carl Jung
            </article>
          </div>
        </div>

        {/* Challenges section */}
        <div className="border-[#c3a1e9] border-[5px] rounded-[40px] mt-10 md:mt-16 lg:mt-[400px] mx-4 sm:mx-6 md:mx-10 lg:w-full">
          <h2 className="font-black title rounded-t-[35px] bg-[#D9D9D980] w-full text-center textLargeShadow text-[#CB9191] py-3 md:py-5 text-2xl md:text-3xl lg:text-4xl">
            Challanges
          </h2>

          <div className="lg:flex items-center justify-center gap-[30px] lg:mb-6">
            <div className="mb-3 lg:mb-0 lg:mt-0 mt-1 p-2 lg:p-0">
              <ChallangeCardTwo />
            </div>

            <div className="p-2 lg:p-0">
              <ChallengeCardThree />
            </div>

            <div className="lg:mb-0 lg:mt-0 mb-3 mt-2 p-2 lg:p-0">
              <ChallengeCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
