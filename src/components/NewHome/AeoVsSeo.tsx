import React from "react";
import Image from "next/image";

const AeoVsSeo: React.FC = (): JSX.Element => {
  return (
    <div className="relative bg-[#FA51A2]  overflow-hidden min-h-[450px] py-14">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 lg:py-20">
        <div className="h-full w-full flex  items-stretch justify-evenly">
          <div className="h-full text-center">
            <h2 className="text_pattern"> Agencies</h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">Agencies sell effort.</p>
              <p className="text-white">They optimize content.</p>
              <p className="text-white">They hand you a creator list.</p>
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
          <div className="h-full text-center">
            <h2 className="text_pattern">Ampli5</h2>
            <div className="sm:space-y-8 space-y-4 mt-10">
              <p className="text-white">We sell terrain.</p>
              <p className="text-white">We optimize presence and recall.</p>
              <p className="text-white">
                We show you where your audience
                <br />
                already is and how attention moves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AeoVsSeo;
