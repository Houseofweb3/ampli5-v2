import Image from 'next/image'
import React from 'react'

export default function IconText() {
  return (
    <div className='max-w-[1200px] mx-auto px-9 xl:px-0'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-6">
            <div className="flex items-center flex-col sm:flex-row gap-4">
                <div className='p-4 border border-solid border-black rounded-2xl bg-[#106FE8]  flex-shrink-0 w-82px h-82px flex items-center justify-center'>
                    <Image src={'/icons/icon-01.png'} width={'48'} height={48} alt='icon1' />
                </div>
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold text-black text-center sm:text-left">
                    <h2 className='font-extrabold leading-tight'>68</h2>
                    <p>inhouse content creators</p>
                </div>
            </div>
            <div className="flex items-center flex-col sm:flex-row gap-4">
                <div className='p-4 border border-solid border-black rounded-2xl bg-[#106FE8]  flex-shrink-0 w-82px h-82px flex items-center justify-center'>
                    <Image src={'/icons/icon-02.png'} width={'48'} height={48} alt='icon2' />
                </div>
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold text-black text-center sm:text-left">
                    <h2 className='font-extrabold leading-tight'>500+</h2>
                    <p>Nano KOLs</p>
                </div>
            </div>
            <div className="flex items-center flex-col sm:flex-row gap-4">
                <div className='p-4 border border-solid border-black rounded-2xl bg-[#106FE8] w-fit flex-shrink-0 w-82px h-82px flex items-center justify-center'>
                    <Image src={'/icons/icon-03.png'} width={'48'} height={48} alt='icon3' />
                </div>
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold text-black text-center sm:text-left">
                    <h2 className='font-extrabold leading-tight'>50+</h2>
                    <p>Campaigns Executed</p>
                </div>
            </div>
            <div className="flex items-center flex-col sm:flex-row gap-4">
                <div className='p-4 border border-solid border-black rounded-2xl bg-[#106FE8] w-fit flex-shrink-0 w-82px h-82px flex items-center justify-center'>
                    <Image src={'/icons/icon-04.png'} width={'48'} height={48} alt='icon4' />
                </div>
                <div className="grid_content_info text-20 lg:text-32 leading-10 font-extrabold text-black text-center sm:text-left">
                    <h2 className='font-extrabold leading-tight'>$235,000</h2>
                    <p>Distributed</p>
                </div>
            </div>
        </div>
    </div>
  )
}
