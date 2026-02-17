"use client";

import React, { Suspense, lazy } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const Tabs = dynamic(() => import("@/src/components/ui/tabs"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />,
});

const HeroSection = lazy(() => import("./_components/influencers/HeroSection"));
const Packages = lazy(() => import("./_components/packages/package-section"));

const LoadingFallback = () => <div className="animate-pulse h-48 bg-gray-100 rounded-lg" />;

const Page = () => {
  const { data: session } = useSession();

  const TabItems = React.useMemo(
    () => [
      {
        title: "Influencers",
        content: <HeroSection />,
      },
      {
        title: "PR Packages",
        content: <Packages />,
      },
    ],
    []
  );

  return (
    <div className="py-8 px-4 md:px-12 w-full h-full flex flex-col">
      <div className="font-Jakarta w-full flex flex-col gap-6 justify-center md:items-center pb-8">
        <div className="flex w-full items-center justify-center relative 2md:flex-row flex-col gap-4">
          <p className="text-gray-600 uppercase tracking-widest">Welcome {session?.user?.name}</p>
        </div>

        <span className="font-semibold text-2xl md:text-5xl tracking-wider text-center">
          Find Web3 Influencers
        </span>
      </div>

      <Tabs items={TabItems} />

      <Suspense fallback={<LoadingFallback />}></Suspense>
    </div>
  );
};

export const runtime = "edge";
export const preferredRegion = "auto";

export default Page;
