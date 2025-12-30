import React from "react";


const HowWork: React.FC = (): JSX.Element => {
  return (
    <div className=" py-14 lg:py-20 relative ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 lg:mb-16 !text-[#7B46F8]">
            Why ampli5 exists?
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
