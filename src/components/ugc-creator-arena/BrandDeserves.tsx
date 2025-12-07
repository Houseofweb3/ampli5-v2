import React from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";

const cardData = [
  {
    number: "Liquidity grows where collaboration grows",
    description:
      "Protocols with ecosystem ties gain access to shared pools, shared users and shared incentives. Isolation kills TVL. Integration multiplies it.",
    isHighlighted: false,
  },
  {
    number: " Narratives spread faster through ecosystems than ads",
    description:
      "When the right protocols reference you, their communities adopt you automatically. Trust compounds.",
    isHighlighted: true,
  },
  {
    number: "Institutional entry requires ecosystem proof",
    description:
      "Web2 institutions do not integrate isolated protocols. They trust systems validated by multiple chains, partners and liquidity networks.",
    isHighlighted: false,
  },
];

const BrandDeserves: React.FC = (): JSX.Element => {
  return (
    <div className="relative  bg-[#A609F0] py-14 lg:py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text_pattern text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-[#D6FFF6] mb-12 lg:mb-16">
          Why Ecosystem Partnerships Matter?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 relative z-2">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={cn(
                "rounded-xl p-6 lg:p-8 flex flex-col gap-4  border-2 ",
                !card.isHighlighted
                  ? "bg-white border-[#a709f0]"
                  : "bg-transparent border-white"
              )}
            >
              <div
                className={cn(
                  "text-xl font-semibold mb-2",
                  !card.isHighlighted ? "text-[#7B46F8]" : "text-white"
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
          <div className="absolute sm:bottom-[-45px] bottom-[-22px] sm:right-[-45px] right-[-22px]  z-0">
            <Image
              className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]"
              src={"/pattern/flower.png"}
              width={200}
              height={200}
              alt="icon"
              style={{ animationDelay: "0s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDeserves;
