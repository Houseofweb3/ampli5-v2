import Image from 'next/image'
import React from 'react'

export default function LatestPerform() {
  return (
    <div className='py-60px lg:py-[147px] relative z-[1]'>
        <div className='bg_star_pattern text_pattern relative text-[#3EB59F] text-center text-4xl leading-tight lg:text-5xl lg:leading-[58px] font-extrabold pt-7 pb-16 px-7 w-fit mx-auto max-w-[300px] md:max-w-full'>Latest Performing Content</div>
        <div className='max-w-[1230px] mx-auto w-full px-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 masenory_grid'>
                <div className='p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit break-inside-avoid-column masenory_grid_item'>
                    <Image className='rounded-[18px]' src={'/images/content/image.png'} width={367} height={215} alt='image'/>
                </div>
                <div className='p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit break-inside-avoid-column masenory_grid_item'>
                    <Image className='rounded-[18px]' src={'/images/content/image1.png'} width={367} height={215} alt='image1'/>
                </div>
                <div className='p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit break-inside-avoid-column masenory_grid_item'>
                    <Image className='rounded-[18px]' src={'/images/content/image2.png'} width={367} height={215} alt='image1'/>
                </div>
                <div className='p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit break-inside-avoid-column masenory_grid_item'>
                    <Image className='rounded-[18px]' src={'/images/content/image3.png'} width={367} height={484} alt='image1'/>
                </div>
                <div className='p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit break-inside-avoid-column masenory_grid_item'>
                    <Image className='rounded-[18px]' src={'/images/content/image4.png'} width={367} height={644} alt='image1'/>
                </div>
                <div className='p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit break-inside-avoid-column masenory_grid_item'>
                    <Image className='rounded-[18px]' src={'/images/content/image5.png'} width={367} height={686} alt='image1'/>
                </div>
                <div className='p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit break-inside-avoid-column masenory_grid_item'>
                    <Image className='rounded-[18px]' src={'/images/content/image6.png'} width={367} height={758} alt='image1'/>
                </div>
                <div className='p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit break-inside-avoid-column masenory_grid_item'>
                    <Image className='rounded-[18px]' src={'/images/content/image7.png'} width={367} height={549} alt='image1'/>
                </div>
                <div className='p-9px border border-solid border-black rounded-3xl shadow-xl w-full sm:w-fit break-inside-avoid-column masenory_grid_item'>
                    <Image className='rounded-[18px]' src={'/images/content/image8.png'} width={367} height={631} alt='image1'/>
                </div>
                
            </div>
        </div>
    </div>
  )
}
