import Image from "next/image";
import React from "react";

export default function WhatIsAeo() {
  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0 py-8 sm:py-14 lg:py-16 min-h-[350px] flex items-center justify-center relative bg-white">
      <div className="absolute sm:bottom-[-50px] bottom-[-25px] sm:left-[-45px] left-[-22px] z-10 ">
        <Image
          className="sm:w-100px sm:h-100px w-50px h-50px"
          src={"/pattern/Isolation_Mode_big.png"}
          width={200}
          height={200}
          alt=""
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="!text-[#7B46F8] text-20 sm:text-24 lg:text-32 pb-6">
          What is Answer Engine Optimization?
        </h3>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-6">
          AEO is the practice of making your brand the answer when someone asks an AI a question.
        </p>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-6">
          Traditional SEO gets you on a list of ten links. AEO gets you cited by name in a single
          definitive response. The user never scrolls. They never click through ten tabs. They read
          one answer and move on.
        </p>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-6">
          The models that generate these answers — ChatGPT, Claude, Perplexity, Gemini — pull from a
          web of signals. Published content. Community mentions. Authoritative backlinks. Structured
          data. Consistent narrative across multiple surfaces.
        </p>
        <p className="sm:!text-18 !text-16 !font-normal">
          AEO is not a hack. It is a signal architecture problem. And that is what we solve.
        </p>
      </div>
    </div>
  );
}
