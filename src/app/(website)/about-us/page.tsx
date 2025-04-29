import Image from "next/image"

const page = () => {
  return (
    <div className="min-h-screen  text-white p-4 md:p-8 lg:p-12">
    <div className="max-w-7xl mx-auto lg:mt-[61px]">
      
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div className="space-y-8">
          <h1 className="title smallShadow">About Us</h1>

          <div className="space-y-4">
            <h2 className="text-[24px] smallShadow font-normal font-kdam">
              A Meeting Place for Remote Viewing Enthusiasts
            </h2>
            <p className="paragraph">
              At <span className="font-semibold">Psykick Club</span>, we believe that human perception extends beyond
              the five senses. Our platform is more than just a place to test your Remote Viewing (RV) abilities—it`&lsquo;`s
              a <span className="font-semibold">community for like-minded individuals</span> who are curious about
              intuition, perception, and the deeper mysteries of the mind. Whether you`&lsquo;`re a seasoned remote viewer or
              just beginning your journey, Psykick Club provides a welcoming space to explore, learn, and connect with
              others who share your interest in unlocking human potential.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[24px] smallShadow font-normal font-kdam">What We Do</h2>
            <p className="paragraph">              Psykick Club offers interactive challenges and a thriving community where members can test, refine, and
              discuss their intuitive abilities:
            </p>
            <ul className="list-item list-disc space-y-4 paragraph  ml-4 text-sm md:text-base text-[#FFFFFF]">
                  <li>
                  <span className="font-semibold">Target Match Challenge (TMC):</span>Engage in structured RV sessions where you attempt to match unseen targets to the correct image through focused perception
                  </li>
                  <li>
                    <span className="font-semibold">Associative Remote Viewing (ARV):</span>{" "}
                    Explore the predictive side of RV by linking impressions to future events and seeing how well your perceptions align with reality
                  </li>
                  <li>
                    <span className="font-semibold">
                    Community & Discussion:
                    </span>{" "}
                    Connect with fellow remote viewers, share experiences, compare results, and discuss insights in a supportive and open-minded environment.
                  </li>
                
                </ul>
          </div>

         
        </div>

        {/* Right Column - Image */}
       
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden">
            <Image
              src="/assets/img/aboutUs.png"
              alt="People gazing at a starry night sky"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              priority
            />
          </div>
      
      </div>

      <div className="space-y-4 lg:mt-[-50px]">
            <h2 className="text-[24px] smallShadow font-normal font-kdam">Our Mission</h2>
            <p className="paragraph ">
              Our goal is to create a <span className="font-semibold">hub for remote viewing enthusiasts</span>—a
              place where anyone can experiment with RV, develop their skills, and engage in meaningful discussions
              about perception and consciousness. We recognize that there is no single `&lsquo;`correct`&lsquo;` method for Remote
              Viewing; every individual develops their own approach. That`&lsquo;`s why Psykick Club is designed to
              accommodate both structured techniques and freeform intuition, allowing members to find what works best
              for them.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[24px] smallShadow font-normal font-kdam">Join the Psykick Club</h2>
            <p className="paragraph">
              Psykick Club is more than a platform—it`&lsquo;`s a{" "}
              <span className="font-semibold">meeting place for explorers of the mind</span>. Whether you`&lsquo;`re here to
              push the boundaries of perception, test your skills in our challenges, or connect with others on the
              same journey, this is the space for you.{" "}
              <span className="font-semibold">
                Kick your Psy into gear and become a part of the Psykick Club today!
              </span>
            </p>
          </div>
    </div>
  </div>
  )
}

export default page
