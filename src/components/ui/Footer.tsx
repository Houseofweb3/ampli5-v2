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

            <div className="min-w-91px lg:min-w-115px">
              <Link href="/">
                <Image
                  alt="Logo"
                  width={1000}
                  height={1000}
                  className="w-91px lg:w-115px h-full"
                  src="/logo/ampli5.png"
                />
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-14 sm:text-18 font-medium ">
              <Link
                href="/founderfuel"
                className="hover:text-primary transition-colors duration-200 "
              >
                Founder Fuel
              </Link>
              <Link
                href="/brand-intake-form"
                className="hover:text-primary transition-colors duration-200"
              >
                Brand Intake Form
              </Link>
              <Link
                href="/creator-onboarding"
                className="hover:text-primary transition-colors duration-200"
              >
                Creator Onboarding
              </Link>
              <Link
                href="/blogs"
                className="hover:text-primary transition-colors duration-200"
              >
                Blogs
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-primary transition-colors duration-200"
              >
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
