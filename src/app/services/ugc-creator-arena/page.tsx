import Navbar from "@/src/components/Navbar";
import UgcCreatorArena from "@/src/components/ugc-creator-arena";

import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UGC Creator Arena for Web3 | Ampli5",
  description:
    "Ampli5's UGC Creator Arena connects web3 projects with talented content creators. Launch user-generated content campaigns, reward creators, and build authentic community engagement. Custom podcast production and reward pool management included.",
  keywords: [
    "UGC creator platform",
    "user-generated content web3",
    "crypto UGC",
    "Ampli5 UGC",
    "Ampli5 creator",
    "web3 content creators",
    "blockchain UGC campaigns",
  ],
  openGraph: {
    title: "UGC Creator Arena for Web3 | Ampli5",
    description:
      "Connect web3 projects with talented content creators. Launch UGC campaigns and build authentic community engagement.",
    url: `${process.env.NEXTAUTH_URL || "https://ampli5.ai"}/services/ugc-creator-arena`,
  },
  alternates: {
    canonical: "/services/ugc-creator-arena",
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
        <UgcCreatorArena />
      </Suspense>
    </div>
  );
}
