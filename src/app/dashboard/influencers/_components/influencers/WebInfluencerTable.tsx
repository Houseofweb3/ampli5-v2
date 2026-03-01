"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import type { WebInfluencer } from "@/src/lib/types";
import PlatformIcon from "@/src/components/PlatformIcon";
import EmptyTable from "../empty-table";
import TableCell from "./TableCell";
import { getColumnWidth, WEB_HEADINGS } from "@/src/utils/constants";
import {
  VerifyIcon,
  NicheIcon,
  GeographyIcon,
  Score,
  FollowerIcon,
} from "@/public/icons";
import { useCart } from "@/src/context/CartContext";
import type { CartInfluencer } from "@/src/lib/types";

function cell(value: string | null | undefined): string {
  return value != null && value !== "" ? String(value) : "—";
}

function DetailCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col p-4 rounded-xl bg-gray-100/80 border border-gray-200/60 min-h-[72px]">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-1 font-semibold text-gray-900 text-sm">{value}</p>
      <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-600 [&_svg]:w-5 [&_svg]:h-5">
        {icon}
      </div>
    </div>
  );
}

/** Map WebInfluencer to cart item (id, name, sellPrice, contentType, platform, platformLink, views). */
function webToCartItem(w: WebInfluencer): CartInfluencer {
  return {
    id: String(w.id),
    name: w.name ?? "",
    sellPrice: w.sellPrice ?? null,
    contentType: w.inventory ?? null,
    platform: w.platform ?? null,
    platformLink: w.platformLink ?? null,
    views: w.avgViews ?? null,
  };
}

function AddToCartButton({ item }: { item: WebInfluencer }) {
  const { logCart, handleChange } = useCart();
  const cartItem = webToCartItem(item);
  const inCart = logCart.some((d: { id: string }) => String(d.id) === String(item.id));
  return (
    <button
      type="button"
      onClick={() => handleChange(cartItem)}
      className={
        inCart
          ? "px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
          : "px-4 py-2 rounded-lg text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors"
      }
    >
      {inCart ? "Remove" : "Add to Cart"}
    </button>
  );
}

interface WebInfluencerTableProps {
  influencers: WebInfluencer[];
  loading: boolean;
  setFilterQueries: React.Dispatch<React.SetStateAction<string>>;
  setPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  setNiche: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function WebInfluencerTable({
  influencers,
  loading,
  setFilterQueries,
  setPlatforms,
  setNiche,
  setSearchQuery,
}: WebInfluencerTableProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="w-full font-Jakarta sm:block hidden">
      <div className="relative w-full overflow-x-auto">
        <div className="min-w-lg">
          <div className="bg-white border-y border-black/20 flex">
            {WEB_HEADINGS.map((h) => (
              <div
                key={h}
                className="p-4 text-left text-sm font-semibold text-gray-600 bg-white sticky shrink-0"
                style={{
                  minWidth: getColumnWidth(h),
                  maxWidth: getColumnWidth(h),
                }}
              >
                {h}
              </div>
            ))}
          </div>
          <div className="space-y-2 flex flex-col">
            {loading ? (
              <>
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="flex border-b border-black/20">
                    {WEB_HEADINGS.map((h) => (
                      <TableCell key={h} id={h}>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                      </TableCell>
                    ))}
                  </div>
                ))}
              </>
            ) : !influencers?.length ? (
              <div className="text-center py-4 font-Jakarta">
                <EmptyTable
                  setFilterQueries={setFilterQueries}
                  setCredibility={() => { }}
                  setNiche={setNiche}
                  setPlatforms={setPlatforms}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            ) : (
              influencers.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 transition-colors border-b border-black/20 w-full"
                >
                  <div
                    id="table-row"
                    className={`w-full flex ${openId === item.id ? "opacity-100 h-fit" : ""}`}
                  >
                    <TableCell id="Influencers">
                      <div className="flex items-center gap-3">
                        <Image
                          src={`https://ui-avatars.com/api/?name=${item.name}&background=random&color=random&size=128`}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover bg-gray-100"
                        />
                        <div className="flex flex-col w-full min-w-0">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-medium text-gray-900 truncate">
                              {cell(item.name)}
                            </span>
                            <span className="shrink-0 inline-flex items-center" aria-hidden>
                              <VerifyIcon />
                            </span>
                          </div>
                          {item.platformLink ? (
                            <Link
                              className="flex gap-1 items-center text-xs text-primary hover:underline mt-0.5"
                              href={item.platformLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>View Profile</span>
                              <FiExternalLink className="shrink-0" />
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell id="Platform">
                      {item.platformLink ? (
                        <Link
                          href={item.platformLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <PlatformIcon platform={item.platform ?? ""} />
                        </Link>
                      ) : (
                        <PlatformIcon platform={item.platform ?? ""} />
                      )}
                    </TableCell>
                    <TableCell id="ContentType">
                      <span className="text-sm text-[#757575]">{cell(item.inventory)}</span>
                    </TableCell>
                    <TableCell id="Industries">
                      <span className="text-sm text-[#757575]">{cell(item.industries)}</span>
                    </TableCell>
                    <TableCell id="Audience Geography">
                      <span className="text-sm text-[#757575]">{cell(item.primaryAudienceGeography)}</span>
                    </TableCell>
                    <TableCell id="CPM">
                      <span className="text-sm text-[#757575]">{cell(item.cpm)}</span>
                    </TableCell>
                    <TableCell id="Avg View">
                      <span className="text-sm text-[#757575]">{cell(item.avgViews)}</span>
                    </TableCell>
                    <TableCell id="Actions">
                      <button
                        type="button"
                        className="text-sm text-primary cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setOpenId(openId === item.id ? null : item.id)}
                      >
                        {openId === item.id ? "" : "View Details"}
                      </button>
                    </TableCell>
                  </div>
                  {/* Accordion: all extra details */}
                  <div
                    className="w-full overflow-hidden transition-all duration-300 ease-in-out flex justify-center"
                    aria-hidden={openId !== item.id}
                  >
                    <div
                      className={`transform transition-all duration-300 flex md:flex-row flex-col md:w-[70%] w-full md:gap-6 gap-3 ${openId === item.id ? "opacity-100 max-h-[500px] py-6" : "opacity-0 max-h-0 py-0 overflow-hidden"
                        }`}
                    >
                      <div className="flex md:flex-col flex-row md:justify-center items-center gap-2 bg-primary-light rounded-lg md:p-5 p-3 shrink-0">
                        <Image
                          src={`https://ui-avatars.com/api/?name=${item.name}&background=random&color=random&size=128`} 
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover md:w-20 md:h-20 w-8 h-8 bg-gray-100"
                        />
                        <div className="md:text-center text-left">
                          <p className="text-base font-semibold text-black flex items-center justify-center gap-1">
                          {cell(item.name)}
                          <VerifyIcon />
                        </p>
                          <p className="text-[#757575] text-xs font-light">{cell(item.email)}</p>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <DetailCard
                            label="Avg Views"
                            value={cell(item.avgViews)}
                            icon={<FollowerIcon />}
                          />
                          <DetailCard
                            label="Categories"
                            value={cell(item.categories)}
                            icon={<NicheIcon />}
                          />
                          <DetailCard
                            label="Target Geography"
                            value={cell(item.primaryAudienceGeography)}
                            icon={<GeographyIcon />}
                          />
                          <DetailCard
                            label="CPM"
                            value={cell(item.cpm)}
                            icon={<Score />}
                          />
                          <DetailCard
                            label="Primary Country"
                            value={cell(item.primaryCountry)}
                            icon={<GeographyIcon />}
                          />
                          <DetailCard
                            label="Industries"
                            value={cell(item.industries)}
                            icon={<NicheIcon />}
                          />
                        </div>
                        <div className="flex justify-end items-center mt-3">
                          <AddToCartButton item={item} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
