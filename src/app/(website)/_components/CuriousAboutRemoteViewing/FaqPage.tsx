import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-[#2D1B69] lg:pt-[40px] text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 justify-center container mx-auto">
          <div className="relative aspect-square top-0 w-full min-h-[90vh] lg:max-w-[700px] lg:h-[660px] mx-auto">
            <Image
              src="/assets/img/faq.png"
              alt="3D question mark floating above a smartphone"
              fill
              className="object-cover rounded-2xl fixed top-0"
              priority
            />
          </div>

          <div className="space-y-6">
            <h1 className="title textLargeShadow">
              Curious about Remote Viewing and how our challenges work?
            </h1>

            <p className="paragraph">
              We&lsquo;ve compiled answers to the most common questions to help
              you get started. Whether you&lsquo;re new to RV or looking to
              refine your skills, this section will guide you through the
              basics, techniques, and how to participate in our interactive
              sessions. Explore the FAQ below and take your first step into the
              world of Remote Viewing!
            </p>

            {/* FAQ items  */}
            <div className="">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline  challange-subTitle">
                    1. What is Remote Viewing?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    Remote Viewing (RV) is a practice that allows individuals to
                    perceive distant or unseen targets using only their mind. It
                    is not tied to any specific belief system and has been
                    studied in scientific settings. RV can be used for personal
                    development, problem-solving, and even predictive analysis.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
                    2. Do I need special abilities to do Remote Viewing?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    No. Remote Viewing is a skill that anyone can learn with
                    practice. While some individuals may naturally excel at it,
                    most people improve over time by refining their intuition,
                    focus, and ability to separate real impressions from
                    distractions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
                    3. How do I start practicing Remote Viewing?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    No. While there are structured methods, such as Coordinate
                    Remote Viewing (CRV), there is no single “correct”
                    technique. Some people prefer step-by-step protocols, while
                    others take a more intuitive approach. The key is to find
                    what works best for you through experimentation and
                    practice.{" "}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
                    4. Is there a right or wrong way to do Remote Viewing?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    No. While there are structured methods, such as Coordinate
                    Remote Viewing (CRV), there is no single “correct”
                    technique. Some people prefer step-by-step protocols, while
                    others take a more intuitive approach. The key is to find
                    what works best for you through experimentation and
                    practice.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
                    5. How does your Remote Viewing challenge work?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    In our challenges, you will first receive a hidden target
                    reference. Without knowing what the target is, you will
                    record your impressions through sketches, words, or
                    sensations. After submission, you will be presented with
                    multiple images and must choose the one that best matches
                    your impressions. Your results are then recorded, and if the
                    target is later revealed, you will see how well you
                    did.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
                    6. How do I know if I am improving at Remote Viewing?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    Consistent practice is key. Our platform provides feedback
                    and scoring for every session, allowing you to measure your
                    success rate over time. The more you practice, the better
                    you will become at distinguishing accurate impressions from
                    analytical interference.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
                    7. Can I see how other users are performing?{" "}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    Yes! We have leaderboards where you can compare your
                    performance against other remote viewers. You can also track
                    your own progress and see how your accuracy improves over
                    multiple sessions.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
                    8. How often should I practice Remote Viewing?{" "}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    This depends on your personal goals. Some people practice
                    daily, while others do weekly sessions. The more frequently
                    you practice, the more you will refine your skills. Our
                    challenges are designed to provide regular opportunities for
                    you to test yourself and improve.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
                    9. Can Remote Viewing be used to predict the future?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    Some practitioners use RV for predictive purposes, such as
                    Associative Remote Viewing (ARV), which links targets to
                    future events. While RV has been tested for predictive
                    accuracy, results vary between individuals. Our ARV
                    challenges allow you to experiment with this method and see
                    how well it works for you.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b-[#4C2A85]">
                  <AccordionTrigger className="text-left hover:no-underline challange-subTitle">
                    10. How do I join the challenges?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#C5C5C5] text-[16px] font-normal">
                    Simply sign up and participate in our active TMC and ARV
                    sessions. Every challenge is an opportunity to test your
                    abilities, improve your accuracy, and climb the leaderboard.
                    Get started today and see where your intuition takes
                    you!{" "}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
