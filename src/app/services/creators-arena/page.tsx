import CreatorsArena from "@/src/components/creators-arena";
import Navbar from "@/src/components/Navbar";

import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creators Arena for Web3 | Ampli5",
  description:
    "Ampli5's Creators Arena connects web3 projects with talented content creators. Launch user-generated content campaigns, reward creators, and build authentic community engagement. Custom podcast production and reward pool management included.",
  keywords: [
    "Creators Arena",
    "web3 content creators",
    "crypto UGC",
    "Ampli5 Creators Arena",
    "Ampli5 creator",
    "blockchain UGC campaigns",
  ],
  openGraph: {
    title: "Creators Arena for Web3 | Ampli5",
    description:
      "Creators Arena connects web3 projects with talented content creators. Launch user-generated content campaigns, reward creators, and build authentic community engagement. Custom podcast production and reward pool management included.",
    url: `${
      process.env.NEXTAUTH_URL || "https://ampli5.ai"
    }/services/creators-arena`,
  },
  alternates: {
    canonical: "/services/creators-arena",
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
        <CreatorsArena />
      </Suspense>
    </div>
  );
}
