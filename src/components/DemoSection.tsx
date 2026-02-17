import React from "react";

import { DEMO_POINTS } from "../utils/constants";
import { CheckIcon } from "@/public/icons";
import AppointmentCalendar from "./AppointmentCalendar";

const DemoSection = () => {
  return (
    <div className="w-full h-full font-Jakarta p-4 md:p-12" id="demo">
      <div className="bg-background-color px-4 py-6 md:px-6 md:py-12 rounded-2xl flex items-center flex-col gap-8 w-full ">
        <div className="text-2xl md:text-6xl max-w-md font-semibold text-center">
          Request a<span className=""> personalised 30- minute</span> Detail Demo
        </div>

        <p className="text-black/45 max-w-md text-center text-base md:text-2xl">
          Discover How Ampi5 Can Supercharge Your Sales & Boost Awareness with Smarter Influencer
          Marketing
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 mb-12 gap-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-200 w-full">
          {DEMO_POINTS.map((point, index) => (
            <div className="flex  items-start gap-2 px-5" key={index}>
              <div className="w-fit">
                <CheckIcon />
              </div>
              <span className="text-black/50 text-lg font-semibold text-center">{point}</span>
            </div>
          ))}
        </div>

        <AppointmentCalendar />
      </div>
    </div>
  );
};

export default DemoSection;
