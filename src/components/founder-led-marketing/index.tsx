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
      <HeroBanner />
      <BrandSlider />
      <NewVisibility />
      <AeoVsSeo />
      <HowWork />
      <Ecosystem />
      <EcosystemLoves/>
      <PricingPlans />
      <FAQ />
      <WaveContent />
    </main>
  );
}
