import React from "react";

import Image from "next/image";
import { RxReload } from "react-icons/rx";
import Button from "@/src/components/ui/button";
import { BUTTON_SIZES, BUTTON_TYPES } from "@/src/utils/constants";

interface EmptyTableProps {
  setFilterQueries: React.Dispatch<React.SetStateAction<string>>;
  setPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  setCredibility: React.Dispatch<React.SetStateAction<string[]>>;
  setNiche: React.Dispatch<React.SetStateAction<string[]>>;
  // eslint-disable-next-line no-unused-vars
  setSearchQuery: (value: React.SetStateAction<string>) => void;
}

const EmptyTable: React.FC<EmptyTableProps> = ({
  setFilterQueries,
  setPlatforms,
  setCredibility,
  setNiche,
  setSearchQuery,
}) => {
  const handleReset = () => {
    setSearchQuery("");
    setFilterQueries("");
    setCredibility([]);
    setNiche([]);
    setPlatforms([]);
  };
  return (
    <div className="w-full  h-full flex justify-center items-center p-6 font-Jakarta flex-col gap-2">
      <Image
        src={"/socials/noResultFound.svg"}
        alt="no result"
        width={200}
        height={200}
      />
      <span className="font-semibold md:text-lg ">No Result Found</span>
      <p className="text-secondary-text text-sm md:text-base">
        Try adjusting your filters slightly to see more results.
      </p>

      <Button
        type={BUTTON_TYPES.TEXT}
        size={BUTTON_SIZES.LARGE}
        onClick={handleReset}
      >
        <RxReload /> Reset
      </Button>
    </div>
  );
};

export default EmptyTable;
