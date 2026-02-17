import React from "react";
import { cn } from "../../lib/utils";
import { CheckListIcon } from "@/src/data/icon";
import PrimaryButton from "../ui/PrimaryButton";

const pricingPlans = [
  {
    title: "Starter Plan",
    description: "For teams that want to feel the power of AI done properly.",
    price: "$2,500",
    period: "per month",
    features: [
      "One 60 second ad built around a dominant hook",
      "Multiple visual and voice variations",
      "Delivered in 72 hours",
      "Tested for retention and thumb stop value",
    ],
  },
  {
    title: "Growth Plan",
    description: "For brands running real performance marketing.",
    price: "$6,000",
    period: "per month",
    features: [
      "Three 60 second ads, each with a different creative thesis",
      "Short form cuts for TikTok, Meta and YouTube",
      "Thumbnail and title optimization",
      "Ideation cycles based on audience psychology",
    ],
  },
  {
    title: "Flagship Brand Film",
    description: "For launches, founder stories and product unveilings.",
    price: "$5,000",
    period: "per month",
    features: [
      "A 90 second cinematic narrative built to position your brand",
      "Storyboard, script, emotion mapping, launch sequencing",
      "Perfect for websites, PR and investor touchpoints",
    ],
  },
];

const PricingPlans: React.FC = (): JSX.Element => {
  return (
    <div className="relative bg-white py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-12 lg:mb-16">
          Plans Designed for <br /> Velocity and Dominance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:mt-[100px] md:border-[3px] border-[#7B46F8] md:rounded-xl">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative  p-6 lg:p-8 flex flex-col bg-white border-[#7B46F8] rounded-xl",
                index === 1 ? "border-[3px] md:top-[-50px]" : "border-[3px]  md:border-none"
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
              <div className="mt-auto w-full">
                <PrimaryButton
                  className=" !text-white py-2 px-4 mt-4 w-full "
                  onClick={() =>
                    window.open("https://calendly.com/partnerships-houseofweb3/30min", "_blank")
                  }
                >
                  Get Started
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
