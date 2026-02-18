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
        <h3 className="!text-[#7B46F8] text-3xl sm:text-4xl lg:text-5xl pb-6 flex  gap-3 items-center justify-center">
          What is{" "}
          <Image
            src="/logo/ampli5.png"
            alt="ampli5"
            width={200}
            height={200}
            className="h-[30px] sm:h-[40px] lg:h-[50px] w-auto"
          />
          ?
        </h3>
        <p className="sm:!text-18 !text-16 !font-semibold max-w-2xl mx-auto mb-4">
          Not an agency. | Not a marketplace. | Not a creator list.
        </p>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-8 max-w-2xl mx-auto">
          Ampli5 is a SaaS distribution aggregator. You give us your ICP. We map where they live
          online. You deploy across those surfaces at once using an integrated infrastructure layer.
        </p>
      </div>
    </div>
  );
}
