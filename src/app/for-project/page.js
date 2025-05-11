import Container from '@/components/ui/container';
import ExploreBtn from '@/components/ui/explorebtn';
import Title from '@/components/ui/title';
import { forProjectLinks } from '@/data/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className="bg-[#FDF4E9] relative pt-[56px] pb-10 bg_square w-screen overflow-x-hidden">
      <Container>
        <div className="mb-6 lg:mb-9">
          <Title>For Projects</Title>
        </div>
        <div className="space-y-4 lg:space-y-6 relative z-1">
          {forProjectLinks?.map((item, index) => {
            return (
              <Link
                href={item.href}
                key={index}
                className="border-2  border border-solid border-black bg-white rounded-2xl p-3 lg:p-4  flex items-center justify-between gap-4 "
              >
                <h2>
                  {}
                  {item.title}
                </h2>
                <div>
                  <button
                    className="border border-solid rounded-4xl border-black  w-40px lg:w-12 h-40px lg:h-12 bg-[#E5DD04] text-black  capitalize transition duration-300 ease-in-out flex items-center justify-center shadow-2xl hover:shadow-none"
                  >
                    <Image
                      src="/icons/arrow-up-right-01.png"
                      height={24}
                      width={24}
                      alt="icon"
                      className="w-16px h-16px lg:w-5 lg:h-5"
                    />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
