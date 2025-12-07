import Navbar from "@/src/components/Navbar";
import UgcCreatorArena from "@/src/components/ugc-creator-arena";

import React from "react";
import { Suspense } from "react";

interface LoaderProps {
  height?: string;
}
const SectionLoader: React.FC<LoaderProps> = ({ height = "h-screen" }) => (
  <div className={`w-full ${height} animate-pulse bg-gray-100`} />
);
export default function page() {
  return (
    <div className="w-full h-full min-h-screen ">
      <Navbar />
      <Suspense fallback={<SectionLoader />}>
        <UgcCreatorArena />
      </Suspense>
    </div>
  );
}
