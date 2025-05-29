'use client';

import { useEffect } from 'react';

export default function AppointmentCalendar() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lemcal.com/lemcal-integrations.min.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="lemcal-embed-booking-calendar  my-8 md:my-14 max-w-[350px] mx-auto sm:max-w-full  sm:w-full "
      data-user="usr_dkaCWS9H7QvTQN8nP"
      data-meeting-type="met_kCDPcSFktqbotx26B"
    ></div>
  );
}
