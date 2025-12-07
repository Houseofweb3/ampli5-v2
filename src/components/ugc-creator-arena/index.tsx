"use client";
import React from "react";
import HeroBanner from "./HeroBanner";
import BrandSlider from "./brandSlider";
import NewVisibility from "./NewVisibility";
import BrandDeserves from "./BrandDeserves";
import AeoVsSeo from "./AeoVsSeo";
import HowWork from "./HowWork";
import FAQ from "./FAQ";
import WaveContent from "./WaveContent";
import EcosystemLoves from "./EcosystemLoves";

export default function UgcCreatorArena() {
  return (
    <main className="bg-[#F8F8F8]">
      <HeroBanner />
      <BrandSlider />
      <NewVisibility />
      <BrandDeserves />
      <HowWork />
      <AeoVsSeo />
      <EcosystemLoves />
      <FAQ />
      <WaveContent />
    </main>
  );
}
