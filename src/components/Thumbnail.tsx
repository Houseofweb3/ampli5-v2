"use client";

import React, { ReactNode } from 'react';
import { CaseStudyAmpli5Logo } from "../data/icon";

interface ThumbnailProps {
  heading?: string;
  date?: string;
  brandLogo?: ReactNode;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  heading = "Post-TGE sustenance campaign",
  date = "December, 2024",
  brandLogo = <CaseStudyAmpli5Logo />,
}) => {
  return (
    <div className="w-full h-full bg-[#A762FE]  flex flex-col justify-between p-8 rounded-lg gap-8">
      <div className="flex items-center flex-wrap justify-between ">
        <div className='flex-1 shrink'>
          <CaseStudyAmpli5Logo />
        </div>

        <div className='flex-1 shrink'>
          <svg
            width="auto"
            height="54"
            viewBox="0 0 67 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-40px mx-auto"
          >
            <path d="M5.75 6L60.75 61" stroke="white" strokeWidth="16"></path>
            <path d="M60.75 6L5.75 61" stroke="white" strokeWidth="16"></path>
          </svg>
        </div>
        <div className='flex-1 shrink'>
          {brandLogo}
        </div>
      </div>
      <div className="">
        <div className=" font-bold tracking-tighter text-white text-4xl">
          {heading}
        </div>
        <div className=" mt-8 text-lg tracking-tight text-white ">{date}</div>
      </div>
    </div>
  );
};

export default Thumbnail;
