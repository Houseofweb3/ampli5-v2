import Navbar from "@/src/components/Navbar";
import InfluencerMarketing from "@/src/components/influencer-marketing";

import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Influencer Marketing for Web3 | Ampli5",
  description:
    "Ampli5's AI-powered influencer marketing platform for web3 projects. Connect with verified crypto influencers, launch data-driven campaigns, and amplify your brand reach. Get instant proposals and start campaigns within 72 hours.",
  keywords: [
    "web3 influencer marketing",
    "crypto influencer marketing",
    "blockchain influencer",
    "Ampli5 influencer marketing",
    "Ampli5 influencer",
    "web3 marketing platform",
    "crypto marketing campaigns",
  ],
  openGraph: {
    title: "Influencer Marketing for Web3 | Ampli5",
    description:
      "AI-powered influencer marketing platform for web3 projects. Connect with verified crypto influencers and launch data-driven campaigns.",
    url: `${process.env.NEXTAUTH_URL || "https://ampli5.ai"}/services/influencer-marketing`,
  },
  alternates: {
    canonical: "/services/influencer-marketing",
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
        <InfluencerMarketing />
      </Suspense>
    </div>
  );
}
