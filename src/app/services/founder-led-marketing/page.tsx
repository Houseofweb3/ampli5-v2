import FounderLedMarketing from "@/src/components/founder-led-marketing";
import Navbar from "@/src/components/Navbar";

import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder-Led Marketing for Web3 | Ampli5",
  description:
    "Ampli5's founder-led marketing services help web3 founders build authority and narrative ownership. Extract your natural voice, amplify your message, and become the lens through which the market interprets your category. Build authority that compounds.",
  keywords: [
    "founder-led marketing",
    "web3 founder marketing",
    "crypto founder PR",
    "Ampli5 founder marketing",
    "Ampli5 founder",
    "narrative ownership",
    "web3 authority building",
  ],
  openGraph: {
    title: "Founder-Led Marketing for Web3 | Ampli5",
    description:
      "Help web3 founders build authority and narrative ownership. Extract your natural voice and amplify your message.",
    url: `${process.env.NEXTAUTH_URL || "https://ampli5.ai"}/services/founder-led-marketing`,
  },
  alternates: {
    canonical: "/services/founder-led-marketing",
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
        <FounderLedMarketing />
      </Suspense>
    </div>
  );
}
