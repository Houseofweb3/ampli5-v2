// NewTable.tsx
import React, { useState } from "react";
import { Influencer } from "@/src/lib/types";
import { getColumnWidth, HEADINGS } from "@/src/utils/constants";
import HeadingWithTooltip from "./HeadingWithTooltip";
import LoadingTable from "./LoadingTable";
import TableRow from "./TableRow";
import EmptyTable from "../empty-table";

interface TableProps {
  influencers: Influencer[];
  loading: boolean;
  currentPage: number;
  setFilterQueries: React.Dispatch<React.SetStateAction<string>>;
  setPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  setCredibility: React.Dispatch<React.SetStateAction<string[]>>;
  setNiche: React.Dispatch<React.SetStateAction<string[]>>;
  setOrder: React.Dispatch<React.SetStateAction<"" | "ASC" | "DESC">>;
  order: string;
  // eslint-disable-next-line
  setSearchQuery: (value: React.SetStateAction<string>) => void;
}

const NewTable: React.FC<TableProps> = ({
  influencers,
  loading,
  currentPage,
  setFilterQueries,
  setPlatforms,
  setCredibility,
  setNiche,
  setSearchQuery,
  order,
  setOrder,
}) => {
  // Add state for tracking which row's details are open
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

  // Handler to toggle details
  const handleToggleDetails = (id: string) => {
    setOpenDetailsId(openDetailsId === id ? null : id);
  };

  return (
    <div className="w-full font-Jakarta sm:block hidden">
      <div className="relative w-full overflow-x-auto">
        <div className="min-w-lg">
          <div className="w-full">
            <div>
              <div className="bg-white border-y border-black/20 flex">
                {HEADINGS.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 text-left text-sm font-semibold text-gray-600 bg-white sticky"
                    style={{
                      borderCollapse: "separate",
                      width: getColumnWidth(item),
                      visibility: item === "Number" ? "hidden" : "visible",
                    }}
                  >
                    <div className={` whitespace-nowrap`}>
                      <HeadingWithTooltip heading={item} order={order} setOrder={setOrder} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2 flex flex-col">
              {loading ? (
                <LoadingTable />
              ) : influencers?.length === 0 ? (
                <div>
                  <div className="text-center py-4 font-Jakarta">
                    <EmptyTable
                      setFilterQueries={setFilterQueries}
                      setCredibility={setCredibility}
                      setNiche={setNiche}
                      setPlatforms={setPlatforms}
                      setSearchQuery={setSearchQuery}
                    />
                  </div>
                </div>
              ) : (
                influencers?.map((item, index) => (
                  <TableRow
                    key={item.id}
                    data={item}
                    currentPage={currentPage}
                    number={index + 1}
                    isOpen={openDetailsId === item.id}
                    onToggleDetails={() => handleToggleDetails(item.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTable;
