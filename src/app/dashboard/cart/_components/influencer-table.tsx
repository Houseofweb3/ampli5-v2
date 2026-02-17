/* eslint-disable indent */
"use client";
import React from "react";

import Image from "next/image";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import useHow3client from "@/src/hooks/usehow3client";
import { VerifyIcon } from "../../../../../public/icons";
import { CartInfluencer } from "@/src/lib/types";
import { useLogCart } from "@/src/context/InfluencersContext";
import { useCart } from "@/src/context/CartContext";
import Badge from "@/src/components/ui/badge";
import PlatformIcon from "@/src/components/PlatformIcon";
import { ENDPOINTS } from "@/src/utils/constants";
import { getHiddenPrice } from "@/src/utils/helpers";

interface TableProps {
  influencers: CartInfluencer[];
}

const TableRow: React.FC<{
  data: CartInfluencer;
}> = ({ data }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const how3 = useHow3client();
  const { cartId, fetchCart } = useCart();
  const { handleChange } = useLogCart();

  const RemoveFromCart = async () => {
    try {
      if (cartId) {
        const response = await how3.delete(
          `${ENDPOINTS.INFLUENCER_CART_ITEM}/${data.InfluencerCartId}`
        );
        if (response.data) {
          fetchCart();
          toast.success("Product removed from cart successfully.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (user) {
      RemoveFromCart();
    } else {
      handleChange(data);
    }
  };

  return (
    <div className="w-full bg-white flex justify-between p-4 items-center rounded-lg md:flex-row flex-col gap-4">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={data.dpLink}
            alt={`${data.influencer}'s profile`}
            width={40}
            height={40}
            className="rounded-full object-cover"
            priority={true}
          />
          <div className="flex flex-col w-full">
            <div className="flex w-full gap-2 items-center">
              <span>{data.influencer}</span>
              <VerifyIcon />
            </div>
            <Link
              className="flex gap-2 items-center text-xs text-gray-400 hover:underline"
              target="_blank"
              href={data.socialMediaLink}
            >
              <span>View Profile</span>
              <FiExternalLink />
            </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-gray-300 rounded-lg p-2 flex gap-2 text-sm items-center w-fit">
            <PlatformIcon platform={data.platform} />
            {data.followers ? data.followers : data.subscribers}
          </div>
          <div className="border border-gray-300 rounded-lg p-2 flex gap-2 text-sm items-center">
            <span className="font-semibold text-base">ER</span>
            <Badge rate={"High"} />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 flex justify-between md:justify-end gap-6 font-semibold">
        <div className="">{data ? getHiddenPrice(data.price) : "$$"}</div>
        <div
          className="flex items-center text-sm text-error gap-2 cursor-pointer active:scale-95"
          onClick={handleRemoveFromCart}
        >
          <RiDeleteBin6Line /> Remove
        </div>
      </div>
    </div>
  );
};

const Table: React.FC<TableProps> = ({ influencers }) => {
  return (
    <table className="w-full mt-2">
      <tbody className="gap-2 flex flex-col w-full">
        {influencers?.length > 0 &&
          influencers?.map((item, index) => <TableRow key={index} data={item} />)}
      </tbody>
    </table>
  );
};

export default Table;
