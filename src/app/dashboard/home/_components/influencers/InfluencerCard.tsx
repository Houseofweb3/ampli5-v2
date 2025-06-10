import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Influencer } from "@/src/lib/types";
import { VerifyIcon } from "@/public/icons";
import PlatformIcon from "@/src/components/PlatformIcon";
import Badge from "@/src/components/ui/badge";

interface InfluencerCardProps {
  influencer: Influencer;
  //eslint-disable-next-line
  onToggleDetails: (id: string) => void;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({
  influencer,
  onToggleDetails,
}) => {
  return (
    <div className="bg-white border-t border-black/10 font-Jakarta py-4">
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between items-start gap-2.5 w-full">
          <Image
            src={influencer.dpLink !== "NaN" ? influencer.dpLink : "/logo.svg"}
            alt={`${influencer.influencer}'s profile`}
            width={56}
            height={56}
            className="rounded-full object-cover"
            priority={true}
          />

          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {influencer.influencer}
                </h3>
              </div>
              <div className="flex-shrink-0">
                <VerifyIcon />
              </div>
            </div>
            <Link
              href={influencer.socialMediaLink}
              target="_blank"
              className="text-gray-500 text-xs hover:text-gray-700 transition-colors"
            >
              View profile
            </Link>
          </div>

          <div className="flex flex-col items-end gap-4 flex-shrink-0 mt-1.5">
            <div className="flex gap-2">
              <PlatformIcon platform={influencer.platform} />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4 items-start">
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Niche</p>
            <p className="font-medium text-xs">
              {influencer.niche.split(",")[0]}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Credibility Score</p>
            <div>
              <Badge rate={influencer.credibilityScore} />
            </div>
          </div>
          <button
            onClick={() => onToggleDetails(influencer.id)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span className="text-xs font-medium">View Details</span>
            <ChevronRight className="w-4 h-4 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;
