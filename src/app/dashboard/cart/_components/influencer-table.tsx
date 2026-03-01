/* eslint-disable indent */
"use client";
import React from "react";

import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { VerifyIcon } from "../../../../../public/icons";
import type { CartInfluencer } from "@/src/lib/types";
import { useCart } from "@/src/context/CartContext";
import PlatformIcon from "@/src/components/PlatformIcon";

interface TableProps {
  influencers: CartInfluencer[];
}

const TableRow: React.FC<{ data: CartInfluencer; number: number }> = ({ data }) => {
  const { handleChange } = useCart();

  const handleRemoveFromCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleChange(data);
    toast.success("Product removed from cart successfully.");
  };

  return (
    <div className="w-full bg-white flex justify-between p-4 items-center rounded-lg border border-gray-200/60 md:flex-row flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random&size=128`}
            alt={data.name}
            width={40}
            height={40}
            className="rounded-full object-cover bg-gray-100"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{data.name}</span>
              <VerifyIcon />
            </div>
            {data.platformLink ? (
              <Link
                className="flex items-center gap-1 text-xs text-gray-500 hover:underline mt-0.5"
                href={data.platformLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile <FiExternalLink />
              </Link>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center text-sm text-gray-600">
          {data.contentType ? (
            <span className="border border-gray-300 rounded-lg px-2 py-1">Content: {data.contentType}</span>
          ) : null}
          {data.platform ? (
            <span className="border border-gray-300 rounded-lg px-2 py-1 flex items-center gap-1.5">
              <PlatformIcon platform={data.platform} />
              {data.platformLink ? (
                <Link href={data.platformLink} target="_blank" rel="noopener noreferrer">
                  {data.platform}
                </Link>
              ) : (
                data.platform
              )}
            </span>
          ) : null}
          {data.views ? (
            <span className="border border-gray-300 rounded-lg px-2 py-1">Views: {data.views}</span>
          ) : null}
        </div>
      </div>
      <div className="w-full md:w-1/3 flex justify-end items-center">
        <button
          type="button"
          className="flex items-center text-sm text-red-600 gap-2 cursor-pointer hover:opacity-80 active:scale-95"
          onClick={handleRemoveFromCart}
        >
          <RiDeleteBin6Line /> Remove
        </button>
      </div>
    </div>
  );
};

const Table: React.FC<TableProps> = ({ influencers }) => {
  return (
    <div className="w-full mt-2 flex flex-col gap-2">
      {influencers?.length > 0 &&
        influencers.map((item, index) => (
          <TableRow key={item.id} data={item} number={index + 1} />
        ))}
    </div>
  );
};

export default Table;
