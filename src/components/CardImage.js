import Image from 'next/image'
import React from 'react'

export default function CardImage() {
  return (
    <div>
        <div className='cadimage_list_item border border-solid border-black w-fit rounded-[36px] bg-white'>
            <div className='cadimage_list_item_img w-[calc(100% - 2rem)] h-[calc(100% - 2rem)] flex items-center justify-center rounded-[36px] bg-[#F9F9F9]'>
                <Image src={'/images/crypto-image-1.png'} width={253} height={258} alt='image1'/>
            </div>
            <div className='cadimage_list_item_text pt-2.5 pb-6 text-center'>
                <h4 className='font-bold text-black'>Wals</h4>
            </div>
        </div>
    </div>
  )
}
