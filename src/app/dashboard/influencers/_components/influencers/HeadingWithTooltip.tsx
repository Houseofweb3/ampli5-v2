"use client";

/* eslint-disable indent */
import React from "react";
import { PiInfo, } from "react-icons/pi";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
interface HeadingWithTooltipProps {
  heading: string;
  setOrder: React.Dispatch<React.SetStateAction<"" | "ASC" | "DESC">>;
  order: string;
}

const HeadingWithTooltip: React.FC<HeadingWithTooltipProps> = ({ heading }) => {
  const tooltipContent = getTooltipContent(heading);

  return (
    <div className="flex gap-2 items-center justify-start ">
      {tooltipContent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <PiInfo />
              </span>
            </TooltipTrigger>
            <TooltipContent className="p-4">{tooltipContent}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {heading}
    </div>
  );
};

const getTooltipContent = (heading: string) => {
  switch (heading) {
    case "ER":
      return (
        <p>
          An approximation of how many followers <br /> engage on the KOL's posts.
        </p>
      );
    default:
      return null;
  }
};

export default React.memo(HeadingWithTooltip);
