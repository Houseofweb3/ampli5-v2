import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Suspense } from 'react';

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
        <Hero></Hero>
      </Suspense>
    </div>
  );
};

export default Page;
