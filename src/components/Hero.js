import React from 'react'
import ExploreBtn from './ui/explorebtn';
import BrandSlider from './ui/brandSlider';
import MarqueeSlide from './ui/marquee';
import Image from 'next/image';
import HowItWork from './HowItWork';
import IconText from './Icontext';
import CardImage from './CardImage';
import LatestPerform from './LatestPerform';
import WaveContnt from './WaveContnt';

export default function Hero() {
  return (
    <>
    <div className="bg_square bg_square_bottom relative overflow-hidden">
      <div className="hue_aimations absolute top-18px md:top-9 lg:top-11 md:-left-7">
        <Image className='w-[90px] h-[90px] md:w-[166px] md:h-[166px]' src={'/pattern/Vector3_mobile.png'} width={166} height={166} alt="icon" />
      </div>
      <div className="hue_aimations absolute top-11 -right-5 md:-right-9">
        <Image className='w-[90px] h-[90px] md:w-[170px] md:h-[170px] object-contain' src={'/pattern/Vector4.png'} width={170} height={170} alt="icon" />
      </div>
      
      <div className="pt-28 xl:pt-32 2xl:pt-180px relative z-[1]">
        <div className="max-w-[1104px] mx-auto w-full pb-14 lg:pb-20">
          <div className="pb-4 lg:pb-7">
            <h1 className="xxl flex items-center flex-col">
              <div className="flex items-center gap-1">
                <span className=" border border-solid border-black rounded-full leading-[1] px-[11px] pb-1.5 bg-[#a476de] text-black flex items-center justify-center flex-shrink-0 flex-flex-1">
                  Monetize
                </span>
                Your
              </div>
              <span>Crypto Content</span>
            </h1>
          </div>
          <div className="hero_descript pb-16px lg:pb-28px">
            <p>Turn your post into profits</p>
          </div>
          <ExploreBtn className="bg-blue-btn text-white! hover:text-white mx-auto px-4 lg:px-7 py-1.5 lg:py-3 text-14 lg:text-20">
            Explore
          </ExploreBtn>
        </div>
      </div>

      <BrandSlider></BrandSlider>
      <MarqueeSlide></MarqueeSlide>
    </div>
    <div className='bg_blue_pattern'>
        <HowItWork></HowItWork>
    </div>

    <div className='grid_text bg-white pt-5 pb-12 md:py-14 lg:py-20'>
      <IconText></IconText>
    </div>
    <div className='bg-[#3EB59F] relative py-86px bgsquare_bottom bg_vertial_pattern'>
        <div className='max-w-[1198px] mx-auto px-4 w-full relative z-[1] flex items-center flex-col sm:flex-row gap-12 sm:gap-11'>
          <div className=' relative z-[1] text_pattern max-w-[400px] text-center sm:text-left text-4xl leading-tight lg:text-5xl lg:leading-[58px] font-extrabold'>Our <br/> Top attention generators</div>
          <div className='relative z-[1] grid grid-cols-2 lg:grid-cols-3 gap-4'>
            <CardImage></CardImage>
            <CardImage></CardImage>
            <CardImage></CardImage>
            <CardImage></CardImage>
            <CardImage></CardImage>
            <CardImage></CardImage>
            <CardImage></CardImage>
            <CardImage></CardImage>
            <CardImage></CardImage>
          </div>
        </div>
    </div>
    <div className='relative bg-white'>
      <div className='absolute -top-[72px] md:-top-24 left-0'>
        <Image className='w-[100px] lg:w-[150px] h-[150px] xl:w-fit h-fit' src={'/pattern/Vector7.png'} width={230} height={219} alt=''/>
      </div>
      <LatestPerform></LatestPerform>
    </div>

    <div className='bg_wave_pattern relative -mt-[100px] sm:-mt-[400px]'> 
      <WaveContnt></WaveContnt>
    </div>

    </>
  );
}
