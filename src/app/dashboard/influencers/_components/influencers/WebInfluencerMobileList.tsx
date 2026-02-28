"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import type { WebInfluencer } from "@/src/lib/types";
import PlatformIcon from "@/src/components/PlatformIcon";
import EmptyTable from "../empty-table";
import {
  VerifyIcon,
  NicheIcon,
  GeographyIcon,
  Score,
  FollowerIcon,
  CalendarIcon,
} from "@/public/icons";
import { useLogCart } from "@/src/context/InfluencersContext";
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
    <div className="relative flex flex-col p-3 rounded-xl bg-gray-100/80 border border-gray-200/60 min-h-[64px]">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-0.5 font-semibold text-gray-900 text-sm">{value}</p>
      <div className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center text-gray-600 [&_svg]:w-4 [&_svg]:h-4">
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

function AddToCartLink({ item }: { item: WebInfluencer }) {
  const { Logcart, handleChange } = useLogCart();
  const cartItem = webToCartItem(item);
  const inCart = Logcart.some((d: { id: string }) => String(d.id) === String(item.id));
  return (
    <button
      type="button"
      onClick={() => handleChange(cartItem)}
      className={`text-sm font-medium cursor-pointer hover:opacity-80 ${inCart ? "text-red-600" : "text-green-600"}`}
    >
      {inCart ? "Remove" : "Add to Cart"}
    </button>
  );
}

interface WebInfluencerMobileListProps {
  influencers: WebInfluencer[];
  loading: boolean;
  setFilterQueries: React.Dispatch<React.SetStateAction<string>>;
  setPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  setNiche: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function WebInfluencerMobileList({
  influencers,
  loading,
  setFilterQueries,
  setPlatforms,
  setNiche,
  setSearchQuery,
}: WebInfluencerMobileListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="w-full space-y-4 sm:hidden block animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!influencers?.length) {
    return (
      <div className="w-full sm:hidden block">
        <EmptyTable
          setFilterQueries={setFilterQueries}
          setCredibility={() => { }}
          setNiche={setNiche}
          setPlatforms={setPlatforms}
          setSearchQuery={setSearchQuery}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:hidden block">
      {influencers.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg bg-white overflow-hidden"
        >
          <div className="p-4 flex items-start gap-3">
            <Image
              src={`https://ui-avatars.com/api/?name=${item.name}&background=random&color=fff&size=128`}
              alt={item.name}
              width={44}
              height={44}
              className="rounded-full object-cover bg-gray-100 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                <span className="truncate">{cell(item.name)}</span>
                <span className="shrink-0 inline-flex items-center" aria-hidden>
                  <VerifyIcon />
                </span>
              </p>
              {item.platformLink ? (
                <Link
                  href={item.platformLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex gap-1 items-center text-xs text-primary hover:underline mt-1"
                >
                  View Profile <FiExternalLink />
                </Link>
              ) : null}
            </div>
            {item.platformLink ? (
              <Link
                href={item.platformLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <PlatformIcon platform={item.platform ?? ""} />
              </Link>
            ) : (
              <PlatformIcon platform={item.platform ?? ""} />
            )}
          </div>
          <div className="px-4 pb-3 flex flex-wrap gap-2 text-sm text-gray-600">
            <span>ContentType: {cell(item.inventory)}</span>
            <span>Price: {cell(item.sellPrice)}</span>
          </div>
          <div className="border-t border-gray-100 px-4 py-2 flex items-center justify-between gap-3">
            <button
              type="button"
              className="text-sm text-primary font-medium cursor-pointer hover:opacity-80"
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
            >
              {openId === item.id ? "Hide Details" : "View Details"}
            </button>
            <AddToCartLink item={item} />
          </div>
          {openId === item.id && (
            <div className="px-4 pb-4 pt-2 grid grid-cols-2 gap-2 text-sm bg-gray-50 border-t border-gray-100">
              <DetailCard
                label="Avg Views"
                value={cell(item.avgViews)}
                icon={<FollowerIcon />}
              />
              <DetailCard
                label="CPM"
                value={cell(item.cpm)}
                icon={<Score />}
              />
              <DetailCard
                label="Categories"
                value={cell(item.categories)}
                icon={<NicheIcon />}
              />
              <DetailCard
                label="Industries"
                value={cell(item.industries)}
                icon={<NicheIcon />}
              />
              <DetailCard
                label="Primary Country"
                value={cell(item.primaryCountry)}
                icon={<GeographyIcon />}
              />
              <DetailCard
                label="Audience Geography"
                value={cell(item.primaryAudienceGeography)}
                icon={<GeographyIcon />}
              />
              <DetailCard
                label="Created"
                value={
                  item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "—"
                }
                icon={<CalendarIcon />}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
