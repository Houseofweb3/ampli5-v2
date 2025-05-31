"use client";

import { CaseStudyAmpli5Logo } from "@/data/icon";

const Thumbnail = ({
  heading = "Post-TGE sustenance campaign",
  date = "December, 2024",
  brandLogo = <CaseStudyAmpli5Logo />,
}) => {
  return (
    <div className="w-full h-full bg-[#A762FE]  flex flex-col justify-end p-4 rounded-lg gap-8">
      <div className="flex gap-6 items-center max-md:flex-wrap max-sm:gap-4 ">
        <div>
          <CaseStudyAmpli5Logo />
        </div>
        <div>
          <svg
            width="67"
            height="67"
            viewBox="0 0 67 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[55px] h-[55px]"
          >
            <path d="M5.75 6L60.75 61" stroke="white" strokeWidth="16"></path>
            <path d="M60.75 6L5.75 61" stroke="white" strokeWidth="16"></path>
          </svg>
        </div>
        {brandLogo}
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
