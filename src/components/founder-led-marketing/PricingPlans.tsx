import React from "react";
import { cn } from "../../lib/utils";
import { CheckListIcon } from "@/src/data/icon";
import Image from "next/image";

const pricingPlans = [
  {
    title: "Founder Visibility Pack",
    price: "$12,000",
    period: "per month",
    features: [
      "4 podcast appearances",
      "Narrative extraction and positioning",
      "Complete preparation and script prompts",
      "Distribution mapping through 50 clipping channels.",
    ],
  },
];

const PricingPlans: React.FC = (): JSX.Element => {
  return (
    <div className="relative bg-[#FA51A2] py-14 lg:py-20 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-center text_pattern text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-12 lg:mb-16">
          Pack
        </h2>

        <div className="flex justify-center items-center w-full gap-y-8 ">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative  p-6 lg:p-8 flex flex-col bg-white border-[#7B46F8] rounded-xl border-[3px] "
              )}
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#7B46F8] mb-3">
                {plan.title}
              </h3>

              <div className="mb-6 border-b-2 border-black pb-4">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
                  {plan.price}
                </span>
                <span className="text-base lg:text-lg font-semibold   text-gray-600 ml-2">
                  {plan.period}
                </span>
              </div>

              <ul className="flex flex-col gap-4">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 text-base lg:text-lg text-gray-700 leading-relaxed"
                  >
                    <CheckListIcon />
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <Image
          src="/pattern/black-line-bottom.png"
          alt="aeo-vs-seo"
          width={1000}
          height={300}
          className=" w-full h-full max-h-[200px]  aspect-square"
        />
      </div>
    </div>
  );
};

export default PricingPlans;
