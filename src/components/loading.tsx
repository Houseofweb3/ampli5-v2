import React, { ReactElement } from "react";

const Loading = ({
  children,
  loading,
  height,
  isComponent = false,
  isTestimonial = false,
}: {
  children: ReactElement;
  loading: boolean;
  isComponent?: boolean;
  height?: number;
  isTestimonial?: boolean;
}) => {
  if (isTestimonial) {
    return (
      <div className="relative w-full h-full">
        <div
          className={`${
            loading ? "opacity-50" : "opacity-100"
          } w-full h-full transition-opacity duration-300 ease-in-out`}
        >
          {children}
        </div>
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            {isComponent ? (
              <div
                className={`sm:h-7 sm:w-7 h-6 w-6 border-[3px] rounded-full border-gray-300 border-t-[3px] border-t-black animate-spin`}
              ></div>
            ) : (
              <div style={{ height: height }} className="loader"></div>
            )}
          </div>
        )}
      </div>
    );
  } else {
    if (loading)
      return (
        <div className="w-full h-full flex justify-center items-center">
          {isComponent ? (
            <div
              className={`sm:h-7 sm:w-7 h-6 w-6 border-[3px] rounded-full border-gray-300 border-t-[3px] border-t-black animate-spin`}
            ></div>
          ) : (
            <div style={{ height: height }} className="loader"></div>
          )}
        </div>
      );
    else return children;
  }
};

export default Loading;
