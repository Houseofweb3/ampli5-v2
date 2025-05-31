'use client';
import { useAuthStore } from '@/store/auth';
import React, { useState } from 'react';
import ExploreBtn from './ui/explorebtn';
import Image from 'next/image';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';




export default function TwitterLogout() {
  const { logout, token } = useAuthStore();
  const [loading, setLoading] = useState(false);


  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axiosInstance.post('/auth/logout', { refreshToken: token });
      logout();
    } catch (error) {
      toast.error('Failed to logout');
    } finally {
      setLoading(false);
    }
  };
  
   return (
    <ExploreBtn
      onClick={logoutHandler}
      disabled={loading}
      className={`bg-white hover:bg-white text-blue-btn! hover:text-white border-blue-btn shadow-none px-7 py-3 text-16 font-bold w-full sm:w-fit ml-auto rounded-full sm:rounded-xl ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Disconnecting...' : 'Disconnect'}
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
