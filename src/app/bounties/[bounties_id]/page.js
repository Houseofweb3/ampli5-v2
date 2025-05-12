import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import ExploreBtn from '@/components/ui/explorebtn';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div>
      <div className='h-[257px] w-full bg-[url("/images/bounties-details-banner.png")] bg-center '></div>
      <div className="bg_square relative bg-[#FDF4E9]  ">
        <Container>
          <div className="w-full ">
            <Image
              src="/images/bounties-details-img.png"
              height={141}
              width={141}
              alt="img"
              className="rounded-full w-[80px] h-[80px] md:w-[141px] md:h-[141px]  border-2 border-white "
            />
            <div className="mb-8 w-full sm:flex  justify-between items-end">
              <div>
                <h2 className="my-4">Helium Wars</h2>
                <div className="flex gap-4">
                  <div className="w-fit text-white rounded-2xl bg-[#FF543E] border border-[#A32313] py-2 px-3 flex gap-1.5 justify-between items-center">
                    <Image src="/icons/ai-video.png" height={24} width={24} alt="icon" />
                    <span> Video</span>
                  </div>
                  <div className="w-fit text-white rounded-2xl bg-[#FF543E] border border-[#A32313] py-2 px-3 flex gap-1.5 justify-between items-center">
                    <Image src="/icons/ai-video.png" height={24} width={24} alt="icon" />
                    <span> Video</span>
                  </div>
                  <div className="w-fit text-white rounded-2xl bg-[#FF543E] border border-[#A32313] py-2 px-3 flex gap-1.5 justify-between items-center">
                    <Image src="/icons/ai-video.png" height={24} width={24} alt="icon" />
                    <span> Video</span>
                  </div>
                </div>
              </div>
              <div className="sm:w-fit my-4 sm:my-0 border border-solid border-black rounded-full p-1 px-8 text-18 sm:text-24 font-semibold bg-[#6701EC] text-white flex items-center justify-center flex-shrink-0 flex-flex-1">
                2800 USDT
              </div>
            </div>
          </div>
        </Container>

        <div className="w-full">
          <Container>
            <Card className="p-6!">
              <h2 className="text-36"> About the Project</h2>
              <p>
                ZEUS Exchange is a fully on-chain perpetual DEX built on the Base network, designed
                for high-volume trading and long-term user retention through an SBT-based token
                model. The protocol has launched its testnet phase and is preparing for mainnet
                launch in Q2 2025.
              </p>
              <p>Key features already deployed include:</p>
              <ul>
                <li>Smart contract-based trading, liquidation, and staking</li>
                <li>Soulbound Token (SBT) reputation infrastructure</li>
                <li>
                  Retention-first tokenomics with airdrop distribution tied to staking and activity
                </li>
              </ul>
              <p>
                Next milestones include mainnet deployment, airdrop activation, and integration with
                attribution tools (Spindl, Layer3), followed by onboarding institutional liquidity
                providers and DAO-controlled incentives.
              </p>

              <Link href="/for-project" className="font-medium text-18">
                <ExploreBtn className="bg-[#E5DD04] hover:bg-white text-blue-black! hover:text-black border-black shadow-none px-4 lg:px-7  py-1.5 lg:py-3 text-14 md:text-18">
                  About Project - https://zeustrade.io/
                  <Image
                    alt="Arrow"
                    width={1000}
                    height={1000}
                    className="w-6 h-6 ml-2 hidden sm:block"
                    src="/icons/arrow-up-right-01.png"
                  />
                </ExploreBtn>
              </Link>
              <h2>Founder/Team</h2>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
}
