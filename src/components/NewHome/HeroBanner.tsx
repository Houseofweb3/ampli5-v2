import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroBanner() {
  const router = useRouter();
  return (
    <div
      className="bg_hero_pattern relative overflow-hidden "
      style={{ minHeight: "calc(100vh - 70px)" }}
    >
      <div className="absolute top-[5%] md:top-[10%] right-[35%]">
        <Image
          className="w-8 h-8"
          src={"/pattern/Star-pink.png"}
          width={200}
          height={200}
          alt="icon2"
          style={{ animationDelay: "1s" }}
        />
      </div>
      <div className="absolute  left-[-30px] top-[35%] ">
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
          <h1 className="text-center mb-4 max-w-2xl md:max-w-4xl mx-auto  uppercase !leading-tight sm:leading-normal">
            Your audience has a home on the internet. Ampli5{" "}
            <span className="text-[#7B46F8]">gives you the address.</span>{" "}
          </h1>
          <p className="text-center  text-lg md:text-xl max-w-3xl mx-auto">
            Deploy Influencers, Podcasts, Clippers, Traditional media articles & Newsletters,
            Subreddits, and AEO from one place.
          </p>
        </div>
        <div className="pb-26px lg:pb-48px">
          <PrimaryButton className="text-white mx-auto" onClick={() => router.push("/dashboard")}>
            Build my Audience Atlas
          </PrimaryButton>
        </div>
        <div>
          <div className="hero_description  text-center">
            <h3 className="!text-dark-purple1-bg"> 10M+ impressions · 1M+ views · 1% CTR</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
