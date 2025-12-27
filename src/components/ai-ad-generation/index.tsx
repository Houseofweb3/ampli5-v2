"use client";
import React from "react";
import HeroBanner from "./HeroBanner";
import BrandSlider from "./brandSlider";
import NewVisibility from "./NewVisibility";
import BrandDeserves from "./BrandDeserves";
import AeoVsSeo from "./AeoVsSeo";
import HowWork from "./HowWork";
import Ecosystem from "./Ecosystem";
import PricingPlans from "./PricingPlans";
import FAQ from "./FAQ";
import WaveContent from "./WaveContent";
import EcosystemLoves from "../aeo-llm-marketing/EcosystemLoves";

export default function AiAdGeneration() {
  return (
    <main className="bg-[#F8F8F8]">
      <div className="sticky top-0 z-0  w-full min-h-screen">
        <HeroBanner />
      </div>
      <div className="relative z-0">
        <BrandSlider />
      </div>
      <div className="sticky top-0 z-0  w-full bg-white py-14 lg:py-16">
        <NewVisibility />
      </div>
      <div className="relative z-0">
        <BrandDeserves />
      </div>
      <div className="sticky top-0 z-0  w-full bg-white pt-8 lg:pt-12">
        <HowWork />
      </div>
      <div className="relative z-0">
        <AeoVsSeo />
      </div>
      <div className="sticky top-0 z-0  w-full bg-white pt-8 lg:pt-12">
        <EcosystemLoves />
      </div>
      <div className="relative z-0">
        <Ecosystem />
      </div>
      <div className="relative z-0 bg-white">
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
