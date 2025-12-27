import React from "react";
import EffectSlider from "../ui/EffectSlider";
import { XSliderData, YoutubeSliderData } from "../../data/data";
import Image from "next/image";

export default function LatestPerforming() {
  return (
    <div className="relative bg-white py-14 lg:py-20">
      {/* <div className="absolute -top-72px md:-top-24 left-0">
        <Image
          className="w-100px lg:w-150px h-150px xl:w-fit"
          src={"/pattern/Vector7.png"}
          width={230}
          height={219}
          alt="img"
        />
      </div> */}
      <div className=" relative z-1">
        <div className="bg_star_pattern  text_pattern relative !text-[#7B46F8] text-center text-4xl leading-tight lg:text-5xl lg:leading-58px font-extrabold  px-7 w-fit mx-auto max-w-300px md:max-w-full">
          Latest Performing Content
        </div>
      </div>
      <EffectSlider data={YoutubeSliderData} type="youtube" direction="right">
        <div className="mb-9  w-fit mx-auto">
          <Image src={"/icons/youtube.png"} width={144} height={32} alt="img" />
        </div>
      </EffectSlider>
      <EffectSlider data={XSliderData} type="X" direction="right">
        <div className="mb-9 w-fit mx-auto">
          <Image src={"/icons/icon-x.png"} width={57} height={32} alt="img" />
        </div>
      </EffectSlider>
    </div>
  );
}
