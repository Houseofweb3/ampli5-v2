'use client';
import Image from 'next/image';
import Link from 'next/link';
import { nftNewsData } from '../../data/data';
import Marquee from 'react-fast-marquee';

interface NewsItem {
  image: string;
  icon: string;
  href: string;
  title: string;
  tags: string;
}

export default function NftNewsSlider(): JSX.Element {
  return (
    <div className="mt-6 lg:mt-48px">
      <Marquee direction='right'>
        {nftNewsData.map((value: NewsItem, key: number) => {
          return (
            <div key={key} className="rounded-2xl overflow-hidden relative w-[250px] h-full mx-2">
              <Image
                className="aspect-retro w-full h-full object-cover"
                src={value.image}
                width={225}
                height={278}
                alt="image"
              />
              <div className="absolute bottom-0 w-full p-18px bg-linear-to-t from-black to-black-500">
                <Image className="mb-5px" src={value.icon} width={17} height={12} alt="image" />
                <Link className="underline text-white" href={value.href}>
                  <h4 className="text-18 text-white font-extrabold">{value.title}</h4>
                </Link>
                <div className="text-14 text-white font-medium">
                  <p>{value.tags}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
} 