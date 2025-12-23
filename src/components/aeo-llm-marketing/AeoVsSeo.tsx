import React from "react";
import Image from "next/image";

const AeoVsSeo: React.FC = (): JSX.Element => {
  return (
    <div className="relative bg-[#FA51A2]  overflow-hidden min-h-[450px]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 lg:py-20">
        <div className="h-full w-full flex  items-stretch justify-evenly">
          <div className="h-full text-center">
            <h2 className="text_pattern"> AEO</h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">AEO wins before the search begins</p>
              <p className="text-white">AEO plays with credibility</p>
              <p className="text-white">AEO improves answer share</p>
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
            <h2 className="text_pattern"> SEO</h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">SEO waits for people to search.</p>
              <p className="text-white">SEO plays with keywords.</p>
              <p className="text-white">SEO improves click traffic.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="nt-12">
        <Image
          src="/pattern/black-line-bottom.png"
          alt="aeo-vs-seo"
          width={1000}
          height={300}
          className=" w-full h-full max-h-[200px] md:max-h-[300px] aspect-square"
        />
      </div>
    </div>
  );
};

export default AeoVsSeo;
