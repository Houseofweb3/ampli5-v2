import React from "react";
import Image from "next/image";

interface Step {
  number?: number;
  title: string;
  description: string;
  imageSrc: string;
}

interface StepsProps {
  STEPS: Step[];
}

const StepItem: React.FC<Step> = ({ number, title, description, imageSrc }) => (
  <div className="flex flex-row gap-4 md:gap-12 items-start h-full justify-center">
    <div
      className={`${
        number! % 2 !== 0 ? "order-1" : "order-3"
      } w-[40%] md:flex justify-center h-fit hidden`}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={150}
        height={150}
        objectFit="cover"
        className="w-full h-fit"
      />
    </div>

    <div className="flex justify-center w-[10%] md:w-[20%] order-2 h-full relative md:pt-16">
      <div className="w-7 h-7 border-2 border-primary rounded-full flex items-center justify-center z-[99]">
        <div className="w-4 h-4 bg-primary  rounded-full flex-shrink-0"></div>
      </div>
      <div
        className={`${
          number === 5 ? "hidden" : ""
        } absolute h-[550px] md:h-[450px] w-[2px]  bg-gray-200 z-[9]`}
      ></div>
    </div>

    <div
      className={`${
        number! % 2 !== 0 ? "md:order-3 order-2" : "md:order-1 order-2"
      } w-[90%] md:w-[40%] justify-center md:pt-16`}
    >
      <div className="flex flex-col h-fit">
        <span className="text-primary mb-2 text-base md:text-lg font-[700]">
          Step {number}
        </span>
        <h3 className="text-lg font-semibold mb-2 font-[600] text-lg md:text-xl">
          {title}
        </h3>
        <p className="text-gray-600 text-base md:text-lg">{description}</p>
      </div>
      <div className={` md:hidden justify-center h-fit flex`}>
        <Image
          src={imageSrc}
          alt={title}
          width={150}
          height={150}
          objectFit="cover"
          className="w-full h-fit mt-6"
        />
      </div>
    </div>
  </div>
);

const Steps: React.FC<StepsProps> = ({ STEPS }) => {
  return (
    <div className="h-fit">
      {STEPS.map((step, index) => (
        <StepItem key={index} {...step} number={index + 1} />
      ))}
    </div>
  );
};

export default Steps;
