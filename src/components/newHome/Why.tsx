"use client";
import React from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const contentSlides = [
  {
    title: "1. Creator Bounty >  Paid Posts",
    description:
      "You are not paying for followers. You are rewarding the strongest creators. They compete for the top spot so every submission stays at its highest level.",
    image: "/images/slid1.png",
  },
  {
    title: "2. Competition Creates Better Content",
    description:
      "You are not paying for followers. You are rewarding the strongest creators. They compete for the top spot so every submission stays at its highest level.",
    image: "/images/slid2.png",
  },
  {
    title: "3. Outcomes You Can Trust",
    description:
      "One reward pool. Creators ranked by real performance. Incentives tied to meaningful KPIs so the strongest work wins.",
    image: "/images/slid3.png",
  },
];

const Why: React.FC = (): JSX.Element => {
  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0 py-8 sm:py-14 lg:py-16 relative overflow-hidden">
      <h2 className={cn("h2 text-center mb-6 lg:mb-14")}>
        Why Your Brand Deserves <br /> Competition Not Collabs?
      </h2>

      <div className="w-full">
        <Swiper
          modules={[EffectFade, Pagination, Autoplay]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={1000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="!pb-12"
        >
          {contentSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-stretch">
                <div className="w-full lg:w-1/2 order-2 lg:order-1">
                  <div className="relative w-full h-[400px] lg:h-[500px]">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-contain rounded-xl"
                      priority={index === 0}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 order-1 lg:order-2 flex items-center">
                  <div className="flex flex-col gap-4 lg:gap-6">
                    <h3
                      className={cn(
                        "h3 leading-10 font-extrabold mb-2 text-[#7B46F8]"
                      )}
                    >
                      {slide.title}
                    </h3>
                    <p className="text-black text-base lg:text-lg leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Why;
