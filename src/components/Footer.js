import React from 'react';
import Container from './ui/container';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-[#FDF4E9] text-black">
      <Container className="pt-14 pb-4 sm:py-14">
        <div>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 justify-between items-center mb-5 sm:mb-9">
            <Link href="/">
              <Image
                alt="Logo"
                width={1000}
                height={1000}
                className="w-[91px] lg:w-[115px] h-full"
                src="/logo/ampli5.png"
              />
            </Link>
            <div className="flex items-center gap-4 text-14 sm:text-18 font-medium">
              <Link href="#">Privacy Policy</Link>
              <Link href="#"> Terms of Service</Link>
            </div>
          </div>
          <div className="flex  flex-col sm:flex-row gap-5 sm:gap-7 justify-between items-center ">
            <div className="text-14 sm:text-18 font-medium">
              @{new Date().getFullYear()} Supa Limited. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link href="#">
                {' '}
                <Image
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-[32px] h-full"
                  src="/icons/x.png"
                />
              </Link>
              <Link href="#">
                <Image
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-[32px] h-full"
                  src="/icons/telegram.png"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
