'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Image from 'next/image';

// import required modules
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';
export default function NftNewsSlider() {
  return (
    <div className="mt-6 lg:mt-48px">
      <Swiper
        slidesPerView={6.1}
        spaceBetween={16}
        centeredSlides={true}
        centeredSlidesBounds={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1366: {
            slidesPerView: 6.1,
          },
          1024: {
            slidesPerView: 4.5,
          },
          767: {
            slidesPerView: 3.5,
          },
          640: {
            slidesPerView: 2.5,
          },
          575: {
            slidesPerView: 1.5,
          },
          375: {
            slidesPerView: 1.5,
          },
          0: {
            slidesPerView: 1.5,
          },
        }}
        modules={[Autoplay]}
        className="NFT_news_slider"
      >
        <SwiperSlide>
          <div className="rounded-2xl overflow-hidden relative">
            <Image
              className="aspect-retro w-full h-full object-cover"
              src={'/images/Nft-slide01.png'}
              width={225}
              height={278}
              alt="image"
            />
            <div className=" absolute bottom-0 w-full p-18px bg-linear-to-t from-black to-black-500">
              <Image
                className="mb-5px"
                src={'/icons/u-tube.png'}
                width={17}
                height={12}
                alt="image"
              />
              <Link
                className="underline text-white"
                href=" https://www.youtube.com/@FinTechChannels/featured"
              >
                <h4 className="text-18 text-white font-extrabold">Fintech Channel</h4>
              </Link>
              <div className="text-14 text-white font-medium">
                <p>AI, Defi</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-2xl overflow-hidden relative ">
            <Image
              className="aspect-retro w-full h-full object-cover"
              src={'/images/Nft-slide1.png'}
              width={225}
              height={278}
              alt="image"
            />
            <div className=" absolute bottom-0 w-full p-18px bg-linear-to-t from-black to-black-500">
              <Image
                className="mb-5px"
                src={'/icons/u-tube.png'}
                width={17}
                height={12}
                alt="image"
              />
              <Link
                className="underline text-white"
                href="https://www.youtube.com/@ProfessorCrypto/videos"
              >
                <h4 className="text-18 text-white font-extrabold">Professor Crypto</h4>
              </Link>
              <div className="text-14 text-white font-medium">
                <p>CEX/DEX, trading & Altcoins</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-2xl overflow-hidden relative">
            <Image
              className="aspect-retro w-full h-full object-cover"
              src={'/images/Nft-slide2.png'}
              width={225}
              height={278}
              alt="image"
            />
            <div className=" absolute bottom-0 w-full p-18px bg-linear-to-t from-black to-black-500">
              <Image
                className="mb-5px invert"
                src={'/icons/icon-x.png'}
                width={14}
                height={14}
                alt="image"
              />
              <Link className="underline text-white" href="https://x.com/JackNiewold">
                <h4 className="text-18 text-white font-extrabold">Decypher Podcast</h4>
              </Link>
              <div className="text-14 text-white font-medium">
                <p>Defi, altcoins</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-2xl overflow-hidden relative">
            <Image
              className="aspect-retro w-full h-full object-cover"
              src={'/images/Nft-slide4.png'}
              width={225}
              height={278}
              alt="image"
            />
            <div className=" absolute bottom-0 w-full p-18px bg-linear-to-t from-black to-black-500">
              <Image
                className="mb-5px"
                src={'/icons/u-tube.png'}
                width={17}
                height={12}
                alt="image"
              />
              <Link
                className="underline text-white"
                href="https://www.youtube.com/@MariaAndersenCrypto"
              >
                <h4 className="text-18 text-white font-extrabold">Maria Andersen Crypto</h4>
              </Link>
              <div className="text-14 text-white font-medium">
                <p>ALtcoins, Defi</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-2xl overflow-hidden relative">
            <Image
              className="aspect-retro w-full h-full object-cover"
              src={'/images/Nft-slide5.png'}
              width={225}
              height={278}
              alt="image"
            />
            <div className=" absolute bottom-0 w-full p-18px bg-linear-to-t from-black to-black-500">
              <Image
                className="mb-5px invert"
                src={'/icons/icon-x.png'}
                width={14}
                height={14}
                alt="image"
              />
              <Link className="underline text-white" href="https://x.com/WOLF_Financial">
                <h4 className="text-18 text-white font-extrabold">Wolf Financial</h4>
              </Link>
              <div className="text-14 text-white font-medium">
                <p> Trading, Altcoins</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-2xl overflow-hidden relative">
            <Image
              className="aspect-retro w-full h-full object-cover"
              src={'/images/Nft-slide6.png'}
              width={225}
              height={278}
              alt="image"
            />
            <div className=" absolute bottom-0 w-full p-18px bg-linear-to-t from-black to-black-500">
              <Image
                className="mb-5px"
                src={'/icons/u-tube.png'}
                width={17}
                height={12}
                alt="image"
              />
              <Link
                className="underline text-white"
                href="https://www.youtube.com/@DeFiTalks/videos"
              >
                <h4 className="text-18 text-white font-extrabold">Defi Talks</h4>
              </Link>
              <div className="text-14 text-white font-medium">
                <p>Defi, AI</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-2xl overflow-hidden relative">
            <Image
              className="aspect-retro w-full h-full object-cover"
              src={'/images/Nft-slide7.png'}
              width={225}
              height={278}
              alt="image"
            />
            <div className=" absolute bottom-0 w-full p-18px bg-linear-to-t from-black to-black-500">
              <Image
                className="mb-5px"
                src={'/icons/spotify.png'}
                width={17}
                height={12}
                alt="image"
              />
              <Link
                className="underline text-white"
                href="https://open.spotify.com/show/4AGqU8qxIYVkxXM4q2XpO1?si=b3024d5462354a9a&nd=1&dlsi=4e8575ccb2974380"
              >
                <h4 className="text-18 text-white font-extrabold">BlockHash</h4>
              </Link>
              <div className="text-14 text-white font-medium">
                <p>Defi, altcoins</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
