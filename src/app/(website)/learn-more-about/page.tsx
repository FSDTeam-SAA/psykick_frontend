import Image from "next/image"

const page = () => {
  return (
    <div>
          <div className="min-h-screen x px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              What is Remote Viewing?
            </h1>

            <p className="text-purple-100 text-sm md:text-base lg:text-lg leading-relaxed">
              Remote Viewing (RV) is The Ability To Access And Describe Information About Distant Or Unseen Targets
              Using Only The Mind. Unlike Traditional Psychic Practices, RV Is Often Structured Within A Methodological
              Framework That Allows For Controlled Experimentation And Repeatability. However, It Is Important To Note
              That There Is No Singular &apos;Correct&apos; Way To Perform Remote Viewing—Each Individual May Develop
              Their Own Approach Based On Personal Experience, Intuition, And Practice.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg mt-8">
              The Origins and Evolution of Remote Viewing
            </h2>

            <p className="text-purple-100 text-sm md:text-base lg:text-lg leading-relaxed">
              The Concept Of Perceiving Distant Information Without Physical Interaction Has Existed For Centuries Under
              Different Names—Clairvoyance, Second Sight, Or Extrasensory Perception (ESP). However, Modern Remote
              Viewing Gained Recognition In The 1970s When The U.S. Government Conducted Research Under Programs Like
              Project Stargate, Exploring The Potential Of Trained Individuals To Describe Unknown Locations, Objects,
              Or Events.
            </p>

            <p className="text-purple-100 text-sm md:text-base lg:text-lg leading-relaxed">
              While Early Methods Included Strict Protocols Designed For Scientific Testing, Many Practitioners Today
              Adapt These Techniques, Integrating Their Own Styles And Intuitive Processes.
            </p>
          </div>

          {/* Image Container */}
          <div className="relative mt-6 lg:mt-0">
            <div className="rounded-3xl overflow-hidden max-w-[470px]  p-2">
              <Image
                src="https://s3-alpha-sig.figma.com/img/4dac/3ddb/485a52bc8028edb904dbd247fd0396c4?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gJzJkPRWFqB0eGLxpL1W0PxQAx3M7~mwLdoH-9Uz5IxtSAAdLcBIxvpNQXr4Pz681CM9kmM9jdZpsYqDxQlzTvZWwlHLYaYIdiqwc~RqESoxnXa-AiYxwPDhIX4dHS-inJZa4L8mzI5MSBCAcIApCI487Qrh3U0RGgpPGibaS6yVEWpyb0T1FJSoUVkMV7c4aePixXzgRBOxYPDf2ytGf6SFFbazBFOLb0gC4FAQqr~c4~dn0jF~aDVacgro7x1XHQuvjUNazhWeePP2c9M~5JTLqceGo3LjKzqWdHQ462v6s6Rhgpf6-BnKL0etvT2-a4LIXWGn8ibUrzssXbZcHg__"
                alt="Three people gazing at a starry night sky"
                width={800}
                height={600}
                className="rounded-2xl w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default page
