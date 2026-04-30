"use client";

import { ReactNode } from "react";
import { FilterProvider } from "../../context/FilterContext";
import DashboardAuthGuard from "./_components/DashboardAuthGuard";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <FilterProvider>
      <DashboardAuthGuard>
        <div className="h-full w-full bg-white px-2 sm:px-4 ">{children}</div>
      </DashboardAuthGuard>
    </FilterProvider>
  );
};
export default layout;
