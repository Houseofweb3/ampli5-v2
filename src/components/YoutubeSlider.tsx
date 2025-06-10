'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';
import Container from './ui/container';
import { Navigation } from 'swiper/modules';

interface YoutubeSliderDataItem {
  url: string;
}

const YoutubeSlider: React.FC = () => {
  const YoutubeSliderData: YoutubeSliderDataItem[] = [
    {
      url: '/images/content/image.png',
    },
    {
      url: '/images/content/image1.png',
    },
    {
      url: '/images/content/image2.png',
    },
    {
      url: '/images/content/image.png',
    },
    {
      url: '/images/content/image1.png',
    },
    {
      url: '/images/content/image2.png',
    },
  ];
  return (
    <div className="bg-cream-bg w-full pt-48px lg:pt-70px py-48px">
      <Container>
        <h2 className="my-2">Youtube</h2>
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
          {YoutubeSliderData.map((value, index) => (
            <SwiperSlide key={index}>
              <div className=" p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit bg-white">
                <Image
                  className="rounded-18"
                  src={value.url}
                  width={367}
                  height={215}
                  alt="image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default YoutubeSlider;
