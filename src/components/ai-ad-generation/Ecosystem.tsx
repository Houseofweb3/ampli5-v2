import React from "react";
import Image from "next/image";

export default function Ecosystem() {
  const TopAttention = [
    { img: "/images/u1.png" },
    {img: "/images/u2.png"},
    { img: "/images/u3.png" },
    { img: "/images/u4.png" },
    { img: "/images/u5.png" },
    { img: "/images/u6.png" },
  ];
  return (
    <div className="bg-[#FE8616] relative py-86px innerpage_bgsquare_bottom innerpage_bg_vertial_pattern">
      <div className="max-w-7xl mx-auto px-4 w-full relative z-1 flex items-center flex-col lg:flex-row gap-12 sm:gap-11">
        <div className="mt-[180px] lg:mt-0 relative z-1 text_pattern max-w-400px text-center sm:text-left text-4xl leading-tight lg:text-5xl lg:leading-58 font-extrabold">
          The Ecosystem That Amplifies You
        </div>
        <div className="relative z-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {TopAttention.map((data) => (
            <div className="cadimage_list_item border border-solid border-black w-fit rounded-36 bg-white" key={data.img}>
              <div className="cadimage_list_item_img w-[calc(100% - 2rem)] h-[calc(100% - 2rem)] flex items-center justify-center overflow-hidden rounded-36">
                <Image src={data.img} width={253} height={258} alt="image1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
