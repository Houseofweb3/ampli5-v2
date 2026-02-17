import React from "react";
import Image from "next/image";
import { VerifyIcon, TwitterIcon, PlayIcon } from "../../../../../public/icons";

const Data = [
  {
    col1: {
      name: "TearOfSatoshi",
      subtitle: "Shitcoin Alchemist",
      img: "/profile.svg",
      verified: true,
    },
    col2: {
      platform: "Twitter",
      icon: [<TwitterIcon key="twitter" />, <PlayIcon key="play" />],
      followers: "6.43M",
    },
    col3: "NFT/P2E",
    col4: "05/02/2024",
    col5: "USA",
    col6: "0.99%",
    col7: "RTM",
    col8: "$1000",
  },
  {
    col1: {
      name: "TearOfSatoshi",
      subtitle: "Shitcoin Alchemist",
      img: "/profile.svg",
      verified: true,
    },
    col2: {
      platform: "Twitter",
      icon: [<TwitterIcon key="twitter" />, <PlayIcon key="play" />],
      followers: "6.43M",
    },
    col3: "NFT/P2E",
    col4: "05/02/2024",
    col5: "USA",
    col6: "0.99%",
    col7: "RTM",
  },
  // Add more data objects here
];

const Table = () => {
  return (
    <div className="flex flex-col font-Jakarta gap-8 py-8">
      {Data.map((data, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <div className="flex items-center gap-4">
            <Image src={data.col1.img} alt="profile" width={30} height={30} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span>{data.col1.name}</span>
                {data.col1.verified && <VerifyIcon />}
              </div>
              <span className="text-gray-500">{data.col1.subtitle}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="border border-slate-200 flex flex-col gap-2 p-2">
              <span className="text-xs font-Poppins text-gray-300">Platform</span>
              <div className="flex gap-2 items-center text-sm">
                {data.col2.icon}
                {data.col2.followers}
              </div>
            </div>
            <div className="border border-slate-200 flex flex-col gap-2 p-2">
              <span className="text-xs font-Poppins text-gray-300">Niche</span>
              {data.col3}
            </div>
            <div className="border border-slate-200 flex flex-col gap-2 p-2">
              <span className="text-xs font-Poppins text-gray-300">Country</span>
              {data.col4}
            </div>
            <div className="border border-slate-200 flex flex-col gap-2 p-2">
              <span className="text-xs font-Poppins text-gray-300">ER</span>
              {data.col5}
            </div>
            <div className="border border-slate-200 flex flex-col gap-2 p-2">
              <span className="text-xs font-Poppins text-gray-300">Credibility Score</span>
              {data.col6}
            </div>
            <div className="border border-slate-200 flex flex-col gap-2 p-2">
              <span className="text-xs font-Poppins text-gray-300">Price</span>
              {data.col7}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
