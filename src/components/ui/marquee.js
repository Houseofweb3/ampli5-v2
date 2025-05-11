'use client';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

export default function MarqueeSlide() {
  return (
    <div className="bg-[#FDF4E9] py-1.5 lg:py-9 relative z-[1]">
      <Marquee>
        <div className="flex items-center gap-6 mr-6">
          <Image src={'/icons/Star-1.png'} width={47} height={47} alt="star" />
          <h1>Your hot takes deserve hard cash</h1>
        </div>
        <div className="flex items-center gap-6 mr-6">
          <Image src={'/icons/Star-1.png'} width={47} height={47} alt="star" />
          <h1>Monetize or be monetized. Your call</h1>
        </div>
      </Marquee>
    </div>
  );
}
