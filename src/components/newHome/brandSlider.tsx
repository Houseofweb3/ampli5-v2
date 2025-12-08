"use client";
import { NEW_CASE_STUDY_DATA } from "../../data/data";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from "react-icons/go";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
            pagination={{
              clickable: true,
            }}
            modules={[Navigation,Pagination]}
            // slidesPerView="auto"
            // breakpoints={{
            //   320: {
            //     slidesPerView: 1,
            //     spaceBetween: 16,
            //   },
            //   640: {
            //     slidesPerView: 1.5,
            //     spaceBetween: 24,
            //   },
            //   768: {
            //     slidesPerView: 2,
            //     spaceBetween: 24,
            //   },
            //   1024: {
            //     slidesPerView: 2.5,
            //     spaceBetween: 32,
            //   },
            // }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="case-study-slider"
          >
            {NEW_CASE_STUDY_DATA.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="relative z-10 mt-10">
                  {/* <Image
                    className="h-[80px] w-auto mx-auto z-1"
                    src={"/images/flm.png"}
                    width={1000}
                    height={1000}
                    alt="icon"
                    style={{ animationDelay: "0s" }}
                  /> */}
                  <div className="flex justify-between items-center max-h-[150px] min-h-[100px] w-fit mx-auto z-1 ">
                    {brand.brandLogo}
                  </div>

                  <div className="max-w-7xl mx-auto px-4 xl:px-0 py-12 lg:py-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-y-6">
                      <div className="flex items-center justify-center flex-col sm:flex-row gap-4 border-r border-white px-2 sm:px-4 py-4">
                        <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center ">
                          <h2 className="font-medium leading-tight text-white">
                            {brand.roi}{" "}
                          </h2>
                          <p className="!text-16 !font-light !text-white">
                            ROI
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-col sm:flex-row  text-center gap-4 md:border-r border-white px-2 sm:px-4 py-4">
                        <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold ">
                          <h2 className="font-medium leading-tight text-white">
                            {brand.mindshare}
                          </h2>
                          <p className="!text-16 !font-light !text-white">
                            in Kaito Mindshare
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-col sm:flex-row gap-4 text-center border-r border-white px-2 sm:px-4 py-4">
                        <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center">
                          <h2 className="font-medium leading-tight text-white">
                            {brand.engagements}
                          </h2>
                          <p className="!text-16 !font-light !text-white">
                            Engagements{" "}
                          </p>
                        </div>
                      </div>
                      <div className="px-2 sm:px-4 py-4 w-full flex justify-center items-center">
                        <button className="cursor-pointer text-white hover:text-black bg-transparent hover:bg-white transition-all duration-300 ease-in-out border border-white rounded-xl p-4 w-fit mx-auto h-fit ">
                          <GoArrowUpRight className="text-xl sm:text-3xl" />
                        </button>
                      </div>
                    </div>
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
