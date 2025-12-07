import React from "react";
import { cn } from "../../lib/utils";

const cardData = [
  {
    number: "1. Creators that influence ecosystems",
    description:
      "Our ecosystem creators shape narratives across Sonic, Base, Optimism, Polygon, Solana and more. They help partners understand your value quickly.",
    isHighlighted: true,
  },
  {
    number: "2. Cross category distribution",
    description:
      "Your protocol travels across newsletters, podcasts, X spaces, YouTube channels and communities that matter. This scales your visibility across ecosystems.",
    isHighlighted: false,
  },
  {
    number: "3. Direct integration pathways",
    description:
      "We identify partners who gain immediate value from integrating you. Zero fluff. Maximum adoption.",
    isHighlighted: true,
  },
];

const EcosystemLoves: React.FC = (): JSX.Element => {
  return (
    <div className=" py-14 lg:py-20 relative ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-extrabold ">
            WHY AMPLI5 WINS?
          </h2>
          <p>Creators, writers and LLMs work better with AEO </p>
        </div>

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
                  "text-lg font-semibold mb-2",
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
    </div>
  );
};

export default EcosystemLoves;
