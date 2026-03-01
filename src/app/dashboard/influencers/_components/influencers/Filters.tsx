"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useMemo, useState } from "react";

import MultiSelect from "@/src/components/ui/multi-select";
import { FilterCross, Search } from "@/public/icons";
import AiButton from "./AIButton";
import {
  PLATFORM_OPTIONS,
  INDUSTRY_OPTIONS,
  INDUSTRY_CATEGORY_OPTIONS,
  PLATFORM_INVENTORY_OPTIONS,
  GEOGRAPHY_OPTIONS,
} from "@/src/constants/creatorOnboardingFilters";

interface FilterProp {
  setFilterQueries: React.Dispatch<React.SetStateAction<string>>;
  platforms: string[];
  niche: string[];
  credibility: string[];
  value: string;
  setPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  setCredibility: React.Dispatch<React.SetStateAction<string[]>>;
  setNiche: React.Dispatch<React.SetStateAction<string[]>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contentTypes: string[];
  setContentTypes: React.Dispatch<React.SetStateAction<string[]>>;
  industry: string[];
  setIndustry: React.Dispatch<React.SetStateAction<string[]>>;
  geography: string[];
  setGeography: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filters: React.FC<FilterProp> = ({
  setFilterQueries,
  platforms,
  niche,
  credibility,
  setPlatforms,
  value,
  onChange,
  setNiche,
  setCredibility,
  contentTypes,
  setContentTypes,
  industry,
  setIndustry,
  geography,
  setGeography,
}) => {
  const platformOptions = useMemo(() => [...PLATFORM_OPTIONS], []);
  const industryOptions = useMemo(() => [...INDUSTRY_OPTIONS], []);
  const geographyOptionsList = useMemo(() => [...GEOGRAPHY_OPTIONS], []);

  const availableInventoryOptions = useMemo(() => {
    if (platforms.length === 0) return [];
    const all = platforms.flatMap((p) => PLATFORM_INVENTORY_OPTIONS[p] ?? []);
    return Array.from(new Set(all));
  }, [platforms]);

  const availableCategoryOptions = useMemo(() => {
    const ind = industry[0];
    if (!ind) return [];
    return INDUSTRY_CATEGORY_OPTIONS[ind] ?? [];
  }, [industry]);

  useEffect(() => {
    setContentTypes((prev) => prev.filter((type) => availableInventoryOptions.includes(type)));
  }, [platforms, availableInventoryOptions, setContentTypes]);

  useEffect(() => {
    setNiche((prev) => prev.filter((c) => availableCategoryOptions.includes(c)));
  }, [industry, availableCategoryOptions, setNiche]);

  useEffect(() => {
    const buildQueryString = () => {
      const filterObject: { [key: string]: unknown } = {};

      if (platforms.length > 0) {
        filterObject.platform = platforms;
      }

      if (niche.length > 0) {
        filterObject.niche = niche.map((item) => item.replace(/\n/g, " "));
      }

      if (credibility.length > 0) {
        filterObject.credibilityScore = credibility;
      }
      if (contentTypes?.length > 0) {
        filterObject.contentType = contentTypes;
      }
      if (industry.length > 0) {
        filterObject.industry = industry;
      }
      if (geography.length > 0) {
        filterObject.geography = geography;
      }

      const filterString = JSON.stringify(filterObject);
      const encodedFilterString = encodeURIComponent(filterString);

      setFilterQueries(`${encodedFilterString}`);
    };

    buildQueryString();
  }, [platforms, niche, credibility, contentTypes, industry, geography, setFilterQueries]);

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case "Platform":
        setPlatforms(platforms.filter((p) => p !== value));
        break;
      case "Inventory":
        setContentTypes(contentTypes.filter((e) => e !== value));
        break;
      case "Industry":
        setIndustry(industry.filter((i) => i !== value));
        break;
      case "Category":
        setNiche(niche.filter((n) => n !== value));
        break;
      case "Geography":
        setGeography(geography.filter((g) => g !== value));
        break;
      case "Credibility":
        setCredibility(credibility.filter((e) => e !== value));
        break;
    }
  };

  const clearAllFilters = () => {
    setPlatforms([]);
    setNiche([]);
    setCredibility([]);
    setContentTypes([]);
    setIndustry([]);
    setGeography([]);
  };

  const activeFilterCount =
    platforms.length +
    contentTypes.length +
    niche.length +
    credibility.length +
    industry.length +
    geography.length;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const filterDropdowns = (
    <>
      <div className="">
        <MultiSelect
          options={platformOptions}
          setSelectedOptions={setPlatforms}
          selectedOptions={platforms}
          placeholder="Platform"
        />
      </div>
      <div className="">
        <MultiSelect
          options={availableInventoryOptions}
          selectedOptions={contentTypes}
          setSelectedOptions={setContentTypes}
          placeholder="Content Type"
        />
      </div>
      <div className="">
        <MultiSelect
          options={industryOptions}
          selectedOptions={industry}
          setSelectedOptions={setIndustry}
          placeholder="Industry"
        />
      </div>
      <div className="">
        <MultiSelect
          options={availableCategoryOptions}
          selectedOptions={niche}
          setSelectedOptions={setNiche}
          placeholder="Category"
        />
      </div>
      <div className="">
        <MultiSelect
          options={geographyOptionsList}
          selectedOptions={geography}
          setSelectedOptions={setGeography}
          placeholder="Geography"
        />
      </div>
    </>
  );

  return (
    <div className="space-y-4 w-full pb-8">
      <div className="grid grid-cols-4 sm:grid-cols-6 grid-flow-row-dense items-center md:grid-cols-6 gap-4">
        <div className="col-span-4 px-4 flex gap-2 rounded-xl justify-center items-center py-3 border border-gray-300 ">
          <Search />
          <input
            placeholder="Filter using AI search or Keyword Match"
            className="outline-none font-normal text-sm w-full bg-transparent placeholder-gray-600"
            value={value}
            onChange={onChange}
          />
        </div>

        <div className="w-full hidden  sm:col-span-2 md:col-span-2 sm:flex items-center">
          <AiButton />
        </div>
      </div>

      {/* md and below: Filters button opens drawer */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="w-full sm:hidden block">
          <AiButton />
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-300 font-Jakarta text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center min-w-5 h-5 px-1 text-xs rounded-full bg-primary text-white">
              {activeFilterCount}
            </span>
          )}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>

      
      </div>

      {/* Drawer for md and below */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setDrawerOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setDrawerOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close filters"
          />
          <div
            className="fixed top-0 left-0 z-50 h-full w-[min(100%,320px)] bg-white shadow-xl flex flex-col md:hidden font-Jakarta animate-in slide-in-from-left duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filterDropdowns}
              <button
                type="button"
                onClick={clearAllFilters}
                className="w-full py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50"
              >
                Clear all
              </button>
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {platforms.map((platform) => (
                    <div
                      key={platform}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#F5F8FA] rounded-full"
                    >
                      <span>{platform}</span>
                      <button onClick={() => removeFilter("Platform", platform)} className="text-gray-400 hover:text-gray-600">
                        <FilterCross />
                      </button>
                    </div>
                  ))}
                  {contentTypes.map((contentType) => (
                    <div
                      key={contentType}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#F5F8FA] rounded-full"
                    >
                      <span>{contentType}</span>
                      <button onClick={() => removeFilter("Inventory", contentType)} className="text-gray-400 hover:text-gray-600">
                        <FilterCross />
                      </button>
                    </div>
                  ))}
                  {industry.map((i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#F5F8FA] rounded-full">
                      <span>{i}</span>
                      <button onClick={() => removeFilter("Industry", i)} className="text-gray-400 hover:text-gray-600">
                        <FilterCross />
                      </button>
                    </div>
                  ))}
                  {niche.map((n) => (
                    <div key={n} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#F5F8FA] rounded-full">
                      <span>{n}</span>
                      <button onClick={() => removeFilter("Category", n)} className="text-gray-400 hover:text-gray-600">
                        <FilterCross />
                      </button>
                    </div>
                  ))}
                  {geography.map((g) => (
                    <div key={g} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#F5F8FA] rounded-full">
                      <span>{g}</span>
                      <button onClick={() => removeFilter("Geography", g)} className="text-gray-400 hover:text-gray-600">
                        <FilterCross />
                      </button>
                    </div>
                  ))}
                  {credibility.map((score) => (
                    <div key={score} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#F5F8FA] rounded-full">
                      <span className="text-gray-600">Credibilty Score: </span>
                      <span>{score}</span>
                      <button onClick={() => removeFilter("Credibility", score)} className="text-gray-400 hover:text-gray-600">
                        <FilterCross />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* md and up: inline filter row */}
      <div className="hidden md:grid grid-cols-1 grid-flow-row-dense items-center md:grid-cols-5 gap-4">
        {filterDropdowns}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex items-start justify-between gap-2 pt-2 w-full text-black">
          <div className="flex md:flex-row flex-col gap-4">
            <div className="md:order-2 order-3 flex justify-start w-full shrink-1 md:overflow-x-hidden">
              <div className="flex gap-2 flex-wrap ">
                {platforms.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center gap-2 px-4 py-2 text-xs bg-[#F5F8FA] rounded-full  shrink-0"
                  >
                    <span>{platform}</span>
                    <button
                      onClick={() => removeFilter("Platform", platform)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FilterCross />
                    </button>
                  </div>
                ))}
                {contentTypes.map((contentType) => (
                  <div
                    key={contentType}
                    className="flex items-center gap-2 px-4 py-2 text-xs bg-[#F5F8FA] rounded-full  shrink-0"
                  >
                    <span>{contentType}</span>
                    <button
                      onClick={() => removeFilter("Inventory", contentType)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FilterCross />
                    </button>
                  </div>
                ))}
                {industry.map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 text-xs bg-[#F5F8FA] rounded-full  shrink-0"
                  >
                    <span>{i}</span>
                    <button
                      onClick={() => removeFilter("Industry", i)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FilterCross />
                    </button>
                  </div>
                ))}
                {niche.map((n) => (
                  <div
                    key={n}
                    className="flex items-center gap-2 px-4 py-2 text-xs bg-[#F5F8FA] rounded-full  shrink-0"
                  >
                    <span>{n}</span>
                    <button
                      onClick={() => removeFilter("Category", n)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FilterCross />
                    </button>
                  </div>
                ))}
                {geography.map((g) => (
                  <div
                    key={g}
                    className="flex items-center gap-2 px-4 py-2 text-xs bg-[#F5F8FA] rounded-full  shrink-0"
                  >
                    <span>{g}</span>
                    <button
                      onClick={() => removeFilter("Geography", g)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FilterCross />
                    </button>
                  </div>
                ))}
                {credibility.map((score) => (
                  <div
                    key={score}
                    className="flex items-center gap-2 px-4 py-2 text-xs bg-[#F5F8FA] rounded-full  shrink-0"
                  >
                    <span className="text-gray-600">Credibilty Score: </span>
                    <span>{score}</span>
                    <button
                      onClick={() => removeFilter("Credibility", score)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FilterCross />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={clearAllFilters}
            className="text-black  order-2 md:order-3 w-20 shrink-0 flex-nowrap text-base"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;
