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
import Link from "next/link";
import { CabbageCatsIcon, MultipliCatsIcon, RouterLogo, SonicIcon, StoopidCatsIcon } from "@/src/data/icon";

export const NEW_CASE_STUDY_DATA = [
  {
    brandLogo: <RouterLogo />,
    roi:'50x',
    mindshare:'Top 20',
    engagements:"13,000+",
    s3_url:
      "/case_studies/Ampli5+X+Router.pdf",
  },
  {
    brandLogo: <SonicIcon />,
    roi:'30x',
    mindshare:'Top 10',
    engagements:"10,000+",
    s3_url:
      "/case_studies/Ampli5+x+Sonic.pdf",
  },
  {
    brandLogo: <StoopidCatsIcon />,
    roi:'20x',
    mindshare:'Top 5',
    engagements:"8,000+",
    s3_url:
      "/case_studies/Ampli5+x+Stoopid+Cats.pdf",
  },
  {
    brandLogo: <MultipliCatsIcon />,
    roi:'15x',
    mindshare:'Top 3',
    engagements:"6,000+",
    s3_url:
      "/case_studies/Ampli5+x+Multipli+Case+study.pdf",
  },
  {
    brandLogo: <CabbageCatsIcon />,
    roi:'10x',
    mindshare:'Top 1',
    engagements:"4,000+",
    s3_url:
      "/case_studies/Ampli5+x+Cabbage.pdf",
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
      <div className="relative z-[11]">
        <div className="flex justify-center items-start gap-4 w-full max-w-7xl mx-auto px-4 xl:px-0 relative">
          <h3 className="!text-white text-center text-20 sm:text-24 lg:text-32 pb-8 text_pattern">
            Presenting Ampli5 Creators Arena
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
          </div> */}
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
                <div className="relative z-10 mt-10">
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
                        <Link
                          href={brand.s3_url}
                          target="_blank"
                          className="cursor-pointer text-white hover:text-black bg-transparent hover:bg-white transition-all duration-300 ease-in-out border border-white rounded-xl p-4 w-fit mx-auto h-fit "
                        >
                          <GoArrowUpRight className="text-xl sm:text-3xl" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div className="max-w-7xl mx-auto px-4 xl:px-0 text-center">
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
        </div> */}
      </div>
    </div>
  );
}

export default BrandSlider;
