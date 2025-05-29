'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';
import Container from './ui/container';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { cn } from '@/lib/utils';

export default function EffectSlider({ data, direction, type, children }) {
  return (
    <div className=" w-full pt-48px lg:pt-70px py-48px ctm_effect_slider">
      <Container>
        {children}
        <div className="ctm_slider_block">
          <Marquee direction={direction}>
            {data.map((value, index) => (
              <Link
                key={index}
                href={value.link}
                target="_blank"
                className={cn(
                  'block overflow-hidden min-w-[320px] h-auto p-9px border border-solid border-black rounded-3xl  bg-slider-bg mx-2',
                  type === 'X' ? 'aspect-[5/4]' : 'aspect-video'
                )}
              >
                <Image
                  className="rounded-18 h-full w-full object-cover"
                  src={value.url}
                  width={367}
                  height={215}
                  alt="image "
                />
              </Link>
            ))}
          </Marquee>
        </div>
      </Container>
    </div>
  );
}
