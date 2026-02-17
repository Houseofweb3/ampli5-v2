import React from "react";
import Navbar from "../components/Navbar";
import { Suspense } from "react";
import type { Metadata } from "next";
import NewHome from "../components/NewHome";

export const metadata: Metadata = {
  title: "Ampli5 | AI-Powered Influencer & PR Solutions for Web3",
  description:
    "Ampli5 (Ampli5) - The leading AI-powered influencer marketing and PR platform for web3 projects. Connect with top crypto influencers, launch founder-led marketing campaigns, and amplify your brand with cutting-edge AI technology. Trusted by leading blockchain projects worldwide.",
  keywords: [
    "Ampli5",
    "Ampli5",
    "web3 influencer marketing",
    "crypto influencer marketing",
    "AI-powered PR",
    "web3 PR solutions",
    "founder-led marketing",
    "crypto marketing",
    "blockchain influencer",
    "web3 brand amplification",
  ],
  openGraph: {
    title: "Ampli5 | AI-Powered Influencer & PR Solutions for Web3",
    description:
      "Ampli5 (Ampli5) - The leading AI-powered influencer marketing and PR platform for web3 projects.",
    url: process.env.NEXTAUTH_URL || "https://ampli5.ai",
    siteName: "Ampli5",
    images: [
      {
        url: "/logo/ampli5.png",
        width: 1200,
        height: 630,
        alt: "Ampli5 - AI-Powered Influencer & PR Solutions for Web3",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ampli5 | AI-Powered Influencer & PR Solutions for Web3",
    description:
      "Ampli5 (Ampli5) - The leading AI-powered influencer marketing and PR platform for web3 projects.",
    images: ["/logo/ampli5.png"],
  },
  alternates: {
    canonical: "/",
  },
};

interface LoaderProps {
  height?: string;
}

const SectionLoader: React.FC<LoaderProps> = ({ height = "h-screen" }) => (
  <div className={`w-full ${height} animate-pulse bg-gray-100`} />
);

const Page: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Navbar />
      <Suspense fallback={<SectionLoader />}>
        <NewHome></NewHome>
      </Suspense>
    </div>
  );
};

export default Page;
