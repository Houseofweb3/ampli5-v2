import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <div
      className="bg_hero_pattern relative overflow-hidden "
      style={{ minHeight: "calc(100vh - 70px)" }}
    >
      <div className="absolute lg:left-[18%] left-[10%] lg:top-[8%] md:top-[10%] top-[5%] z-20">
        <Image
          className="w-50px h-50px lg:w-100px lg:h-100px animate-float"
          src={"/pattern/hero-floating-1.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="absolute top-[50%] left-[5%] sm:left-[15%] z-20">
        <Image
          className="w-50px h-50px lg:w-100px lg:h-100px animate-float"
          src={"/pattern/hero-floating-2.png"}
          width={200}
          height={200}
          alt="icon2"
          style={{ animationDelay: "1s" }}
        />
      </div>
      <div className="absolute z-20 md:top-[10rem] top-[4rem]  right-6 md:right-[10rem]">
        <Image
          className="w-50px h-50px lg:w-100px lg:h-100px object-contain animate-float"
          src={"/pattern/hero-floating-3.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
      <div
        className="relative z-20 flex flex-col items-center justify-around max-w-7xl mx-auto px-4 w-full h-full"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className="md:mt-24 sm:mt-12 mt-6">
          <h1 className="text-center mb-4">
            Don’t Hire Influencers. <br />
            <span className="text-dark-purple1-bg">Activate Creators.</span>
          </h1>
          <div className="hero_description pb-16px lg:pb-28px">
            <h2 className="!font-medium">
              Stop buying posts. Start buying performance.
            </h2>
          </div>
          <div className="pb-26px lg:pb-48px">
            <PrimaryButton
              onClick={() =>
                window.open(
                  "https://calendly.com/partnerships-houseofweb3/30min",
                  "_blank"
                )
              }
              className="text-white mx-auto"
            >
              Launch Bounty
            </PrimaryButton>
          </div>
        </div>
        <div>
          <div className="hero_description  text-center">
            <h3 className="!text-black !font-medium text-xl md:text-2xl  max-w-3xl mx-auto">
              Why hire 10 influencers when 100 creators will compete for you?
            </h3>
          </div>
          <div className="hero_description pb-16px lg:pb-28px text-center ">
            <p className="!text-dark-purple1-bg">5× Output · 7× ROI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
