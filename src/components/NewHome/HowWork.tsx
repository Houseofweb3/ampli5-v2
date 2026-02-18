import Image from "next/image";
import React from "react";

const HowWork: React.FC = (): JSX.Element => {
  return (
    <div className=" py-14 lg:py-20 relative ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className=" !text-[#7B46F8] text-3xl sm:text-4xl lg:text-5xl pb-6 flex  gap-3 items-center justify-center">
            Why
            <Image
              src="/logo/ampli5.png"
              alt="ampli5"
              width={200}
              height={200}
              className="h-[30px] sm:h-[40px] lg:h-[50px] w-auto"
            />
            exists?
          </h2>
        </div>
        <p className="text-center max-w-xl mx-auto">
          The internet doesn’t reward effort. It rewards <b> frequency with consistency.</b>
          Great stories die every day because they appear once and disappear forever. Ampli5 exists
          to prevent that.
        </p>
      </div>
    </div>
  );
};

export default HowWork;
