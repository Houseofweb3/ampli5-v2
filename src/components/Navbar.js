'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Container from './ui/container';
import Image from 'next/image';
import ExploreBtn from './ui/explorebtn';
import Link from 'next/link';
import { AuthProfile } from '@/data/data';
import PrimaryButton from './ui/PrimaryButton';
import { signIn } from 'next-auth/react';
import { useAuthStore } from '@/store/auth';
import { toast } from 'react-toastify';
import axiosInstance from '@/lib/axiosInstance';
import Loader from './ui/loader';

export default function Navbar() {
  const { token, user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.post('/auth/logout', { refreshToken: token });
      logout();
    } catch (error) {
      toast.error('Failed to Logout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header id="mainHeader" className="bg-white w-full fixed top-0 z-50">
      <Container className="py-18px">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              alt="Logo"
              width={84}
              height={33}
              className="w-84px lg:w-115px h-full"
              src="/logo/ampli5.png"
            />
          </Link>
          {token ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/bounty-hunt"
                className="font-medium text-18 hover:text-blue-btn transition-colors duration-200"
              >
                Bounties
              </Link>

              <div className="relative" ref={profileRef}>
                {user?.profile_picture ? (
                  <Image
                    height={57}
                    width={57}
                    alt="profile"
                    src={user?.profile_picture}
                    onClick={() => setIsProfileOpen((pre) => !pre)}
                    className="w-30px h-30px lg:w-57px lg:h-57px rounded-full  object-contain bg-white shadow-xl"
                  />
                ) : (
                  <ExploreBtn
                    onClick={() => setIsProfileOpen((pre) => !pre)}
                    className="bg-blue-btn uppercase text-white! hover:text-white p-0 rounded-full overflow-hidden w-30px h-30px lg:w-57px lg:h-57px text-14 lg:text-20 hover:shadow-xl hover:bg-blue-btn"
                  ></ExploreBtn>
                )}
                {isProfileOpen ? (
                  <div className="absolute top-24 right-0 bg-white border border-gray-bg rounded-xl p-2 px-7 z-50 min-w-200px">
                    {AuthProfile.map((value, index) => (
                      <Fragment key={value.id}>
                        {value.id ? (
                          <Link
                            href={value.id}
                            onClick={() => setIsProfileOpen(false)}
                            className="text-16 font-normal text-black inline-block w-full py-3 hover:text-blue-btn transition-colors duration-200 "
                          >
                            {value.label}
                          </Link>
                        ) : (
                          <button
                            onClick={logoutHandler}
                            disabled={isLoading}
                            className="text-16 font-normal flex gap-2 items-center text-black  hover:text-blue-btn transition-colors duration-200 w-full py-3.5 text-left cursor-pointer disabled:pointer-events-none"
                          >
                            {isLoading && (
                              <Loader
                                lineColor="border-t-blue-btn/50"
                                loaderColor="border-blue-btn"
                              />
                            )}
                            {value.label}
                          </button>
                        )}
                        {index < AuthProfile.length - 1 && <hr className="border-light-gray-bg" />}
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/for-project"
                className="border border-solid rounded-4xl flex items-center justify-center lg:text-xl font-medium capitalize bg-white  text-blue-btn border-blue-btn s px-4 lg:px-7 py-1.5 lg:py-4 text-14 lg:text-20"
              >
                For Projects
                <Image
                  alt="Arrow"
                  width={1000}
                  height={1000}
                  className="w-6 h-6 ml-2 hidden sm:block"
                  src="/icons/rocket-01.png"
                />
              </Link>

              <PrimaryButton className="text-white" onClick={() => signIn('twitter')}>
                Login/Signup
              </PrimaryButton>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
