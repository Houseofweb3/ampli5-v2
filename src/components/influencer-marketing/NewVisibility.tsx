import Image from "next/image";
import React from "react";

export default function NewVisibility() {
  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0 py-8 sm:py-14 lg:py-16 min-h-[450px] flex items-center justify-center relative">
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
        <h3 className="!text-[#7B46F8] text-20 sm:text-24 lg:text-32  pb-6">
          Agency model for Influencer Marketing is broken.
        </h3>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-8 max-w-2xl mx-auto">
          BDs do not understand brief.
        </p>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-8 max-w-2xl mx-auto">
          You get a template list of influencers that do not work Current model
          is outdated: Send a brief. Wait for replies.
        </p>
        <p className="sm:!text-18 !text-16 !font-semibold !text-[#FE8616] ">
          Low volume. Low testing. Low performance.
        </p>
      </div>
    </div>
  );
}
