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
        <h3 className="!text-[#7B46F8] text-20 sm:text-24 lg:text-32  pb-6">
          The New Connectivity Layer
        </h3>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-8 max-w-xl mx-auto">
          Users no longer join protocols based on marketing. They join ecosystems that already trust
          you. Every partner adds liquidity. Every chain adds distribution. Every integration
          increases survival.
        </p>

        <p className="sm:!text-18 !text-16 !font-semibold !text-[#FE8616] ">
          If your protocol lives alone?
        </p>
        <p className="sm:!text-18 !text-16 !font-semibold !text-[#FE8616] ">
          Low trust. Low mobility. Low TVL.
        </p>
      </div>
    </div>
  );
}
