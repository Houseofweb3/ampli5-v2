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
import { StoopidCatsIcon } from "@/public/icons";
import Link from "next/link";

export const NEW_CASE_STUDY_DATA = [
  {
    brandLogo: null,
    img: "/images/brand/img4.png",
    roi: "200 M",
    rdata: "opening day volume",
    mindshare: "11%",
    mdata: "engagement",
    engagements: "10,000+",
    edata: "unique wallet participation",
    s3_url:
      "/case_studies/Ampli5+x+Sonic.pdf",
  },
  {
    brandLogo: <StoopidCatsIcon />,
    img: null,
    roi: "$6",
    rdata: "CAC",
    mindshare: "500,000",
    mdata: "impressions",
    engagements: "1,000+",
    edata: "SOL raised",
    s3_url:
      "/case_studies/Ampli5+x+Stoopid+Cats.pdf",
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
            Case Studies
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
            {NEW_CASE_STUDY_DATA.map((brand: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="relative z-10 mt-10">
                  {brand?.img ? (
                    <div className="flex justify-between items-center h-auto max-w-[320px] w-full mx-auto z-1 ">
                      <Image
                        src={brand?.img as string}
                        alt="brand"
                        width={300}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-between items-center  w-[200px] mx-auto z-1 ">
                      {brand?.brandLogo as React.ReactNode}
                    </div>
                  )}

                  <div className="max-w-7xl mx-auto px-4 xl:px-0 py-12 lg:py-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-y-6">
                      <div className="flex items-center justify-center flex-col sm:flex-row gap-4 border-r border-white px-2 sm:px-4 py-4">
                        <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center ">
                          <h2 className="font-medium leading-tight text-white">
                            {brand.roi}{" "}
                          </h2>
                          <p className="!text-16 !font-light !text-white">
                            {brand.rdata}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-col sm:flex-row  text-center gap-4 md:border-r border-white px-2 sm:px-4 py-4">
                        <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold ">
                          <h2 className="font-medium leading-tight text-white">
                            {brand.mindshare}
                          </h2>
                          <p className="!text-16 !font-light !text-white">
                            {brand.mdata}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-col sm:flex-row gap-4 text-center border-r border-white px-2 sm:px-4 py-4">
                        <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center">
                          <h2 className="font-medium leading-tight text-white">
                            {brand.engagements}
                          </h2>
                          <p className="!text-16 !font-light !text-white">
                            {brand.edata}
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
      </div>
    </div>
  );
}

export default BrandSlider;
