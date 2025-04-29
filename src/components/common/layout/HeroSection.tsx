// import { ChallengeCard } from "../card/challange-card";
// import { ChallengeCardThree } from "../card/Challange-card-three";
// import { ChallangeCardTwo } from "../card/challange-cart-two";

// export default function HeroSection() {
//   return (
//     <div
//       className="h-[1262px] max-w-screen bg-cover bg-no-repeat flex justify-center overflow-x-hidden rounded-b-[20px] mb-[120px]"
//       style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
//     >
//       <div className="">
//         <div className="h-[50%] container">
//           <div className="flex justify-between items-end">
//             <div>
//               <h1 className="textLargeShadow pt-20 mb-6 title">
//                 Kick your Psy into Gear!
//               </h1>
//               <article className="w-[400px] paragraph !font-inter p-5 bg-[#F8F8F8]/10 backdrop-blur-md rounded-2xl border-2 border-[#7c4bb8]">
//                 Beyond the ordinary lies a realm of hidden knowledge, waiting to
//                 be explored. Psykick Club is more than just a
//                 gathering—it&apos;s a sanctuary for seekers of the unknown, a
//                 place where intuition is sharpened, and perception is tested.
//                 Engage in thrilling remote viewing challenges, uncover the
//                 secrets of the mind, and connect with a community that dares to
//                 see beyond.
//               </article>
//             </div>
//             <article className="w-[400px] paragraph !font-inter p-8 bg-[#F8F8F8]/10 backdrop-blur-md rounded-2xl border-2 border-[#7c4bb8]">
//               &apos;The intuitive mind is a sacred gift and the rational mind is
//               a faithful servant. We have created a society that honors the
//               servant and has forgotten the gift. &apos; <br /> — Carl Jung
//             </article>
//           </div>
//         </div>

//         <div className=" border-[#c3a1e9] border-[5px] rounded-[40px]">
//           <h2 className="font-black title rounded-t-[35px] bg-[#D9D9D980] w-screen text-center textLargeShadow text-[#CB9191] py-5 ">
//             Challanges
//           </h2>
//           <div className="flex justify-between container py-10">
//             <div className="mr-[30px]">
//               {/* <ChallengeCard /> */}
//               <ChallangeCardTwo />
//             </div>
//             <div className="mr-[30px]">
//               <ChallengeCardThree />
//             </div>

//             <div>
//               <ChallengeCard />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { ChallengeCard } from "../card/challange-card";
import { ChallengeCardThree } from "../card/Challange-card-three";
import { ChallangeCardTwo } from "../card/challange-cart-two";

export default function HeroSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat flex justify-center overflow-x-hidden rounded-b-[20px] mb-12 md:mb-20 lg:mb-[120px] py-6 md:py-10"
      style={{ backgroundImage: "url('/assets/img/hero_img.png')" }}
    >
      <div className="w-full">
        {/* Top section with title and articles */}
        <div className="px-4 sm:px-6 md:container mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 md:gap-8">
            <div className="max-w-full lg:max-w-[500px]">
              <h1 className="textLargeShadow pt-10 md:pt-20 mb-6 title text-center lg:text-left text-3xl md:text-4xl lg:text-5xl">
                Kick your Psy into Gear!
              </h1>
              <article className="w-full md:max-w-[400px] paragraph !font-inter p-4 md:p-5 bg-[#F8F8F8]/10 backdrop-blur-md rounded-2xl border-2 border-[#7c4bb8]">
                Beyond the ordinary lies a realm of hidden knowledge, waiting to be
                explored. Psykick Club is more than just a gathering—it&apos;s a
                sanctuary for seekers of the unknown, a place where intuition is
                sharpened, and perception is tested. Engage in thrilling remote
                viewing challenges, uncover the secrets of the mind, and connect
                with a community that dares to see beyond.
              </article>
            </div>
            
            <article className="w-full md:max-w-[400px] paragraph !font-inter p-4 md:p-8 bg-[#F8F8F8]/10 backdrop-blur-md rounded-2xl border-2 border-[#7c4bb8] mt-6 lg:mt-0">
              &apos;The intuitive mind is a sacred gift and the rational mind is a
              faithful servant. We have created a society that honors the servant
              and has forgotten the gift. &apos; <br /> — Carl Jung
            </article>
          </div>
        </div>

        {/* Challenges section */}
        <div className="border-[#c3a1e9] border-[5px] rounded-[40px] mt-10 md:mt-16 lg:mt-24 mx-4 sm:mx-6 md:mx-10">
          <h2 className="font-black title rounded-t-[35px] bg-[#D9D9D980] w-full text-center textLargeShadow text-[#CB9191] py-3 md:py-5 text-2xl md:text-3xl lg:text-4xl">
            Challanges
          </h2>
          
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-center md:justify-between px-4 sm:px-6 md:px-10 py-6 md:py-10 gap-8">
            <div className="w-full md:w-[45%] lg:w-1/3">
              <ChallangeCardTwo />
            </div>
            
            <div className="w-full md:w-[45%] lg:w-1/3">
              <ChallengeCardThree />
            </div>
            
            <div className="w-full md:w-[45%] lg:w-1/3">
              <ChallengeCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
