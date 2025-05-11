import Image from 'next/image'
import React from 'react'
import ExploreBtn from './ui/explorebtn'

export default function WaveContnt() {
  return (
    <div className='relative pt-56 sm:pt-[473px] pb-12 sm:pb-[165px]'>
        <div className='bg_wave_info max-w-[835px] mx-auto text-center px-4'>
            <div className='h2 max-w-[610px] mx-auto text-white pb-4'>
                Choose What You Create. Get Paid To express.
            </div>
            <p>Whether you write threads, create reels, or design memes — there’s a campaign for you.</p>
            <ExploreBtn className="bg-white text-black hover:text-white mx-auto px-4 lg:px-7 py-1.5 lg:py-3 text-14 lg:text-20 mt-9 sm:mt-[60px] w-full sm:w-fit">
                Explore
            </ExploreBtn>
        </div>
    </div>
  )
}
