import React from "react";
import { cn } from "../../lib/utils";
import { CheckListIcon } from "@/src/data/icon";

const pricingPlans = [
  {
    title: "Starter Plan",
    description: "Ideal for brands flirting with the AEO ecosystem.",
    price: "$5,000",
    period: "per month",
    features: [
      "20 high clarity articles across trusted media platforms, Substack, Medium, X and Reddit",
      "Complete narrative engineering",
      "Monthly reporting with answer share insights",
    ],
  },
  {
    title: "Growth Plan",
    description: "Perfect for brands that want faster presence across models.",
    price: "$10,000",
    period: "per month",
    features: [
      "30 articles across major platforms",
      "10 AEO friendly content pieces on TikTok and Instagram",
      "Stronger reinforcement loops across creator channels",
      "Multi format distributions for better LLM retrieval",
    ],
  },
  {
    title: "Leadership Plan",
    description:
      "Built for brands that want to dominate answer share in their category.",
    price: "$15,000",
    period: "per month",
    features: [
      "45 articles across media outlets",
      "10 AEO friendly pieces for TikTok and Instagram",
      "5 AEO focused YouTube explainers",
      "Deep model friendly narrative architecture",
      "Highest frequency signal building for maximum visibility",
    ],
  },
];

const PricingPlans: React.FC = (): JSX.Element => {
  return (
    <div className="relative bg-white py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-12 lg:mb-16">
          Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:mt-[100px] md:border-[3px] border-[#7B46F8] md:rounded-xl">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative  p-6 lg:p-8 flex flex-col bg-white border-[#7B46F8] rounded-xl",
                index === 1
                  ? "border-[3px] md:top-[-50px]"
                  : "border-[3px]  md:border-none"
              )}
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#7B46F8] mb-3">
                {plan.title}
              </h3>

              <p className="text-base lg:text-lg text-gray-700 mb-6 leading-relaxed">
                {plan.description}
              </p>

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
    </div>
  );
};

export default PricingPlans;
