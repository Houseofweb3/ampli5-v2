"use client";
import React from "react";
import HeroBanner from "./HeroBanner";
import BrandSlider from "./brandSlider";
import NewVisibility from "./NewVisibility";
import AeoVsSeo from "./AeoVsSeo";
import HowWork from "./HowWork";
import Ecosystem from "./Ecosystem";
import PricingPlans from "./PricingPlans";
import FAQ from "./FAQ";
import WaveContent from "./WaveContent";
import EcosystemLoves from "./EcosystemLoves";

export default function FounderLedMarketing() {
  return (
    <main className="bg-[#F8F8F8]">
      <div className="sticky top-0 z-0  w-full min-h-screen">
        <HeroBanner />
      </div>
      <div className="relative z-0">
        <BrandSlider />
      </div>
      <div className="sticky top-0 z-0  w-full bg-white py-8 md:py-16">
        <NewVisibility />
      </div>
      <div className="relative z-0">
        <AeoVsSeo />
      </div>
      <div className=" relative md:sticky top-0 z-0  w-full bg-white py-8 md:py-16">
        <HowWork />
      </div>
      <div className="md:relative  sticky top-0 z-0 ">
        <Ecosystem />
      </div>
      <div className=" relative md:sticky top-0 z-0  w-full bg-white py-8 md:py-16">
        <EcosystemLoves />
      </div>
      <div className="md:relative top-0  sticky z-0 bg-white py-16 md:py-0">
        <PricingPlans />
      </div>
      <div className="relative z-0 bg-white">
        <FAQ />
      </div>
      <div className="relative z-0 bg-white">
        <WaveContent />
      </div>
    </main>
  );
}
