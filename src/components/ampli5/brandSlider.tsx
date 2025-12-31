'use client';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

export default function BrandSlider(): JSX.Element {
  return (
    <div className="bg-white pb-8 lg:pb-16">
      <div className="brand_slider_title text-center pb-9 hidden lg:block">
        <p>Partner Brands</p>
      </div>
      <Marquee direction="right" className="flex items-center justify-between">
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/image-1.png"}
            width={162}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/image-2.png"}
            width={121}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/img1.png"}
            width={212}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/image-4.png"}
            width={151}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/image-5.png"}
            width={94}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/cabbage.png"}
            width={94}
            height={55}
            alt="image"
          />
        </div>

        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/image-1.png"}
            width={162}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/image-2.png"}
            width={121}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/img1.png"}
            width={212}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/image-4.png"}
            width={151}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/image-5.png"}
            width={94}
            height={55}
            alt="image"
          />
        </div>
        <div className="px-12 lg:px-16">
          <Image
            src={"/images/brand/cabbage.png"}
            width={94}
            height={55}
            alt="image"
          />
        </div>
      </Marquee>
    </div>
  );
} 