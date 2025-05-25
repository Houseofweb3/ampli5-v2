'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import dynamic from 'next/dynamic';
const AppointmentCalendar = dynamic(
  () => import('@/components/AppointmentCalendar'),
  { ssr: false } // Client-side only
);
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
        <Container>
          <div className=" lg:mt-22 mt-9 mb-22">
            <div className="bg-blue-btn sm:bg-transparent font-semibold text-white sm:text-black mx-auto w-fit rounded-full mb-4 py-3 px-5 border border-solid border-blue-btn lg:border-black text-14 lg:text-20 border-none shadow-none">
              Ambassador Program{' '}
            </div>

            <h1 className=" w-full text-center text-36 lg:text-72 leading-40 lg:leading-110 font-semibold">
              You need mercenaries,
              <br className="hidden md:block" />
              <span className=" text-blue-tx">
                not <br className="block md:hidden" /> cheerleaders
              </span>
            </h1>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute -top-9 right-44 -z-10">
              <Image
                className="w-103px h-103px object-contain"
                src={'/pattern/Vector2.png'}
                width={103}
                height={103}
                alt="icon"
              />
            </div>
            <Card className="rounded-2xl lg:py-6">
              <h2 className="text-green-bg text-center uppercase">
                Still trying to find ambassadors on zealy?{' '}
              </h2>
              <p className="text-20 text-center">
                You don’t need more airdrop hunters, You need people who will fight for your project
                like it’s their own bag.
              </p>
              <Card className="bg-light-cream-bg p-4 lg:p-6 mt-6 rounded-20">
                <h3 className="text-green-bg mb-4 text-24 font-semibold text-center">
                  OUR VETTING STACK
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-4 ">
                  <div className="gradient-border border-r px-4 space-y-2">
                    <h4 className="lg:text-black text-22">{`Tweet Scout score > 200`}</h4>
                    <p className="text-16">
                      We don't care about follower count. We care about followers who care.
                    </p>
                  </div>
                  <div className="gradient-border border-r-0 lg:border-r px-4 space-y-2">
                    <h4 className="text-22">{`15+ Kaito Yaps in 30 days`}</h4>
                    <p className="text-16">
                      They're not just tweeting, they're getting quoted, clapped back at, and memed.
                    </p>
                  </div>
                  <div className="gradient-border border-r px-4 space-y-2">
                    <h4 className="text-22">{`Project-native content`}</h4>
                    <p className="text-16">
                      No shapeshifters. If you're a DeFi protocol, we won't send you NFT bros.
                    </p>
                  </div>
                  <div className="px-4 space-y-2">
                    <h4 className="text-22">{`Consistency over flash`}</h4>
                    <p className="text-16">
                      We analyze their last 90 days of activity. No pump-and-dump promoters. No
                      ghostwriters. No one-hit wonders.
                    </p>
                  </div>
                </div>
              </Card>
            </Card>
          </div>
        </Container>
      </div>
      <div className="bg-cream-bg py-4 lg:py-18">
        <Container className="p-0">
          <div className="bg_blue_pattern py-8 lg:py-16 xl:rounded-2xl p-4 lg:px-14">
            <h1 className=" w-full text-white text-center text-32 lg:text-56 leading-40 lg:leading-60 font-semibold">
              You need Mercenaries,
              <br />
              <span className=" text-light-yellow-bg">not cheerleaders </span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-4 lg:gap-8 items-center my-9 lg:my-12">
              <Card className=" w-full border-1 rounded-3xl p-36px">
                <h3 className="font-extrabold">4K/month</h3>
                <p>Enlist 5 battle-tested defenders</p>
              </Card>
              <Card className=" w-full  border-1 rounded-3xl p-36px">
                <h3 className="font-extrabold">7.5K/2 months</h3>
                <p>Extended combat deployment</p>
              </Card>
            </div>
            <AppointmentCalendar />
          </div>
        </Container>
      </div>
    </div>
  );
}
