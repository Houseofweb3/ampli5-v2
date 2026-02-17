"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useHow3client from "@/src/hooks/usehow3client";
import { ALLROUTES, BUTTON_SIZES, BUTTON_TYPES, ENDPOINTS } from "@/src/utils/constants";
import MultiSelect from "@/src/components/ui/multi-select";
import { Button } from "@/src/components";
import { toast } from "react-hot-toast";
import { useFilter } from "@/src/context/FilterContext";

export interface PlatformData {
  platform: string;
  contentTypes: string[];
}

export interface FiltersData {
  platformsWithContentTypes: PlatformData[];
  niches: string[];
  credibilityScores: string[];
}

const FilterSection = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    platforms,
    setPlatforms,
    contentTypes,
    setContentTypes,
    credibility,
    setCredibility,
    niche,
    setNiche,
  } = useFilter();

  const how3 = useHow3client();
  const [filters, setFilters] = useState<FiltersData | null>(null);
  const [loading, setLoading] = useState(false);
  const [availableContentTypes, setAvailableContentTypes] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await how3.get(ENDPOINTS.FETCH_OPTIONS);
        // Filter out YT Short from platforms
        const filteredPlatforms = response.data.platformsWithContentTypes.filter(
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

  // Update available content types when platforms change
  useEffect(() => {
    if (filters?.platformsWithContentTypes) {
      const selectedPlatformData = filters.platformsWithContentTypes.filter((p) =>
        platforms.includes(p.platform)
      );

      const allContentTypes: string[] = selectedPlatformData.flatMap((p) => p.contentTypes);

      // Remove duplicates
      setAvailableContentTypes(Array.from(new Set(allContentTypes)));

      // Clear content types that are no longer available
      setContentTypes((prev: any[]) => prev.filter((type) => allContentTypes.includes(type)));
    }
  }, [platforms, filters?.platformsWithContentTypes, setContentTypes]);

  // Check if required filters are selected (all except credibility)
  const isRequiredFiltersSelected = () => {
    return platforms?.length > 0 && contentTypes?.length > 0 && niche?.length > 0;
  };

  // Get missing required filters
  const getMissingRequiredFilters = () => {
    const missing = [];
    if (platforms.length === 0) missing.push("Platforms");
    if (contentTypes.length === 0) missing.push("Content Types");
    if (niche.length === 0) missing.push("Niche");
    return missing;
  };

  const handleGenerateButton = async () => {
    if (!isRequiredFiltersSelected()) {
      toast.error("Please select options for Platforms, Content Types, and Niche");
      return;
    }

    setLoading(true);
    if (session?.user?.accessToken) {
      router.push(ALLROUTES.HOME);
    } else {
      // redirect to new login page
      router.push(ALLROUTES.SIGN_UP);
    }
  };

  // Required label component
  const RequiredLabel = ({ label }: { label: string }) => (
    <div className="flex items-center gap-1">
      <span>{label}</span>
      <span className="text-red-500">*</span>
    </div>
  );

  return (
    <div className="w-full px-4 md:px-12 flex items-center justify-center mb-16">
      <div className="flex flex-col gap-4 max-w-esm w-full items-center">
        <div className="flex flex-col gap-2 w-full items-start">
          <RequiredLabel label="Platforms" />
          <MultiSelect
            options={filters?.platformsWithContentTypes?.map((p) => p.platform) || []}
            setSelectedOptions={setPlatforms}
            selectedOptions={platforms}
            placeholder="Platforms"
          />
        </div>

        {platforms.length > 0 && (
          <div className="flex flex-col gap-2 w-full items-start">
            <RequiredLabel label="Content Types" />
            <MultiSelect
              options={availableContentTypes}
              selectedOptions={contentTypes}
              setSelectedOptions={setContentTypes}
              placeholder="Content Types"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 w-full items-start">
          <RequiredLabel label="Niche" />
          <MultiSelect
            options={filters?.niches || []}
            selectedOptions={niche}
            setSelectedOptions={setNiche}
            placeholder="Niche"
          />
        </div>

        <div className="flex flex-col gap-2 w-full items-start">
          <span>Credibility Scores</span>
          <MultiSelect
            options={filters?.credibilityScores || []}
            selectedOptions={credibility}
            setSelectedOptions={setCredibility}
            placeholder="Credibility Scores"
          />
        </div>

        <div
          onMouseEnter={() => !isRequiredFiltersSelected() && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative"
        >
          <Button
            onClick={handleGenerateButton}
            type={BUTTON_TYPES.PRIMARY as string}
            size={BUTTON_SIZES.LARGE}
            className="w-fit px-16 mt-12"
            disabled={!isRequiredFiltersSelected()}
          >
            {loading ? "Discovering..." : "Discover"}
          </Button>

          {showTooltip && !isRequiredFiltersSelected() && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap">
              Please select required filters: {getMissingRequiredFilters().join(", ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
