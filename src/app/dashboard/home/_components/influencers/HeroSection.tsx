"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Pagination from "./Pagination";
import { useFilter } from "@/src/context/FilterContext";
import useHow3client from "@/src/hooks/usehow3client";
import { InfluencerList } from "@/src/lib/types";
import Filters from "./Filters";
import { ENDPOINTS } from "@/src/utils/constants";
import NewTable from "./Table";
import MobileTable from "./MobileTable";

const HeroSection = () => {
  const { data: session } = useSession();
  const {
    platforms,
    setPlatforms,
    credibility,
    filterQueries,
    niche,
    setCredibility,
    setFilterQueries,
    setNiche,
    setPrice,
    contentTypes,
    setContentTypes,
  } = useFilter();
  const user = session?.user;
  const searchParams = useSearchParams();

  const how3 = useHow3client();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState<"ASC" | "DESC" | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAI, setIsAi] = useState(false);
  const [influencerList, setInfluencerList] = useState<InfluencerList>();
  let totalPages: number;

  const [, setTabValue] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get("tab");
    setTabValue(tab);

    setIsAi(tab === "ai");
  }, []);

  const fetchInfluencers = useCallback(async () => {
    setLoading(true);
    try {
      if (order !== "") {
        const response = await how3.get(
          `${ENDPOINTS.FETCH_INFLUENCER}?page=${currentPage}&sortField=price&sortOrder=${order}&searchTerm=${searchQuery}&filter=${filterQueries}`
        );
        setInfluencerList(response.data);
      } else if (order === "") {
        const response = await how3.get(
          `${ENDPOINTS.FETCH_INFLUENCER}?page=${currentPage}&searchTerm=${searchQuery}&filter=${filterQueries}`
        );
        setInfluencerList(response.data);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  }, [currentPage, searchQuery, filterQueries, order]);

  const fetchUserInfluencers = useCallback(async () => {
    setLoading(true);
    try {
      if (user && order === "") {
        const response = await how3.get(
          `${ENDPOINTS.FETCH_INFLUENCER}?page=${currentPage}&searchTerm=${searchQuery}&filter=${filterQueries}&userId=${user?.id}`
        );
        setInfluencerList(response.data);
      } else if (user && order !== "") {
        const response = await how3.get(
          `${ENDPOINTS.FETCH_INFLUENCER}?page=${currentPage}&sortField=&sortOrder=${order}&searchTerm=${searchQuery}&filter=${filterQueries}&userId=${user?.id}`
        );
        setInfluencerList(response.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  }, [currentPage, searchQuery, filterQueries, order]);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      if (isAI) {
        fetchUserInfluencers();
      } else {
        fetchInfluencers();
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [fetchInfluencers, fetchUserInfluencers, isAI]);

  const onPageChange = (page: number) => {
    totalPages = influencerList?.pagination.totalPages || 0;
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      // Logic to fetch new data based on page number
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQueries("");
    setNiche([]);
    setPlatforms([]);
    setCredibility([]);
    setSearchQuery(e.target.value);
    setOrder("");
  };

  useEffect(() => {
    if (searchParams.get("searchQuery")) {
      setCurrentPage(1);
      setSearchQuery(searchParams.get("searchQuery") as string);
    }
  }, [searchParams]);

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="flex gap-2 pb-4 w-full z-10 flex-col md:flex-row">
        <div className="flex w-full">
          <Filters
            setFilterQueries={setFilterQueries}
            setPrice={setPrice}
            credibility={credibility}
            niche={niche}
            platforms={platforms}
            setCredibility={setCredibility}
            setNiche={setNiche}
            setPlatforms={setPlatforms}
            value={searchQuery}
            onChange={handleSearchChange}
            fetchInfluencers={fetchInfluencers}
            fetchUserInfluencers={fetchUserInfluencers}
            isAI={isAI}
            setIsAi={setIsAi}
            contentTypes={contentTypes}
            setContentTypes={setContentTypes}
          />
        </div>
      </div>

      <div className=" flex w-full overflow-x-hidden flex-col z-0 sm:p-4 ">
        <NewTable
          influencers={influencerList?.influencers!}
          loading={loading}
          currentPage={currentPage}
          setFilterQueries={setFilterQueries}
          setCredibility={setCredibility}
          setNiche={setNiche}
          setPlatforms={setPlatforms}
          setSearchQuery={setSearchQuery}
          setOrder={setOrder}
          order={order}
        />
        <MobileTable
          influencers={influencerList?.influencers!}
          loading={loading}
          currentPage={currentPage}
          setFilterQueries={setFilterQueries}
          setCredibility={setCredibility}
          setNiche={setNiche}
          setPlatforms={setPlatforms}
          setSearchQuery={setSearchQuery}
        />
        <div className="">
          {influencerList && (
            <>
              <Pagination
                influencerNumber={
                  currentPage === 1
                    ? influencerList?.influencers.length * currentPage
                    : influencerList?.influencers.length +
                      10 * (currentPage - 1)
                }
                totalInfluencers={influencerList?.pagination.total}
                currentPage={currentPage}
                totalPages={influencerList?.pagination.totalPages || 0}
                onPageChange={onPageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
