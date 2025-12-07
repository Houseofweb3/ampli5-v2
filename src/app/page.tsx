import React from "react";
import Navbar from "../components/Navbar";
import { Suspense } from 'react';
import NewHome from "../components/newHome";

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
