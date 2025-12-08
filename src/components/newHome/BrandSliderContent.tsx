import Image from "next/image";
import React from "react";

function BrandSliderContent() {
  return (
    <div className=" py-14 lg:py-16 relative">
      <div className="absolute sm:bottom-[-50px] bottom-[-25px] sm:left-[-45px] left-[-22px] z-10 ">
        <Image
          className="sm:w-100px sm:h-100px w-50px h-50px"
          src={"/pattern/Isolation_Mode_big.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="">
        <div className="flex justify-center items-start gap-4 w-full max-w-7xl mx-auto px-4 xl:px-0 relative">
          <h3 className="!text- text-center text-20 sm:text-24 lg:text-32 pb-8 ">
            Why Your Brand Deserves Competition Not Collabs?
          </h3>
        </div>
        <div className="max-w-7xl mx-auto px-4 xl:px-0 lg:py-12 md:py-8 sm:py-4 py-2 ">
          <div className="grid grid-cols-3 gap-2 sm:gap-12 md:gap-6">
            <div className="flex items-center justify-center flex-col sm:flex-row gap-4">
              <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center ">
                <h2 className="font-medium leading-tight ">124+</h2>
                <p className="!text-16 !font-light ">Brand Campaigns</p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col sm:flex-row gap-4">
              <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center">
                <h2 className="font-medium leading-tight ">1 MIL+</h2>
                <p className="!text-16 !font-light ">DAUs</p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col sm:flex-row gap-4">
              <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold  text-center">
                <h2 className="font-medium leading-tight ">25+</h2>
                <p className="!text-16 !font-light ">Token Pre Sales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSliderContent;
