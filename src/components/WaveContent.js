import React from 'react';
import SecondaryButton from './ui/SecondaryButton';
import { useRouter } from 'next/navigation';

export default function WaveContent() {
  const router = useRouter();
  return (
    <div className="relative pt-56 sm:pt-473px pb-12 sm:pb-166px">
      <div className="bg_wave_info max-w-835px mx-auto text-center px-4">
        <div className="h2 max-w-610px mx-auto text-white pb-4">
          Choose What You Create. Get Paid To express.
        </div>
        <p>
          Whether you write threads, create reels, or design memes — there’s a campaign for you.
        </p>
        <div className="flex justify-center items-center mt-9 lg:mt-60px max-w-full sm:max-w-180px mx-auto">
          <SecondaryButton onClick={() => router.push('/bounty-hunt')}>Explore</SecondaryButton>
        </div>
      </div>
    </div>
  );
}
