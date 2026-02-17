"use client";
import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

import { TbMailOpenedFilled } from "react-icons/tb";
import useHow3client from "@/src/hooks/usehow3client";
import { ALLROUTES } from "@/src/utils/constants";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
};

const Page = () => {
  const how3 = useHow3client();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await how3.get(`/api/v1/auth/profile/${session?.user?.id}`);
        const { fullname, email } = response.data.user;

        // Ensure fullname is defined and can be split
        if (fullname) {
          const [firstName, lastName] = fullname.split(" ");
          setProfile({ firstName, lastName, email });
        } else {
          // Handle cases where fullname is not provided
          setProfile({ firstName: "", lastName: "", email });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (session) {
      getProfile();
    }
  }, [session]);

  const handleLogout = async () => {
    localStorage.removeItem("cartData");
    await signOut({ redirect: true, callbackUrl: ALLROUTES.DASHBOARD });
  };

  return (
    <div className="w-full h-full flex flex-col py-[32px] px-[16px] md:px-[64px] bg-gray-150 gap-4 min-h-screen">
      <div className="font-Jakarta text-3xl font-bold pb-[12px]">Overview</div>
      <div className="bg-white rounded-lg p-4">
        <span className="font-Jakarta text-xl font-bold">Profile</span>

        <div className="grid grid-cols-1 md:grid-cols-3 font-Jakarta text-[14px] pt-4 gap-4">
          <div className="font-[500] gap-2 flex flex-col">
            First Name
            <div className="font-Poppins px-[20px] flex rounded-[6px] h-12 justify-start items-center py-[12px] border border-black/50 text-black/50 font-[400]">
              {profile?.firstName}
            </div>
          </div>
          <div className="font-[500] gap-2 flex flex-col">
            Last Name
            <div className="font-Poppins px-[20px] flex rounded-[6px] h-12 justify-start items-center py-[12px] border border-black/50 text-black/50 font-[400]">
              {profile?.lastName}
            </div>
          </div>
          <div className="font-[500] gap-2 flex flex-col">
            Email
            <div className="font-Poppins px-[20px] flex rounded-[6px] h-12 gap-2 justify-start items-center py-[12px] border border-black/50 text-black/50 font-[400]">
              <TbMailOpenedFilled className="text-black text-lg" />
              {profile?.email}
            </div>
          </div>
        </div>
        <div
          className="w-fit mt-6 bg-white py-2 px-4 font-Nunito rounded-lg border-black border cursor-pointer shadow-lg active:shadow-none ease-in-out"
          onClick={() => handleLogout()}
        >
          Logout
        </div>
        {/* <button className="text-error flex gap-2 font-Poppins font-semibold items-center mt-2 p-2 hover:bg-error/10 w-fit rounded-lg transition-all ease-in-out">
          <RiDeleteBinFill /> Delete Account
        </button> */}
      </div>
      {/* <History /> */}
    </div>
  );
};

export default Page;
