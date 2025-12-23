"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GoArrowUpRight } from "react-icons/go";
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
    ctaLink: "https://drive.google.com/file/d/1yvB2iJ4D4KqjB0mM5_6rusJrhK4o__4x/view?usp=drive_link",
  },
  {
    brandLogo: null,
    video: '/video/Crypto Kitty.mp4',
    ctaLink: "https://drive.google.com/file/d/1pzBB_nK6Es2KiNE3XgeU6YQwJpClAThk/view?usp=drive_link",
  },
  {
    brandLogo: null,
    video: '/video/Delta Ai Video.mp4',
    ctaLink:
      "https://drive.google.com/file/d/1HZ0FaRpSNuLkI_VdX6UJAbBuOiRwusRZ/view?usp=drive_link",
  },
  {
    brandLogo: null,
    video: '/video/Quill Audit.mp4',
    ctaLink:
      "https://drive.google.com/file/d/19DXW1B0jgyQkf6vZpi_rDZp1yEOl2x7F/view?usp=drive_link",
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
          {/* <div className=" justify-center items-center gap-4 w-fit hidden md:flex absolute right-0 top-0">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="bg-[#A762FE] rounded-xl p-1 px-3"
              aria-label="Previous slide"
            >
              <GoArrowLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className=" bg-[#A762FE] rounded-xl p-1 px-3"
              aria-label="Next slide"
            >
              <GoArrowRight className="w-6 h-6 text-white" />
            </button>
          </div> 
          */}
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
                  <div className="px-2 sm:px-4 py-4 w-full flex justify-center items-center">
                    <a
                      href={encodeURI(brand.ctaLink || '#')}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                      aria-label={'Open case study'}
                      className="cursor-pointer text-white hover:text-black bg-[#7B46F8] hover:bg-white transition-all duration-300 ease-in-out border border-white rounded-xl px-4 py-2 w-fit mx-auto h-fit flex items-center gap-2"
                    >
                      <span className="text-sm">{'View Sample'}</span>
                      <GoArrowUpRight className="text-xl sm:text-3xl" />
                    </a>
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
