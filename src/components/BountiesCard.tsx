import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '../lib/utils';
import { TimeLeft } from '../lib/TimeLeft';

interface BountyData {
  status: string;
  bountyName: string;
  metadata: {
    logo: string;
    resources?: {
      x?: string;
    };
  };
  endDate: string;
  yaps?: number;
  bountyType: string;
  prize: number;
  id: string;
}

export default function BountiesCard({ data }: { data: BountyData }) {
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
          <div className="flex items-center gap-1 w-full">
            <div className="flex-shrink-0 bg-gray-200 rounded-full">
              <Image
                src={data.metadata.logo}
                onError={(e) => ((e.target as HTMLImageElement).src = '/images/icon.png')}
                width={64}
                height={64}
                alt="xd-icon"
              />
            </div>
            <div className="w-[75%]">
              <h4 className="truncate w-full overflow-hidden whitespace-nowrap">
                {data.bountyName}
              </h4>
              <Link
                className="truncate w-full block text-sm text-ellipsis overflow-hidden whitespace-nowrap"
                href={data.metadata.resources?.x || '#'}
              >
                {data.metadata.resources?.x}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 lg:gap-6">
          <div className="flex flex-start">
            <div className="pr-3 flex-grow-1">
              <h5 className="mb-6px">Time Left</h5>
              <h4>{TimeLeft({ date: data.endDate, title: true })}</h4>
            </div>
            <div className=" px-3 border-l border-r border-solid border-black/20 flex-grow-1">
              <h5 className="mb-6px">Min. Yaps Req.</h5>
              <h4>{data?.yaps || '-'}</h4>
            </div>
            <div className="pl-3 flex-grow-1">
              <h5 className="mb-6px">Bounty Type</h5>
              <h4 className="capitalize">{data.bountyType}</h4>
            </div>
          </div>
          <div className=" flex justify-between w-full">
            <div className=" border border-solid border-black rounded-full py-2 px-4 text-16px font-semibold text-black flex items-center justify-center gap-1">
              <Image
                src="/icons/t-icon.png"
                height={24}
                width={24}
                alt="currency-icon"
                className="mr-2"
              />
              {Number(data.prize).toFixed(0)} <span className="uppercase">usdt</span>
            </div>
            <Link
              className="w-fit border  border-solid rounded-4xl border-black py-8px px-6 bg-white text-black text-14 lg:text-xl font-medium capitalize transition duration-300 ease-in-out flex items-center justify-center shadow-xl hover:bg-black hover:text-white hover:shadow-none cursor-pointer"
              href={'/bounty-hunt/details/' + data.id}
            >
              {data.status === 'closed' ? 'View' : ' Explore'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
