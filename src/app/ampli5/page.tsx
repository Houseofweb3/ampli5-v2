import Ampli5 from "@/src/components/ampli5";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ampli5 - AI-Powered Web3 Marketing Platform",
  description:
    "Discover Ampli5 (Ampli5) - the comprehensive AI-powered platform for web3 influencer marketing, PR solutions, founder-led marketing, AEO/LLM optimization, AI ad generation, and UGC creator campaigns. Transform your web3 brand with cutting-edge marketing technology.",
  keywords: [
    "Ampli5",
    "Ampli5",
    "web3 marketing platform",
    "crypto marketing solutions",
    "AI-powered web3 marketing",
    "blockchain PR platform",
    "web3 influencer platform",
  ],
  openGraph: {
    title: "Ampli5 - AI-Powered Web3 Marketing Platform",
    description:
      "The comprehensive AI-powered platform for web3 influencer marketing, PR solutions, and brand amplification.",
    url: `${process.env.NEXTAUTH_URL || "https://ampli5.ai"}/ampli5`,
  },
  alternates: {
    canonical: "/ampli5",
  },
};

export default function Ampli5Page() {
  return <Ampli5 />;
}
