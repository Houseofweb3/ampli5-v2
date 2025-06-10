"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ALLROUTES } from "@/src/utils/constants";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push(ALLROUTES.HOME);
    }, 2000);
  }, [router]);

  return <div className="h-screen bg-white" />;
};

export default Page;
