"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CARDS = [
  {
    title: "Newsletters",
    description: "They read (with open-rate signals)",
    icon: "/icons/news10.png",
  },
  {
    title: "Podcasts",
    description: "they trust (with engagement time)",
    icon: "/icons/podcast10.png",
  },
  {
    title: "Creators",
    description: "that move action (with proof of work)",
    icon: "/icons/computer-video-call.png",
  },
  {
    title: "Clippers",
    description: "that push scale and repetition",
    icon: "/icons/cursor-edit-01.png",
  },
  {
    title: "Subreddits",
    description: "where opinions form",
    icon: "/icons/reddit.png",
  },
  {
    title: "AEO surfaces",
    description: "where they search, ask, and decide",
    icon: "/icons/message-question.png",
  },
];

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -50px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Get() {
  return (
    <div className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="!text-[#7B46F8] text-3xl sm:text-4xl lg:text-5xl font-bold pb-4">
            What you get
          </h2>
          <p className="text-gray-900 font-bold text-lg sm:text-xl max-w-2xl mx-auto">
            An Audience Atlas. Not a spreadsheet.
          </p>
          <p className="text-gray-900 text-base sm:text-lg mt-1 max-w-2xl mx-auto">
            A live view of where your ICP actually hangs out:
          </p>
        </div>

        {/* Desktop: 2x3 grid, icon left + text right in each card, shadow */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {CARDS.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.08}>
              <div className="rounded-xl bg-white border border-black shadow-xl p-5 lg:p-6 flex items-center justify-center gap-4 min-h-[120px] h-full">
                <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 relative">
                  <Image
                    src={card.icon}
                    alt=""
                    width={56}
                    height={56}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-base lg:text-lg">{card.title}</h3>
                  <p className="text-gray-700 text-sm lg:text-base mt-0.5">{card.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile (below md): 2 cols, 3 rows, icon on top, then title, then subtitle, bordered cards */}
        <div className="md:hidden grid grid-cols-2 gap-3 sm:gap-4">
          {CARDS.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.08}>
              <div className="rounded-xl bg-white border-2 border-black shadow-xl p-4 flex flex-col items-start justify-start text-center min-h-[160px]">
                <div className="w-10 h-10 relative flex-shrink-0 mb-2">
                  <Image
                    src={card.icon}
                    alt=""
                    width={100}
                    height={100}
                    className="object-contain w-10 h-10"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{card.title}</h3>
                <p className="text-gray-700  !text-left text-base mt-1 leading-snug">
                  {card.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
