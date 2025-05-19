import React from 'react';
import Image from 'next/image';
import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import SecondaryButton from '@/components/ui/SecondaryButton';
import NftNewsSlider from '@/components/ui/NftNewsSlider';

export default function pages() {

  return (
    <div>
      <div className="bg-cream-bg relative pt-56px pb-14 bg_square overflow-x-hidden ">
        <div className="hue_aimations absolute top-9 lg:top-20 lg:-left-7">
          <Image
            className="w-90px h-90px lg:w-166px lg:h-166px"
            src={'/pattern/Vector3_mobile.png'}
            width={166}
            height={166}
            alt="icon"
          />
        </div>
        <div className="hue_aimations absolute top-4 lg:top-20 -right-5 lg:-right-9">
          <Image
            className="w-90px h-90px lg:w-170px lg:h-170px object-contain"
            src={'/pattern/Vector4.png'}
            width={170}
            height={170}
            alt="icon"
          />
        </div>
        <div className="hidden lg:block absolute top-473px -right-9 ">
              <Image
                className="w-103px h-103px object-contain"
                src={'/pattern/Vector2.png'}
                width={103}
                height={103}
                alt="icon"
              />
          </div>
        <Container>
           
          <div className=" lg:mt-22 mt-9 mb-16 lg:mb-32">
            <div className=" bg-blue-btn sm:bg-transparent font-semibold text-white sm:text-black mx-auto w-fit rounded-full mb-4 py-3 px-5 border border-solid border-blue-btn lg:border-black text-14 lg:text-20 border-none shadow-none">
              Founder-led Marketing{' '}
            </div>

            <h1 className="w-full text-center text-36 lg:text-72 leading-40 lg:leading-tight font-semibold ">
              Be Heard Before {' '}
              <br className="hidden md:block" />
               You’re Bought
            </h1>
            <div className='text-center pt-4 lg:pt-6 pb-4 lg:pb-6'>
              <h2 className='font-normal'>Founder-Led Marketing, Powered by Ampli5</h2>
            </div>
            <div className='text-14 md:text-16 lg:text-18 leading-6 lg:leading-snug text-center max-w-300px mx-auto lg:max-w-full'>
              <p>Get featured on 10+ high-trust, high-distribution crypto podcasts.</p>
            </div>
          </div>
          <div className="relative">
           
            <Card className="rounded-2xl pt-8 pb-2 lg:py-0 px-6 lg:px-11">
              <div className='flex items-center flex-col gap-6 lg:gap-0 lg:flex-row'>
                <div className='w-full lg:w-1/2'>
                  <h2 className='text-32 leading-40px lg:text-36 leading-50px font-bold lg:max-w-430px'>Why Founder Voices Win in Web3:</h2>
                  <ul className='mt-32px flex flex-col gap-6'>
                    <li className='flex items-start lg:items-center gap-3'>
                      <Image src={'/icons/checkmark-badge.png'} width={24} height={24} alt="icon" />
                      <span className='text-18 lg:text-22 leading-28px lg:leading-normal'>Tokens don’t build trust—stories do.</span>
                    </li>
                    <li className='flex items-start lg:items-center gap-3'>
                      <Image src={'/icons/checkmark-badge.png'} width={24} height={24} alt="icon" />
                      <span className='text-18 lg:text-22 leading-28px lg:leading-normal'>People buy people, not pitch decks.</span>
                    </li>
                  </ul>
                </div>
                <div className='w-full lg:w-1/2'>
                  <Image src={'/images/OBJECTS.png'} width={569} height={473} alt="icon" />
                </div>
              </div>
            </Card>
            <div className='mt-12 lg:mt-118px'>
              <h2 className='text-32 lg:text-36 leading-36px lg:leading-50px text-left lg:text-center font-bold mb-6 lg:mb-55px text-balance'>What you really get?</h2>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                
                  <Card className="w-full">
                      <Image src={'/icons/podcast.png'} width={36} height={36} alt="icon" />
                      <div className='text-18 lg:text-20 leading-32px pt-2'>
                        <p>10 podcast appearances where builders, VCs & real users hang out.</p>
                      </div>
                  </Card>
                  <Card className="w-full">
                      <Image src={'/icons/video-camera-ai.png'} width={36} height={36} alt="icon" />
                        <div className='text-18 lg:text-20 leading-32px pt-2 max-w-473px'>
                          <p>Clips, quotables, & reels your BD team will thank you for.</p>
                        </div>
                  </Card>
              </div>
            </div>
           

          </div>
        </Container>
         <div>
              <NftNewsSlider></NftNewsSlider>
        </div>
      </div>
      <div className="bg-cream-bg py-4 lg:py-18">
        <Container className="p-0">
          <div className="bg_blue_pattern py-8 lg:py-16 xl:rounded-2xl p-4  lg:px-14">
            <h1 className=" w-full text-white text-center text-32 lg:text-56 leading-40 lg:leading-60 font-semibold ">
              This isn’t PR. 
              <br />
              <span className=" text-light-yellow-bg">It’s pre-suasion.</span>
            </h1>
            <div className='mt-22px'>
              <h2 className='text-18 lg:text-32 font-normal text-center text-white leading-tight'>
                You show up. We handle the rest. <br className='hidden lg:block'/> And your voice? It does what no whitepaper ever could.
              </h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4 lg:gap-8 items-center my-9 lg:my-12">
              <Card className=" w-full border-1 rounded-3xl p-36px">
                <h3 className="font-extrabold">4K/month</h3>
                <p>Enlist 5 battle-tested defenders</p>
              </Card>
              <Card className=" w-full  border-1 rounded-3xl p-9">
                <h3 className="font-extrabold">7.5K/2 months</h3>
                <p>Extended combat deployment</p>
              </Card>
            </div>

            <SecondaryButton className=" w-full md:w-fit mx-auto px-10">Try Ampli5</SecondaryButton>
          </div>
        </Container>
      </div>
    </div>
  );
}
