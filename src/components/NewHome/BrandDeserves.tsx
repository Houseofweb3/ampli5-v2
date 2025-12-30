import React from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";

const cardData = [
  {
    number: "You already create",
    description: [
      "Podcasts",
      "Founder interviews",
      "Product explainers",
      "Long-form content",
    ],
  },
  {
    number: "But",
    description: [
      "Feeds forget fast.",
      "Posting resets reach",
      "Discovery fragments across platforms",
      "AI has no memory of you",
    ],
    isHighlighted: true,
  },
];

const BrandDeserves: React.FC = (): JSX.Element => {
  return (
    <div className="relative  bg-[#A609F0] py-14 lg:py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-center text_pattern text-3xl sm:text-4xl lg:text-5xl font-semibold !text-white mb-4">
            The Current Landscape
          </h2>
          <p className="text-white">
            Your story is not the problem. Your distribution layer is.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16 relative z-2">
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

              <ul
                className={cn(
                  "list-disc list-inside text-base lg:text-lg leading-relaxed",
                  card.isHighlighted ? "text-white" : "text-black"
                )}
              >
                {card.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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
