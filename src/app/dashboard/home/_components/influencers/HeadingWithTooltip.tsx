/* eslint-disable indent */
import React from "react";
import {
  PiInfo,
  PiSortAscendingBold,
  PiSortDescendingBold,
} from "react-icons/pi";
import { MdFormatLineSpacing } from "react-icons/md";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { PRICE_TOOLTIP_CONTENT } from "@/src/utils/constants";

interface HeadingWithTooltipProps {
  heading: string;
  setOrder: React.Dispatch<React.SetStateAction<"" | "ASC" | "DESC">>;
  order: string;
}

const HeadingWithTooltip: React.FC<HeadingWithTooltipProps> = ({
  heading,
  order,
  setOrder,
}) => {
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
      {heading === "Price" && (
        <span
          className="font-lg cursor-pointer"
          onClick={() =>
            setOrder(order === "" ? "DESC" : order === "DESC" ? "ASC" : "")
          }
        >
          {order === "ASC" ? (
            <PiSortAscendingBold />
          ) : order === "DESC" ? (
            <PiSortDescendingBold />
          ) : (
            <MdFormatLineSpacing />
          )}
        </span>
      )}
    </div>
  );
};

const getTooltipContent = (heading: string) => {
  switch (heading) {
    case "ER":
      return (
        <p>
          An approximation of how many followers <br /> engage on the KOL's
          posts.
        </p>
      );
    case "Price":
      return (
        <p className="flex flex-col gap-2">
          {PRICE_TOOLTIP_CONTENT.map((content, index) => (
            <span key={index}>{content}</span>
          ))}
        </p>
      );
    default:
      return null;
  }
};

export default React.memo(HeadingWithTooltip);
