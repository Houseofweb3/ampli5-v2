"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TIMELINE_STEPS = [
  {
    day: "Day 0",
    action: "You submit your ICP",
    description: "Who you want, what do they do, how should they interact with your product",
    hasBox: true,
  },
  {
    day: "Day 1",
    action: "We generate your Audience Atlas",
    description: "A visual map of where they spend attention and who shapes decisions",
    hasBox: false,
  },
  {
    day: "Day 2",
    action: "You deploy from the atlas",
    description: "Pick distribution channels. Launch. Stop guessing.",
    hasBox: true,
  },
];

export default function NewDetails() {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative pb-24 md:pb-32">
        <Image
          src="/pattern/Isolation_Mode_big-1.png"
          alt="details"
          width={1000}
          height={1000}
          className="absolute top-[-75px] left-[-75px] w-[150px] h-[150px] md:w-[300px] md:h-[300px] md:top-[-150px] md:left-[-150px] z-10"
        />
        <div className="flex justify-center items-center  w-full mt-28">
          <div className="mb-12 flex justify-center text-center">
            <h2 className="!text-[#7B46F8] text-3xl sm:text-4xl lg:text-5xl pb-6 flex gap-3 items-center justify-center">
              Why
              <Image
                src="/logo/ampli5.png"
                alt="ampli5"
                width={200}
                height={200}
                className="h-[30px] sm:h-[40px] lg:h-[50px] w-auto"
              />
              exists?
            </h2>
          </div>
        </div>

        <div className="hidden md:block space-y-4">
          {TIMELINE_STEPS.map((step, i) => (
            <AnimatedSection key={step.day} delay={i * 0.15}>
              <div
                className={
                  step.hasBox
                    ? "rounded-xl border-2 border-gray-800  p-5 lg:p-6 flex flex-wrap items-center justify-start gap-4 shadow-xl"
                    : "py-3 flex flex-wrap items-center gap-4"
                }
              >
                <div className="min-w-[320px] w-[calc(50%_-_15px)]">
                  <p className="font-bold text-[#7B46F8] text-lg lg:text-xl">{step.day}:</p>
                  <p className="text-gray-900 font-medium mt-1">{step.action}</p>
                </div>
                <p className="text-gray-900 text-base lg:text-lg  max-w-xl">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="md:hidden relative pl-6 space-y-6">
          {TIMELINE_STEPS.map((step, i) => (
            <AnimatedSection key={step.day} delay={i * 0.15}>
              <div
                className={`relative rounded-xl bg-white p-5  ${step.hasBox ? "border-2 border-gray-900 shadow-xl" : ""}`}
              >
                <p className="font-bold text-[#7B46F8] text-lg">{step.day}:</p>
                <p className="text-gray-900 font-bold mt-1">{step.action}</p>
                <p className="text-gray-900 mt-2 text-sm leading-relaxed">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}

// Animated Section Component using Framer Motion
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
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
