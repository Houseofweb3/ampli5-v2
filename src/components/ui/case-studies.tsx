import React from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

const caseStudies = [
  {
    name: "sonic",
    img: "/images/brand/img4.png",
    metrics: [
      { value: "200 M", label: "opening day volume", hasBox: true },
      { value: "11%", label: "engagement", hasBox: true },
      { value: "10,000+", label: "unique wallet participation", hasBox: true },
    ],
    link: "https://www.figma.com/slides/77cXdKKz5klo5VarUU5nre/Ampli5-x-Sonic?node-id=16-1113&t=k9w2BcytCiJ1BAaL-1 ",
  },
  {
    name: "STOOPID CATS",
    img: "/images/brand/img2.png",
    metrics: [
      { value: "$6", label: "CAC", hasBox: true },
      { value: "500,000", label: "impressions", hasBox: true },
      { value: "1,000+", label: "SOL raised", hasBox: true },
    ],
    link: "https://www.figma.com/slides/X3loKETs3GTTWf5ea1KKfK/Ampli5-x-Stoopid-Cats?node-id=1-42&t=LpqX1fSphKXj5pUJ-0",
  },
  {
    name: "> router",
    img: "/images/brand/img3.png",
    metrics: [
      {
        value: "325,800",
        label: "YouTube views from partner creators",
        hasBox: false,
      },
      {
        value: "10,683",
        label: "referrals (exceeding the 5,000 target)",
        hasBox: false,
      },
      {
        value: "500+",
        label: "SOL raised in 48 hours during presale",
        hasBox: false,
      },
    ],
    link: "https://www.figma.com/slides/i8h2IqPK3kquq9aiR3Yr06/Ampli5-Campaign-Case-Study---Router-Protocol?t=BVyUEXdFiJNKkErC-0 ",
  },
  {
    name: "Delta. Exchange",
    img: "/images/brand/img6.png",
    metrics: [
      { value: "₹17 vs avg ₹680+", label: "CPC", hasBox: false },
      { value: "₹110 vs avg ₹4,000+", label: "CPM", hasBox: false },
    ],
    link: "https://www.figma.com/slides/KuJ4bC2ThJttp8Puu18b4u/Untitled?node-id=1-42&t=C6BmFjJoc9HJwRfn-0",
  },
  {
    name: "QuillAudits",
    img: "/images/brand/img8.png",
    metrics: [{ value: "20%", label: "more inbound leads", hasBox: true }],
    link: "#",
  },
  {
    name: "CABBAGE",
    img: "/images/brand/img7.png",
    metrics: [
      { value: "5%", label: "ER", hasBox: false },
      { value: "2%", label: "CTR", hasBox: false },
    ],
    link: "https://www.figma.com/slides/8Off2hngI8mPdOW6jq1fBY/Ampli5-x-Cabbage?node-id=1-42&t=iJlCDp4jTQlI9h8p-1",
  },
];

export default function CaseStudies() {
  return (
    <div className="bg-white py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-2 text-black">
            THE FASTEST GROWTH CHANNEL
          </h1>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-2 text-black">
            TODAY IS THE FOUNDER.
          </h1>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight text-[#7B46F8]">
            WE HELP YOU TURN IT ON.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 md:p-8 border-2 border-[#7B46F8] h-full"
            >
              <div className="flex  justify-between items-center w-full mb-6 md:mb-12">
                <div
                  className={cn(
                    "mr-auto  w-fit ",
                    index <= 3 ? "h-[40px]" : " h-[30px]"
                  )}
                >
                  <Image
                    src={study.img}
                    alt={study.name}
                    width={300}
                    height={100}
                    className="object-contain h-full w-full"
                  />
                </div>
                <Link
                  href={study.link}
                  target="_blank"
                  className="cursor-pointer text-[#7B46F8] hover:text-white  hover:bg-[#7B46F8] transition-all duration-300 ease-in-out border border-[#7B46F8] md:rounded-xl rounded-lg  w-fit h-fit p-1.5"
                >
                  <GoArrowUpRight className="text-xl sm:text-2xl" />
                </Link>
              </div>

              <div className={cn("flex flex-row gap-2 sm:gap-3 mt-auto")}>
                {study.metrics.map((metric, metricIndex) => (
                  <div
                    key={metricIndex}
                    className="bg-[#F8F8F8] p-2 md:p-4 rounded-lg flex flex-col items-center justify-center flex-1 overflow-hidden"
                  >
                    <div className=" text-base sm:text-lg md:text-xl font-extrabold text-black mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-light text-center line-clamp-2">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
