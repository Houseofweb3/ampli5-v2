"use client";
import React from "react";
import HeroBanner from "./HeroBanner";
import BrandSlider from "./brandSlider";
import NewVisibility from "./NewVisibility";
import BrandDeserves from "./BrandDeserves";
import HowWork from "./HowWork";
import FAQ from "./FAQ";
import WaveContent from "./WaveContent";
import EcosystemLoves from "./EcosystemLoves";
import AeoVsSeo from "./AeoVsSeo";
import Details from "./Details";

export default function Clipping() {
  return (
    <main className="bg-[#F8F8F8]">
      <div className="sticky top-0 z-0  w-full min-h-[110vh]">
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
      <div className="sticky top-0 z-0  w-full bg-white py-14 lg:py-16">
        <HowWork />
      </div>
      <div className="relative top-0 z-0  w-full ">
        <EcosystemLoves />
      </div>
      <div className="relative top-0 z-0  w-full bg-white">
        <Details />
      </div>
      <div className="sticky top-0 z-0  w-full ">
        <AeoVsSeo />
      </div>
      <div className="relative z-0  w-full bg-white">
        <FAQ />
      </div>
      <div className="relative z-0">
        <WaveContent />
      </div>
    </main>
  );
}
