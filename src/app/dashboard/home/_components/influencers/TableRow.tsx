// TableRow.tsx
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiExternalLink } from "react-icons/fi";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  VerifyIcon,
  NicheIcon,
  GeographyIcon,
  FollowerIcon,
  Score,
} from "@/public/icons";
import { Influencer } from "@/src/lib/types";
import { useCart } from "@/src/context/CartContext";
import { useLogCart } from "@/src/context/InfluencersContext";
import TableCell from "./TableCell";
import useHow3client from "@/src/hooks/usehow3client";
import PlatformIcon from "@/src/components/PlatformIcon";
import Badge from "@/src/components/ui/badge";
import { ENDPOINTS } from "@/src/utils/constants";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatNumber } from "@/src/utils/helpers";
import { DetailCard } from "./DetailCard";

interface TableRowProps {
  data: Influencer;
  currentPage: number;
  isOpen: boolean;
  onToggleDetails: () => void;
  number: number;
}

interface InfluencerCartItem {
  id: string;
  influencer: {
    id: string;
  };
}

interface CartState {
  influencerCartItems?: InfluencerCartItem[];
}

const TableRow: React.FC<TableRowProps> = React.memo(
  ({ data, isOpen, onToggleDetails }) => {
    const { data: session } = useSession();
    const user = session?.user;
    const { cartId, fetchCart, cart } = useCart();
    const { handleChange, Logcart } = useLogCart();
    const how3 = useHow3client();

    // Memoized cart operations
    const cartOperations = useMemo(
      () => ({
        findInfluencer: (cart: CartState) =>
          cart?.influencerCartItems?.find(
            (item) => item.influencer.id === data.id
          ),

        isInfluencerInCart: (cart: CartState) =>
          !!cart?.influencerCartItems?.some(
            (item) => item.influencer.id === data.id
          ),
      }),
      [data.id]
    );

    // Memoized API calls
    const cartActions = useMemo(
      () => ({
        add: async () => {
          try {
            if (!cartId) return;

            const response = await how3.post(ENDPOINTS.INFLUENCER_CART_ITEM, {
              influencerId: data.id,
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

        remove: async () => {
          try {
            if (!cartId || !cart) return;

            const cartItem = cartOperations.findInfluencer(cart);
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
      [cartId, cart, data.id, fetchCart, how3, cartOperations]
    );

    // Determine if item is in cart (either logged in or local storage)
    const isItemInCart = useMemo(() => {
      if (user) {
        return cartOperations.isInfluencerInCart(cart!);
      }
      return Logcart?.some((item: { id: string }) => item.id === data.id);
    }, [user, cart, cartOperations, Logcart, data.id]);

    const handleAddToCart = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();

        if (user) {
          isItemInCart ? cartActions.remove() : cartActions.add();
        } else {
          handleChange(data);
        }
      },
      [user, isItemInCart, cartActions, handleChange, data]
    );

    const ActionButton = useMemo(
      () => (
        <div
          className={`flex items-center justify-center gap-2 text-white bg-primary ${
            isItemInCart && "bg-red-100"
          } px-5 py-2 rounded-md cursor-pointer hover:opacity-80 transition-colors`}
          onClick={handleAddToCart}
        >
          {isItemInCart ? (
            <div className="flex gap-2 items-center text-error">
              <RiDeleteBin6Line />
              <span className="text-sm">Remove</span>
            </div>
          ) : (
            <span className="text-sm">Add to Cart</span>
          )}
        </div>
      ),
      [isItemInCart, handleAddToCart]
    );

    const DetailsButton = useMemo(
      () => (
        <div
          className="flex items-center gap-2 text-primary cursor-pointer hover:opacity-80 transition-colors"
          onClick={onToggleDetails}
        >
          <span className="text-sm">{isOpen ? "" : "View Details"}</span>
        </div>
      ),
      [isOpen, onToggleDetails]
    );

    return (
      <div className="mb-2 transition-colors border-b border-black/20 w-full">
        <div
          id="table-row"
          className={`w-full flex  ${
            !isOpen ? "opacity-100 h-fit " : "opacity-0 max-h-0"
          }`}
        >
          {/* <TableCell id="Number">
            <span className="text-sm text-[#757575]">{number}</span>
          </TableCell> */}
          <TableCell id="Influencers">
            <div className="flex items-center gap-3">
              <Image
                src={data.dpLink !== "NaN" ? data.dpLink : "/logo.svg"}
                alt={`${data.influencer}'s profile`}
                width={40}
                height={40}
                className="rounded-full object-cover"
                priority={true}
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-start items-center gap-1 w-full">
                  <span>{data.influencer}</span>
                  <VerifyIcon />
                </div>
                <Link
                  className="flex gap-2 items-center text-xs text-[#757575] hover:underline"
                  target="_blank"
                  href={data.socialMediaLink}
                >
                  <span>View Profile</span>
                  <FiExternalLink />
                </Link>
              </div>
            </div>
          </TableCell>
          <TableCell id="Platform">
            <PlatformIcon platform={data.platform} />
          </TableCell>
          <TableCell id="ContentType">
            <span className="text-sm text-[#757575]">{data?.contentType}</span>
          </TableCell>
          <TableCell id="Category">
            <span className="text-sm text-[#757575]">{data.niche}</span>
          </TableCell>
          <TableCell id="ER">
            <Badge rate={"High"} />
          </TableCell>
          <TableCell id="Credibility Score">
            <Badge rate={data.credibilityScore} />
          </TableCell>
          <TableCell id="Price">
            <span className="text-sm text-[#757575]">{data.hiddenPrice}</span>
          </TableCell>
          <TableCell id="Actions">{DetailsButton}</TableCell>
        </div>
        {/* Details section with animation */}
        <div
          id="row-details"
          className="w-full overflow-hidden transition-all duration-300 ease-in-out flex justify-center"
        >
          <div
            className={`transform transition-all duration-300 flex md:flex-row flex-col md:w-[70%] w-full md:gap-6 gap-3 ${
              isOpen ? "opacity-100 h-fit py-6" : "opacity-0 max-h-0 py-0"
            }`}
          >
            <div className=" flex md:flex-col flex-row md:justify-center items-center gap-2  bg-primary-light rounded-lg md:p-5 p-3 ">
              <Image
                src={data.dpLink !== "NaN" ? data.dpLink : "/logo.svg"}
                alt={`${data.influencer}'s profile`}
                width={40}
                height={40}
                className="rounded-full object-cover md:w-20 md:h-20 w-8 h-8"
                priority={true}
              />
              <p className=" text-base font-semibold text-black flex items-center gap-2 ">
                {data?.influencer}
                <span>
                  {" "}
                  <VerifyIcon />
                </span>
              </p>
              <p className=" text-[#757575] text-xs font-light">
                {data?.geography}
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-3 ">
              <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
                {data?.niche.split(",").map((name, index) => {
                  return (
                    <DetailCard
                      key={index}
                      icon={<NicheIcon />}
                      title={`Category ${index + 1}`}
                      value={name}
                    />
                  );
                })}
                {data?.geography && (
                  <DetailCard
                    icon={<GeographyIcon />}
                    title={`Target Geography `}
                    value={data?.geography}
                  />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
                {data?.tweetScoutScore && (
                  <DetailCard
                    title={`HOW3 Score `}
                    value={data?.tweetScoutScore}
                    icon={<Score />}
                  />
                )}

                {data?.followers && (
                  <DetailCard
                    icon={<FollowerIcon />}
                    title={`Followers `}
                    value={formatNumber(data?.followers)}
                  />
                )}
              </div>
              <div className="w-full flex md:justify-between justify-start items-center gap-5">
                <div className=" p-2.5 rounded-md bg-[#F5F8FA] flex items-center gap-1">
                  <PlatformIcon platform={data.platform} />
                  <span className=" text-xs text-black font-light">
                    {formatNumber(data?.followers)}
                  </span>
                </div>
                {ActionButton}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.data.id === nextProps.data.id &&
      prevProps.currentPage === nextProps.currentPage &&
      prevProps.isOpen === nextProps.isOpen
    );
  }
);

TableRow.displayName = "TableRow";

export default TableRow;
