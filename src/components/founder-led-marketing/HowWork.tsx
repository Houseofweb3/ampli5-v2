import React from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";

const cardData = [
  {
    number: "Narrative Extraction",
    description:
      "We decode your worldview, your principles and your category insights. This becomes a narrative playbook that you can use across platforms and formats.",
    list: null,
    summary: null,
    isHighlighted: false,
  },

  {
    number: "Multi Platform Distribution",
    description: "We activate your voice across",
    list: [
      "Podcasts",
      "YouTube",
      "YouTube interviews",
      "X and LinkedIn thought pieces",
      "Panel appearances and community shows",
    ],
    summary:
      " The goal is simple. Show up where the market already pays attention.",
    isHighlighted: true,
  },
  {
    number: "The Amplification Loop",
    description:
      "Creators pick up your ideas. Communities repeat them.",
    list: null,
    summary: null,
    isHighlighted: false,
  },
];

const HowWork: React.FC = (): JSX.Element => {
  return (
    <div className=" py-14 lg:py-20 relative ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 lg:mb-16">
          How Influencer Marketing <br /> Works on Ampli5?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 ">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={cn(
                "rounded-xl p-6 lg:p-8 flex flex-col gap-4  border-[3px] border-black",
                card.isHighlighted ? "bg-[#7B46F8] " : "bg-white"
              )}
            >
              <div
                className={cn(
                  "text-sm font-semibold rounded-full px-3 py-0.5 w-fit",
                  card.isHighlighted
                    ? "text-[#7B46F8] bg-white"
                    : "text-white bg-[#7B46F8]"
                )}
              >
                Step {index + 1}
              </div>
              <div
                className={cn(
                  "sm:text-3xl text-2xl font-semibold mb-2",
                  card.isHighlighted ? "text-white" : "text-[#7B46F8]"
                )}
              >
                {card.number}
              </div>

              <div
                className={cn(
                  "h-0.5 w-full mb-4",
                  card.isHighlighted ? "bg-white" : "bg-[#7B46F8]"
                )}
              ></div>

              <p
                className={cn(
                  "text-base lg:text-lg leading-relaxed",
                  card.isHighlighted ? "text-white" : "text-black"
                )}
              >
                {card.description}
              </p>
              {card.list && (
                <ul className="list-disc list-inside text-white">
                  {card.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
              {card.summary && (
                <p className="text-base lg:text-lg leading-relaxed text-white">
                  {card.summary}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute sm:bottom-[-50px] bottom-[-25px] sm:right-[50px] right-[25px]  z-10">
        <Image
          className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]"
          src={"/pattern/Isolation_Mode_big-blue.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>
    </div>
  );
};

export default HowWork;
