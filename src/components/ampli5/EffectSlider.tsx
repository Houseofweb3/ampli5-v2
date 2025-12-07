'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { cn } from '@/src/lib/utils';
import Container from '../ui/container';

interface EffectSliderData {
  link: string;
  url: string;
}

interface EffectSliderProps {
  data: EffectSliderData[];
  direction?: 'left' | 'right';
  type?: string;
  children?: ReactNode;
}

const EffectSlider: React.FC<EffectSliderProps> = ({ data, direction = 'left', type, children }) => {
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
                  'block overflow-hidden w-[320px] h-full p-9px border border-solid border-black rounded-3xl  bg-slider-bg mx-2',
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
};

export default EffectSlider;
