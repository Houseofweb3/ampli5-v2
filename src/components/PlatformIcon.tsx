import React from "react";
import Image from "next/image";

import { PLATFORM_MAP } from "../utils/constants";

interface PlatformIconProps {
  platform: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform }) => {
  const iconSrc = getIconSrc(platform);

  return iconSrc ? (
    <Image src={iconSrc} alt={platform} width={20} height={20} />
  ) : null;
};

const getIconSrc = (platform: string) => {
  return PLATFORM_MAP[platform?.toLocaleLowerCase()] || null;
};

export default React.memo(PlatformIcon);
