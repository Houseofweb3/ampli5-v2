'use client';
import RequireAuth from './ProtectedAuth';
import Card from './ui/card';
import Container from './ui/container';
import Title from './ui/title';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TwitterLogout from './TwitterLogout';
import { useAuthStore } from '../store/auth';
import GoBackButton from './ui/goBackBtn';
import { toast } from 'react-toastify';
import axiosInstance from '../lib/axiosInstance';

interface User {
  id: string;
  name: string;
  username: string;
  profile_picture: string;
  yaps_score: number;
}

interface ExtendedUser extends User {
  Following?: number;
  Followers?: number;
}

interface BountyDetails {
  under_review: number;
  accept: number;
  won: number;
}

const Profile: React.FC = () => {
  const { user } = useAuthStore() as { user: ExtendedUser };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bountyDetails, setBountyDetails] = useState<BountyDetails | null>(null);

  useEffect(() => {
    const fetchUserProfile = async (userId: string) => {
      try {
        const response = await axiosInstance.get(`/user/bounty/details/${userId}`);
        setBountyDetails(response.data);
      } catch (error) {
        console.error('User profile fetch error:', error);
        toast.error('User profile fetching error!');
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchUserProfile(user.id);
    }
  }, [user?.id]);

  return (
    <RequireAuth isLoading={isLoading}>
      <div>
        <div className="bg-cream-bg relative pt-56px bg_square w-full overflow-x-hidden">
          <Container>
            <div className="mb-6 lg:mb-9 flex justify-center items-center gap-4">
              <GoBackButton /> <Title>My Profile</Title>
            </div>
            <Card>
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className=" items-center gap-1 space-y-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={user.profile_picture}
                      onError={(e: any) => (e.src = '/images/profile.png')}
                      alt="profile"
                      height={100}
                      width={100}
                      className="w-80px h-80px rounded-full shadow border-2 outline-2  outline-offset-2 outline-purple-bg border-white"
                    />
                  </div>
                  <div>
                    <h4>{user.name}</h4>
                    <p className="text_small">
                      {user.username}
                    </p>
                  </div>
                  <div className="flex gap-7">
                    <div className="flex gap-2 items-center">
                      <h4>{user?.Following || 0}</h4>{' '}
                      <span className="text-14 text-black/45">Following </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <h4>{user?.Followers || 0}</h4>{' '}
                      <span className="text-14 text-black/45">Followers </span>
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
                  <h3>Bounty Submissions Stats</h3>
                </div>
                <div className="bg-light-blue3-bg rounded-2xl ">
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>
                        {(bountyDetails?.under_review ?? 0) +
                          (bountyDetails?.under_review ?? 0) +
                          (bountyDetails?.won ?? 0)}
                      </h2>
                      <p className="font-normal text-black/45">Total Submissions</p>
                    </div>
                  </div>
                  <hr className="border-1 border-gray-300" />
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>{bountyDetails?.under_review || 0}</h2>
                      <p className="font-normal text-black/45">Under Review</p>
                    </div>
                  </div>
                  <hr className="border-1 border-gray-300" />
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>{bountyDetails?.accept || 0}</h2>
                      <p className="font-normal text-black/45">Qualified</p>
                    </div>
                  </div>
                  <hr className="border-1 border-gray-300" />
                  <div className="p-3 lg:p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <h2>{bountyDetails?.won || 0}</h2>
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
};

export default Profile;
