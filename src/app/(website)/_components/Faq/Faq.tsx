import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const Faq = () => {
  return (
    <section className=" text-white px-6 py-12 md:py-16">
    <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Curious about Remote Viewing and how our challenges work?
        </h2>
        <p className="text-gray-300 leading-relaxed">
          We've compiled answers to the most common questions to help you get started. Whether you're new to RV or
          looking to refine your skills, this section will guide you through the basics, techniques, and how to
          participate in our interactive sessions. Explore the FAQ below and take your first step into the world of
          Remote Viewing!
        </p>
        <Button variant="secondary" className="group bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-none">
          Explore More
          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-[#A78BFA]">
              1. What is Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Remote Viewing (RV) is a practice that allows individuals to perceive distant or unseen targets using
              only their mind. It is not tied to any specific belief system and has been studied in scientific
              settings. RV can be used for personal development, problem-solving, and even predictive analysis.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-[#A78BFA]">
              2. Do I need special abilities to do Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Remote Viewing is a natural human ability that can be learned and developed through practice and proper
              training.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-[#A78BFA]">
              3. How do I start practicing Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              You can begin by learning the basic protocols and practicing with simple targets under proper guidance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-[#A78BFA]">
              4. Is there a right or wrong way to do Remote Viewing?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              While there are established protocols, the most important aspect is maintaining a consistent practice
              method.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b-[#4C2A85]">
            <AccordionTrigger className="text-left hover:no-underline hover:text-[#A78BFA]">
              5. How does your Remote Viewing challenge work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
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
