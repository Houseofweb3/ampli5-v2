import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import { TimeLeft } from '@/lib/timeLeft';

export default function BountiesCard({ data }) {
  return (
    <div
      className={cn(
        'border border-solid border-black  rounded-3xl  p-4 lg:p-6 relative',
        data.status === 'open' ? 'bg-white' : 'bg-bounties-bg'
      )}
    >
      <div className="bg-blue-bg text-white text-12 lg:text-14 leading-14 font-semibold rounded-tr-3xl rounded-bl-3xl w-max py-9px px-16px absolute -top-1px -right-1px capitalize">
        {data.status}
      </div>
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="flex items-center gap-8 lg:gap-6 justify-between">
          <div className="flex items-center gap-1">
            <div className="flex-shrink-0">
              <Image
                src={data.metadata.logo}
                onError={(e) => (e.target.src = '/images/icon.png')}
                width={64}
                height={64}
                alt="xd-icon"
              />
            </div>
            <div>
              <h4>{data.bountyName}</h4>
              <Link className="text_small text-ellipsis" href={data.metadata.resources.x}>
                {data.metadata.resources.x}
              </Link>
            </div>
          </div>
          <div className=" border border-solid border-black rounded-full py-7px px-11px text-16px font-semibold bg-dark-purple-bg text-white flex items-center justify-center flex-shrink-0 flex-flex-1">
            {Number(data.prize).toFixed(0)} usdt
          </div>
        </div>
        <div className="flex flex-col gap-12 lg:gap-4">
          <div className="flex flex-start">
            <div className="pr-3 flex-grow-1">
              <h5 className="mb-6px">Time Left</h5>
              <h4>{TimeLeft({ date: data.endDate })}</h4>
            </div>
            <div className=" px-3 border-l border-r border-solid border-black/20 flex-grow-1">
              <h5 className="mb-6px">Min. Yaps Req.</h5>
              <h4>80</h4>
            </div>
            <div className="pl-3 flex-grow-1">
              <h5 className="mb-6px">Bounty Type</h5>
              <h4 className="capitalize">{data.bountyType}</h4>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <div className="flex-1/2">
              <Link
                className="w-fit border  border-solid rounded-4xl border-black py-8px px-6 bg-white text-black text-14 lg:text-xl font-medium capitalize transition duration-300 ease-in-out flex items-center justify-center shadow-xl hover:bg-black hover:text-white hover:shadow-none cursor-pointer"
                href={'/bounties/details/' + data.id}
              >
                {data.status === 'closed' ? 'View' : ' Explore'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
