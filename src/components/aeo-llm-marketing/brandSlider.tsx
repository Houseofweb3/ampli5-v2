import React from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

function BrandSlider() {
  return (
    <div className="relative">
      <div className="bg-[#7B46F8] py-14 lg:py-16 relative">
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
        <div>
          <div className="flex justify-center items-start gap-4 w-full max-w-7xl mx-auto px-4 xl:px-0 relative">
            <div className="w-full relative">
              <h3 className="!text-white text- text-center text-24 lg:text-32 pb-8 text_pattern">
                Case Studies
              </h3>
            </div>
            <div className=" justify-center items-center gap-4 w-fit hidden md:flex absolute right-0 top-0">
              {/* <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="bg-[#A762FE] rounded-xl p-1 px-3"
              aria-label="Previous slide"
            >
              <GoArrowLeft className="w-6 h-6 text-white" />
            </button> */}
              {/* <button
              onClick={() => swiperRef.current?.slideNext()}
              className=" bg-[#A762FE] rounded-xl p-1 px-3"
              aria-label="Next slide"
            >
              <GoArrowRight className="w-6 h-6 text-white" />
            </button> */}
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-10">
          <Image
            className="h-[80px] w-auto mx-auto z-1"
            src={"/images/ai-logo.png"}
            width={1000}
            height={1000}
            alt="icon"
            style={{ animationDelay: "0s" }}
          />

          <div className="max-w-7xl mx-auto px-4 xl:px-0 py-12 lg:py-24">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-y-6">
              <div className="flex items-center justify-center flex-col sm:flex-row gap-4 border-r border-white px-2 sm:px-4 py-4">
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center ">
                  <h2 className="font-medium leading-tight text-white">
                    0 - 29
                  </h2>
                  <p className="!text-16 !font-light !text-white">DA </p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col sm:flex-row  text-center gap-4 md:border-r border-white px-2 sm:px-4 py-4">
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold ">
                  <h2 className="font-medium leading-tight text-white">
                    0 - 5,148
                  </h2>
                  <p className="!text-16 !font-light !text-white">Backlinks</p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col sm:flex-row gap-4 text-center border-r border-white px-2 sm:px-4 py-4">
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center">
                  <h2 className="font-medium leading-tight text-white">
                    15,000+
                  </h2>
                  <p className="!text-16 !font-light !text-white">
                    Brand keyword search
                  </p>
                </div>
              </div>
              <div className="px-2 sm:px-4 py-4 w-full flex justify-center items-center">
                <Link href={`/case_studies/AISEO+PRCaseStudy-yMedia2025.pdf`} target="_blank" className="cursor-pointer text-white hover:text-black bg-transparent hover:bg-white transition-all duration-300 ease-in-out border border-white rounded-xl p-4 w-fit mx-auto h-fit ">
                  <GoArrowUpRight className="text-xl sm:text-3xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSlider;
