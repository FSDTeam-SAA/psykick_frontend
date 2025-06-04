/* eslint-disable react/no-unescaped-entities */
"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Search, Lightbulb, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// FAQ data structure with categories
const faqData = [
  {
    id: "basics",
    category: "Basics",
    items: [
      {
        id: "item-1",
        question: "What is Remote Viewing?",
        answer:
          "Remote Viewing (RV) is a practice that allows individuals to perceive distant or unseen targets using only their mind. It is not tied to any specific belief system and has been studied in scientific settings. RV can be used for personal development, problem-solving, and even predictive analysis.",
      },
      {
        id: "item-2",
        question: "Do I need special abilities to do Remote Viewing?",
        answer:
          "No. Remote Viewing is a skill that anyone can learn with practice. While some individuals may naturally excel at it, most people improve over time by refining their intuition, focus, and ability to separate real impressions from distractions.",
      },
      {
        id: "item-3",
        question: "How do I start practicing Remote Viewing?",
        answer:
          "Start by learning the basic protocols and practicing regularly. Our platform offers guided challenges for beginners, allowing you to develop your skills in a structured environment with immediate feedback.",
      },
      {
        id: "item-4",
        question: "Is there a right or wrong way to do Remote Viewing?",
        answer:
          'No. While there are structured methods, such as Coordinate Remote Viewing (CRV), there is no single "correct" technique. Some people prefer step-by-step protocols, while others take a more intuitive approach. The key is to find what works best for you through experimentation and practice.',
      },
    ],
  },
  {
    id: "challenges",
    category: "Challenges",
    items: [
      {
        id: "item-5",
        question: "How does your Remote Viewing challenge work?",
        answer:
          "In our challenges, you will first receive a hidden target reference. Without knowing what the target is, you will record your impressions through sketches, words, or sensations. After submission, you will be presented with multiple images and must choose the one that best matches your impressions. Your results are then recorded, and if the target is later revealed, you will see how well you did.",
      },
      {
        id: "item-6",
        question: "How do I know if I am improving at Remote Viewing?",
        answer:
          "Consistent practice is key. Our platform provides feedback and scoring for every session, allowing you to measure your success rate over time. The more you practice, the better you will become at distinguishing accurate impressions from analytical interference.",
      },
      {
        id: "item-7",
        question: "Can I see how other users are performing?",
        answer:
          "Yes! We have leaderboards where you can compare your performance against other remote viewers. You can also track your own progress and see how your accuracy improves over multiple sessions.",
      },
      {
        id: "item-10",
        question: "How do I join the challenges?",
        answer:
          "Simply sign up and participate in our active TMC and ARV sessions. Every challenge is an opportunity to test your abilities, improve your accuracy, and climb the leaderboard. Get started today and see where your intuition takes you!",
      },
    ],
  },
  {
    id: "practice",
    category: "Practice",
    items: [
      {
        id: "item-8",
        question: "How often should I practice Remote Viewing?",
        answer:
          "This depends on your personal goals. Some people practice daily, while others do weekly sessions. The more frequently you practice, the more you will refine your skills. Our challenges are designed to provide regular opportunities for you to test yourself and improve.",
      },
      {
        id: "item-9",
        question: "Can Remote Viewing be used to predict the future?",
        answer:
          "Some practitioners use RV for predictive purposes, such as Associative Remote Viewing (ARV), which links targets to future events. While RV has been tested for predictive accuracy, results vary between individuals. Our ARV challenges allow you to experiment with this method and see how well it works for you.",
      },
    ],
  },
];

// Flatten all FAQ items into a single array for display
const allFaqItems = faqData.flatMap((category) => category.items);

const EnhancedFaqPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter FAQ items based on search query
  const filteredFaqs =
    searchQuery.length > 0
      ? allFaqItems.filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : activeCategory
        ? faqData.find((category) => category.id === activeCategory)?.items ||
          allFaqItems
        : allFaqItems;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setActiveCategory(null);
  };

  const jumpToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery("");
  };

  // Track opened accordion items
  const handleAccordionChange = (value: string) => {
    if (visibleItems.includes(value)) {
      setVisibleItems(visibleItems.filter((item) => item !== value));
    } else {
      setVisibleItems([...visibleItems, value]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B69] to-[#1A1040] lg:pt-[40px] text-white">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 justify-center container mx-auto">
          <div className="relative lg:sticky lg:top-10 h-[30vh] sm:h-[40vh] lg:h-[80vh] w-full max-w-[700px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(113,77,217,0.4)]"
            >
              <Image
                src="/assets/img/faq.png"
                alt="3D question mark floating above a smartphone"
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B69] to-transparent opacity-70"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="font-bold text-xl sm:text-2xl mb-2 text-white drop-shadow-lg">
                  Got Questions?
                </h2>
                <p className="text-sm sm:text-base text-white/90 drop-shadow-lg">
                  Find answers to all your Remote Viewing questions here
                </p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 textLargeShadow">
                Curious about Remote Viewing and our challenges?
              </h1>

              <p className="text-lg text-purple-100/90 mb-8 paragraph">
                We've compiled answers to the most common questions to help you
                get started. Whether you're new to RV or looking to refine your
                skills, this section will guide you through the basics,
                techniques, and how to participate in our interactive sessions.
              </p>
            </motion.div>

            {/* Search and quick jump navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mb-6"
            >
              <div className="flex items-center rounded-lg border border-purple-500/30 bg-purple-900/20 focus-within:border-purple-400 focus-within:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all duration-200">
                <Search className="w-5 h-5 text-purple-300 ml-3" />
                <Input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-purple-400/60 h-12 text-white"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={`cursor-pointer text-white hover:bg-purple-800/50 transition-all ${activeCategory === null && searchQuery.length === 0 ? "bg-purple-800/50 border-purple-400" : "bg-transparent"}`}
                  onClick={() => {
                    setActiveCategory(null);
                    setSearchQuery("");
                  }}
                >
                  All
                </Badge>
                {faqData.map((category) => (
                  <Badge
                    key={category.id}
                    variant="outline"
                    className={`cursor-pointer text-white hover:bg-purple-800/50 transition-all ${activeCategory === category.id ? "bg-purple-800/50 border-purple-400" : "bg-transparent"}`}
                    onClick={() => jumpToCategory(category.id)}
                  >
                    {category.category}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* FAQ items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-purple-900/10 rounded-xl p-5 border border-purple-800/30"
            >
              <div className="space-y-4">
                {searchQuery.length > 0 && (
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-purple-400" />
                    Search Results
                    {filteredFaqs.length > 0 && (
                      <span className="ml-2 text-sm text-purple-300">
                        ({filteredFaqs.length} found)
                      </span>
                    )}
                  </h3>
                )}

                {activeCategory && searchQuery.length === 0 && (
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    {faqData.find((c) => c.id === activeCategory)?.category}
                  </h3>
                )}

                {filteredFaqs.length > 0 ? (
                  <ScrollArea className="h-[60vh] pr-4">
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredFaqs.map((item, index) => (
                        <AnimatePresence key={item.id} mode="wait">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <AccordionItem
                              value={item.id}
                              className="border border-purple-800/40 rounded-lg p-1 overflow-hidden shadow-sm bg-purple-900/20 backdrop-blur-sm"
                            >
                              <AccordionTrigger
                                className="text-left hover:no-underline px-4 py-3 rounded-lg text-lg font-medium challange-subTitle flex items-center"
                                onClick={() => handleAccordionChange(item.id)}
                              >
                                <span className="flex-1 flex items-center">
                                  <HelpCircle className="w-5 h-5 mr-3 text-purple-400 flex-shrink-0" />
                                  <span className="text-white">
                                    {item.question}
                                  </span>
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="text-[#C5C5C5] text-base px-4 pb-4 pt-1">
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="pl-8"
                                >
                                  {item.answer}
                                </motion.div>
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        </AnimatePresence>
                      ))}
                    </Accordion>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8">
                    <Lightbulb className="w-12 h-12 mx-auto text-purple-400/50 mb-3" />
                    <p className="text-purple-200">
                      No FAQs found matching "{searchQuery}"
                    </p>
                    <p className="text-sm text-purple-400/70 mt-2">
                      Try different keywords or browse by category
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Call-to-action section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 p-6 rounded-xl bg-gradient-to-r from-purple-800/20 to-purple-900/40 border border-purple-700/30"
            >
              <h3 className="text-xl font-semibold mb-2">
                Ready to test your Remote Viewing skills?
              </h3>
              <p className="text-purple-200 mb-4">
                Join our community and participate in our challenges today!
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900">
                <Link href={"/challenges"}>Start a Challenge</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFaqPage;
