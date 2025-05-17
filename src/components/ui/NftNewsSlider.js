"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Image from 'next/image';

// import required modules
import { Autoplay} from 'swiper/modules';
export default function NftNewsSlider() {
  return (
    <div className='mt-6 lg:mt-48px'>
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
        <div className='rounded-2xl overflow-hidden relative'>
           <Image className='aspect-retro w-full h-full object-cover' src={'/images/Nft-slide.png'}  width={225} height={278}  alt="image" /> 
          <div className=' absolute bottom-5 px-18px'>
            <h4 className='text-18 text-white font-extrabold'>Crypto Casey</h4>
            <div className='text-14 text-white font-medium'>
              <p>Crypto podcast</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='rounded-2xl overflow-hidden relative'>
           <Image className='aspect-retro w-full h-full object-cover' src={'/images/Nft-slide.png'}  width={225} height={278}  alt="image" /> 
          <div className=' absolute bottom-5 px-18px'>
            <h4 className='text-18 text-white font-extrabold'>Blockchain Basics</h4>
            <div className='text-14 text-white font-medium'>
              <p>Educational series</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='rounded-2xl overflow-hidden relative'>
           <Image className='aspect-retro w-full h-full object-cover' src={'/images/Nft-slide.png'}  width={225} height={278}  alt="image" /> 
          <div className=' absolute bottom-5 px-18px'>
            <h4 className='text-18 text-white font-extrabold'>DeFi Dive</h4>
            <div className='text-14 text-white font-medium'>
              <p>Exploring decentralized <br/> finance</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='rounded-2xl overflow-hidden relative'>
           <Image className='aspect-retro w-full h-full object-cover' src={'/images/Nft-slide.png'}  width={225} height={278}  alt="image" /> 
          <div className=' absolute bottom-5 px-18px'>
            <h4 className='text-18 text-white font-extrabold'>NFT News Network</h4>
            <div className='text-14 text-white font-medium'>
              <p>Latest in non-fungible <br/> tokens</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='rounded-2xl overflow-hidden relative'>
           <Image className='aspect-retro w-full h-full object-cover' src={'/images/Nft-slide.png'}  width={225} height={278}  alt="image" /> 
          <div className=' absolute bottom-5 px-18px'>
            <h4 className='text-18 text-white font-extrabold'>Altcoin Academy</h4>
            <div className='text-14 text-white font-medium'>
              <p>Alternative <br/> cryptocurrencies</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='rounded-2xl overflow-hidden relative'>
           <Image className='aspect-retro w-full h-full object-cover' src={'/images/Nft-slide.png'}  width={225} height={278}  alt="image" /> 
          <div className=' absolute bottom-5 px-18px'>
            <h4 className='text-18 text-white font-extrabold'>Market Update Minute</h4>
            <div className='text-14 text-white font-medium'>
              <p>Daily crypto market <br/> insights</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='rounded-2xl overflow-hidden relative'>
           <Image className='aspect-retro w-full h-full object-cover' src={'/images/Nft-slide.png'}  width={225} height={278}  alt="image" /> 
          <div className=' absolute bottom-5 px-18px'>
            <h4 className='text-18 text-white font-extrabold'>The HODL Podcast</h4>
            <div className='text-14 text-white font-medium'>
              <p>Long-term investment <br/> strategies</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      
     
        
      </Swiper>
    </div>
  )
}
