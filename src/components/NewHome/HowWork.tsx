import Image from "next/image";
import React from "react";

const HowWork: React.FC = (): JSX.Element => {
  return (
    <div className=" py-14 lg:py-20 relative ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 lg:mb-16 !text-[#7B46F8] flex items-center justify-center gap-1 gap-2 lg:gap-4">
            <span className="inline-block"> Why </span>
            <Image
              src="/logo/ampli5.png"
              alt="ampli5"
              width={100}
              height={100}
              className="inline-block h-[30px] sm:h-[40px] lg:h-[50px] w-auto"
            />
            <span className="inline-block"> exists?</span>
          </h2>
        </div>
        <p className="text-center max-w-xl mx-auto">
          The internet doesn’t reward effort. It rewards{" "}
          <b>frequency with consistency.</b> Great stories die every day because
          they appear once and disappear forever. Ampli5 exists to prevent that.
        </p>
      </div>
    </div>
  );
};

export default HowWork;
