import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import ExploreBtn from '@/components/ui/explorebtn';
import Title from '@/components/ui/title';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function pages() {
  return (
    <div>
      <div>
        <div className="bg-[#FDF4E9] relative pt-[56px] bg_square w-full overflow-x-hidden">
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
                <div className='my-6 sm:my-0 w-full'>
                  <ExploreBtn className="bg-white hover:bg-white text-blue-btn! hover:text-white border-blue-btn shadow-none px-7  py-3 text-16 font-bold w-full sm:w-fit ml-auto rounded-full sm:rounded-xl">
                    Disconnect
                    <Image
                      alt="Arrow"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 ml-2 hidden sm:block"
                      src="/icons/new-twitter.png"
                    />
                  </ExploreBtn>
                </div>
              </div>

              <div className="mt-4">
                <div className='mb-4'>
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
    </div>
  );
}
