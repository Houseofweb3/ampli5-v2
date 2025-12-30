import { cn } from "@/src/lib/utils";
import React from "react";

const EcosystemLoves: React.FC = (): JSX.Element => {
  const cardData = [
    {
      number: "Your best content is invisible by default.",
      description: [
        "Not because it’s bad. Because the internet only rewards what it sees again.",
        "One appearance is noise. Repetition is proof.",
        "If your story isn’t repeating, the algorithm assumes it doesn’t matter.",
        "Ampli5 exists to make repetition deliberate.",
      ],
      isHighlighted: false,
    },
    {
      number: "Distribution is the only MOAT ",
      description: [
        "Content can be copied. Creativity can be matched. Budgets can be outspent.",
        "Distribution cannot.",
        "Once your story is everywhere, it becomes the default.",
        "Ampli5 doesn’t make you louder. It makes you unavoidable.",
      ],
      isHighlighted: true,
    },
    {
      number: "AI is already deciding without you.",
      description: [
        "People don’t “discover” brands anymore. They ask questions.",
        "AI answers using existing public context. If your story isn’t already there, the gap gets filled for you.",
        "Ampli5 places your narrative where AI learns from, so your brand shows up as the answer.",
      ],
      isHighlighted: false,
    },
  ];

  return (
    <div className="relative bg-[#7847FA]  overflow-hidden min-h-[450px] py-14">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white">
            Why Does Your Brand Deserve
            <br /> Ampli5-ed Distribution?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16 ">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={cn(
                "rounded-xl p-6 lg:p-8 flex flex-col gap-4  border-[2px] border-white",
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
              <ul
                className={cn(
                  "text-base lg:text-lg leading-relaxed space-y-8",
                  card.isHighlighted ? "text-white" : "text-black"
                )}
              >
                {card.description.map((description) => {
                  return <li key={description}>{description}</li>;
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcosystemLoves;
