"use client";
import { useState, useEffect } from "react";

import MainPackges from "./mainPackages";
import useHow3client from "@/src/hooks/usehow3client";
import { ENDPOINTS } from "@/src/utils/constants";

const Packages = () => {
  const [Packages, setPackages] = useState<any>(null);
  const how3 = useHow3client();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await how3.get(ENDPOINTS.FETCH_PACKAGES);
        setPackages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPackages();
  }, [how3]);

  return (
    <>
      <div className="md:bg-white relative w-full h-full rounded-xl md:p-4">
        <div className="text-xl md:text-2xl font-Jakarta font-[600] pb-4 ">
          PR Packages
        </div>

        <div className="flex flex-col xl:py-3 p-3  xl:px-10 gap-10">
          {Packages ? (
            Packages.packages.length > 0 &&
            Packages.packages.map((data: any, index: number) => {
              return <MainPackges key={index} data={data} />;
            })
          ) : (
            <>
              <div className="h-[100px] bg-white flex justify-center items-center">
                <div className="h-10 w-10 border-l-4 border-primary rounded-full animate-spin"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Packages;
