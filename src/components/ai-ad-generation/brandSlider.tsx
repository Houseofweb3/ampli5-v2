"use client";
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
import { cn } from "@/src/lib/utils";

export const NEW_CASE_STUDY_DATA = [
  {
    brandLogo: null,
    img: "/images/brand/img6.png",
    roi: "₹17 vs avg ₹680+",
    rdata: "CAC",
    mindshare: "₹110 vs avg ₹4,000+",
    mdata: "CPM ",
    s3_url:
      "https://www.figma.com/slides/KuJ4bC2ThJttp8Puu18b4u/Untitled?node-id=1-42&t=C6BmFjJoc9HJwRfn-0",
  },
  {
    brandLogo: null,
    img: "/images/brand/img8.png",
    roi: "20%",
    rdata: "more inbound leads",
    mindshare: null,
    mdata: null,
    s3_url:
      "#",
  },
  {
    brandLogo: null,
    img: "/images/brand/img7.png",
    roi: "5%",
    rdata: "ER",
    mindshare: null,
    mdata: null,
    s3_url:
      "https://www.figma.com/slides/8Off2hngI8mPdOW6jq1fBY/Ampli5-x-Cabbage?node-id=1-42&t=iJlCDp4jTQlI9h8p-1",
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
            Case Studies
          </h3>
          <div className=" justify-center items-center gap-4 w-fit hidden md:flex absolute right-0 top-0">
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
                  {brand.img ? (
                    <div
                      className={cn(
                        "flex justify-between items-center h-auto max-w-[320px] w-full mx-auto z-1 ",
                        index !== 2 ? "bg-white rounded-xl p-2" : ""
                      )}
                    >
                      <Image
                        src={brand.img}
                        alt="brand"
                        width={320}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-between items-center  w-[200px] mx-auto z-1 ">
                      {brand.brandLogo}
                    </div>
                  )}

                  <div className="max-w-7xl mx-auto px-4 xl:px-0 py-12 lg:py-24">
                    <div
                      className={cn(
                        "grid  items-center gap-y-6",
                        brand.mindshare
                          ? "grid-cols-2 md:grid-cols-3"
                          : "grid-cols-2"
                      )}
                    >
                      {brand.roi ? (
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
                      ) : null}
                      {brand.mindshare ? (
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
                      ) : null}

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
      </div>
    </div>
  );
}

export default BrandSlider;
