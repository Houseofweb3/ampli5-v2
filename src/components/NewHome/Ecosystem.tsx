import React from "react";
import Image from "next/image";

export default function Ecosystem() {
  return (
    <div className="bg-[#FE8616] relative py-86px innerpage_bgsquare_bottom innerpage_bg_vertial_pattern">
      <div className="max-w-7xl mx-auto px-4 w-full relative z-1 flex items-center flex-col lg:flex-row gap-12 sm:gap-11">
        <div className="mt-[180px] lg:mt-0 relative z-1 text_pattern max-w-400px text-center sm:text-left text-4xl leading-tight lg:text-5xl lg:leading-58 font-extrabold">
          Our <br /> Top Performing Creators
        </div>
        <div className="relative z-1 w-full">
          <div className="w-full flex  flex-col gap-4">
            <div className="w-full grid grid-cols-11 gap-2 md:gap-6 max-h-[250px] h-full">
              <div className="col-span-4">
                <Image
                  src="/images/ecosystem/1.png"
                  alt="Superhuman AI Newsletter"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200"
                />
              </div>

              <div className="col-span-3">
                <Image
                  src="/images/ecosystem/2.png"
                  alt="AI in Business Podcast"
                  width={800}
                  height={400}
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200"
                />
              </div>

              <div className="col-span-4">
                <Image
                  src="/images/ecosystem/3.png"
                  alt="Futurepedia"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200"
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-4 max-h-[250px] h-full gap-4">
              <Image
                src="/images/ecosystem/4.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
              <Image
                src="/images/ecosystem/5.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
              <Image
                src="/images/ecosystem/6.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
              <Image
                src="/images/ecosystem/7.png"
                alt="thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover flex-1  aspect-square"
              />
            </div>
            <div className="w-full grid grid-cols-11 gap-2 md:gap-6 max-h-[250px] h-full">
              <div className="col-span-3">
                <Image
                  src="/images/ecosystem/8.png"
                  alt="Superhuman AI Newsletter"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200"
                />
              </div>

              <div className="col-span-4">
                <Image
                  src="/images/ecosystem/9.png"
                  alt="AI in Business Podcast"
                  width={800}
                  height={400}
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200"
                />
              </div>

              <div className="col-span-4">
                <Image
                  src="/images/ecosystem/10.png"
                  alt="Futurepedia"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
