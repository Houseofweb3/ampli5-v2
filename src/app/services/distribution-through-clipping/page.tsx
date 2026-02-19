import Navbar from "@/src/components/Navbar";
import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import Clipping from "@/src/components/distribution-through-clipping";

export const metadata: Metadata = {
  title: "Distribution Through Clipping | Ampli5",
  description:
    "Ampli5's distribution through clipping service - coming soon. Transform your content distribution strategy with innovative clipping technology for web3 marketing.",
  keywords: [
    "distribution through clipping",
    "content distribution",
    "web3 content marketing",
    "Ampli5 clipping",
    "web3 distribution",
    "content amplification",
  ],
  openGraph: {
    title: "Distribution Through Clipping | Ampli5",
    description:
      "Transform your content distribution strategy with innovative clipping technology for web3 marketing.",
    url: `${process.env.NEXTAUTH_URL || "https://ampli5.ai"}/services/distribution-through-clipping`,
  },
  alternates: {
    canonical: "/services/distribution-through-clipping",
  },
};

interface LoaderProps {
  height?: string;
}
const SectionLoader: React.FC<LoaderProps> = ({ height = "h-screen" }) => (
  <div className={`w-full ${height} animate-pulse bg-gray-100`} />
);

export default function DistributionThroughClippingPage() {
  return (
    <div className="w-full h-full min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<SectionLoader />}>
        <Clipping />
      </Suspense>
    </div>
  );
}
