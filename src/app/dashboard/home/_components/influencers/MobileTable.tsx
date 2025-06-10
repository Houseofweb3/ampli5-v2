import React, { useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useCart } from "@/src/context/CartContext";
import { useLogCart } from "@/src/context/InfluencersContext";
import { Influencer } from "@/src/lib/types";
import EmptyTable from "../empty-table";
import LoadingTable from "./LoadingTable";
import InfluencerCard from "./InfluencerCard";
import{ InfluencerDetailModal} from "./InfluencerDetailsModal";
import useHow3client from "@/src/hooks/usehow3client";
import { ENDPOINTS } from "@/src/utils/constants";

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
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<Influencer | null>(null);
  const { data: session } = useSession();
  const user = session?.user;
  const { cartId, fetchCart, cart } = useCart();
  const { handleChange, Logcart } = useLogCart();
  const how3 = useHow3client();

  const handleToggleDetails = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
  };

  // Cart operations
  const cartOperations = useMemo(
    () => ({
      findInfluencer: (cart: any, influencerId: string) =>
        cart?.influencerCartItems?.find(
          (item: any) => item.influencer.id === influencerId
        ),

      isInfluencerInCart: (cart: any, influencerId: string) =>
        !!cart?.influencerCartItems?.some(
          (item: any) => item.influencer.id === influencerId
        ),
    }),
    []
  );

  // Cart actions
  const cartActions = useMemo(
    () => ({
      add: async (influencerId: string) => {
        try {
          if (!cartId) return;

          const response = await how3.post(ENDPOINTS.INFLUENCER_CART_ITEM, {
            influencerId,
            cartId,
          });

          if (response.data.id) {
            await fetchCart();
            toast.success("Product added to cart successfully.");
          }
        } catch (error) {
          console.error("Add to cart error:", error);
          toast.error("Failed to add product to cart.");
        }
      },

      remove: async (influencerId: string) => {
        try {
          if (!cartId || !cart) return;

          const cartItem = cartOperations.findInfluencer(cart, influencerId);
          if (!cartItem) return;

          const response = await how3.delete(
            `${ENDPOINTS.INFLUENCER_CART_ITEM}/${cartItem.id}`
          );

          if (response.data) {
            await fetchCart();
            toast.success("Product removed from cart successfully.");
          }
        } catch (error) {
          console.error("Remove from cart error:", error);
          toast.error("Failed to remove product from cart.");
        }
      },
    }),
    [cartId, cart, fetchCart, how3, cartOperations]
  );

  // Handle add/remove from cart
  const handleAddToCart = useCallback(
    (influencer: Influencer) => (event: React.MouseEvent) => {
      event.stopPropagation();

      if (user) {
        const isInCart = cartOperations.isInfluencerInCart(
          cart!,
          influencer.id
        );
        isInCart
          ? cartActions.remove(influencer.id)
          : cartActions.add(influencer.id);
      } else {
        handleChange(influencer);
      }
    },
    [user, cart, cartOperations, cartActions, handleChange]
  );

  const isItemInCart = useCallback(
    (itemId: string) => {
      if (user) {
        return cartOperations.isInfluencerInCart(cart!, itemId);
      }
      return Logcart?.some((item: { id: string }) => item.id === itemId);
    },
    [user, cart, cartOperations, Logcart]
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
