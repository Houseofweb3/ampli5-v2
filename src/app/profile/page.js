'use client';
import RequireAuth from '@/components/ProtectedAuth';
import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import Title from '@/components/ui/title';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TwitterLogout from '@/components/TwitterLogout';

export default function pages() {

  return (
    <RequireAuth>
      <div>
        <div className="bg-cream-bg relative pt-[56px] bg_square w-full overflow-x-hidden">
          <Container>
            <div className="mb-6 lg:mb-9">
              <Title>My Profile</Title>
            </div>
            <Card>
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className=" items-center gap-1 space-y-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={'/images/profile.png'}
                      alt="profile"
                      height={100}
                      width={100}
                      className="w-[79px] h-[79px]"
                    />{' '}
                  </div>
                  <div className="">
                    <h4>Deepak Sharma</h4>
                    <Link className="text_small" href="#">
                      @deepdesign16180
                    </Link>
                  </div>
                  <div className="flex gap-7">
                    <div className="flex gap-2 items-center">
                      <h4>238</h4> <span className="text-14 text-[#00000073]">Following </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <h4>105.2M</h4> <span className="text-14 text-[#00000073]">Followers </span>
                    </div>
                  </div>
                </div>
                <div className="my-6 sm:my-0 w-full">
                  <TwitterLogout />
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-4">
                  <h3>Stats</h3>
                </div>
                <div className="bg-[#DAE9FB] rounded-2xl ">
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>238</h2>
                      <p className="font-normal text-[#00000073]">Total Submissions</p>
                    </div>
                    <div>
                      <Image src="/icons/circle-arrow.png" height={24} width={24} alt="icon" />
                    </div>
                  </div>
                  <hr className="border-1 border-gray-300" />
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>238</h2>
                      <p className="font-normal text-[#00000073]">Under Review</p>
                    </div>
                    <div>
                      <Image src="/icons/circle-arrow.png" height={24} width={24} alt="icon" />
                    </div>
                  </div>
                  <hr className="border-1 border-gray-300" />
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>0</h2>
                      <p className="font-normal text-[#00000073]">Qualified</p>
                    </div>
                    <div>
                      <Image src="/icons/circle-arrow.png" height={24} width={24} alt="icon" />
                    </div>
                  </div>
                  <hr className="border-1 border-gray-300" />
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>238</h2>
                      <p className="font-normal text-[#00000073]">Won</p>
                    </div>
                    <div>
                      <Image src="/icons/circle-arrow.png" height={24} width={24} alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Container>
        </div>
      </div>
    </RequireAuth>
  );
}
