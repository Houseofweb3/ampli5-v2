"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ALLROUTES, BUTTON_SIZES, BUTTON_TYPES } from "@/src/utils/constants";
import MultiSelect from "@/src/components/ui/multi-select";
import { Button } from "@/src/components";
import { toast } from "react-hot-toast";
import { useFilter } from "@/src/context/FilterContext";
import {
  PLATFORM_OPTIONS,
  INDUSTRY_OPTIONS,
  INDUSTRY_CATEGORY_OPTIONS,
  PLATFORM_INVENTORY_OPTIONS,
  GEOGRAPHY_OPTIONS,
} from "@/src/constants/creatorOnboardingFilters";
import { getToken } from "@/src/store/dashboardAuthStore";

const FilterSection = () => {
  const router = useRouter();

  const {
    platforms,
    setPlatforms,
    contentTypes,
    setContentTypes,
    niche,
    setNiche,
    industry,
    setIndustry,
    geography,
    setGeography,
  } = useFilter();

  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
    setContentTypes((prev: string[]) =>
      prev.filter((type) => availableInventoryOptions.includes(type))
    );
  }, [platforms, availableInventoryOptions, setContentTypes]);

  useEffect(() => {
    setNiche((prev: string[]) =>
      prev.filter((c) => availableCategoryOptions.includes(c))
    );
  }, [industry, availableCategoryOptions, setNiche]);

  const isRequiredFiltersSelected = () => {
    return (
      platforms?.length > 0 &&
      contentTypes?.length > 0 &&
      industry?.length > 0 &&
      niche?.length > 0
    );
  };

  const getMissingRequiredFilters = () => {
    const missing = [];
    if (platforms.length === 0) missing.push("Platform");
    if (contentTypes.length === 0) missing.push("Inventory");
    if (industry.length === 0) missing.push("Industry");
    if (niche.length === 0) missing.push("Category");
    return missing;
  };

  const handleGenerateButton = async () => {
    if (!isRequiredFiltersSelected()) {
      toast.error("Please select options for Platform, Inventory, Industry, and Category");
      return;
    }
    setLoading(true);
    const hasToken = typeof window !== "undefined" && !!getToken();
    router.push(hasToken ? ALLROUTES.HOME : ALLROUTES.SIGN_IN);
    setLoading(false);
  };

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
          <RequiredLabel label="Platform" />
          <MultiSelect
            options={platformOptions}
            setSelectedOptions={setPlatforms}
            selectedOptions={platforms}
            placeholder="Platform"
          />
        </div>

        {platforms.length > 0 && (
          <div className="flex flex-col gap-2 w-full items-start">
            <RequiredLabel label="Content Type" />
            <MultiSelect
              options={availableInventoryOptions}
              selectedOptions={contentTypes}
              setSelectedOptions={setContentTypes}
              placeholder="Inventory"
            />
          </div>
        )}

        <div className="flex flex-col gap-2 w-full items-start">
          <RequiredLabel label="Industry" />
          <MultiSelect
            options={industryOptions}
            selectedOptions={industry}
            setSelectedOptions={setIndustry}
            placeholder="Industry"
          />
        </div>

        {industry.length > 0 && (
          <div className="flex flex-col gap-2 w-full items-start">
            <RequiredLabel label="Category" />
            <MultiSelect
              options={availableCategoryOptions}
              selectedOptions={niche}
              setSelectedOptions={setNiche}
              placeholder="Category"
            />
          </div>
        )}

        <div className="flex flex-col gap-2 w-full items-start">
          <span>Geography</span>
          <MultiSelect
            options={geographyOptionsList}
            selectedOptions={geography}
            setSelectedOptions={setGeography}
            placeholder="Geography"
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
