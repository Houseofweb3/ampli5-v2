import React from "react";
import TableCell from "./TableCell";

const LoadingTable: React.FC = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex">
          <TableCell id="Number">
            <div className="flex gap-2 items-center justify-center w-full">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </TableCell>
          <TableCell id="Influencers">
            <div className="flex gap-2 items-center justify-center w-full">
              <div className="w-16 h-3 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </TableCell>
          <TableCell id="Platform">
            <div className="flex gap-2 items-center justify-center w-full">
              <div className="w-16 h-3 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </TableCell>
          <TableCell id="Followers">
            <div className="flex gap-2 items-center justify-center w-full">
              <div className="w-12 h-3 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </TableCell>
          <TableCell id="Niche">
            <div className="flex gap-2 items-center justify-center w-full">
              <div className="w-12 h-3 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </TableCell>
          <TableCell id="ER">
            <div className="flex gap-2 items-center justify-center w-full">
              <div className="w-10 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </TableCell>
          <TableCell id="Credibility Score">
            <div className="flex gap-2 items-center justify-center w-full">
              <div className="w-10 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </TableCell>
          <TableCell id="Price">
            <div className="flex gap-2 items-center justify-center w-full">
              <div className="w-12 h-3 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </TableCell>
        </div>
      ))}
    </>
  );
};

export default LoadingTable;
