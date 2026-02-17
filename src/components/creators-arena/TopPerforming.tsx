import React from "react";
import { TopAttention } from "../../data/data";
import CardImage from "../ui/CardImage";

export default function TopPerforming() {
  return (
    <div className="bg-[#FE8616] relative py-86px innerpage_bgsquare_bottom innerpage_bg_vertial_pattern">
      <div className="max-w-7xl mx-auto px-4 w-full relative z-1 flex items-center flex-col lg:flex-row gap-12 sm:gap-11">
        <div className="mt-[180px] lg:mt-0 relative z-1 text_pattern max-w-400px text-center sm:text-left text-4xl leading-tight lg:text-5xl lg:leading-58 font-extrabold">
          Our <br /> Top Performing Creators
        </div>
        <div className="relative z-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {TopAttention.map((data, index) => (
            <CardImage key={index} data={data}></CardImage>
          ))}
        </div>
      </div>
    </div>
  );
}
