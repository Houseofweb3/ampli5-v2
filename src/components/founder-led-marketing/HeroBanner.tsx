import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <div
      className="bg_hero_pattern relative overflow-hidden "
      style={{ minHeight: "calc(100vh - 70px)" }}
    >
      <div className="absolute top-[5%] md:top-[10%] right-[35%] z-20">
        <Image
          className="w-8 h-8"
          src={"/pattern/Star-pink.png"}
          width={200}
          height={200}
          alt="icon2"
          style={{ animationDelay: "1s" }}
        />
      </div>
      <div className="absolute md:left-[18%] left-[-30px] top-[35%] z-20">
        <Image
          className="w-60px h-60px "
          src={"/pattern/Star-blue.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="absolute z-20 top-[55%] right-[-30px] md:right-[10rem]">
        <Image
          className="w-60px h-60px"
          src={"/pattern/Star-yellow.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
      <div
        className="relative z-20 flex flex-col items-center justify-center space-y-12 max-w-7xl mx-auto px-4 w-full h-full"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className="md:mt-24 sm:mt-12 mt-6">
          <h1 className="text-center mb-4 max-w-4xl mx-auto  uppercase">
            The fastest growth channel today is the founder.
            <br />
            <span className="text-[#7B46F8]">We help you turn it on.</span>
          </h1>
        </div>
        <div className="pb-26px lg:pb-48px">
          <PrimaryButton
            onClick={() =>
              window.open("https://calendly.com/partnerships-houseofweb3/30min", "_blank")
            }
            className="text-white mx-auto"
          >
            Power Your Founder Brand
          </PrimaryButton>
        </div>
        <div>
          <div className="hero_description text-center mt-4">
            <h3 className="!text-black !font-medium text-xl md:text-2xl max-w-3xl mx-auto">
              Founders move markets faster than brands.
              <br /> We help your voice do the heavy lifting.
            </h3>
          </div>
          <div className="hero_description pb-16px lg:pb-28px text-center max-w-4xl mx-auto">
            <h3 className="!text-dark-purple1-bg">5X ROI. 4X Brand Searches. 10X Recall.</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
