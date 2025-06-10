'use client';

import React, { useEffect } from 'react';

const AppointmentButton: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lemcal.com/lemcal-integrations.min.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Optional: Cleanup if needed
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="lemcal-embed-button my-8 md:my-14"
      data-user="usr_dkaCWS9H7QvTQN8nP"
      data-meeting-type="met_kCDPcSFktqbotx26B"
    ></div>
  );
};

export default AppointmentButton;
