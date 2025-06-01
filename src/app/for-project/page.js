import Container from '@/components/ui/container';
import GoBackButton from '@/components/ui/goBackBtn';
import Title from '@/components/ui/title';
import { forProjectLinks } from '@/data/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className="bg-cream-bg relative pt-56px pb-10 bg_square overflow-x-hidden">
      <Container>
        <div className="mb-6 lg:mb-9 flex justify-center items-center gap-4">
          <GoBackButton /> <Title>For Projects</Title>
        </div>
        <div className="space-y-4 lg:space-y-6 relative z-1">
          {forProjectLinks?.map((item, index) => {
            return (
              <Link
                href={item.href}
                key={index}
                className="border-2 group border-solid border-black bg-white rounded-2xl p-3 lg:p-4  flex items-center justify-between gap-4 "
              >
                <h2>{item.title}</h2>
                <div className="border border-solid cursor-pointer rounded-4xl border-black  w-40px lg:w-12 h-40px lg:h-12 bg-[#E5DD04] text-black  capitalize transition duration-300 ease-in-out flex items-center justify-center shadow-2xl hover:shadow-none">
                  <Image
                    src="/icons/arrow-up-right-01.png"
                    height={24}
                    width={24}
                    alt="icon"
                    className="w-16px h-16px lg:w-5 lg:h-5 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]  transition duration-300 ease-in-out "
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
