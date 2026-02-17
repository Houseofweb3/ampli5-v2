"use client";

import React from "react";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import DemoSection from "@/src/components/DemoSection";

const FilterSection = dynamic(() => import("./_components/FilterSection"));

const Page = () => {
  const { data: session } = useSession();
  return (
    <div className="py-8 w-full h-full flex flex-col">
      <div className="font-Jakarta px-4 md:px-12 w-full flex flex-col gap-6 justify-center md:items-center pb-8">
        <div className="flex w-full items-center justify-center relative 2md:flex-row flex-col gap-4">
          <p className="text-gray-600 uppercase tracking-widest">Welcome {session?.user?.name}</p>
        </div>
        <span className="font-semibold text-2xl md:text-5xl tracking-wider text-center">
          Discover Web3 Influencer
        </span>
      </div>

      <FilterSection />

      <DemoSection />
    </div>
  );
};

export default Page;
