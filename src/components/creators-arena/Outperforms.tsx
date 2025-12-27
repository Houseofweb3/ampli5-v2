import React from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";

const cardData = [
  {
    number: "01",
    description:
      "You're not paying for reach. You're paying for the best output. Creators see the rankings.",
    isHighlighted: false,
  },
  {
    number: "02",
    description: "Brands receive 50-150 content variations instead of 10.",
    isHighlighted: true,
  },
  {
    number: "03",
    description: "Pressure builds. Quality skyrockets.",
    isHighlighted: false,
  },
];

const Outperforms: React.FC = (): JSX.Element => {
  return (
    <div className="relative overflow-hidden bg-[#F5F5F5] py-14 lg:py-20">
      <div className="absolute -left-[20px] top-12 lg:left-12 z-0 ">
        <Image
          className="w-50px h-50px"
          src={"/pattern/Isolation_Mode_big.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="absolute bottom-0 right-[-20px] lg:hidden z-0">
        <Image
          className="w-[60px] h-[60px]"
          src={"/pattern/Isolation_Mode_big.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-12 lg:mb-16">
          Why Creator Arena Outperforms Influencer Marketing?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 relative">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={cn(
                "rounded-xl p-6 lg:p-8 flex flex-col gap-4",
                card.isHighlighted
                  ? "hover:bg-[#7B46F8] hover:text-white bg-[#7B46F8] text-white"
                  : "bg-white border-2 border-[#7B46F8] text-black"
              )}
            >
              <div
                className={cn(
                  "text-4xl lg:text-5xl font-extrabold mb-2",
                  card.isHighlighted ? "text-white" : "text-black"
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
          <div className="absolute lg-block hidden bottom-[-70px] right-[0px] z-0">
            <Image
              className="w-[80px] h-[80px]"
              src={"/pattern/Isolation_Mode_big.png"}
              width={200}
              height={200}
              alt="icon"
              style={{ animationDelay: "0s" }}
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#7B46F8] leading-relaxed max-w-4xl mx-auto">
            This is why Creator Arena content outperforms influencer posts every
            single time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Outperforms;
