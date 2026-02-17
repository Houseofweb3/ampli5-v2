import AeoLlmMarketing from "@/src/components/aeo-llm-marketing";
import Navbar from "@/src/components/Navbar";

import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AEO & LLM Marketing for Web3 | Ampli5",
  description:
    "Ampli5's AEO (Answer Engine Optimization) and LLM Marketing services help your web3 brand appear in AI-generated responses. Increase answer share, brand mentions, and visibility across AI platforms like ChatGPT, Perplexity, and more.",
  keywords: [
    "AEO marketing",
    "LLM marketing",
    "Answer Engine Optimization",
    "AI marketing web3",
    "Ampli5 AEO",
    "Ampli5 LLM",
    "ChatGPT optimization",
    "AI answer share",
  ],
  openGraph: {
    title: "AEO & LLM Marketing for Web3 | Ampli5",
    description:
      "Help your web3 brand appear in AI-generated responses. Increase answer share and visibility across AI platforms.",
    url: `${process.env.NEXTAUTH_URL || "https://ampli5.ai"}/services/aeo-llm-marketing`,
  },
  alternates: {
    canonical: "/services/aeo-llm-marketing",
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
        <AeoLlmMarketing />
      </Suspense>
    </div>
  );
}
