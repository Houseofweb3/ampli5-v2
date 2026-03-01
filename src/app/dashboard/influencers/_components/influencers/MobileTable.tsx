"use client";

import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/src/context/CartContext";
import { Influencer } from "@/src/lib/types";
import EmptyTable from "../empty-table";
import LoadingTable from "./LoadingTable";
import InfluencerCard from "./InfluencerCard";
import { InfluencerDetailModal } from "./InfluencerDetailsModal";

interface MobileTableProps {
  influencers: Influencer[];
  loading: boolean;
  currentPage: number;
  setFilterQueries: React.Dispatch<React.SetStateAction<string>>;
  setPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  setCredibility: React.Dispatch<React.SetStateAction<string[]>>;
  setNiche: React.Dispatch<React.SetStateAction<string[]>>;
  // eslint-disable-next-line
  setSearchQuery: (value: React.SetStateAction<string>) => void;
}

const MobileTable: React.FC<MobileTableProps> = ({
  influencers,
  loading,
  setFilterQueries,
  setPlatforms,
  setCredibility,
  setNiche,
  setSearchQuery,
}) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const { handleChange, logCart } = useCart();

  const handleToggleDetails = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
  };

  const handleAddToCart = useCallback(
    (influencer: Influencer) => (event: React.MouseEvent) => {
      event.stopPropagation();
      handleChange(influencer);
      toast.success("Cart updated.");
    },
    [handleChange]
  );

  const isItemInCart = useCallback(
    (itemId: string) => logCart?.some((item: { id: string }) => item.id === itemId),
    [logCart]
  );

  if (loading) return <LoadingTable />;

  if (influencers?.length === 0) {
    return (
      <EmptyTable
        setFilterQueries={setFilterQueries}
        setCredibility={setCredibility}
        setNiche={setNiche}
        setPlatforms={setPlatforms}
        setSearchQuery={setSearchQuery}
      />
    );
  }

  return (
    <>
      <div className="w-full space-y-4 sm:hidden block">
        {influencers?.map((influencer) => (
          <div key={influencer.id}>
            <InfluencerCard
              influencer={influencer}
              onToggleDetails={() => handleToggleDetails(influencer)}
            />
          </div>
        ))}
      </div>

      {selectedInfluencer && (
        <InfluencerDetailModal
          influencer={selectedInfluencer}
          isOpen={!!selectedInfluencer}
          onClose={() => setSelectedInfluencer(null)}
          isInCart={isItemInCart(selectedInfluencer.id)}
          onAddToCart={handleAddToCart(selectedInfluencer)}
        />
      )}
    </>
  );
};

export default MobileTable;
