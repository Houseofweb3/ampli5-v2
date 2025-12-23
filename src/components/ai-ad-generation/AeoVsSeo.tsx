import React from "react";
import Image from "next/image";

const AeoVsSeo: React.FC = (): JSX.Element => {
  return (
    <div className="relative bg-[#FA51A2]  overflow-hidden min-h-[450px]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 lg:py-20">
        <div className="h-full w-full flex  items-stretch justify-evenly">
          <div className="h-full text-center">
            <h2 className="text_pattern"> AI Ads</h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">Ampli5 gives you 5 Ideas.</p>
              <p className="text-white">Ampli5 has a TAT of 72 hours</p>
              <p className="text-white">
                Ampli5 has an SLM to learn from the most viral hooks
              </p>
            </div>
          </div>
          <div className="h-full text-center">
            <h2 className="text_pattern"> vs</h2>
            <div className="mt-10">
              <Image
                src="/pattern/Star-white.png"
                alt="aeo-vs-seo"
                width={100}
                height={100}
                className="h-full sm:block hidden"
              />
            </div>
          </div>
          <div className="h-full text-center ">
            <h2 className="text_pattern"> Traditional</h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">Traditional teams give one idea.</p>
              <p className="text-white">
                Traditional agencies take 72 hours to start production
              </p>
              <p className="text-white">
                Traditional agencies use CHAT GPT to write scripts with poor
                prompt engineering skills
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AeoVsSeo;
