import React from "react";
import Image from "next/image";

export default function Ecosystem() {
  return (
    <div className="bg-[#FE8616] relative py-86px innerpage_bgsquare_bottom innerpage_bg_vertial_pattern h-full">
      <div className="max-w-7xl mx-auto px-4 w-full relative z-1 flex items-center flex-col lg:flex-row gap-12 sm:gap-11">
        <div className="mt-[180px] lg:mt-0 relative z-1 text_pattern max-w-400px text-center sm:text-left text-4xl leading-tight lg:text-5xl lg:leading-58 font-extrabold">
          Our <br /> Top Performing Creators
        </div>
        <div className="relative z-1 w-full h-full">
          <div className="w-full flex  flex-col gap-4">
            <div className="w-full grid grid-cols-4 max-h-[250px] h-full gap-4">
              <Image
                src="/images/flm1.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
              <Image
                src="/images/flm2.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
              <Image
                src="/images/flm3.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
              <Image
                src="/images/flm4.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
            </div>
            <div className="w-full grid grid-cols-4 max-h-[250px] h-full gap-4">
              <Image
                src="/images/flm5.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
              <Image
                src="/images/flm6.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
              <Image
                src="/images/flm7.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
              <Image
                src="/images/flm8.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
            </div>
            <div className="w-full grid grid-cols-12 gap-2 md:gap-6 h-full">
              <div className="col-span-6">
                <Image
                  src="/images/flm9.png"
                  alt="AI in Business Podcast"
                  width={800}
                  height={400}
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200 max-h-[200px]"
                />
              </div>

              <div className="col-span-6">
                <Image
                  src="/images/flm10.png"
                  alt="Futurepedia"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200 max-h-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
