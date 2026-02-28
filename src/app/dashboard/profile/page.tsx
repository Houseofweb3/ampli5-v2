"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TbMailOpenedFilled } from "react-icons/tb";
import useDashboardClient from "@/src/hooks/useDashboardClient";
import { useDashboardAuth } from "@/src/context/DashboardAuthContext";
import { ALLROUTES } from "@/src/utils/constants";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
};

const Page = () => {
  const router = useRouter();
  const dashboardClient = useDashboardClient();
  const { client, logout } = useDashboardAuth();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const getProfile = async () => {
      if (!client?.id) return;
      try {
        const response = await dashboardClient.get(`/api/v1/auth/profile/${client.id}`);
        const { fullname, email } = response.data?.user ?? {};
        if (fullname) {
          const [firstName, lastName] = fullname.split(" ");
          setProfile({ firstName, lastName, email: email ?? client.email });
        } else {
          setProfile({ firstName: "", lastName: "", email: client.email });
        }
      } catch {
        setProfile({
          firstName: (client.name || "").split(" ")[0] ?? "",
          lastName: (client.name || "").split(" ").slice(1).join(" ") ?? "",
          email: client.email,
        });
      }
    };
    if (client) {
      getProfile();
    }
  }, [client, dashboardClient]);

  const handleLogout = () => {
    localStorage.removeItem("cartData");
    logout();
    router.push(ALLROUTES.DASHBOARD);
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
