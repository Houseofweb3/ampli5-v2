import React from "react";
import Image from "next/image";
import { VerifyIcon, TwitterIcon, PlayIcon } from "@/public/icons";

const Details = () => {
  return (
    <div className="w-full flex flex-col">
      <span className="font-Jakarta font-[600] text-lg">Influencer Details</span>
      <div className="flex flex-col md:grid md:grid-cols-6 w-full py-4 gap-6">
        <div className="col-span-2 hidden md:flex flex-col items-center w-full font-Jakarta">
          <Image src={"/profile.svg"} alt={"profile"} width={80} height={80} className="mb-4" />
          <div className=" flex gap-2 items-center">
            TearOfSatoshi <VerifyIcon />
          </div>
          <span className="text-gray-300 text-sm text-center">Shitcoin Alchemist</span>
          <span className="text-gray-300 text-sm">India, Delhi</span>
          <div className="flex gap-4 py-4 md:flex-row flex-col">
            <div className="flex gap-2 p-2 border border-gray-200 rounded-lg">
              <TwitterIcon /> 6.43M
            </div>
            <div className="flex gap-2 p-2 border border-gray-200 rounded-lg ">
              <PlayIcon /> 6.43M
            </div>
          </div>
          <button className="w-full py-2 bg-primary text-white rounded-xl mb-2 border border-primary">
            Add to Cart
          </button>
          <button className="w-full border border-white hover:border-gray-300 py-2 rounded-xl transition-all ease-in-out font-[600]">
            Book a demo
          </button>
        </div>
        <div className="col-span-4 flex flex-col w-full font-Jakarta gap-4">
          <div className="grid grid-cols-2 2md:grid-cols-4 gap-4">
            <div className="border border-gray-200 p-2 md:p-4 flex flex-col text-[#00000045] gap-2 rounded-lg">
              ER
              <span className="text-black text-xl">6.6%</span>
            </div>
            <div className="border border-gray-200 p-2 md:p-4 flex flex-col text-[#00000045] gap-2 rounded-lg">
              Avg. Likes
              <span className="text-black text-xl">263K</span>
            </div>
            <div className="border border-gray-200 p-2 md:p-4  flex flex-col text-[#00000045] gap-2 rounded-lg">
              Est. Reach
              <span className="text-black text-xl">612.7K</span>
            </div>
            <div className="border border-gray-200 p-2 md:p-4  flex flex-col text-[#00000045] gap-2 rounded-lg">
              Est. Post Price
              <span className="text-black text-xl">$6.6K</span>
            </div>
          </div>
          <div className="flex flex-col p-4 border border-gray-200 rounded-lg w-full">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-lg md:text-xl font-[600]">Shitcoin Alchemist</span>
              <p className="text-base text-gray-300">
                Some people call me Nostradamus's 7th Son. I often miss the tops but never miss a
                play.
              </p>
            </div>
            <div className="pt-4">
              <span className="md:text-[18px]">Content Categories</span>
              <p className="text-gray-300">Crypto</p>
            </div>
          </div>
          <div className="flex md:hidden flex-col w-full">
            <button className="w-full py-2 bg-primary text-white rounded-xl mb-2 border border-primary">
              Add to Cart
            </button>
            <button className="w-full border border-gray-300 py-2 rounded-xl transition-all ease-in-out font-[600]">
              Book a demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
