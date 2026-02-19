"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

export const CLIENTS = [
  {
    img: "/clients/1.png",
  },
  {
    img: "/clients/2.png",
  },
  {
    img: "/clients/3.png",
  },
  {
    img: "/clients/4.png",
  },
  {
    img: "/clients/5.png",
  },
  {
    img: "/clients/6.png",
  },
  {
    img: "/clients/7.png",
  },
  {
    img: "/clients/8.png",
  },
  {
    img: "/clients/9.png",
  },
  {
    img: "/clients/10.png",
  },
  {
    img: "/clients/11.png",
  },
  {
    img: "/clients/12.png",
  },
  {
    img: "/clients/13.png",
  },
  {
    img: "/clients/14.png",
  },
  {
    img: "/clients/15.png",
  },
];

export default function BrandSlider() {
  return (
    <div className="bg-[#7B46F8] py-14 lg:py-16 relative ">
      <div className="absolute right-1/2 translate-x-1/2  -top-[60px]  z-1">
        <Image
          className="w-120px h-120px"
          src={"/pattern/group-star.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="relative z-[11]">
        <div className="flex justify-center items-start gap-4 w-full max-w-7xl mx-auto px-4 xl:px-0 relative">
          <h3 className="!text-white text-center text-20 sm:text-24 lg:text-32 pb-8 text_pattern">
            Our Partners
          </h3>
        </div>
        <Marquee className="flex items-center justify-between my-16">
          {CLIENTS.map((client, index) => {
            return (
              <div key={index} className="px-8 sm:px-12 lg:px-16 w-auto h-auto">
                <Image
                  src={client.img}
                  alt={client.img}
                  width={1000}
                  height={1000}
                  className={`w-auto ${index === 5 ? "md:h-[80px] h-[60px] " : "md:h-[50px] h-[40px] "}`}
                />
              </div>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
