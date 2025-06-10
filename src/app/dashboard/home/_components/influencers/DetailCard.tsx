import React from "react";

interface DetailCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, value, icon }) => {
  return (
    <div className="w-full border border-[#E0E0E0] rounded-lg p-3 h-fit">
      <h3 className="text-xs text-black/45 mb-1">{title}</h3>
      <div className="flex items-center md:justify-between justify-start gap-3 w-full">
        <span className="text-base font-semibold text-black">{value}</span>
        {icon && icon}
      </div>
    </div>
  );
};

export { DetailCard };
