import React from "react";
import Image from "next/image";

const AeoVsSeo: React.FC = (): JSX.Element => {
  return (
    <div className="relative bg-[#A609F0]  overflow-hidden min-h-[450px]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 lg:py-20">
        <div className="h-full w-full flex  items-stretch justify-evenly">
          <div className="h-full text-center">
            <h2 className="text_pattern">Founder Led </h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">
                Ampli5 puts you podcasts with 100 clipping distribution
              </p>
              <p className="text-white">
                Ampli5 sits with founders and sharpens the narrative until it
                cuts through.
              </p>
              <p className="text-white">
                Ampli5 builds distribution around your voice, creating organic
                search for the brand.
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
            <h2 className="text_pattern">Traditional</h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">
                Traditional agencies get on you on panels and create linkedin
                content alone.
              </p>
              <p className="text-white">
                Agencies are not invested in making the story more tight.
              </p>
              <p className="text-white">
                Traditional agencies can’t balance founder vs brand so both end
                up invisible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AeoVsSeo;
