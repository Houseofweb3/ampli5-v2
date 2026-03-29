import React from "react";
import Image from "next/image";

const steps = [
  {
    number: "1",
    title: "Audit",
    body: "We query ChatGPT, Claude, and Perplexity with every keyword that matters to your business. We find out who is getting cited. Where the gaps are. What signals the models are pulling from.",
  },
  {
    number: "2",
    title: "Narrative Engineering",
    body: "We build content that answers real questions the way a human would ask them. Not keyword-stuffed blog posts. Structured, authoritative content designed to be the source a model trusts.",
  },
];

export default function HowItWorksSteps() {
  return (
    <div className="py-14 lg:py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 lg:mb-16 text-[#111827]">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl p-6 lg:p-8 border-[3px] border-black bg-white flex flex-col gap-4"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#7B46F8]">{step.number}.</span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#7B46F8]">{step.title}</h3>
              </div>
              <div className="h-0.5 w-full bg-[#7B46F8]" />
              <p className="text-base lg:text-lg leading-relaxed text-black">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute sm:bottom-[-50px] bottom-[-25px] sm:right-[50px] right-[25px] z-10">
        <Image
          className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]"
          src={"/pattern/Isolation_Mode_big-blue.png"}
          width={200}
          height={200}
          alt=""
          style={{ animationDelay: "0s" }}
        />
      </div>
    </div>
  );
}
