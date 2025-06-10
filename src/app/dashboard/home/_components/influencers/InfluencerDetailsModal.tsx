import React from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Influencer } from "@/src/lib/types";
import {
  BackArrow,
  FollowerIcon,
  GeographyIcon,
  NicheIcon,
  Score,
  VerifyIcon,
} from "@/public/icons";
import { formatNumber } from "@/src/utils/helpers";
import { DetailCard } from "./DetailCard";
import PlatformIcon from "@/src/components/PlatformIcon";

interface InfluencerDetailModalProps {
  influencer: Influencer;
  isOpen: boolean;
  onClose: () => void;
  isInCart: boolean;
  // eslint-disable-next-line
  onAddToCart: (event: React.MouseEvent) => void;
}

export const InfluencerDetailModal: React.FC<InfluencerDetailModalProps> = ({
  influencer,
  isOpen,
  onClose,
  isInCart,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[999999] flex flex-col items-start justify-start overflow-y-auto">
      <div className="relative w-full min-h-screen bg-white flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className=" flex justify-start items-center gap-1.5 p-4"
        >
          <BackArrow />
          <span>Back</span>
        </button>
        {/* Content area with padding and scroll */}
        <div className="flex-1 w-full p-4 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {/* Profile Header */}
            <div className="flex flex-row items-start gap-2 bg-primary-light rounded-lg p-3">
              <Image
                src={
                  influencer.dpLink !== "NaN" ? influencer.dpLink : "/logo.svg"
                }
                alt={`${influencer.influencer}'s profile`}
                width={80}
                height={80}
                className="rounded-full object-cover h-20 w-20"
                priority={true}
              />
              <div>
                <p className="text-base font-semibold text-black flex items-center gap-2">
                  {influencer?.influencer}
                  <span>
                    <VerifyIcon />
                  </span>
                </p>
                <p className="text-[#757575] text-xs font-light">
                  {influencer?.geography}
                </p>
              </div>
            </div>
            {/* Platform Info */}
            <div className="text-black/50 text-base font-medium">
              Content Type: {influencer?.contentType}
            </div>
            <div className="w-full flex md:justify-between justify-start items-center gap-5">
              <div className="p-2.5 rounded-md bg-[#F5F8FA] flex items-center gap-1">
                <PlatformIcon platform={influencer.platform} />
                <span className="text-xs text-black font-light">
                  {formatNumber(influencer?.followers)}
                </span>
              </div>
            </div>

            {/* Niche and Geography Cards */}
            <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
              {influencer?.niche.split(",").map((name, index) => (
                <DetailCard
                  key={index}
                  icon={<NicheIcon />}
                  title={`Niche ${index + 1}`}
                  value={name.trim()}
                />
              ))}
              {influencer?.geography && (
                <DetailCard
                  icon={<GeographyIcon />}
                  title={`Target Geography`}
                  value={influencer?.geography}
                />
              )}
            </div>

            {/* Score and Followers Cards */}
            <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
              {influencer?.tweetScoutScore && (
                <DetailCard
                  title={`HOW3 Score`}
                  value={influencer?.tweetScoutScore}
                  icon={<Score />}
                />
              )}
              {influencer?.followers && (
                <DetailCard
                  icon={<FollowerIcon />}
                  title={`Followers`}
                  value={formatNumber(influencer?.followers)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Fixed action button at bottom */}
        <div className="sticky bottom-0 w-full p-4 bg-white border-t border-gray-200">
          <div
            className={`flex items-center justify-center gap-2 text-white bg-primary ${
              isInCart ? "bg-red-100" : ""
            } px-5 py-3 rounded-md cursor-pointer hover:opacity-80 transition-colors`}
            onClick={onAddToCart}
          >
            {isInCart ? (
              <div className="flex gap-2 items-center text-error">
                <RiDeleteBin6Line />
                <span className="text-sm">Remove</span>
              </div>
            ) : (
              <span className="text-sm">Add to Cart</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetailModal;
