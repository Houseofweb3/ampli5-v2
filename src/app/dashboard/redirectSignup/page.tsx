"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    if (page) {
      setTimeout(() => {
        router.push(`/${page}`);
      }, 2000);
    }
  }, [page, router]);

  return <div className="h-screen bg-white" />;
};

export default Page;
