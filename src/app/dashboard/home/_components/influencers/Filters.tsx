/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";



import MultiSelect from "@/src/components/ui/multi-select";
import useHow3client from "@/src/hooks/usehow3client";
import { FilterCross,  Search } from "@/public/icons";
import AiButton from "./AIButton";
import { ENDPOINTS } from "@/src/utils/constants";
import { FiltersData, PlatformData } from "../../../_components/FilterSection";

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
  isAI: boolean;
  setIsAi: React.Dispatch<React.SetStateAction<boolean>>;
  fetchInfluencers: () => Promise<void>;
  fetchUserInfluencers: () => Promise<void>;
  contentTypes: string[];
  setContentTypes: React.Dispatch<React.SetStateAction<string[]>>;
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
}) => {
  const [filters, setFilters] = useState<FiltersData | null>(null);
    const [availableContentTypes, setAvailableContentTypes] = useState<
      string[]
    >([]);
  const how3 = useHow3client();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await how3.get(ENDPOINTS.FETCH_OPTIONS);
        const filteredPlatforms =
          response.data.platformsWithContentTypes.filter(
            (p: PlatformData) => p.platform !== "YT Short"
          );
        setFilters({
          ...response.data,
          platformsWithContentTypes: filteredPlatforms,
        });
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, [how3]);

  useEffect(() => {
    if (filters?.platformsWithContentTypes) {
      const selectedPlatformData = filters.platformsWithContentTypes.filter(
        (p) => platforms.includes(p.platform)
      );

      const allContentTypes: string[] = selectedPlatformData.flatMap(
        (p) => p.contentTypes
      );

      setAvailableContentTypes(Array.from(new Set(allContentTypes)));

      setContentTypes((prev) =>
        prev.filter((type) => allContentTypes.includes(type))
      );
    }
  }, [platforms, filters?.platformsWithContentTypes]);

  useEffect(() => {
    const buildQueryString = () => {
      const filterObject: { [key: string]: any } = {};

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

      const filterString = JSON.stringify(filterObject);
      const encodedFilterString = encodeURIComponent(filterString);

      setFilterQueries(`${encodedFilterString}`);
    };

    buildQueryString();
  }, [platforms, niche, credibility, contentTypes, setFilterQueries]);

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case "Platform":
        setPlatforms(platforms.filter((p) => p !== value));
        break;
      case "Niche":
        setNiche(niche.filter((n) => n !== value));
        break;
      case "Credibility":
        setCredibility(credibility.filter((e) => e !== value));
        break;
      case "contentType":
        setContentTypes(contentTypes.filter((e) => e !== value));
        break;
    }
  };

  const clearAllFilters = () => {
    setPlatforms([]);
    setNiche([]);
    setCredibility([]);
    setContentTypes([]);
  };

  // Get total number of active filters
  const activeFilterCount =
    platforms.length + niche.length + credibility.length | contentTypes?.length;

  return (
    <div className="space-y-4 w-full pb-8">
      <div className="grid grid-cols-1 grid-flow-row-dense items-center  gap-4">
        <div className="col-span-4 px-4 flex gap-2 rounded-xl justify-center items-center py-3 border border-gray-300 ">
          <Search />
          <input
            placeholder="Filter using AI search or Keyword Match"
            className="outline-none font-normal text-sm w-full bg-transparent placeholder-gray-600"
            value={value}
            onChange={onChange}
          />
        </div>

        {/* <div className="w-full col-span-2 md:block hidden">
          <AiButton
            isAI={isAI}
            setIsAi={setIsAi}
            fetchInfluencers={fetchInfluencers}
            fetchUserInfluencers={fetchUserInfluencers}
          />
        </div> */}
      </div>
      <div className="grid grid-cols-1 grid-flow-row-dense items-center md:grid-cols-4 gap-4">
        <div className="">
          <MultiSelect
            options={
              filters?.platformsWithContentTypes?.map((p) => p.platform) || []
            }
            setSelectedOptions={setPlatforms}
            selectedOptions={platforms}
            placeholder="Platforms"
          />
        </div>
        <div className="">
          <MultiSelect
            options={availableContentTypes}
            selectedOptions={contentTypes}
            setSelectedOptions={setContentTypes}
            placeholder="Content Types"
          />
        </div>

        <div className="">
          <MultiSelect
            options={filters?.niches!}
            selectedOptions={niche}
            setSelectedOptions={setNiche}
            placeholder="Category "
          />
        </div>
        <div className="">
          <MultiSelect
            options={filters?.credibilityScores!}
            selectedOptions={credibility}
            setSelectedOptions={setCredibility}
            placeholder="Credibility Scores"
          />
        </div>
        <div className="w-full md:hidden block">
          <AiButton
            isAI={isAI}
            setIsAi={setIsAi}
            fetchInfluencers={fetchInfluencers}
            fetchUserInfluencers={fetchUserInfluencers}
          />
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex items-start justify-between gap-2 pt-2 w-full text-black">
          <div className="flex md:flex-row flex-col gap-4">
            {/* <span className="text-sm order-1">
              Filters({activeFilterCount})
            </span> */}
            <div className="md:order-2 order-3 flex justify-start w-full shrink-1 md:overflow-x-hidden">
              <div className="flex gap-2 flex-wrap ">
                {platforms.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center gap-2 px-4 py-2 text-xs bg-[#F5F8FA] rounded-full  shrink-0"
                  >
                    {/* <span className="text-gray-600">Platform: </span> */}
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
                    {/* <span className="text-gray-600">ContentType: </span> */}
                    <span>{contentType}</span>
                    <button
                      onClick={() => removeFilter("contentType", contentType)}
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
                    {/* <span className="text-gray-600">Niche: </span> */}
                    <span>{n}</span>
                    <button
                      onClick={() => removeFilter("Niche", n)}
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
