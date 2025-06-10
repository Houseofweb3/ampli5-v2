"use client";
import React from "react";
import DesktopTable from "./history-table";
import MobileTable from "./mob-history-table";
import { useIsTablet } from "@/src/hooks/useIsResponsive";

const History: React.FC = () => {
  const isTablet = useIsTablet();
  return (
    <div className="bg-white rounded-lg p-4">
      <span className="font-Jakarta text-xl font-bold">History</span>
      {isTablet ? <MobileTable /> : <DesktopTable />}
    </div>
  );
};

export default History;
