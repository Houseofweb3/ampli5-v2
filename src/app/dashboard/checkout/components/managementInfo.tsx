import React from "react";

import { PiInfo } from "react-icons/pi";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { MANAGEMENT_FEE_TOOLTIP_CONTENT } from "@/src/utils/constants";

const managementInfo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-pointer text-secondary-text">
            <PiInfo />
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-4">
          <p className="flex flex-col gap-2">
            {MANAGEMENT_FEE_TOOLTIP_CONTENT.map((content, index) => (
              <span key={index}>{content}</span>
            ))}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default managementInfo;
