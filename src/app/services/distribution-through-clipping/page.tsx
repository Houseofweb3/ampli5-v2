import Navbar from "@/src/components/Navbar";
import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import Image from "next/image";

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
        <div
          className="bg_hero_pattern relative overflow-hidden"
          style={{ minHeight: "calc(100vh - 70px)" }}
        >
          <div className="absolute sm:bottom-[-50px] bottom-[-25px] sm:left-[-45px] left-[-22px] z-10">
            <Image
              className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]"
              src={"/pattern/Isolation_Mode_big.png"}
              width={200}
              height={200}
              alt="pattern"
              style={{ animationDelay: "0s" }}
            />
          </div>
          <div className="absolute sm:top-[-50px] top-[-25px] sm:right-[-45px] right-[-22px] z-10">
            <Image
              className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]"
              src={"/pattern/flower.png"}
              width={200}
              height={200}
              alt="pattern"
              style={{ animationDelay: "0s" }}
            />
          </div>

          <div
            className="relative z-20 flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full"
            style={{ minHeight: "calc(100vh - 100px)" }}
          >
            <div className="text-center">
              <div className="mb-6 sm:mb-8">
                <span className="inline-block px-6 py-2 bg-primary-light text-primary rounded-full text-14 sm:text-16 font-semibold">
                  Coming Soon
                </span>
              </div>

              <h1 className="text-center mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                <span className="text-dark-purple1-bg">Distribution Through Clipping</span>{" "}
                <span className="text-black">Is On The Way!</span>
              </h1>

              <div className="hero_description pb-16px lg:pb-28px max-w-2xl mx-auto">
                <h2 className="!font-medium text-lg sm:text-xl lg:text-2xl text-gray-700">
                  We're crafting something amazing for you. Stay tuned for innovative content
                  distribution solutions that will transform how you amplify your web3 brand.
                </h2>
              </div>

              {/* CTA Button */}
              <div className="pb-26px lg:pb-48px mb-6">
                <Link href="/">
                  <PrimaryButton className="text-white mx-auto">Back to Home</PrimaryButton>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="hero_description text-center">
                <p className="!text-black/60 !text-14 sm:!text-16">
                  Follow us on social media to get notified when we launch
                </p>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
