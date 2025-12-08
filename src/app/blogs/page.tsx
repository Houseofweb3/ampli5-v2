"use client";

import React from "react";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import Link from "next/link";
import NavbarHome from "@/src/components/NavbarHome";

export default function BlogsPage(): JSX.Element {
  return (
    <div className="w-full h-full min-h-screen bg-white">
      <NavbarHome />
      <div
        className="bg_hero_pattern relative overflow-hidden"
        style={{ minHeight: "calc(100vh - 70px)" }}
      >
        {/* Floating decorative elements */}
        {/* <div className="absolute lg:left-[18%] left-[10%] lg:top-[8%] md:top-[10%] top-[5%] z-20">
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
        <div className="absolute z-20 md:top-[10rem] top-[4rem] right-6 md:right-[10rem]">
          <Image
            className="w-50px h-50px lg:w-100px lg:h-100px object-contain animate-float"
            src={"/pattern/hero-floating-3.png"}
            width={200}
            height={200}
            alt="icon"
            style={{ animationDelay: "0.5s" }}
          />
        </div> */}

        {/* Main content */}
        <div
          className="relative z-20 flex flex-col items-center justify-center max-w-7xl mx-auto px-4 w-full h-full"
          style={{ minHeight: "calc(100vh - 100px)" }}
        >
          <div className="text-center">
            {/* Coming Soon Badge */}
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-6 py-2 bg-primary-light text-primary rounded-full text-14 sm:text-16 font-semibold">
                Coming Soon
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-center mb-4 sm:mb-6">
              <span className="text-dark-purple1-bg">Blogs</span> Are On The Way!
            </h1>

            {/* Description */}
            <div className="hero_description pb-16px lg:pb-28px max-w-2xl mx-auto">
              <h2 className="!font-medium">
                We're crafting something amazing for you. Stay tuned for
                insightful content, industry updates, and expert insights.
              </h2>
            </div>

            {/* CTA Button */}
            <div className="pb-26px lg:pb-48px">
              <Link href="/">
                <PrimaryButton className="text-white mx-auto">
                  Back to Home
                </PrimaryButton>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="hero_description text-center">
              <p className="!text-black/60 !text-14 sm:!text-16">
                Follow us on social media to get notified when we launch
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
