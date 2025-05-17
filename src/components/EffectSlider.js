'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';
import Container from './ui/container';
import { Navigation } from 'swiper/modules';

export default function EffectSlider({ data, children }) {
  return (
    <div className=" w-full pt-48px lg:pt-70px py-48px">
      <Container>
        {children}
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
            767: {
              slidesPerView: 3.5,
            },
            575: {
              slidesPerView: 2.5,
            },
            375: {
              slidesPerView: 1.5,
            },
            0: {
              slidesPerView: 1.2,
            },
          }}
        >
          {data.map((value, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-[5/3] overflow-hidden p-9px border border-solid border-black rounded-3xl w-full sm:w-fit bg-slider-bg">
                <Image
                  className="rounded-18 h-full w-full object-center"
                  src={value.url}
                  width={367}
                  height={215}
                  alt="image "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}
