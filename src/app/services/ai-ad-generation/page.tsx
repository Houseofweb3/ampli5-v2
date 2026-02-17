import AiAdGeneration from "@/src/components/ai-ad-generation";
import Navbar from "@/src/components/Navbar";

import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Ad Generation for Web3 | Ampli5",
  description:
    "Ampli5's AI-powered ad generation platform creates high-converting advertisements for web3 projects. Leverage cutting-edge AI technology to generate compelling ad creatives, optimize campaigns, and maximize ROI for your crypto and blockchain marketing.",
  keywords: [
    "AI ad generation",
    "web3 advertising",
    "crypto ad creation",
    "Ampli5 AI ads",
    "Ampli5 advertising",
    "blockchain marketing ads",
    "AI-powered ad platform",
  ],
  openGraph: {
    title: "AI Ad Generation for Web3 | Ampli5",
    description:
      "AI-powered ad generation platform creates high-converting advertisements for web3 projects.",
    url: `${process.env.NEXTAUTH_URL || "https://ampli5.ai"}/services/ai-ad-generation`,
  },
  alternates: {
    canonical: "/services/ai-ad-generation",
  },
};

interface LoaderProps {
  height?: string;
}
const SectionLoader: React.FC<LoaderProps> = ({ height = "h-screen" }) => (
  <div className={`w-full ${height} animate-pulse bg-gray-100`} />
);
export default function page() {
  return (
    <div className="w-full h-full min-h-screen ">
      <Navbar />
      <Suspense fallback={<SectionLoader />}>
        <AiAdGeneration />
      </Suspense>
    </div>
  );
}
