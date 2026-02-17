import { WHAT_NEXT } from "@/src/utils/constants";
import React from "react";

const WhatNext = () => {
  return (
    <div className="flex flex-col  w-full py-12 ">
      <span className="text-2xl md:text-4xl font-semibold">What Next?</span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {WHAT_NEXT.map((item, index) => (
          <div
            className="bg-backgroud-color flex gap-4 p-2 rounded-lg hover:bg-white hover:shadow-lg transition-all ease-in-out"
            key={index}
          >
            <div className="w-10 h-10">{item.src}</div>
            <div className="flex flex-col ">
              <span className="md:text-lg font-semibold tracking-wide">{item.title}</span>
              <p className="text-secondary-text text-sm md:text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatNext;
