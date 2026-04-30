"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Select, { StylesConfig } from "react-select";
import { BUTTON_SIZES, BUTTON_TYPES } from "@/src/utils/constants";
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

type Option = { value: string; label: string };

const toOptions = (items: readonly string[] | string[]): Option[] =>
  items.map((item) => ({ value: item, label: item }));

const PRIMARY = "#7B46F8";
const PRIMARY_LIGHT = "#ede5fe";

const selectStyles: StylesConfig<Option, true> = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    borderRadius: 12,
    borderColor: state.isFocused ? PRIMARY : "#d1d5db",
    boxShadow: state.isFocused ? `0 0 0 1px ${PRIMARY}` : "none",
    "&:hover": { borderColor: state.isFocused ? PRIMARY : "#9ca3af" },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: PRIMARY_LIGHT,
    borderRadius: 8,
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#374151",
    fontWeight: 500,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#6b7280",
    "&:hover": { backgroundColor: "#e5e7eb", color: "#374151" },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? PRIMARY_LIGHT : state.isFocused ? "#f9fafb" : "white",
    color: state.isSelected ? "#374151" : "#111827",
    fontWeight: state.isSelected ? 600 : 400,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "#6b7280",
    "&:hover": { color: "#374151" },
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
  }),
};

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

  const [showTooltip, setShowTooltip] = React.useState(false);

  const platformOptions = useMemo(() => toOptions([...PLATFORM_OPTIONS]), []);
  const industryOptions = useMemo(() => toOptions([...INDUSTRY_OPTIONS]), []);
  const geographyOptionsList = useMemo(() => toOptions([...GEOGRAPHY_OPTIONS]), []);

  const availableInventoryOptions = useMemo(() => {
    if (platforms.length === 0) return [];
    const all = platforms.flatMap((p) => PLATFORM_INVENTORY_OPTIONS[p] ?? []);
    return toOptions(Array.from(new Set(all)));
  }, [platforms]);

  const availableCategoryOptions = useMemo(() => {
    if (industry.length === 0) return [];
    const all = industry.flatMap((ind) => INDUSTRY_CATEGORY_OPTIONS[ind] ?? []);
    return toOptions(Array.from(new Set(all)));
  }, [industry]);

  useEffect(() => {
    setContentTypes((prev: string[]) =>
      prev.filter((type) => availableInventoryOptions.some((o) => o.value === type))
    );
  }, [platforms, availableInventoryOptions, setContentTypes]);

  useEffect(() => {
    setNiche((prev: string[]) =>
      prev.filter((c) => availableCategoryOptions.some((o) => o.value === c))
    );
  }, [industry, availableCategoryOptions, setNiche]);

  const isRequiredFiltersSelected = () =>
    platforms?.length > 0 && contentTypes?.length > 0 && industry?.length > 0 && niche?.length > 0;

  const getMissingRequiredFilters = () => {
    const missing: string[] = [];
    if (platforms.length === 0) missing.push("Platform");
    if (contentTypes.length === 0) missing.push("Content Type");
    if (industry.length === 0) missing.push("Industry");
    if (niche.length === 0) missing.push("Category");
    return missing;
  };

  const handleGenerateButton = () => {
    if (!isRequiredFiltersSelected()) {
      toast.error("Please select options for Industry, Category, Platform, and Content Type");
      return;
    }
    router.push("/dashboard/influencers");
  };

  const RequiredLabel = ({ label }: { label: string }) => (
    <div className="flex items-center gap-1">
      <span>{label}</span>
      <span className="text-red-500">*</span>
    </div>
  );

  const industryValues = industry.map((v) => ({ value: v, label: v }));
  const nicheValues = niche.map((v) => ({ value: v, label: v }));
  const geographyValues = geography.map((v) => ({ value: v, label: v }));
  const platformValues = platforms.map((v) => ({ value: v, label: v }));
  const contentTypesValues = contentTypes.map((v) => ({ value: v, label: v }));

  return (
    <div className="w-full px-4 md:px-12 flex items-center justify-center mb-16">
      <div className="flex flex-col gap-4 max-w-esm w-full items-center font-Jakarta">
        {/* 1. Industry */}
        <div className="flex flex-col gap-2 w-full items-start">
          <RequiredLabel label="Industry" />
          <Select<Option, true>
            isMulti
            options={industryOptions}
            value={industryValues}
            onChange={(selected) => setIndustry(selected ? selected.map((o) => o.value) : [])}
            placeholder="Industry"
            styles={selectStyles}
            className="w-full"
          />
        </div>

        {/* 2. Category (depends on Industry – options from ALL selected industries) */}
        {industry.length > 0 && (
          <div className="flex flex-col gap-2 w-full items-start">
            <RequiredLabel label="Category" />
            <Select<Option, true>
              isMulti
              options={availableCategoryOptions}
              value={nicheValues}
              onChange={(selected) => setNiche(selected ? selected.map((o) => o.value) : [])}
              placeholder="Category"
              styles={selectStyles}
              className="w-full"
            />
          </div>
        )}

        {/* 3. Geography */}
        <div className="flex flex-col gap-2 w-full items-start">
          <span>Geography</span>
          <Select<Option, true>
            isMulti
            options={geographyOptionsList}
            value={geographyValues}
            onChange={(selected) => setGeography(selected ? selected.map((o) => o.value) : [])}
            placeholder="Geography"
            styles={selectStyles}
            className="w-full"
          />
        </div>

        {/* 4. Platform */}
        <div className="flex flex-col gap-2 w-full items-start">
          <RequiredLabel label="Platform" />
          <Select<Option, true>
            isMulti
            options={platformOptions}
            value={platformValues}
            onChange={(selected) => setPlatforms(selected ? selected.map((o) => o.value) : [])}
            placeholder="Platform"
            styles={selectStyles}
            className="w-full"
          />
        </div>

        {/* 5. Content Type (depends on Platform) */}
        {platforms.length > 0 && (
          <div className="flex flex-col gap-2 w-full items-start">
            <RequiredLabel label="Content Type" />
            <Select<Option, true>
              isMulti
              options={availableInventoryOptions}
              value={contentTypesValues}
              onChange={(selected) => setContentTypes(selected ? selected.map((o) => o.value) : [])}
              placeholder="Content Type"
              styles={selectStyles}
              className="w-full"
            />
          </div>
        )}

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
            Discover
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
