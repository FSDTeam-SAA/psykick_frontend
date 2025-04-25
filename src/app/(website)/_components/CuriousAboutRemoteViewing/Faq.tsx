import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Faq = () => {
  return (
    <section className=" text-white px-6 py-12 md:py-16">
    <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-6">
        <h2 className="title textLargeShadow">
        Curious about Remote Viewing and how our challenges work?
        </h2>
        <p className="text-[#C5C5C5] text-[16px] font-normal leading-relaxed">
          We&apos;ve compiled answers to the most common questions to help you get started. Whether you&apos;re new to RV or
          looking to refine your skills, this section will guide you through the basics, techniques, and how to
          participate in our interactive sessions. Explore the FAQ below and take your first step into the world of
          Remote Viewing!
        </p>
        <Link  href="/faq">
           <button className=" btn mt-[18px] lg:mt-[32px] hover:bg-[#7C3AED] text-white rounded-full px-6 py-2 flex items-center gap-2 text-sm md:text-base">
              Click Here
              <ArrowRight className="w-4 h-4" />
            </button>
           </Link>
      </div>

      <div>
        <Accordion defaultValue="item-1" type="single" collapsible className="space-y-4">
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
            No. Remote Viewing is a skill that anyone can learn with practice. While some individuals may naturally excel at it, most people improve over time by refining their intuition, focus, and ability to separate real impressions from distractions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
              3. How do I start practicing Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
            No. While there are structured methods, such as Coordinate Remote Viewing (CRV), there is no single “correct” technique. Some people prefer step-by-step protocols, while others take a more intuitive approach. The key is to find what works best for you through experimentation and practice.           </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
              4. Is there a right or wrong way to do Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
            No. While there are structured methods, such as Coordinate Remote Viewing (CRV), there is no single “correct” technique. Some people prefer step-by-step protocols, while others take a more intuitive approach. The key is to find what works best for you through experimentation and practice.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
              5. How does your Remote Viewing challenge work?
            </AccordionTrigger>
            <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
            In our challenges, you will first receive a hidden target reference. Without knowing what the target is, you will record your impressions through sketches, words, or sensations. After submission, you will be presented with multiple images and must choose the one that best matches your impressions. Your results are then recorded, and if the target is later revealed, you will see how well you did.            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
  )
}

export default Faq
