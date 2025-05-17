import RequireAuth from '@/components/ProtectedAuth';
import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import ExploreBtn from '@/components/ui/explorebtn';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <RequireAuth>
      <div className="relative">
        <Image
          src="/images/bounties-details-banner.png"
          height={1440}
          width={257}
          alt="img"
          className="w-full h-257px object-cover"
        />
      </div>
      <div className="bg_square relative bg-cream-bg">
        <Container>
          <div className="w-full  relative flex flex-col">
            <Image
              src="/images/bounties-details-img.png"
              height={141}
              width={141}
              alt="img"
              className="rounded-full w-80px h-80px md:w-141px md:h-141px border-2 border-white -mt-40px md:-mt-80px "
            />
            <div className="mb-8 w-full sm:flex  justify-between items-end">
              <div>
                <h2 className="my-4">Helium Wars</h2>
                <div className="flex gap-4">
                  <div className="w-fit text-white rounded-2xl bg-orange-bg border border-dark-orange-bg py-2 px-3 flex gap-1.5 justify-between items-center">
                    <Image src="/icons/ai-video.png" height={24} width={24} alt="icon" />
                    <span> Video</span>
                  </div>
                  <div className="w-fit text-white rounded-2xl bg-orange-bg border border-dark-orange-bg py-2 px-3 flex gap-1.5 justify-between items-center">
                    <Image src="/icons/ai-video.png" height={24} width={24} alt="icon" />
                    <span> Video</span>
                  </div>
                  <div className="w-fit text-white rounded-2xl bg-orange-bg border border-dark-orange-bg py-2 px-3 flex gap-1.5 justify-between items-center">
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
            <Card className="ctm_bounties_details p-4! lg:p-9!">
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

              <Link href="/for-project" className="font-medium text-18 pt-2 mb-9 flex items-center">
                <ExploreBtn className="bg-[#E5DD04] hover:bg-white text-blue-black! hover:text-black border-black shadow-xl px-4 lg:px-7  py-1.5 lg:py-3 text-14 md:text-18 w-full md:w-fit">
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
              <ul className="flex flex-col p-0 mt-4 w-fit mb-9">
                <li className="grid grid-cols-2 gap-2 py-1 group text-14 lg:text-18">
                  <span className="font-bold">Founder & CEO -</span>
                  <Link href="/team" className="flex items-center gap-2">
                    <span className="text-18 group-hover:text-[#E5DD04] transition-all duration-300 ease-in-out">
                      {' '}
                      Stepan Belorybkin
                    </span>
                    <Image
                      alt="Arrow"
                      width={1000}
                      height={1000}
                      className="w-6 h-5 py-[2px] px-1 border border-solid border-black rounded-full shadow-xl bg-[#E5DD04] group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                      src="/icons/arrow-up-right-01.png"
                    />
                  </Link>
                </li>
                <li className="grid grid-cols-2 gap-2 py-1 group text-14 lg:text-18">
                  <span className="font-bold">CMO : </span>
                  <Link href="/team" className="flex items-center gap-2">
                    <span className="text-18 group-hover:text-[#E5DD04] transition-all duration-300 ease-in-out">
                      {' '}
                      Alex Volkov
                    </span>
                    <Image
                      alt="Arrow"
                      width={1000}
                      height={1000}
                      className="w-6 h-5 py-[2px] px-1 border border-solid border-black rounded-full shadow-xl bg-[#E5DD04] group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                      src="/icons/arrow-up-right-01.png"
                    />
                  </Link>
                </li>
                <li className="grid grid-cols-2 gap-2 py-1 group text-14 lg:text-18">
                  <span className="font-bold">CTO:</span>
                  <Link href="/team" className="flex items-center gap-2">
                    <span className="text-18 group-hover:text-[#E5DD04] transition-all duration-300 ease-in-out">
                      {' '}
                      Alex Volkov
                    </span>
                    <Image
                      alt="Arrow"
                      width={1000}
                      height={1000}
                      className="w-6 h-5 py-[2px] px-1 border border-solid border-black rounded-full shadow-xl bg-[#E5DD04] group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                      src="/icons/arrow-up-right-01.png"
                    />
                  </Link>
                </li>
              </ul>

              <div className="flex flex-col md:flex-row gap-30px md:gap-9 mb-9">
                <div className="flex items-start flex-col gap-2">
                  <h2>USP</h2>
                  <div className="bg-linear-to-r from-[#D8E9FF] to-[#93C2FF] p-6 rounded-2xl w-full flex flex-col items-end gap-4">
                    <h3 className="font-normal w-full text-left">
                      Fully on-chain perpetual trading with up to 50x leverage
                    </h3>
                    <Image src={'/icons/pie-chart.png'} width={54} height={54} alt="icons" />
                  </div>
                </div>
                <div className="flex items-start flex-col gap-2">
                  <h2>Mission Statement</h2>
                  <div className="bg-linear-to-r from-[#D8E9FF] to-[#93C2FF] p-6 rounded-2xl w-full flex flex-col items-end gap-4">
                    <h3 className="font-normal w-full text-left">
                      “Fully on-chain perpetual trading with up to 50x leverage”
                    </h3>
                    <Image src={'/icons/pie-chart.png'} width={54} height={54} alt="icons" />
                  </div>
                </div>
              </div>

              <div className="mb-9">
                <h2 className="mb-2">Key Features</h2>
                <ul className="p-0 m-0">
                  <li className="list-none">
                    Fully on-chain perpetual trading with up to 50x leverage
                  </li>
                  <li className="list-none">
                    SBT-based reputation system for on-chain identity and airdrop eligibility
                  </li>
                  <li className="list-none">
                    DAO governance and reward distribution tied to protocol usage
                  </li>
                </ul>
              </div>
              <div className="mb-9">
                <h2 className="mb-2">Call to Action</h2>
                <ul className="p-0 m-0">
                  <li className="list-none">
                    <strong>
                      Join ZEUS Exchange’s testnet today, mint your SBT, and start earning points
                      toward one of the most sustainable airdrops on Base.
                    </strong>
                  </li>
                  <li className="list-none">
                    Trade, stake, and build your on-chain reputation — the gods favor ZEUS.
                  </li>
                </ul>
              </div>
              <div className="">
                <h2>Founder/Team</h2>
                <ul className="flex flex-col p-0 mt-4 w-fit mb-9">
                  <li className="flex gap-1 py-1 group">
                    <span className="font-bold">Website:</span>
                    <Link href="/team" className="flex gap-2">
                      <span className="text-18 group-hover:text-[#E5DD04] transition-all duration-300 ease-in-out break-keep">
                        https://zeustrade.io
                      </span>
                      <Image
                        alt="Arrow"
                        width={1000}
                        height={1000}
                        className="w-6 h-5 py-[2px] px-1 border border-solid border-black rounded-full shadow-xl bg-[#E5DD04] group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                        src="/icons/arrow-up-right-01.png"
                      />
                    </Link>
                  </li>
                  <li className="flex gap-1 py-1 group">
                    <span className="font-bold">Website:</span>
                    <Link href="/team" className="flex gap-2">
                      <span className="text-18 group-hover:text-[#E5DD04] transition-all duration-300 ease-in-out break-keep">
                        {' '}
                        https://twitter.com/zeus_exchange
                      </span>
                      <Image
                        alt="Arrow"
                        width={1000}
                        height={1000}
                        className="w-6 h-5 py-[2px] px-1 border border-solid border-black rounded-full shadow-xl bg-[#E5DD04] group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                        src="/icons/arrow-up-right-01.png"
                      />
                    </Link>
                  </li>
                  <li className="flex gap-1 py-1 group">
                    <span className="font-bold">Docs:</span>
                    <Link href="/team" className="flex items-center gap-2">
                      <span className="text-18 group-hover:text-[#E5DD04] transition-all duration-300 ease-in-out break-keep">
                        {' '}
                        https://zeus-exchange.gitbook.io/white-paper-zeus-exchange
                      </span>
                      <Image
                        alt="Arrow"
                        width={1000}
                        height={1000}
                        className="w-6 h-5 py-[2px] px-1 border border-solid border-black rounded-full shadow-xl bg-[#E5DD04] group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                        src="/icons/arrow-up-right-01.png"
                      />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="">
                <h2>Bounties Inspiration</h2>
                <ul className="flex flex-col p-0 mt-4 w-fit mb-9">
                  <li className="flex flex-col md:flex-row gap-1 py-1 group">
                    <span className="font-bold">Read stories from ZEUS Exchange on Medium:</span>
                    <Link href="/team" className="flex items-center gap-2">
                      <span className="text-18 group-hover:text-[#E5DD04] transition-all duration-300 ease-in-out break-keep">
                        https://medium.com/@zeus_exchange
                      </span>
                      <Image
                        alt="Arrow"
                        width={1000}
                        height={1000}
                        className="w-6 h-5 py-[2px] px-1 border border-solid border-black rounded-full shadow-xl bg-[#E5DD04] group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                        src="/icons/arrow-up-right-01.png"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
              <h2 className="mb-4">Do’s and Don’ts</h2>
              <div className="flex flex-col md:flex-row gap-4 mb-9">
                <div className="flex items-start flex-col gap-2">
                  <div className="border border-solid border-[#0000001F] p-6 rounded-2xl w-full flex flex-col items-end gap-4">
                    <ul className="p-0 m-0">
                      <li className="list-none text-18 pb-1">
                        ✅ A sustainable alternative to mercenary-capital DEXs
                      </li>
                      <li className="list-none text-18 py-1">
                        ✅ A next-gen protocol with real DeFi primitives, not just token farming
                      </li>
                      <li className="list-none text-18">
                        ✅ A Base-native innovation for long-term user alignment
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start flex-col gap-2">
                  <div className="border border-solid border-[#0000001F] p-6 rounded-2xl w-full flex flex-col items-end gap-4">
                    <ul className="p-0 m-0">
                      <li className="list-none text-18 pb-1">
                        ❌ Referring to ZEUS as “just another perp DEX”
                      </li>
                      <li className="list-none text-18 py-1">
                        ❌ Overhyping the airdrop — it’s gated by real user behavior
                      </li>
                      <li className="list-none text-18">
                        ❌ Calling it custodial or semi-centralized — ZEUS is fully on-chain
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mb-9">
                <h2 className="mb-4">Deadline</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <ul className="p-0 m-0 grid grid-cols-3 text-center border border-solid border-[#000000] p-6 rounded-2xl max-w-[554px] w-full">
                    <li className="flex flex-col max-w-[148px] w-full">
                      <span className="text-20 lg:text-24 leading-[24px]">87</span>
                      <small className="text-[#00000073]">Day</small>
                    </li>
                    <li className="flex flex-col max-w-[148px] w-full px-4 border-x border-solid border-[#000000]">
                      <span className="text-20 lg:text-24 leading-[24px]">62</span>
                      <small className="text-[#00000073]">Hours</small>
                    </li>
                    <li className="flex flex-col max-w-[148px] w-full">
                      <span className="text-20 lg:text-24 leading-[24px]">45</span>
                      <small className="text-[#00000073]">Minutes</small>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-9">
                <h2 className="mb-4">Rewards</h2>
                <div className="flex flex-row  w-full p-6 border-1 border-solid border-[#0000001F] rounded-3xl">
                  <span className="text-20 lg:text-24 leading-[24px]">🤑</span>
                  <small className="text-[#000000CC] text-18 leading-[24px]">2,800 USDT </small>
                </div>
              </div>
              <div className="mb-9">
                <h2 className="mb-4">Submission</h2>
                <div className="flex flex-col w-full">
                  <label className="text-14 leading-[24px] text-[#5C6578]">
                    For video submissions, videos can be submitted only on Youtube and LinkedIn{' '}
                  </label>
                  <input
                    type="text"
                    className="bg-[#FAFAFA] border border-solid border-[#D0D5DD] rounded-[8px] px-4 py-3.5 mt-4 w-full"
                    placeholder="https://x.com/yourthreadlink"
                  />
                </div>
                <ExploreBtn className="mt-4 bg-[#7DB6FF] text-white hover:bg-white text-blue-black! hover:text-black border-black shadow-xl px-4 lg:px-7  py-1.5 lg:py-3  md:text-20 max-w-full sm:max-w-[204px] w-full">
                  Submit
                </ExploreBtn>
              </div>
              <div className="mb-0">
                <h2 className="mb-4">Contact for Coordination</h2>
                <ul className="p-0 ">
                  <li className="flex gap-1 py-1 group text-14 lg:text-18 leading-[24px]">
                    <span>Telegram:</span>
                    <Link href="/team" className="flex items-center gap-2">
                      <span className="text-18 group-hover:text-[#E5DD04] transition-all duration-300 ease-in-out">
                        @zeus_ceo
                      </span>
                    </Link>
                  </li>
                  <li className="flex gap-1 py-1 group text-14 lg:text-18 leading-[24px]">
                    <span>Email:</span>
                    <Link href="/team" className="flex items-center gap-2">
                      <span className="text-18 group-hover:text-[#E5DD04] transition-all duration-300 ease-in-out">
                        info@zeustrade.io
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Card>
          </Container>
        </div>
      </div>
    </RequireAuth>
  );
}
