'use client'; // 👈 Add this line at the top

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Image from 'next/image';

export default function BountyPool() {
  return (
    <div className="bg-cream-bg w-full pt-48px lg:pt-70px py-48px ctm_slider_block relative z-1">
      <div className=" w-full lg:pb-10 lg:mb-28px">
        <h2 className='h2 text-center'>Bounty Pool</h2>
      </div>
      <Swiper
        slidesPerView={3.5}
        spaceBetween={30}
        centeredSlides={true}
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
        <SwiperSlide>
            <div className='border border-solid border-black shadow-xl rounded-4xl bg-linear-to-bl from-white to-light-goldan-bg'>
                <div className='flex h-full justify-between'>
                    <div className='bages_image'>
                        <Image src={'/images/badges.png'} width={161} height={265} alt='badges'/>
                    </div>
                    <div className='flex w-fit pt-9 pr-9'>
                        <span className='text-right'>
                            <strong className='h2'>700</strong>
                            <small className='block h3'>USDT</small>
                        </span>
                    </div>
                </div>
                <div className='pl-9 pb-9'>
                    <h2 className='h2'>25%</h2>
                    <small className='text-16 leading-25px text-black/80'>of the total value of the prize Money</small>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='border border-solid border-black shadow-xl rounded-4xl bg-linear-to-bl from-white to-light-goldan-bg'>
                <div className='flex h-full justify-between'>
                    <div className='bages_image'>
                        <Image src={'/images/badges-1.png'} width={161} height={265} alt='badges'/>
                    </div>
                    <div className='flex w-fit pt-9 pr-9'>
                        <span className='text-right'>
                            <strong className='h2'>504</strong>
                            <small className='block h3'>USDT</small>
                        </span>
                    </div>
                </div>
                <div className='pl-9 pb-9'>
                    <h2 className='h2'>18%</h2>
                    <small className='text-16 leading-25px text-black/80'>of the total value of the prize Money</small>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='border border-solid border-black shadow-xl rounded-4xl bg-linear-to-bl from-white to-light-goldan-bg'>
                <div className='flex h-full justify-between'>
                    <div className='bages_image'>
                        <Image src={'/images/badges.png'} width={161} height={265} alt='badges'/>
                    </div>
                    <div className='flex w-fit pt-9 pr-9'>
                        <span className='text-right'>
                            <strong className='h2'>700</strong>
                            <small className='block h3'>USDT</small>
                        </span>
                    </div>
                </div>
                <div className='pl-9 pb-9'>
                    <h2 className='h2'>14%</h2>
                    <small className='text-16 leading-25px text-black/80'>of the total value of the prize Money</small>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='border border-solid border-black shadow-xl rounded-4xl bg-linear-to-bl from-white to-light-goldan-bg'>
                <div className='flex h-full justify-between'>
                    <div className='bages_image'>
                        <Image src={'/images/badges.png'} width={161} height={265} alt='badges'/>
                    </div>
                    <div className='flex w-fit pt-9 pr-9'>
                        <span className='text-right'>
                            <strong className='h2'>700</strong>
                            <small className='block h3'>USDT</small>
                        </span>
                    </div>
                </div>
                <div className='pl-9 pb-9'>
                    <h2 className='h2'>14%</h2>
                    <small className='text-16 leading-25px text-black/80'>of the total value of the prize Money</small>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='border border-solid border-black shadow-xl rounded-4xl bg-linear-to-bl from-white to-light-goldan-bg'>
                <div className='flex h-full justify-between'>
                    <div className='bages_image'>
                        <Image src={'/images/badges.png'} width={161} height={265} alt='badges'/>
                    </div>
                    <div className='flex w-fit pt-9 pr-9'>
                        <span className='text-right'>
                            <strong className='h2'>700</strong>
                            <small className='block h3'>USDT</small>
                        </span>
                    </div>
                </div>
                <div className='pl-9 pb-9'>
                    <h2 className='h2'>14%</h2>
                    <small className='text-16 leading-25px text-black/80'>of the total value of the prize Money</small>
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

