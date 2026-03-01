"use client";

import React, { Suspense, lazy } from "react";
import { getClient } from "@/src/store/dashboardAuthStore";

const HeroSection = lazy(() => import("./_components/influencers/HeroSection"));

const LoadingFallback = () => <div className="animate-pulse h-48 bg-gray-100 rounded-lg" />;

const Page = () => {
  const client = getClient();

  return (
    <div className="py-8 px-4 md:px-12 w-full h-full flex flex-col">
      <div className="font-Jakarta w-full flex flex-col gap-2 md:gap-4  justify-center md:items-center md:pb-8 pb-4">
        <div className="flex w-full items-center justify-center relative 2md:flex-row flex-col gap-4">
          <p className="text-gray-600 uppercase tracking-widest text-sm md:text-base">Welcome {client?.name ?? ""}</p>
        </div>
        <span className="font-semibold text-2xl md:text-5xl tracking-wider text-center">
          Ampli5 your distribution</span>
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <HeroSection />
      </Suspense>
    </div>
  );
};

export const runtime = "edge";
export const preferredRegion = "auto";

export default Page;

