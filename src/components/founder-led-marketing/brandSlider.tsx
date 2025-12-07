"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { NEW_CASE_STUDY_DATA } from "@/src/data/data";

function BrandSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div>
      <div className="bg-[#7B46F8] py-8 sm:py-14 lg:py-16 relative">
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
        <div className="relative z-[11]">
          <div>
            <div className="flex justify-center items-start gap-4 w-full max-w-7xl mx-auto px-4 xl:px-0">
              <div className="w-full relative">
                <h3 className="!text-white text-center text-20 sm:text-24 lg:text-32 pb-8">
                  Case Studies
                </h3>
              </div>
              <div className=" justify-center items-center gap-4 w-fit hidden md:flex">
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
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4">
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 24,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 32,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="case-study-slider"
            >
              {NEW_CASE_STUDY_DATA.map((brand, index) => (
                <SwiperSlide key={index} className="min-w-300px">
                  <div className="p-4 overflow-hidden sm:p-8 w-full bg-white rounded-xl shadow-md flex flex-col items-start justify-between gap-8 h-full border-2 border-solid border-[#BDF522] group transition-all duration-300 ease-in-out">
                    <div className="flex justify-between items-center w-full ">
                      {brand.brandLogo}
                    </div>
                    <div className="flex justify-stretch items-stretch w-full gap-2">
                      <h3 className="bg-gray-500/10 rounded-xl p-3 overflow-hidden whitespace-nowrap grow">
                        {brand.roi}{" "}
                        <span className="text-black/80 text-12 sm:text-16 leading-tight font-normal text-left block">
                          ROI
                        </span>
                      </h3>
                      <h3 className="bg-gray-500/10 rounded-xl p-3 overflow-hidden whitespace-nowrap grow">
                        {brand.mindshare}
                        <span className="text-black/80 text-12 sm:text-16 leading-tight font-normal text-left block">
                          in Kaito Mindshare
                        </span>{" "}
                      </h3>
                      <h3 className="bg-gray-500/10 rounded-xl p-3 overflow-hidden whitespace-nowrap grow ">
                        {brand.engagements}
                        <span className="text-black/80 text-12 sm:text-16 leading-tight font-normal text-left block">
                          Engagements
                        </span>{" "}
                      </h3>
                      <button className="cursor-pointer w-0 h-0 group-hover:w-auto group-hover:h-auto group-hover:bg-dark-purple1-bg rounded-xl p-0  group-hover:p-3 sm:group-hover:p-6 transition-all duration-300 ease-in-out">
                        <GoArrowUpRight className="text-white text-xl sm:text-3xl hidden group-hover:block" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSlider;
