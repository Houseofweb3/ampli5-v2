import React from "react";
import Image from "next/image";

const TickerBanner = () => {
  const tickers = [
    { src: "/logos/ada.svg" },
    { src: "/logos/bitsCrunch.svg" },
    { src: "/logos/bybit.svg" },
    { src: "/logos/cake.svg" },
    { src: "/logos/cbs.svg" },
    { src: "/logos/defy.svg" },
    { src: "/logos/gemini.svg" },
    { src: "/logos/graceful.svg" },
    { src: "/logos/guildfi.svg" },
    { src: "/logos/okx.svg" },
    { src: "/logos/utherverse.svg" },
    { src: "/logos/weWox.svg" },
    { src: "/logos/wow.svg" },
    { src: "/logos/xla.svg" },
  ];

  return (
    <div className="w-full overflow-x-hidden py-2 lg:py-4 ">
      <ul className="ticker flex items-center gap-10">
        {tickers.concat(tickers).map((ticker, index) => (
          <li className="mr-8 flex items-center" key={index}>
            <Image
              src={ticker.src}
              alt=""
              className="w-28 grayscale opacity-50"
              width={80}
              height={50}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TickerBanner;
