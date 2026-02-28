"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import { useFilter } from "@/src/context/FilterContext";
import type { WebInfluencerListResponse } from "@/src/lib/types";
import Filters from "./Filters";
import { getWebInfluencerList } from "@/src/services/dashboardInfluencers";
import WebInfluencerTable from "./WebInfluencerTable";
import WebInfluencerMobileList from "./WebInfluencerMobileList";

const LIMIT = 10;

const HeroSection = () => {
  const {
    platforms,
    setPlatforms,
    credibility,
    niche,
    setCredibility,
    setFilterQueries,
    setNiche,
    setPrice,
    contentTypes,
    setContentTypes,
    industry,
    setIndustry,
    geography,
    setGeography,
  } = useFilter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState<WebInfluencerListResponse | null>(null);

  const fetchInfluencers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getWebInfluencerList({
        page: currentPage,
        limit: LIMIT,
        search: searchQuery || undefined,
        platform: platforms.length ? platforms : undefined,
        inventory: contentTypes.length ? contentTypes : undefined,
        industries: industry.length ? industry : undefined,
        categories: niche.length ? niche : undefined,
        primaryAudienceGeography: geography.length ? geography : undefined,
      });
      console.log("data", data);
      setList(data);
    } catch (err) {
      console.log("err", err);
      setList({ influencers: [], total: 0, page: 1, limit: LIMIT, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, platforms, contentTypes, industry, niche, geography]);

  useEffect(() => {
    const t = setTimeout(fetchInfluencers, 300);
    return () => clearTimeout(t);
  }, [fetchInfluencers]);

  useEffect(() => {
    const q = searchParams.get("searchQuery");
    if (q != null) {
      setSearchQuery(q);
      setCurrentPage(1);
    }
  }, [searchParams]);

  const onPageChange = (page: number) => {
    const totalPages = list?.totalPages ?? 0;
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQueries("");
    setNiche([]);
    setPlatforms([]);
    setCredibility([]);
    setContentTypes([]);
    setIndustry([]);
    setGeography([]);
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = list?.totalPages ?? 0;
  const total = list?.total ?? 0;
  const end = list ? Math.min(list.page * list.limit, list.total) : 0;

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
            contentTypes={contentTypes}
            setContentTypes={setContentTypes}
            industry={industry}
            setIndustry={setIndustry}
            geography={geography}
            setGeography={setGeography}
          />
        </div>
      </div>

      <div className="flex w-full overflow-x-hidden flex-col z-0 sm:p-4">
        <WebInfluencerTable
          influencers={list?.influencers ?? []}
          loading={loading}
          setFilterQueries={setFilterQueries}
          setPlatforms={setPlatforms}
          setNiche={setNiche}
          setSearchQuery={setSearchQuery}
        />
        <WebInfluencerMobileList
          influencers={list?.influencers ?? []}
          loading={loading}
          setFilterQueries={setFilterQueries}
          setPlatforms={setPlatforms}
          setNiche={setNiche}
          setSearchQuery={setSearchQuery}
        />
        {list && (
          <Pagination
            influencerNumber={end}
            totalInfluencers={total}
            currentPage={list.page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
