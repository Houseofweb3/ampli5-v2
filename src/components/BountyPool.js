'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { calculatePrizes } from '@/lib/bountyPoolCalculate';
import { Autoplay, } from 'swiper/modules';
import { cn } from '@/lib/utils';

export default function BountyPool({ Prize }) {
  const data = calculatePrizes(Prize);
  return (
    <div className="bg-cream-bg w-full pt-48px lg:pt-70px py-48px ctm_slider_block relative z-1">
      <div className=" w-full lg:pb-10 lg:mb-28px">
        <h2 className="h2 text-center">Bounty Pool</h2>
      </div>
      <Swiper
        slidesPerView={3.5}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSlideChange={(e)=>{console.log(e);
        }}
        modules={[ Autoplay]}
        breakpoints={{
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 50,
          },
          767: {
            slidesPerView: 2.5,
            spaceBetween: 40,
          },
          575: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
          375: {
            slidesPerView: 1.5,
            spaceBetween: 14,
          },
          0: {
            slidesPerView: 1.2,
            spaceBetween: 14,
          },
        }}
        className="Bounty_Pool !py-18 md:!py-30 lg:!py-50"
      >
        {data.map((vale, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className={cn(
                  'border border-solid border-black shadow-xl rounded-4xl bg-linear-to-br from-white ',
                  index === 0 && 'to-light-gold-bg',
                  index === 1 && 'to-light-silver-bg',
                  index === 2 && 'to-light-orange-bg',
                  index >= 3 && 'to-light-wood-bg',
                )}
              >
                <div className="flex h-full justify-between">
                  <div className="relative">
                    <Image src={vale.url} width={161} height={265} alt="badges" />
                  </div>

                  <div className="flex w-fit pt-9 pr-9">
                    <span className="text-right">
                      <strong className="h2">{vale.amount}</strong>
                      <small className="block h3">USDT</small>
                    </span>
                  </div>
                </div>
                <div className="pl-9 pb-9">
                  <h2 className="h2">{vale.percentage}%</h2>
                  <small className="text-16 leading-25px text-black/80">
                    of the total value of the prize Money
                  </small>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
