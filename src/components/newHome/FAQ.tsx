"use client";
import React, { useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import Image from "next/image";

const faqData = [
  {
    number: 1,
    question:
      "What makes Ampli5's creator arena different from influencer marketing?",
    answer:
      "Influencer marketing pays for a single post. The Arena rewards competition. Many creators make content. The best work wins. You get higher quality and more creative options without overpaying for followers.",
  },
  {
    number: 2,
    question: "How do creators join a bounty?",
    answer:
      "They see your brief and choose to compete. No invitations. No negotiations. Creators enter because they want to win your prize pool and prove their skill.",
  },
  {
    number: 3,
    question: "What results can we expect from a typical bounty?",
    answer:
      "We see an average of 30-150 entries, 2-7 winners, and 3-7X better engagement compared to traditional KOL campaigns.",
  },
];

const FAQ: React.FC = (): JSX.Element => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="relative overflow-hidden bg-white py-14 lg:py-20">
      <div className="absolute left-[-30px]  top-12 lg:left-12 z-0 ">
        <Image
          className="w-[100px] h-[100px]"
          src={"/pattern/Star-blue.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>

      <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-0 ">
        <Image
          className="w-[60px] h-[60px]"
          src={"/pattern/Star-pink.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-12 lg:mb-16">
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-10 lg:space-y-14 mb-12">
          {faqData.map((faq, index) => (
            <div key={index} className="space-y-4">
              {/* Question */}
              <div className="flex gap-2 items-start">
                <span className="text-2xl sm:text-3xl font-extrabold text-black leading-none"></span>
                <h3 className="text-xl sm:text-2xl  font-extrabold text-black flex-1 leading-tight">
                  {faq.number}. {faq.question}
                </h3>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed pl-8 ">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <PrimaryButton
          className="hover:text-white bg-white hover:bg-[#A609F0] text-sm sm:text-base px-2 sm:px-6 lg:px-12 py-1.5 sm:py-2 lg:py-4 mx-auto"
          onClick={() => setShowAll(!showAll)}
        >
          Load more
        </PrimaryButton>
      </div>
    </div>
  );
};

export default FAQ;
