import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ExploreBtn from './ui/explorebtn';

export default function BountiesCard() {
  const avatars = [
    '/thumbnail/image.png',
    '/thumbnail/image-1.png',
    '/thumbnail/image-2.png',
    '/thumbnail/image-3.png',
    '/thumbnail/image-4.png',
  ];
  return (
    <div className="border border-solid border-black  rounded-3xl bg-white p-4 lg:p-6 relative">
      <div className="bg-blue-bg text-white text-12 lg:text-14 leading-[14px] font-semibold rounded-tr-3xl rounded-bl-3xl w-max py-8px px-16px absolute -top-[1px] -right-[1px] capitalize">
        open
      </div>
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="flex items-center gap-8 lg:gap-6 justify-between">
          <div className="flex items-center gap-1">
            <div className="flex-shrink-0">
              <Image src={'/images/icon.png'} width={64} height={64} alt="xd-icon" />{' '}
            </div>
            <div >
              <h4>xDLOL</h4>
              <Link className="text_small" href="#">
                https://x.com/xDLOL
              </Link>
            </div>
          </div>
          <div className=" border border-solid border-black rounded-full py-[7px] px-[11px] text-16px font-semibold bg-[#6701EC] text-white flex items-center justify-center flex-shrink-0 flex-flex-1">
            2800 usdt
          </div>
        </div>
        <div className="flex flex-col gap-12 lg:gap-4">
          <div className=" flex items-start gap-4">
            <div className="flex-1/2">
              <h5 className="mb-[6px]">Time Left</h5>
              <h4>3 days</h4>
            </div>
            <div className="flex-1/2">
              <h5 className="mb-[6px]">No. of Submissions:</h5>
              <h4>43</h4>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <div className="flex-1/2">
              <h5 className="mb-[6px]">Time Left</h5>
              <h4>3 days</h4>
            </div>
            <div className="flex-1/2">
              <ExploreBtn >Explore</ExploreBtn>
              {/* <div className="flex justify-start -space-x-1.5">
                {avatars.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full bg-slate-100 ring-1 ring-white"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
