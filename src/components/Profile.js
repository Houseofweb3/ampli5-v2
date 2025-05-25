'use client';
import RequireAuth from '@/components/ProtectedAuth';
import Card from '@/components/ui/card';
import Container from '@/components/ui/container';
import Title from '@/components/ui/title';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TwitterLogout from '@/components/TwitterLogout';
import { useAuthStore } from '@/store/auth';

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <RequireAuth>
      <div>
        <div className="bg-cream-bg relative pt-56px bg_square w-full overflow-x-hidden">
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
                      className="w-80px h-80px"
                    />{' '}
                  </div>
                  <div className="">
                    <h4>{user.name}</h4>
                    <Link className="text_small" href="#">
                      {user.username}
                    </Link>
                  </div>
                  <div className="flex gap-7">
                    <div className="flex gap-2 items-center">
                      <h4>238</h4> <span className="text-14 text-black/45">Following </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <h4>105.2M</h4> <span className="text-14 text-black/45">Followers </span>
                    </div>
                  </div>
                </div>

                <div className="my-6 sm:my-0 w-full flex flex-col gap-6">
                  <div className=" p-4 bg-black rounded-2xl  w-fit flex-shrink-0 ml-auto hidden sm:block">
                    <h1 className="text-white font-normal leading-none">{user.yaps_score}</h1>
                    <div className=" flex items-center gap-3">
                      <Image
                        src={'/icons/image-71.png'}
                        alt="profile"
                        height={24}
                        width={24}
                        className="w-6 h-6"
                      />
                      <span className="text-white">Yaps</span>
                    </div>
                  </div>
                  <TwitterLogout />
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-4">
                  <h3>Stats</h3>
                </div>
                <div className="bg-light-blue3-bg rounded-2xl ">
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>238</h2>
                      <p className="font-normal text-black/45">Total Submissions</p>
                    </div>
                  </div>
                  <hr className="border-1 border-gray-300" />
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>238</h2>
                      <p className="font-normal text-black/45">Under Review</p>
                    </div>
                  </div>
                  <hr className="border-1 border-gray-300" />
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>0</h2>
                      <p className="font-normal text-black/45">Qualified</p>
                    </div>
                  </div>
                  <hr className="border-1 border-gray-300" />
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>238</h2>
                      <p className="font-normal text-black/45">Won</p>
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
