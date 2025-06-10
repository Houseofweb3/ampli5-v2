/* eslint-disable indent */
import { HighArrow, HighArrowMobile, LowArrow, LowArrowMobile } from "@/public/icons";
import React from "react";

interface BadgeProps {
  rate: string;
}

const Badge: React.FC<BadgeProps> = ({ rate }) => {
  const { textColor } = getBadgeColors(rate);

  return (
    <div className={`w-fit flex sm:flex-col flex-row gap-1  ${textColor}`}>
      <span className=" sm:block hidden">{getBadgeIcon(rate)}</span>
      <span className=" sm:hidden block">{getBadgeIconMobile(rate)}</span>
      <span className=" sm:mt-1 sm:text-sm text-xs font-semibold uppercase">{rate}</span>
    </div>
  );
};

const getBadgeColors = (rate: string) => {
  switch (rate) {
    case "Low":
      return {
        textColor: "text-error-red",
      };
    case "High":
      return {
        textColor: "text-success-green",
      };
    default:
      return {
        textColor: "text-success-green",
      };
  }
};
const getBadgeIcon = (rate: string) => {
  switch (rate) {
    case "Low":
      return <LowArrow />;
    case "High":
      return <HighArrow />;

    default:
      return <LowArrow />;
  }
};
const getBadgeIconMobile = (rate: string) => {
  switch (rate) {
    case "Low":
      return <LowArrowMobile />;
    case "High":
      return <HighArrowMobile/>;

    default:
      return <LowArrowMobile />;
  }
};

export default React.memo(Badge);
