"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const cardData = [
  {
    title: "Launch A Bounty",
    description:
      "State your brief. Set your reward pool. Your challenge enters the Arena.",
    image: "/images/arina1.png",
    width: 297,
    height: 257,
    alt: "Launch A Bounty",
  },
  {
    title: "Ampli5 Distributes It To Active Creators",
    description:
      "Creators looking to win; not just show up; start studying your brief.",
    image: "/images/arina2.png",
    width: 292,
    height: 257,
    alt: "Ampli5 Distributes",
  },
  {
    title: "Creators Compete To Win The Leaderboard",
    description:
      "They submit their best collaboration video. They iterate. They fight to outperform others.",
    image: "/images/arina3.png",
    width: 297,
    height: 257,
    alt: "Creators Compete",
  },
];

const CampaignEnters: React.FC = (): JSX.Element => {
  return (
    <div className="bg-[#A609F0]">
      <div className="relative overflow-hidden py-14 lg:py-16">
        <h2 className="h2 text-center text_pattern !text-[#D6FFF6] mb-6 lg:mb-14">
          How Your Campaign Enters The Arena?
        </h2>
        <div className="card_grid max-w-7xl mx-auto px-4 xl:px-0 relative">
          <div className="icon_pattern absolute left-25px lg:-left-50px xl:-left-120px -top-80px lg:-top-60px z-0">
            <Image
              className="w-33px h-70px object-contain lg:w-70px lg:h-146px"
              src={"/pattern/Vector5.png"}
              width={70}
              height={146}
              alt="pattern1"
            />
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-[#BDF522]",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination]}
            className="campaign-enters-swiper"
          >
            {cardData.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="card flex flex-col gap-3 lg:gap-6 p-4 lg:p-6 bg-white border-2 border-solid border-black rounded-xl shadow-lg h-full items-stretch">
                  <div className="card_title text-20 lg:text-32 leading-10 font-extrabold text-black">
                    {card.title}
                  </div>
                  <div className="card_img mt-auto">
                    <Image
                      className="w-full  h-full min-h-[300px] object-contain mx-auto aspect-square"
                      src={card.image}
                      width={1000}
                      height={1000}
                      alt={card.alt}
                    />
                  </div>
                  <div className="card_desc ">
                    <p>{card.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center text-white px-4 mt-12">
            <p className="text-lg md:text-xl font-light">
              Winners earn from the prize pool.
            </p>
            <p className="text-lg md:text-xl font-light">
              You get top-tier content that outperforms traditional influencer
              posts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignEnters;
