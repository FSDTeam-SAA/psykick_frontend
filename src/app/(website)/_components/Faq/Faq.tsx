import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Faq = () => {
  return (
    <section className=" text-white px-6 py-12 md:py-16">
    <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
        Your Questions <br /> Answered
        </h2>
        <p className="text-[#C5C5C5] text-[16px] font-normal leading-relaxed">
          We&apos;ve compiled answers to the most common questions to help you get started. Whether you&apos;re new to RV or
          looking to refine your skills, this section will guide you through the basics, techniques, and how to
          participate in our interactive sessions. Explore the FAQ below and take your first step into the world of
          Remote Viewing!
        </p>
        <Link  href="/learn-more-about">
           <button className=" btn mt-[18px] lg:mt-[32px] hover:bg-[#7C3AED] text-white rounded-full px-6 py-2 flex items-center gap-2 text-sm md:text-base">
              Click Here
              <ArrowRight className="w-4 h-4" />
            </button>
           </Link>
      </div>

      <div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline  challange-subTitle">
              1. What is Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
              Remote Viewing (RV) is a practice that allows individuals to perceive distant or unseen targets using
              only their mind. It is not tied to any specific belief system and has been studied in scientific
              settings. RV can be used for personal development, problem-solving, and even predictive analysis.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
              2. Do I need special abilities to do Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
              Remote Viewing is a natural human ability that can be learned and developed through practice and proper
              training.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
              3. How do I start practicing Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
              You can begin by learning the basic protocols and practicing with simple targets under proper guidance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
              4. Is there a right or wrong way to do Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
              While there are established protocols, the most important aspect is maintaining a consistent practice
              method.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
              5. How does your Remote Viewing challenge work?
            </AccordionTrigger>
            <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
              Our challenges provide structured practice opportunities with feedback and community support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
  )
}

export default Faq
