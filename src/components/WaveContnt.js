import Image from 'next/image'
import React from 'react'
import ExploreBtn from './ui/explorebtn'
import SecondaryButton from './ui/SecondaryButton'

export default function WaveContnt() {
  return (
    <div className='relative pt-56 sm:pt-147 pb-12 sm:pb-166px'>
        <div className='bg_wave_info max-w-835px mx-auto text-center px-4'>
            <div className='h2 max-w-610px mx-auto text-white pb-4'>
                Choose What You Create. Get Paid To express.
            </div>
            <p>Whether you write threads, create reels, or design memes — there’s a campaign for you.</p>
            <div className='flex justify-center items-center mt-9 lg:mt-60px max-w-full sm:max-w-180px mx-auto'>
              <SecondaryButton>
                  Explore
              </SecondaryButton>
            </div>
        </div>
    </div>
  )
}
