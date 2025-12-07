'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import Container from './container';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { cn } from '../../lib/utils';

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
    <div className=" w-full pt-14 lg:pt-20 ctm_effect_slider">
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
