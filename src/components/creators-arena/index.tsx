"use client";
import React from "react";
import BrandSlider from "./brandSlider";
import IconText from "./Icontext";
import WaveContent from "./WaveContent";
import Why from "./Why";
import Outperforms from "./Outperforms";
import WhyCreatorsLove from "./WhyCreatorsLove";
import TopPerforming from "./TopPerforming";
import FAQ from "./FAQ";
import CampaignEnters from "./CampaignEnters";
import LatestPerforming from "./latestPerforming";
import HeroBanner from "./HeroBanner";
import NewVisibility from "./NewVisibility";
import BrandSliderContent from "./BrandSliderContent";

export default function CreatorsArena() {
  return (
    <main className="bg-[#F8F8F8]">
      <div className="sticky top-0 z-0  w-full min-h-screen">
        <HeroBanner></HeroBanner>
      </div>
      <div className="relative z-0">
        <BrandSlider></BrandSlider>
      </div>
      <div className="sticky top-0 z-0  w-full  bg-white py-14 lg:py-16">
        <BrandSliderContent></BrandSliderContent>
      </div>
      <div className="relative z-0">
        <NewVisibility></NewVisibility>
      </div>
      <div className="sticky top-0 z-0  w-full  bg-white py-14 lg:py-16">
        <Why></Why>
      </div>
      <div className="relative z-0 bg-white">
        <CampaignEnters></CampaignEnters>
      </div>
      <div className="sticky top-0 z-0  w-full  bg-[#F5F5F5] py-14 lg:py-16">
        <Outperforms></Outperforms>
      </div>
      <div className="relative z-0 bg-white">
        <WhyCreatorsLove></WhyCreatorsLove>
      </div>
      <div className="sticky top-0 z-0  w-full  bg-white py-14 lg:py-16">
        <IconText></IconText>
      </div>
      <div className="relative z-0 bg-white">
        <TopPerforming></TopPerforming>
      </div>
      <div className="sticky top-0 z-0  w-full  bg-white py-14 lg:py-16">
        <FAQ></FAQ>
      </div>
      <div className="relative z-0 bg-white">
        <LatestPerforming></LatestPerforming>
      </div>
      <div className="sticky top-0 z-0  w-full  bg-white py-14 lg:py-16">
        <WaveContent></WaveContent>
      </div>
    </main>
  );
}
