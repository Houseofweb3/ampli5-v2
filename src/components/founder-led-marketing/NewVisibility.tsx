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
          The Old Founder Playbook <br/> No Longer Works{" "}
        </h3>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-8 max-w-2xl mx-auto">
          Most founder marketing relies on outdated tactics. PR agencies push
          founders into a few podcasts, post a couple of generic articles and
          call it a strategy.
        </p>

        <p className=" text-2xl  !font-semibold !text-[#FE8616] ">
          The result?
        </p>
        <p className="sm:!text-18 !text-16 !font-normal !text-[#FE8616] ">
          The podcast gets less views Brand gets 0 ROI Waste of time.
        </p>
      </div>
    </div>
  );
}
