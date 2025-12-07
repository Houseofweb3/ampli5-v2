import Image from "next/image";
import React from "react";



const WhyCreatorsLove: React.FC = (): JSX.Element => {
  return (
    <div className="bg-[#FA51A2] relative pt-8 pb-30px md:pb-86px  bg_horizontal_pattern">
      <div className="overflow-hidden py-14 lg:py-16 relative z-1">
        <h2 className="h2 text-center text_pattern mb-6 lg:mb-14">
          Why Creators Love <br /> Competing On Ampli5?
        </h2>
        <div className="card_grid max-w-1105px mx-auto px-9 xl:px-0 relative">
          <div className="icon_pattern absolute left-25px lg:-left-50px xl:-left-120px -top-80px lg:-top-60px">
            <Image
              className="w-33px h-70px object-contain lg:w-70px lg:h-146px hidden md:block"
              src={"/pattern/Vector5.png"}
              width={70}
              height={146}
              alt="pattern1"
            />
          </div>
          <div className="card_grid_inner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card flex flex-col gap-3 lg:gap-6 p-4 lg:p-6 bg-white border-4 border-[#7B46F8] text-black rounded-xl">
              <div className="card_img">
                <Image
                  className="w-auto h-28 object-contain mr-auto"
                  src={"/icons/award.png"}
                  width={297}
                  height={257}
                  alt="img1"
                />
              </div>
              <h3 className="card_title text-20 lg:text-32 leading-10 font-extrabold text-black">
                Launch A Bounty
              </h3>
              <div className="card_desc">
                <p>Top spots = highest payouts.</p>
              </div>
            </div>
            <div className="card flex flex-col lg:gap-6 p-4 lg:p-6 bg-white border-4 border-[#7B46F8] text-black rounded-xl">
              <div className="card_img ">
                <Image
                  src={"/icons/ranking.png"}
                  width={292}
                  height={257}
                  alt="img2"
                  className="w-auto h-28 object-contain mr-auto"
                />
              </div>
              <h3 className="card_title text-20 lg:text-32 leading-10 font-extrabold text-black">
                Fair Game
              </h3>
              <div className="card_desc">
                <p>No gatekeepers, no “brand favorites.”</p>
                <p>Leaderboard = merit.</p>
              </div>
            </div>
            <div className="card flex flex-col lg:gap-6 p-4 lg:p-6 bg-white border-4 border-[#7B46F8] text-black rounded-xl">
              <div className="card_img">
                <Image
                  className="w-auto h-28 object-contain mr-auto"
                  src={"/icons/think.png"}
                  width={297}
                  height={257}
                  alt="img3"
                />
              </div>
              <h3 className="card_title text-20 lg:text-32 leading-10 font-extrabold text-black">
                Real Skill Gets Rewarded
              </h3>
              <p className="card_desc">
                Great work wins. Simple. The better the content, the higher the
                reward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyCreatorsLove;
