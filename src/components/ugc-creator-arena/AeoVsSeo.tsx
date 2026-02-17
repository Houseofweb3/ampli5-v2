import React from "react";
import Image from "next/image";

const AeoVsSeo: React.FC = (): JSX.Element => {
  return (
    <div className="relative bg-[#FA51A2]  overflow-hidden min-h-[450px]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 lg:py-20">
        <div className="h-full w-full flex  items-stretch justify-evenly">
          <div className="h-full text-center">
            <h2 className="text_pattern">
              {" "}
              ECOSYSTEM <br /> PARTNERSHIPS
            </h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">Warm intros via creators and founders</p>
              <p className="text-white">
                Narrative-led pitches ecosystems resonate
                <br />
                with Faster integrations
              </p>
              <p className="text-white">Network effects that build TVL and AUM</p>
            </div>
          </div>
          <div className="h-full text-center">
            <h2 className="text_pattern"> vs</h2>
            <div className="mt-10">
              <Image
                src="/pattern/Star-white.png "
                alt="aeo-vs-seo"
                width={100}
                height={100}
                className="h-full sm:block hidden"
              />
            </div>
          </div>
          <div className="h-full text-center ">
            <h2 className="text_pattern ml-2">
              {" "}
              TRADITIONAL <br /> BD
            </h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">Cold outreach</p>
              <p className="text-white">Long cycles</p>
              <p className="text-white">No narrative alignment</p>
              <p className="text-white">Low conversion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AeoVsSeo;
