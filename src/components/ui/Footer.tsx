import React from 'react';
import Container from './container';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer(): JSX.Element {
  return (
    <div className="bg-cream-bg text-black">
      <Container className="pt-14 pb-4 sm:py-14">
        <div>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 justify-between items-center mb-5 sm:mb-9">
            <Link href="/">
              <Image
                alt="Logo"
                width={1000}
                height={1000}
                className="w-91px lg:w-115px h-full"
                src="/logo/ampli5.png"
              />
            </Link>
            <div className="flex items-center gap-4 text-14 sm:text-18 font-medium ">
              <Link
                href="/blogs"
                className="hover:text-primary transition-colors duration-200"
              >
               Blogs
              </Link>
              <Link
                target="_blank"
                href="https://www.houseofweb3.com/legal/privacyPolicy"
                className="hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                target="_blank"
                href="https://www.houseofweb3.com/legal/termsOfUse"
                className="hover:text-primary transition-colors duration-200"
              >
                {" "}
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="flex  flex-col sm:flex-row gap-5 sm:gap-7 justify-between items-center">
            <div className="text-14 sm:text-18 font-medium">
              @{new Date().getFullYear()} HOW3 PTE LTD. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link target="_blank" href="https://x.com/nomo_nomaya">
                {" "}
                <Image
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-32px h-full"
                  src="/icons/x.png"
                />
              </Link>
              <Link target="_blank" href="https://www.instagram.com">
                <Image
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-32px h-full"
                  src="/icons/instagram.png"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
