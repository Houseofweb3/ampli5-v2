"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export const NEW_CASE_STUDY_DATA = [
  {
    brandLogo: null,
    video: '/video/cabbage by stader labs.mov',
  },
  {
    brandLogo: null,
    video: '/video/Crypto Kitty.mp4',
  },
  {
    brandLogo: null,
    video: '/video/Delta Ai Video.mp4',

  },
  {
    brandLogo: null,
    video: '/video/Quill Audit.mp4',

  },
];
function BrandSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="bg-[#7B46F8] py-14 lg:py-16 relative ">
      <div className="absolute right-1/2 translate-x-1/2  -top-[60px]  z-1">
        <Image
          className="w-120px h-120px"
          src={"/pattern/group-star.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>

      <div className="relative z-[11] ">
        <div className="flex justify-center items-start gap-4 w-full max-w-7xl mx-auto px-4 xl:px-0 relative">
          <h3 className="!text-white text-center text-24 lg:text-32 pb-8 text_pattern">
            Sample Work
          </h3>
     
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="case-study-slider"
          >
            {NEW_CASE_STUDY_DATA.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="relative z-10 py-10">
                  <div className="max-w-[520px] w-full mx-auto ">
                    <video
                      controls
                      playsInline
                      className="w-full h-auto rounded-xl bg-black aspect-video"
                    >
                      <source src={brand.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default BrandSlider;
