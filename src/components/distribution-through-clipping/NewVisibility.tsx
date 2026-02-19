import Image from "next/image";
import React from "react";

export default function NewVisibility() {
  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0 py-8 sm:py-14 lg:py-16 min-h-[350px] flex items-center justify-center relative">
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
      <div className="text-center">
        <h3 className="!text-[#7B46F8] text-3xl sm:text-4xl lg:text-5xl pb-6">What is ampli5?</h3>
        <p className="sm:!text-18 !text-16 !font-semibold max-w-2xl mx-auto">
          Ampli5 is not an agency.
        </p>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-8 max-w-2xl mx-auto">
          Agencies focus on creation. Ampli5 focuses on <b>distribution.</b> We use clipping to
          create repeat exposure. Brand recall becomes brand mindshare across social, search, and
          AI.
        </p>
      </div>
    </div>
  );
}
