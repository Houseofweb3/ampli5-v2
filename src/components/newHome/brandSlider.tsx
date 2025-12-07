"use client";
import { NEW_CASE_STUDY_DATA } from "../../data/data";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from "react-icons/go";
import type { Swiper as SwiperType } from "swiper";


import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

function BrandSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="bg-[#7B46F8] py-8 sm:py-14 lg:py-16 relative overflow-hidden">
      <div className="absolute md:right-[15%] -right-[25px] bottom-[25%]  z-10">
        <Image
          className="w-50px h-50px md:w-100px md:h-100px"
          src={"/pattern/Isolation_Mode_big.png"}
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
              <div className="absolute left-0 block md:hidden top-[20px]  -z-10">
                <Image
                  className="w-50px h-50px "
                  src={"/pattern/nested-star.png"}
                  width={200}
                  height={200}
                  alt="icon"
                  style={{ animationDelay: "0s" }}
                />
              </div>
              <h3 className="!text-white text-center text-20 sm:text-24 lg:text-32 pb-8">
                Presenting Ampli5 Creators Arena
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
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="absolute -left-[30px] md:block hidden -bottom-[50px]  -z-10">
            <Image
              className="w-50px h-50px md:w-100px md:h-100px"
              src={"/pattern/nested-star.png"}
              width={200}
              height={200}
              alt="icon"
              style={{ animationDelay: "0s" }}
            />
          </div>
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
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-12 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-6">
            <div className="flex items-center justify-center flex-col sm:flex-row gap-4">
              <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center ">
                <h2 className="font-medium leading-tight text-white">124+</h2>
                <p className="!text-16 !font-light !text-white">
                  Brand Campaigns
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col sm:flex-row gap-4">
              <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center">
                <h2 className="font-medium leading-tight text-white">1 MIL+</h2>
                <p className="!text-16 !font-light !text-white">DAUs</p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col sm:flex-row gap-4">
              <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center">
                <h2 className="font-medium leading-tight text-white">25+</h2>
                <p className="!text-16 !font-light !text-white">
                  Token Pre Sales
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 xl:px-0 text-center">
          <h3 className="!text-white text-20 sm:text-24 lg:text-32  pb-4 sm:pb-6">
            Influencer Marketing Is Broken.{" "}
          </h3>
          <p className="sm:!text-18 !text-16 !font-normal !text-white pb-4 sm:pb-8">
            You pay for one post &nbsp;
            <span className="text-white hidden sm:inline">|</span>&nbsp;{" "}
            <br className="sm:hidden" /> You depend on one creator’s mood &nbsp;
            <span className="text-white hidden sm:inline ">|</span>&nbsp;{" "}
            <br className="sm:hidden" /> You hope the content performs.&nbsp;
          </p>
          <h2 className="text-[#BDF522] text-20 sm:text-24 lg:text-32  pb-4 sm:pb-6">
            The results?
          </h2>
          <p className="sm:!text-18 !text-16 !font-normal !text-white pb-4 sm:pb-8">
            Low effort. Low accountability. Low ROI.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BrandSlider;
