"use client";
import { SignData } from "./data";
import Image from "next/image";
import { GoogleIcon } from "@/public/icons";
import { signIn } from "next-auth/react";

const SignUpPage = () => {
  return (
    <>
      <div className="w-full h-full bg-custom-gradient xl:pt-0 pt-20 flex justify-center">
        <div className="w-full font-Jakarta p-2   xl:p-28 2xl:p-40 flex  xl:flex-row flex-col gap-6 justify-center">
          <div className="xl:w-[50%] w-full flex flex-col justify-center gap-6">
            <div className="font-[700] font-Jakarta text-[24px] xl:text-[36px] ">
              Sign up free now
            </div>

            <div className="font-[500] xl:text-[20px] font-Nunito leading-[27px] text-gray-300">
              To unlock your all-access pass to Web3 marketing supremacy!
            </div>

            <div className="flex flex-col gap-3 pt-5">
              {SignData.map((data) => {
                return (
                  <>
                    <div className="flex items-center  gap-3 ">
                      <div className="xl:w-[32px] w-[24px] h-[24px] xl:h-[32px]">
                        <Image src={data.icon} alt="img" className="w-full h-full object-cover " />
                      </div>
                      <div className="font-Nunito font-[600] text-[12px] xl:text-[16px]">
                        {data.text}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="xl:w-[50%]  flex   w-full xl:p-16 2xl:p-24">
            <div className="bg-white p-6 rounded-[17px] gap-4 flex flex-col">
              <div className="font-[600] text-[24px] font-Jakarta">Signup</div>
              <div className="font-[400] text-[18px] font-Jakarta text-gray-half">
                Signup with your google account or wait for out team to connect with you
              </div>

              <div
                className="xl:py-[18px] cursor-pointer hover:shadow-lg active:shadow-none py-[12px] flex justify-center items-center gap-4 px-[44px] xl:px-[64px] border border-black rounded-[12px]"
                onClick={() => {
                  signIn("google", { callbackUrl: "/dashboard/home" });
                }}
              >
                <div className="flex justify-center">
                  <GoogleIcon />
                </div>
                <div className="font-Nunito font-[700] text-[20px]">{"Login using Google"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
