import Image from 'next/image'
import React from 'react'

export default function HowItWork() {
  return (
    <div className='relative overflow-hidden py-14 lg:py-16'>
      <div className="h2 text-center text_pattern mb-6 lg:mb-14">How it works?</div>
      <div className="card_grid max-w-[1104] mx-auto px-9 xl:px-0 relative">
        <div className='icon_pattern absolute left-[25px]  lg:-left-[50px] xl:-left-[120px] -top-[80px] lg:-top-[60px]'>
            <Image className='w-[33px] h-[70px] object-contain lg:w-[70px] lg:h-[146px]' src={'/pattern/Vector5.png'} width={70} height={146} alt='pattern1'/>
        </div>
        <div className="card_grid_inner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card flex flex-col gap-3 lg:gap-6 p-4 lg:p-6 bg-white border border-solid border-black">
              <div className="card_title text-20 lg:text-32 leading-10 font-extrabold text-black">Pick A Campaign You Like</div>
              <div className="card_desc">
                <p>Browse open contests from rising crypto startups.</p>
              </div>
              <div className="card_img">
                <Image src={'/images/grid-img1.png'} width={297} height={257} alt='img1' />
              </div>
            </div>
            <div className="card flex flex-col lg:gap-6 p-4 lg:p-6 bg-white border border-solid border-black">
              <div className="card_title text-20 lg:text-32 leading-10 font-extrabold text-black">Choose Your Content Type</div>
              <div className="card_desc">
                <p>Submit a Twitter thread, meme, video, reel, or short.</p>
              </div>
              <div className="card_img w-fit mx-auto">
                <Image src={'/images/grid-img2.png'} width={292} height={257} alt='img2' />
              </div>
            </div>
            <div className="card flex flex-col lg:gap-6 p-4 lg:p-6 bg-white border border-solid border-black">
              <div className="card_title text-20 lg:text-32 leading-10 font-extrabold text-black">Pick A Campaign You Like</div>
              <div className="card_desc">
                <p>Browse open contests from rising crypto startups.</p>
              </div>
              <div className="card_img w-fit mx-auto">
                <Image src={'/images/grid-img3.png'} width={164} height={238} alt='img3' />
              </div>
            </div>
        </div>
        <div className='icon_pattern absolute right-0 lg:-right-[22px] xl:-right-[55px] -bottom-[57px] lg:top-1.5'>
          <Image className='w-[44px] h-[94px] object-contain lg:w-[70px] lg:h-[146px]' src={'/pattern/Vector6.png'} width={70} height={146} alt='pattern2' />
        </div>
      </div>
    </div>
  );
}
