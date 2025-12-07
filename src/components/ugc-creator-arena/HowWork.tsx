import React from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const cardData = [
  {
    number: "Narrative Engineering",
    description:
      "We write articles like FAQ’s that resonate natural human queries on LLM not SEO optimised content",
    isHighlighted: false,
  },
  {
    number: "Distributed Signal Building",
    description:
      "We deploy content across media outlets, Substack, Medium, Reddit, X and community platforms so your brand appears where it matters.",
    isHighlighted: true,
  },
  {
    number: "Your size no longer limits your visibility",
    description:
      "Consistent signals across the internet translate into higher model recognition and a steady rise in organic visibility.",
    isHighlighted: false,
  },
];

const HowWork: React.FC = (): JSX.Element => {
  return (
    <div className=" py-14 lg:py-20 relative ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 lg:mb-16">
          How AEO Works?
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
            </div>
          ))}
        </div>
      </div>
      <Marquee>
        <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 lg:mb-16 px-16">
          Clarity is the new discoverability. If models decide attention, make
          them choose you.{"         "}
        </h2>
      </Marquee>
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
