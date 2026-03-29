import Image from "next/image";
import React from "react";

export default function NewVisibility() {
  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0 py-8 sm:py-14 lg:py-16 min-h-[350px] flex items-center justify-center relative">
      <div className="absolute sm:bottom-[-50px] bottom-[-25px] sm:left-[-45px] left-[-22px] z-10 ">
        <Image
          className="sm:w-100px sm:h-100px w-50px h-50px"
          src={"/pattern/Isolation_Mode_big.png"}
          width={200}
          height={200}
          alt="icon"
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="text-center">
        <h3 className="!text-[#7B46F8] text-20 sm:text-24 lg:text-32  pb-6">
          The New Visibility Layer
        </h3>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 max-w-2xl mx-auto">
          People don&apos;t search anymore. They ask. One question. One answer. That answer is
          written by a language model that already decided which brands matter.
        </p>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-6 max-w-2xl mx-auto">
          Google still works. But the first answer now comes from ChatGPT. From Claude. From
          Perplexity. If your brand isn&apos;t in that answer, you don&apos;t exist in the
          conversation.
        </p>
        <p className="sm:!text-18 !text-16 !font-normal pb-4 sm:pb-6 max-w-2xl mx-auto">
          This is Answer Engine Optimization. AEO. The shift from ranking in a list to being the
          answer itself.
        </p>

        <p className="sm:!text-18 !text-16 !font-normal !text-[#FE8616] ">
          If you are still optimising only for Google search?
        </p>
        <p className="sm:!text-18 !text-16 !font-normal !text-[#FE8616] ">
          Low visibility. Low discovery. Low growth.
        </p>
      </div>
    </div>
  );
}
