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
        className="relative z-20 flex flex-col items-center justify-around max-w-7xl mx-auto px-4 w-full h-full"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <div className="md:mt-24 sm:mt-12 mt-6">
          <h1 className=" text-center mb-4 max-w-6xl mx-auto  uppercase">
            If your protocol does not live inside the right ecosystems, your
            growth has already plateaued.
            <br />
          </h1>
          <p className="mb-6 sm:mb-10 text-center text-xl font-semibold max-w-5xl mx-auto">
            TVL grows when ecosystems collaborate, not when campaigns run.
            Liquidity, users and credibility flow where partnerships exist.
          </p>

          <div className="pb-26px lg:pb-48px">
            <PrimaryButton
              onClick={() => router.push("/bounty-hunt")}
              className="text-white mx-auto"
            >
              Build Your Ecosystem Strategy
            </PrimaryButton>
          </div>
        </div>
        <div>
          <div className="hero_description  text-center">
            <h3 className="!text-black !font-medium">
              Cross chain presence. Real integrations.<br/> Compounding network
              effects.
            </h3>
          </div>
          <div className="hero_description pb-16px lg:pb-28px text-center max-w-4xl mx-auto">
            <p className="!text-dark-purple1-bg">
              5 Partnerships. 10 M TVL. 45 Days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
