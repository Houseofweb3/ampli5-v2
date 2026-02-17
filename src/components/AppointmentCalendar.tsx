"use client";

import React, { useEffect } from "react";

const AppointmentCalendar: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="my-8 md:my-14 max-w-[350px] mx-auto sm:max-w-full sm:w-full rounded-2xl"
      style={{ minWidth: 320, height: 700 }}
    >
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/partnerships-houseofweb3/30min"
        style={{ minWidth: 320, height: 700 }}
      ></div>
    </div>
  );
};

export default AppointmentCalendar;
