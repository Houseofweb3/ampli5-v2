"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

const faqData = [
  {
    number: 1,
    question: "How fast do we receive the ads?",
    answer:
      "Most ads are delivered within 72 hours once the narrative is locked.",
  },
  {
    number: 2,
    question: "Do AI generated videos perform as well as filmed videos?",
    answer:
      "In many categories they outperform because of higher testing volume and stronger hook discovery.",
  },
  {
    number: 3,
    question:
      "Can we use these videos for launches, campaigns and investor decks?",
    answer:
      "Yes. Our strongest outputs have been launch explainers and narrative driven brand films.",
  },
  {
    number: 4,
    question: "Will these videos look AI generated?",
    answer:
      "No. They will look like the internet’s native language. Your audience does not care if it is AI or human made. They care if it grabs them, holds them and moves them.",
  },
  {
    number: 5,
    question: "Can these AI videos match our brand guidelines?",
    answer:
      "Absolutely. Tone, colors, pacing and personality are tailored to your brand system before production begins.",
  },
];

const FAQ: React.FC = (): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="relative py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-12 lg:mb-16">
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={cn(
                  "rounded-lg p-6 transition-all duration-300",
                  isOpen
                    ? "bg-white border-2 border-black"
                    : "bg-[#EFE9FF] border-t-2 border-transparent"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black leading-tight">
                      {faq.number}. {faq.question}
                    </h3>

                    {isOpen && (
                      <p className="mt-4 text-base lg:text-lg text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => toggleItem(index)}
                    className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 border-gray-400 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label={isOpen ? "Collapse" : "Expand"}
                  >
                    <div
                      className={cn(
                        isOpen ? "rotate-[135deg]" : "rotate-0",
                        "transition-all duration-300"
                      )}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
