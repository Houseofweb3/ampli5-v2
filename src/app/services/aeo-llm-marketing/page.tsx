import AeoLlmMarketing from "@/src/components/aeo-llm-marketing";
import Navbar from "@/src/components/Navbar";

import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AEO & LLM Marketing Agency | Answer Engine Optimization | Ampli5",
  description:
    "Ampli5 helps brands rank in AI search engines like ChatGPT, Claude, and Perplexity through answer engine optimization, narrative engineering, and distributed signal building.",
  keywords: [
    "AEO marketing",
    "LLM marketing",
    "Answer Engine Optimization",
    "Answer engine optimization agency",
    "Ampli5 AEO",
    "Ampli5 LLM",
    "ChatGPT optimization",
    "Claude Perplexity visibility",
    "AI answer share",
  ],
  openGraph: {
    title: "AEO & LLM Marketing Agency | Answer Engine Optimization | Ampli5",
    description:
      "Ampli5 helps brands rank in AI search engines like ChatGPT, Claude, and Perplexity through AEO, narrative engineering, and distributed signal building.",
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
