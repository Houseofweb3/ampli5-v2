"use client";
import { ALLROUTES } from "@/src/utils/constants";
// import InlineComponent from "./inlineWidget";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components";
import { CorrectIcon } from "./assets/icons";

const CheckMainPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="h-screen px-6 md:px-[64px] bg-background-color flex justify-center items-center font-Jakarta">
        <div className="bg-white flex flex-col gap-3 p-6 justify-center w-2/3 rounded-2xl">
          <div className="flex justify-center">
            <CorrectIcon />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-[2rem] font-[400] text-center">
              Thank you for <b> your order!</b>
            </div>

            <div className="] flex justify-center gap-4 flex-col  text-center">
              <div className="text-[1.1rem font-[400]">
                Your details & shortlisted KOL & PR are sent to our representative.
              </div>
            </div>
            <div className="bg-black h-[1.5px] mt-6"></div>
            <div className="w-full justify-center items-center flex pt-6 mt-32">
              <Button onClick={() => router.push(ALLROUTES.DASHBOARD)}>Go back to Dashboard</Button>
            </div>
          </div>
        </div>
      </div>

      {/* <InlineComponent /> */}
    </>
  );
};

export default CheckMainPage;
