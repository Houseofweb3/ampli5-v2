"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

const faqData = [
  {
    number: 1,
    question: "Is Ampli5 a marketing agency?",
    answer:
      "No. Agencies help you create and publish. Ampli5 exists after that. We operate the distribution layer that ensures your story repeats, compounds, and gets remembered across social, search, and AI.",
  },
  {
    number: 2,
    question: "Do I still need a marketing agency if I use Ampli5?",
    answer:
      "Yes, and that’s the point. Agencies create the signal. Ampli5 makes sure the signal survives. We work best alongside agencies, founders, and in-house teams who already create strong content but lack repeatable distribution.",
  },
  {
    number: 3,
    question:
      "What makes Ampli5 fundamentally different from influencer marketing?",
    answer:
      "Influencer marketing gives you one post, one spike, one reset. Ampli5 builds repeat exposure through:",
    list: [
      "Owned clipping channels",
      "High-frequency distribution",
      "Reinforcement across search and AI",
    ],
    summary: "This is not about endorsements. It’s about presence.",
  },
  {
    number: 4,
    question: "Why is clipping so central to the system?",
    answer:
      "Because long-form builds trust, but short-form builds memory.<br/>Clipping turns depth into frequency. Frequency turns visibility into recall.<br/>Without clipping, your best ideas die in long videos no one revisits.",
  },
  {
    number: 5,
    question: "What do you mean by “owning distribution”?",
    answer:
      "We don’t rely on creators posting once. We publish through 25+ owned clipping channels with existing audiences. This means:",
    list: [
      "No dependency on availability",
      "No one-off placements",
      "No reset every campaign",
    ],
    summary: "Distribution is controlled, repeatable, and scalable.",
  },
  {
    number: 6,
    question: "How does Ampli5 help with AI visibility?",
    answer:
      "People don’t just search anymore. They ask AI.<br/><br/> If your brand doesn’t exist in those answers, you don’t exist in the decision moment. <br/><br/>We seed your narrative across trusted platforms as real answers, not backlinks, so models understand: ",
    list: ["What you do", "Who you’re for", "When to surface you"],
    summary: "This builds context memory, not ads.",
  },
  {
    number: 7,
    question: "How long does it take to see results?",
    answer:
      "You’ll see reach immediately. You’ll feel recall within weeks.<br/><br/>This isn’t a one-day spike system. It’s a compounding visibility engine.<br/><br/>The longer it runs, the harder it is to displace. ",
  },
  {
    number: 8,
    question: "What kind of brands does Ampli5 work best for?",
    answer: "Brands that:",
    list: [
      "Already have something real to say",
      "Care about long-term mindshare, not vanity metrics",
      "Operate in tech, crypto, fintech, AI, or emerging categories",
    ],
    summary: "If your story matters, distribution matters more.",
  },
  {
    number: 9,
    question: "Is this paid ads or organic distribution?",
    answer: "This is:",
    list: [
      "Owned channels",
      "Organic reach",
      "Algorithm-native content",
      "Lower CPV than paid social",
    ],
    summary: "Presence without dependency.",
  },
  {
    number: 10,
    question: "What happens if we stop working with Ampli5?",
    answer:
      "Campaigns stop. Memory doesn’t.<br/>Your clips continue to live. Your narrative remains seeded. Your brand stays present in search and AI.",
    summary: "That’s the difference between renting attention and building it.",
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
                      <div>
                        <p
                          className="mt-4 text-base lg:text-lg text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                        <ul className="list-disc list-inside mt-4 text-base lg:text-lg text-gray-600 leading-relaxed">
                          {faq.list?.map((item: string) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <p className="mt-4 text-base lg:text-lg text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.summary ?? "" }} />
                      </div>
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
