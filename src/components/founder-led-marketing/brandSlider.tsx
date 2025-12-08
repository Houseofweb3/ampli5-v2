import React from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

function BrandSlider() {
  return (
    <div>
      <div className="bg-[#7B46F8] py-8 sm:py-14 lg:py-16 relative">
        <div className="absolute right-1/2 translate-x-1/2  -top-[60px] z-1">
          <Image
            className="w-120px h-120px"
            src={"/pattern/group-star.png"}
            width={200}
            height={200}
            alt="icon"
            style={{ animationDelay: "0s" }}
          />
        </div>

        <div className="relative z-10 mt-10">
          <Image
            className="h-auto w-[300px] md:w-[400px] lg:w-[500px] mx-auto z-1"
            src={"/images/flm.png"}
            width={1000}
            height={1000}
            alt="icon"
            style={{ animationDelay: "0s" }}
          />

          <div className="max-w-7xl mx-auto px-4 xl:px-0 py-12 lg:py-24">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-y-6">
              <div className="flex items-center justify-center flex-col sm:flex-row gap-4 border-r border-white px-2 sm:px-4 py-4">
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center ">
                  <h2 className="font-medium leading-tight text-white">84K+</h2>
                  <p className="!text-16 !font-light !text-white">
                    organic YouTube views
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col sm:flex-row  text-center gap-4 md:border-r border-white px-2 sm:px-4 py-4">
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold ">
                  <h2 className="font-medium leading-tight text-white">05</h2>
                  <p className="!text-16 !font-light !text-white">
                    independent creators amplifying the same founder story
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col sm:flex-row gap-4 text-center border-r border-white px-2 sm:px-4 py-4">
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center">
                  <h2 className="font-medium leading-tight text-white">
                    700K+
                  </h2>
                  <p className="!text-16 !font-light !text-white">
                    cross ecosystem audience exposure
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
        <p className=" text-xl sm:text-2xl text-center font-semibold text-[#BDF522]">
          When founders speak with clarity, markets respond with conviction.
        </p>
      </div>
    </div>
  );
}

export default BrandSlider;
