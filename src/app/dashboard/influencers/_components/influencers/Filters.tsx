"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useMemo } from "react";

import MultiSelect from "@/src/components/ui/multi-select";
import { FilterCross, Search } from "@/public/icons";
import AiButton from "./AIButton";
import { useFilter } from "@/src/context/FilterContext";
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
  setPrice: React.Dispatch<React.SetStateAction<string[]>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAI?: boolean;
  setIsAi?: React.Dispatch<React.SetStateAction<boolean>>;
  fetchInfluencers?: () => Promise<void>;
  fetchUserInfluencers?: () => Promise<void>;
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
  isAI,
  setIsAi,
  fetchInfluencers,
  fetchUserInfluencers,
  contentTypes,
  setContentTypes,
  industry,
  setIndustry,
  geography,
  setGeography,
}) => {
  const showAi = isAI !== undefined && setIsAi != null && fetchInfluencers != null && fetchUserInfluencers != null;
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

  return (
    <div className="space-y-4 w-full pb-8">
      <div className="grid grid-cols-1 grid-flow-row-dense items-center md:grid-cols-6 gap-4">
        <div className="col-span-4 px-4 flex gap-2 rounded-xl justify-center items-center py-3 border border-gray-300 ">
          <Search />
          <input
            placeholder="Filter using AI search or Keyword Match"
            className="outline-none font-normal text-sm w-full bg-transparent placeholder-gray-600"
            value={value}
            onChange={onChange}
          />
        </div>

        {showAi && (
          <div className="w-full col-span-2 md:block hidden">
            <AiButton
              isAI={isAI!}
              setIsAi={setIsAi!}
              fetchInfluencers={fetchInfluencers!}
              fetchUserInfluencers={fetchUserInfluencers!}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 grid-flow-row-dense items-center md:grid-cols-5 gap-4">
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
        {showAi && (
          <div className="w-full md:hidden block">
            <AiButton
              isAI={isAI!}
              setIsAi={setIsAi!}
              fetchInfluencers={fetchInfluencers!}
              fetchUserInfluencers={fetchUserInfluencers!}
            />
          </div>
        )}
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
