'use client';

import { useEffect } from 'react';

export default function AppointmentButton() {
  useEffect(() => {
    const loadLemcalScript = () => {
      // Prevent multiple script loads
      if (document.getElementById('lemcal-script')) return initLemcal();

      const script = document.createElement('script');
      script.src = 'https://cdn.lemcal.com/lemcal-integrations.min.js';
      script.id = 'lemcal-script';
      script.async = true;
      script.onload = () => {
        initLemcal();
      };
      document.body.appendChild(script);
    };

    const initLemcal = () => {
      if (window.Lemcal) {
        window.Lemcal.init();
      }
    };

    loadLemcalScript();
  }, []);

  return (
    <div
      class="lemcal-embed-button my-8 md:my-14"
      data-user="usr_dkaCWS9H7QvTQN8nP"
      data-meeting-type="met_kCDPcSFktqbotx26B"
    ></div>
  );
}
