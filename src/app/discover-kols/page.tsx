import AppointmentCalendar from "../../components/AppointmentCalendar";
import Container from "../../components/ui/container";
import { DEMO_POINTS } from "../../data/data";
import { CheckIcon } from "../../data/icon";
import React from "react";

export default function Page() {
  return (
    <div className="bg-white">
      <Container className="py-8 w-full h-full flex flex-col ">
        <div className=" font-Jakarta px-4 md:px-12 w-full flex flex-col gap-6 justify-center md:items-center pb-8">
          <div className="flex w-full items-center justify-center relative 2md:flex-row flex-col gap-4">
            <p className="text-gray-600 uppercase tracking-widest">Welcome</p>
          </div>
          <span className="font-semibold text-2xl md:text-5xl tracking-wider text-center">
            Discover Web3 Influencer
          </span>
        </div>
      </Container>

      <div className="bg-cream-bg py-4 lg:py-18">
        <Container className="p-0">
          <div className="bg_blue_pattern py-8 lg:py-16 xl:rounded-2xl p-4 lg:px-14 text-white">
            <div className=" px-4 py-6 md:px-6 md:py-12 rounded-2xl flex items-center flex-col gap-8 w-full ">
              <h1 className="leading-none max-w-3xl font-semibold text-center text-white">
                Request a<span className=""> personalised 30- minute</span> Detail Demo
              </h1>

              <p className=" text-center  text-lg  max-w-3xl">
                Discover How Ampi5 Can Supercharge Your Sales & Boost Awareness with Smarter
                Influencer Marketing
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 mb-12 gap-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-200 w-full">
                {DEMO_POINTS.map((point, index) => (
                  <div className="flex  items-start gap-2 px-5" key={index}>
                    <div className="w-fit">
                      <CheckIcon />
                    </div>
                    <span className="text-white text-lg font-semibold text-center">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <AppointmentCalendar />
          </div>
        </Container>
      </div>

      <div className="w-full h-full font-Jakarta p-4 md:p-12" id="demo"></div>
    </div>
  );
}
