'use client';
import { useAuthStore } from '@/store/auth';
import { signOut } from 'next-auth/react';
import React from 'react';
import ExploreBtn from './ui/explorebtn';
import Image from 'next/image';

export default function TwitterLogout() {
  const { logout } = useAuthStore();

  const logoutHandler = async () => {
    try {
      // await axiosInstance.post('logout');
      signOut({ returnTo: '/' });
      logout();
    } catch (error) {}
  };
  return (
    <ExploreBtn
      onClick={logoutHandler}
      className="bg-white hover:bg-white text-blue-btn! hover:text-white border-blue-btn shadow-none px-7  py-3 text-16 font-bold w-full sm:w-fit ml-auto rounded-full sm:rounded-xl"
    >
      Disconnect
      <Image
        alt="Arrow"
        width={1000}
        height={1000}
        className="w-6 h-6 ml-2 hidden sm:block"
        src="/icons/new-twitter.png"
      />
    </ExploreBtn>
  );
}
