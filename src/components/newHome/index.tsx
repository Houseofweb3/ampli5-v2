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

export default function NewHome() {

  return (
    <main className="bg-[#F8F8F8]">
      <HeroBanner></HeroBanner>
      <BrandSlider></BrandSlider>
      <Why></Why>
      <CampaignEnters></CampaignEnters>
      <Outperforms></Outperforms>
      <WhyCreatorsLove></WhyCreatorsLove>
      <IconText></IconText>
      <TopPerforming></TopPerforming>
      <FAQ></FAQ>
      <LatestPerforming></LatestPerforming>
      <WaveContent></WaveContent>
    </main>
  );
}
