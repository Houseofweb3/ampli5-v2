'use client';
import BountyPool from '@/components/BountyPool';
import BountyDetailsSkeleton from '@/components/ui/bountyDetailsSkeleton';
import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import ExploreBtn from '@/components/ui/explorebtn';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { BountiesType } from '@/data/data';
import axiosInstance from '@/lib/axiosInstance';
import { deadlineCounter } from '@/lib/deadlineCounter';
import { TimeLeft } from '@/lib/timeLeft';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function BountyDetailPage() {
  const { bounties_id } = useParams();
  const [bounty, setBounty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBounty = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/bounty/${bounties_id}`);
        setBounty(response.data.bounty);
      } catch (err) {
        console.error('Error fetching bounty:', err);
      } finally {
        setLoading(false);
      }
    };

    if (bounties_id) {
      fetchBounty();
    }
  }, [bounties_id]);

  return loading ? (
    <BountyDetailsSkeleton />
  ) : (
    <div>
      <div className="relative">
        <Image
          // src={bounty.metadata.coverImage}
          onError={(e) => (e.target.src = '/images/bounties-details-banner.png')}
          height={257}
          width={1440}
          alt="img"
          className="w-full h-257px object-cover bg-gray-400"
        />
      </div>
      <div className="bg_square relative bg-cream-bg">
        <Container>
          <div className="w-full relative flex flex-col">
            <Image
              src={bounty.metadata.logo}
              onError={(e) => (e.target.src = '/images/bounties-details-img.png')}
              height={141}
              width={141}
              alt="img"
              className="rounded-full w-80px h-80px md:w-141px md:h-141px border-2 border-white -mt-40px md:-mt-80px"
            />
            <div className="mb-8 ">
              <div>
                <h2 className="my-4">{bounty.bountyName}</h2>
                <div className="w-full sm:flex flex-wrap justify-between items-end gap-4">
                  <div className="flex flex-wrap gap-4">
                    <div
                      className={cn(
                        'w-fit text-white rounded-2xl py-2 px-3 flex gap-1.5 justify-between items-center border',
                        BountiesType[bounty.bountyType].bgcolor,
                        BountiesType[bounty.bountyType].borderColor
                      )}
                    >
                      <Image
                        src={BountiesType[bounty.bountyType].url}
                        height={24}
                        width={24}
                        alt="icon"
                      />
                      <span> {bounty.bountyType}</span>
                    </div>
                    <div className="w-fit text-black/45 rounded-2xl bg-white border border-black py-2 px-3 flex gap-1.5 justify-between items-center">
                      <Image src="/icons/clock-05.png" height={24} width={24} alt="icon" />
                      <span> {TimeLeft({ date: bounty.endDate, title: true })}</span>
                    </div>
                    <div className="w-fit text-white rounded-2xl bg-black border border-black py-2 px-3 flex gap-1.5 justify-between items-center">
                      <Image src="/icons/image-71.png" height={24} width={24} alt="icon" />
                      <span> 80 Yaps Req.</span>
                    </div>
                  </div>
                  <div className="sm:w-fit my-4 sm:my-0 border border-solid border-black rounded-full py-2 px-8 text-18  font-semibold bg-dark-purple-bg text-white flex items-center justify-center gap-1.5 flex-shrink-0 flex-flex-1">
                    <Image src="/icons/bitcoin-circle.png" height={24} width={24} alt="icon" />
                    {bounty.prize} USDT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="w-full">
          <Container className="pb-4px">
            <Card className="ctm_bounties_details p-4 lg:p-9 shadow-xl">
              <h2 className="text-36"> About the Project</h2>
              <p>{bounty.metadata.about}</p>
              <Link
                href={bounty.metadata.resources.website}
                className="font-medium text-18 pt-2 mb-9 flex items-center"
              >
                <ExploreBtn className="bg-yellow-bg hover:bg-white text-black/80 hover:text-black border-black shadow-xl px-4 lg:px-7 py-1.5 lg:py-3 text-14 md:text-18 w-full md:w-fit">
                  About Project - {bounty.metadata.resources.website}
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
                {Object.entries(bounty.metadata.founderTeam).map(([key, value], index) => (
                  <li key={index} className="grid grid-cols-2 gap-2 py-1 group text-14 lg:text-18">
                    <span className="font-bold">{key}</span>
                    <Link href={value.xUrl} className="flex items-center gap-2">
                      <span className="text-18 group-hover:text-yellow-bg transition-all duration-300 ease-in-out">
                        {value.name}
                      </span>
                      <Image
                        alt="Arrow"
                        width={1000}
                        height={1000}
                        className="w-6 h-5 py-2px px-1 border border-solid border-black rounded-full shadow-xl bg-yellow-bg group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                        src="/icons/arrow-up-right-01.png"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col md:flex-row gap-30px md:gap-9 mb-9">
                <div className="flex items-start flex-col flex-1 gap-2">
                  <h2>USP</h2>
                  <div className="bg-linear-to-r from-light-blue1-bg to-light-sky-blue-bg p-6 rounded-2xl w-full flex flex-col items-end gap-4">
                    <h3 className="font-normal w-full text-left">{bounty.metadata.USP}</h3>
                    <Image src={'/icons/pie-chart.png'} width={54} height={54} alt="icons" />
                  </div>
                </div>
                <div className="flex items-start flex-col gap-2  flex-1">
                  <h2>Mission Statement</h2>
                  <div className="bg-linear-to-r from-light-blue1-bg to-light-sky-blue-bg p-6 rounded-2xl w-full flex flex-col items-end gap-4">
                    <h3 className="font-normal w-full text-left">
                      {bounty.metadata.missionStatement}
                    </h3>
                    <Image src={'/icons/target.png'} width={54} height={54} alt="icons" />
                  </div>
                </div>
              </div>

              <div className="mb-9">
                <h2 className="mb-2">Key Features</h2>
                <ul className="p-0 m-0">
                  {bounty.metadata.keyFeatures.map((value, index) => (
                    <li key={index} className="list-none">
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-9">
                <h2 className="mb-2">Call to Action</h2>
                <ul className="p-0 m-0">
                  <li className="list-none">
                    <strong>{bounty.metadata.callToAction}</strong>
                  </li>
                  <li className="list-none">
                    Trade, stake, and build your on-chain reputation — the gods favor ZEUS.
                  </li>
                </ul>
              </div>
              <div className="">
                <h2>Resources</h2>
                <ul className="flex flex-col p-0 mt-4 w-fit mb-9">
                  {Object.entries(bounty.metadata.resources).map(([key, value], index) => (
                    <li key={index} className="flex gap-1 py-1 group">
                      <span className="font-bold capitalize">{key}:</span>
                      <Link href={value} className="flex gap-2">
                        <span className="text-18 group-hover:text-yellow-bg transition-all duration-300 ease-in-out break-words">
                          {value}
                        </span>
                        <Image
                          alt="Arrow"
                          width={1000}
                          height={1000}
                          className="w-6 h-5 py-2px px-1 border border-solid border-black rounded-full shadow-xl bg-yellow-bg group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                          src="/icons/arrow-up-right-01.png"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2>Bounties Inspiration</h2>
                <ul className="flex flex-col p-0 mt-4 w-fit mb-9">
                  <li className="flex flex-col md:flex-row gap-1 py-1 group">
                    <span className="font-bold">{bounty.metadata.contentInspiration}</span>
                    {/* <Link href="/team" className="flex items-center gap-2">
                      <span className="text-18 group-hover:text-yellow-bg transition-all duration-300 ease-in-out break-keep">
                       FIX THIS 
                      </span>
                      <Image
                        alt="Arrow"
                        width={1000}
                        height={1000}
                        className="w-6 h-5 py-2px px-1 border border-solid border-black rounded-full shadow-xl bg-yellow-bg group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                        src="/icons/arrow-up-right-01.png"
                      />
                    </Link> */}
                  </li>
                </ul>
              </div>
              <h2 className="mb-4">Do’s and Don’ts</h2>
              <div className="flex flex-col md:flex-row gap-4 mb-9">
                <div className="flex flex-1 items-start flex-col gap-2">
                  <div className="border border-solid border-black/15 p-6 rounded-2xl w-full flex flex-col gap-4">
                    <ul className="p-0 m-0 space-y-1.5">
                      {bounty.metadata.dos.map((vale, index) => (
                        <li key={index} className="list-none text-18 pb-1">
                          ✅ {vale}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-1 items-start flex-col gap-2">
                  <div className="border border-solid border-black/10 p-6 rounded-2xl w-full flex flex-col gap-4">
                    <ul className="p-0 m-0 space-y-1.5">
                      {bounty.metadata.dos.map((vale, index) => (
                        <li key={index} className="list-none text-18 pb-1">
                          ❌ {vale}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mb-9">
                <h2 className="mb-4">Deadline</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  {deadlineCounter({ date: bounty.endDate })}
                </div>
              </div>

              <div className="mb-9">
                <h2 className="mb-4">Rewards</h2>
                <div className="flex flex-row items-center gap-4 w-full p-6 border-1 border-solid border-black/15 rounded-3xl">
                  <span className="text-20 lg:text-24 ">🤑</span>
                  <small className="text-black/80 text-18 ">{bounty.prize} USDT </small>
                </div>
              </div>
              <div className="mb-9">
                <h2 className="mb-4">Submission</h2>
                <div className="flex flex-col w-full">
                  <label className="text-14 text-dark-gray-bg">
                    For video submissions, videos can be submitted only on Youtube and LinkedIn{' '}
                  </label>
                  <input
                    type="text"
                    className="bg-alabaster-bg border border-solid border-light-gray1-bg rounded-8 px-4 py-3.5 mt-4 w-full"
                    placeholder="https://x.com/yourthreadlink"
                  />
                </div>
                <PrimaryButton disabled={true} className="mt-4 text-white w-full md:w-fit py-3">
                  Submit
                </PrimaryButton>
              </div>
              <div className="mb-0">
                <h2 className="mb-4">Contact for Coordination</h2>
                <ul className="p-0 ">
                  {Object.entries(bounty.metadata.contactForCoordination).map(
                    ([key, value], index) => (
                      <li key={index} className="flex gap-1 py-1 group text-14 lg:text-18">
                        <span className="capitalize">{key}:</span>
                        <Link href={value} className="flex items-center gap-2">
                          <span className="text-18 group-hover:text-yellow-bg transition-all duration-300 ease-in-out">
                            {value}
                          </span>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Card>
          </Container>
          <BountyPool Prize={bounty.prize}></BountyPool>
        </div>
      </div>
    </div>
  );
}
