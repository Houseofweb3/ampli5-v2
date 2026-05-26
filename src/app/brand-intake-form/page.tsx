"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useBrandIntakeFormStore } from "@/src/store/brandIntakeForm";
import { signupWebClient } from "@/src/services/dashboardAuth";
import { useDashboardAuthStore } from "@/src/store/dashboardAuthStore";
import { DASHBOARD_HOME } from "@/src/config/dashboardRoutes";
import type { AuthClient } from "@/src/types/dashboardAuth";

const SECTION_IDS = [1, 2, 3, 4, 5, 6, 7] as const;

function getErrorKeyToSectionId(key: string): number {
  if (
    key === "brandProductName" ||
    key === "websiteLink" ||
    key === "primaryContactEmail" ||
    key === "telegramId" ||
    key === "whatsappNumber"
  )
    return 1;
  if (key === "categories") return 2;
  if (key === "campaignGoals") return 3;
  if (key === "monetizationModel") return 4;
  if (key === "primaryAudienceGeography" || key === "ageRange" || key === "genderSkew") return 5;
  if (key === "campaignStartTimeline") return 6;
  if (key === "customBrief") return 7;
  return 1;
}

export default function BrandIntakeForm() {
  const router = useRouter();
  const { formData, updateFormData, resetForm } = useBrandIntakeFormStore();
  const login = useDashboardAuthStore((s) => s.login);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [numberPickupCountry] = useState<string>("us");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const scrollToSectionForError = (errorKey: string) => {
    const sectionId = getErrorKeyToSectionId(errorKey);
    const el = sectionRefs.current[sectionId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const collectStepErrors = (step: number): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.brandProductName.trim()) {
          newErrors.brandProductName = "Brand Product Name is required";
        }
        if (!formData.websiteLink.trim()) {
          newErrors.websiteLink = "Website / Landing / Podcast Page Link is required";
        } else {
          const link = formData.websiteLink.trim();

          const looksLikeDomain = /^[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}(\/.*)?$/.test(link);
          if (!looksLikeDomain) {
            newErrors.websiteLink =
              "Please enter a valid URL or domain (e.g. example.com or www.example.com)";
          }
        }
        if (!formData.primaryContactEmail.trim()) {
          newErrors.primaryContactEmail = "Primary Contact Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryContactEmail)) {
          newErrors.primaryContactEmail = "Please enter a valid email address";
        }
        const hasTelegram = formData.telegramId?.trim();
        const hasWhatsApp = formData.whatsappNumber?.trim();
        if (!hasTelegram && !hasWhatsApp) {
          newErrors.telegramId = "At least one of Telegram ID or WhatsApp Number is required";
          newErrors.whatsappNumber = "At least one of Telegram ID or WhatsApp Number is required";
        }
        break;
      case 2:
        if (!formData.categories || formData.categories.length === 0) {
          newErrors.categories = "Please select at least one category";
        }
        break;
      case 3:
        if (!formData.campaignGoals || formData.campaignGoals.length === 0) {
          newErrors.campaignGoals = "Please select at least one campaign goal";
        }
        break;
      case 4:
        if (!formData.monetizationModel || formData.monetizationModel.length === 0) {
          newErrors.monetizationModel = "Please select at least one monetization model";
        }
        break;
      case 5:
        if (!formData.primaryAudienceGeography || formData.primaryAudienceGeography.length === 0) {
          newErrors.primaryAudienceGeography = "Please select at least one geography option";
        } else if (formData.primaryAudienceGeography.length > 2) {
          newErrors.primaryAudienceGeography =
            "Select at most 2 target geographies for primary audience";
        }
        if (!formData.ageRange.trim()) {
          newErrors.ageRange = "Age Range is required";
        }
        if (!formData.genderSkew.trim()) {
          newErrors.genderSkew = "Gender Skew is required";
        }
        break;
      case 6:
        if (!formData.campaignStartTimeline.trim()) {
          newErrors.campaignStartTimeline = "Campaign Start Timeline is required";
        }
        break;
      case 7:
        if (!formData.customBrief.trim()) {
          newErrors.customBrief = "Custom Brief is required";
        } else {
          const wordCount = formData.customBrief
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0).length;
          if (wordCount > 500) {
            newErrors.customBrief = "Custom Brief must be 500 words or less";
          }
        }
        break;
    }

    return newErrors;
  };

  type ValidateAllResult =
    | { valid: true; firstErrorMessage?: undefined; firstErrorKey?: undefined }
    | { valid: false; firstErrorMessage: string; firstErrorKey: string };
  const validateAll = (): ValidateAllResult => {
    const all: Record<string, string> = {};
    for (const step of SECTION_IDS) {
      Object.assign(all, collectStepErrors(step));
    }
    setErrors(all);
    const keys = Object.keys(all);
    if (keys.length === 0) {
      return { valid: true };
    }
    return {
      valid: false,
      firstErrorMessage: all[keys[0]],
      firstErrorKey: keys[0],
    };
  };

  const handleCampaignGoalChange = (goal: string) => {
    const currentGoals = formData.campaignGoals || [];
    if (currentGoals.includes(goal)) {
      updateFormData({
        campaignGoals: currentGoals.filter((g) => g !== goal),
      });
    } else {
      updateFormData({
        campaignGoals: [...currentGoals, goal],
      });
    }
  };

  const renderSection = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.brandProductName}
                  onChange={(e) => {
                    updateFormData({ brandProductName: e.target.value });
                    if (errors.brandProductName) {
                      setErrors((prev) => ({ ...prev, brandProductName: "" }));
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                    errors.brandProductName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter brand product name"
                />
                {errors.brandProductName && (
                  <p className="mt-1 text-sm text-red-500">{errors.brandProductName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website / Landing / Podcast Page Link <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex w-full rounded-lg border bg-white ${errors.websiteLink ? "border-red-500" : "border-gray-300"} focus-within:ring-2 focus-within:ring-[#7B46F8] focus-within:border-transparent`}
                >
                  <span className="inline-flex items-center px-4 py-3 text-gray-500 border-r border-gray-300 rounded-l-lg bg-gray-50 text-sm shrink-0">
                    www.
                  </span>
                  <input
                    type="text"
                    value={
                      formData.websiteLink.startsWith("http")
                        ? formData.websiteLink
                        : formData.websiteLink.replace(/^www\./i, "")
                    }
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v.startsWith("http")) {
                        updateFormData({ websiteLink: v });
                      } else {
                        const domain = v.replace(/^www\./i, "").trim();
                        updateFormData({ websiteLink: domain ? "www." + domain : "" });
                      }
                      if (errors.websiteLink) setErrors((prev) => ({ ...prev, websiteLink: "" }));
                    }}
                    className="flex-1 min-w-0 px-4 py-3 border-0 rounded-r-lg focus:ring-0 focus:outline-none"
                    placeholder="example.com"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter domain with or without www (e.g. example.com or full URL)
                </p>
                {errors.websiteLink && (
                  <p className="mt-1 text-sm text-red-500">{errors.websiteLink}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.primaryContactEmail}
                  onChange={(e) => {
                    updateFormData({ primaryContactEmail: e.target.value });
                    if (errors.primaryContactEmail) {
                      setErrors((prev) => ({ ...prev, primaryContactEmail: "" }));
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                    errors.primaryContactEmail ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="arun@abc.com"
                />
                {errors.primaryContactEmail && (
                  <p className="mt-1 text-sm text-red-500">{errors.primaryContactEmail}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telegram ID</label>
                <input
                  type="text"
                  value={formData.telegramId}
                  onChange={(e) => {
                    updateFormData({ telegramId: e.target.value });
                    if (errors.telegramId || errors.whatsappNumber) {
                      setErrors((prev) => ({ ...prev, telegramId: "", whatsappNumber: "" }));
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                    errors.telegramId ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="XXX XXX XXXX"
                />
                {errors.telegramId && (
                  <p className="mt-1 text-sm text-red-500">{errors.telegramId}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <PhoneInput
                  country={numberPickupCountry}
                  value={formData.whatsappNumber}
                  onChange={(value: string) => {
                    updateFormData({ whatsappNumber: value });
                    if (errors.telegramId || errors.whatsappNumber) {
                      setErrors((prev) => ({ ...prev, telegramId: "", whatsappNumber: "" }));
                    }
                  }}
                  enableLongNumbers
                  disableCountryCode={false}
                  inputStyle={{
                    width: "100%",
                    height: "48px",
                    padding: "14px 60px",
                    border: errors.whatsappNumber ? "2px solid #ef4444" : "2px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "16px",
                    backgroundColor: "#fff",
                    color: "#1F2937",
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                  buttonStyle={{
                    border: errors.whatsappNumber ? "2px solid #ef4444" : "2px solid #D1D5DB",
                    borderRadius: "8px 0 0 8px",
                    backgroundColor: "#fff",
                  }}
                  dropdownStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #D1D5DB",
                    borderRadius: "8px",
                  }}
                />
                {errors.whatsappNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.whatsappNumber}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        const categories = [
          "Crypto",
          "AI",
          "Trading & Fintech",
          "Startups",
          "Robotics & Hardware",
          "Health & Fitness",
        ];

        const handleCategoryChange = (category: string) => {
          const currentCategories = formData.categories || [];
          const newCategories = currentCategories.includes(category)
            ? currentCategories.filter((c) => c !== category)
            : [...currentCategories, category];
          updateFormData({ categories: newCategories });
          if (errors.categories) {
            setErrors((prev) => ({ ...prev, categories: "" }));
          }
        };

        return (
          <div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select The Category <span className="text-red-500">*</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => {
                    const isSelected = formData.categories?.includes(category) || false;
                    return (
                      <label
                        key={category}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                          isSelected
                            ? "border-[#7B46F8] bg-white"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCategoryChange(category)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${
                            isSelected
                              ? "bg-[#7B46F8] border-[#7B46F8]"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {category}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.categories && (
                  <p className="mt-2 text-sm text-red-500">{errors.categories}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        const campaignGoals = [
          "Awareness / reach",
          "Traffic to site",
          "Sign-ups / installs / subscribers / Conversions",
          "Affiliate sales",
        ];

        return (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
              <h3 className="text-lg font-semibold text-gray-900">
                Primary Campaign Goal <span className="text-red-500">*</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {campaignGoals.map((goal) => {
                const isSelected = formData.campaignGoals?.includes(goal) || false;
                return (
                  <label
                    key={goal}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      isSelected
                        ? "border-[#7B46F8] bg-white"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        handleCampaignGoalChange(goal);
                        if (errors.campaignGoals) {
                          setErrors((prev) => ({ ...prev, campaignGoals: "" }));
                        }
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${
                        isSelected ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {goal}
                    </span>
                  </label>
                );
              })}
              {errors.campaignGoals && (
                <p className="mt-2 text-sm text-red-500">{errors.campaignGoals}</p>
              )}
            </div>
          </div>
        );
      case 4:
        const monetizationModels = [
          "Subscriptions",
          "One-time purchase",
          "Freemium → Paid",
          "Trading",
          "Token / asset-based",
        ];

        const handleMonetizationModelChange = (model: string) => {
          const currentModels = formData.monetizationModel || [];
          const newModels = currentModels.includes(model)
            ? currentModels.filter((m) => m !== model)
            : [...currentModels, model];
          updateFormData({ monetizationModel: newModels });
          if (errors.monetizationModel) {
            setErrors((prev) => ({ ...prev, monetizationModel: "" }));
          }
        };

        return (
          <div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Monetization Model <span className="text-red-500">*</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {monetizationModels.map((model) => {
                    const isSelected = formData.monetizationModel?.includes(model) || false;
                    return (
                      <label
                        key={model}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                          isSelected
                            ? "border-[#7B46F8] bg-white"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleMonetizationModelChange(model)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${
                            isSelected
                              ? "bg-[#7B46F8] border-[#7B46F8]"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {model}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.monetizationModel && (
                  <p className="mt-2 text-sm text-red-500">{errors.monetizationModel}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 5:
        const geographyOptions = [
          "North America (US, Canada)",
          "Europe (All Zones)",
          "South Asia (Includes India and Pakistan)",
          "South East Asia",
          "LATAM (Central America & South America)",
          "MENA (Middle East & North Africa)",
        ];
        const ageRangeOptions = ["18 - 24", "25 - 45", "45 - 60"];
        const genderSkewOptions = ["Skewed male", "Balanced", "Skewed Female"];

        const MAX_GEOGRAPHY_SELECTIONS = 2;
        const handleGeographyChange = (option: string) => {
          const currentGeography = formData.primaryAudienceGeography || [];
          if (currentGeography.includes(option)) {
            const newGeography = currentGeography.filter((g) => g !== option);
            updateFormData({ primaryAudienceGeography: newGeography });
          } else if (currentGeography.length < MAX_GEOGRAPHY_SELECTIONS) {
            updateFormData({ primaryAudienceGeography: [...currentGeography, option] });
          } else {
            toast.error("Select your target geography (only 2 allowed)");
            return;
          }
          if (errors.primaryAudienceGeography) {
            setErrors((prev) => ({ ...prev, primaryAudienceGeography: "" }));
          }
        };

        const handleAgeRangeChange = (option: string) => {
          updateFormData({ ageRange: option });
          if (errors.ageRange) {
            setErrors((prev) => ({ ...prev, ageRange: "" }));
          }
        };

        const handleGenderSkewChange = (option: string) => {
          updateFormData({ genderSkew: option });
          if (errors.genderSkew) {
            setErrors((prev) => ({ ...prev, genderSkew: "" }));
          }
        };

        const resetGeography = () => {
          updateFormData({ primaryAudienceGeography: [] });
        };

        const resetAgeRange = () => {
          updateFormData({ ageRange: "" });
        };

        const resetGenderSkew = () => {
          updateFormData({ genderSkew: "" });
        };

        return (
          <div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Primary Audience Geography <span className="text-red-500">*</span>
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={resetGeography}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reset
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Select your target geography (only 2 allowed)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {geographyOptions.map((option) => {
                    const isSelected = formData.primaryAudienceGeography?.includes(option) || false;
                    return (
                      <label
                        key={option}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleGeographyChange(option)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${isSelected ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"}`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.primaryAudienceGeography && (
                  <p className="mt-2 text-sm text-red-500">{errors.primaryAudienceGeography}</p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Primary Audience Age Range <span className="text-red-500">*</span>
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={resetAgeRange}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reset
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ageRangeOptions.map((option) => {
                    const isSelected = formData.ageRange === option;
                    return (
                      <label
                        key={option}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}
                      >
                        <input
                          type="radio"
                          name="ageRange-mobile"
                          checked={isSelected}
                          onChange={() => handleAgeRangeChange(option)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${isSelected ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"}`}
                        >
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span
                          className={`text-sm font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.ageRange && <p className="mt-2 text-sm text-red-500">{errors.ageRange}</p>}
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Gender Skew (Best Estimate) <span className="text-red-500">*</span>
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={resetGenderSkew}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reset
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {genderSkewOptions.map((option) => {
                    const isSelected = formData.genderSkew === option;
                    return (
                      <label
                        key={option}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}
                      >
                        <input
                          type="radio"
                          name="genderSkew-mobile"
                          checked={isSelected}
                          onChange={() => handleGenderSkewChange(option)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${isSelected ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"}`}
                        >
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span
                          className={`text-sm font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.genderSkew && (
                  <p className="mt-2 text-sm text-red-500">{errors.genderSkew}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 6:
        const timelineOptions = ["Immediate", "1-2 weeks", "3-4 weeks", "Flexible"];

        const handleTimelineChange = (option: string) => {
          updateFormData({ campaignStartTimeline: option });
          if (errors.campaignStartTimeline) {
            setErrors((prev) => ({ ...prev, campaignStartTimeline: "" }));
          }
        };

        return (
          <div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    + Campaign Start Timeline <span className="text-red-500">*</span>
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timelineOptions.map((option) => {
                    const isSelected = formData.campaignStartTimeline === option;
                    return (
                      <label
                        key={option}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                          isSelected
                            ? "border-[#7B46F8] bg-white"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="campaignStartTimeline"
                          checked={isSelected}
                          onChange={() => handleTimelineChange(option)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${
                            isSelected
                              ? "bg-[#7B46F8] border-[#7B46F8]"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.campaignStartTimeline && (
                  <p className="mt-2 text-sm text-red-500">{errors.campaignStartTimeline}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 7:
        const wordCount = formData.customBrief
          ? formData.customBrief
              .trim()
              .split(/\s+/)
              .filter((word) => word.length > 0).length
          : 0;
        const maxWords = 500;

        return (
          <div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    + Please Provide Custom Brief <span className="text-red-500">*</span>
                  </h3>
                </div>
                <textarea
                  value={formData.customBrief}
                  onChange={(e) => {
                    const text = e.target.value;
                    updateFormData({ customBrief: text });
                    if (errors.customBrief) {
                      setErrors((prev) => ({ ...prev, customBrief: "" }));
                    }
                  }}
                  rows={8}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent resize-none ${
                    errors.customBrief || wordCount > maxWords
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Briefly describe your brand, product/service, target audience, and what you want to achieve with this campaign."
                />
                <div className="flex items-center justify-between mt-2">
                  <div>
                    {errors.customBrief && (
                      <p className="text-sm text-red-500">{errors.customBrief}</p>
                    )}
                    {wordCount > maxWords && !errors.customBrief && (
                      <p className="text-sm text-red-500">Please limit your brief to 500 words</p>
                    )}
                  </div>
                  <p
                    className={`text-sm ${wordCount > maxWords ? "text-red-500" : "text-gray-500"}`}
                  >
                    {wordCount} / {maxWords} words
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white relative min-h-screen">
        <div className="bg-[#7B46F8] relative py-24">
          <div className="absolute top-0 right-0 z-10">
            <Image
              src={"/icons/hero-arrow.png"}
              width={100}
              height={100}
              alt="bg"
              className="w-full h-[100px] md:h-[150px] object-cover"
            />
          </div>
          <div className="absolute -top-[40px] md:-top-[65px] left-0 z-10">
            <Image
              src={"/pattern/flower.png"}
              width={1000}
              height={1000}
              alt="bg"
              className="w-full h-[100px] md:h-[150px] object-cover"
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-start items-center justify-center gap-2">
            <Image
              src={"/logo/white.jpg"}
              width={1000}
              height={1000}
              alt="bg"
              className="h-[48px] md:h-[55px] w-auto pt-1"
            />
            <h1 className="text-white text-center text-4xl md:text-5xl font-semibold">
              Brand Intake Form
            </h1>
          </div>
          <div className="absolute -bottom-[50px] lg:left-[345px] left-[80px] z-10">
            <Image
              src={"/icons/Star-fill.png"}
              width={1000}
              height={1000}
              alt="bg"
              className="w-full h-[100px]  object-cover"
            />
          </div>
        </div>
        <div className="bg-[#F8F8F8] py-12 px-4 sm:px-8 pb-32">
          <div className="max-w-5xl mx-auto bg-white rounded-lg sm:p-8 p-4">
            {SECTION_IDS.map((id, idx) => (
              <div
                key={id}
                ref={(el) => {
                  sectionRefs.current[id] = el;
                }}
                className={`scroll-mt-6 ${idx > 0 ? "mt-4 pt-4 border-t border-gray-200" : ""}`}
              >
                {renderSection(id)}
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 w-full bg-white p-4 md:p-6 border-t border-gray-200 flex justify-end gap-4 rounded-t-lg shadow-lg z-10">
          <button
            type="button"
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                window.confirm("Reset all fields? This will clear everything you've entered.")
              ) {
                resetForm();
                setErrors({});
              }
            }}
            disabled={isSubmitting}
            className="px-6 py-3 bg-white text-[#7B46F8] border-2 border-[#7B46F8] rounded-lg hover:bg-[#7B46F8] hover:text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset all
          </button>
          <button
            onClick={async () => {
              const result = validateAll();
              if (!result.valid) {
                toast.error(result.firstErrorMessage ?? "Please fill in all required fields");
                if (result.firstErrorKey) scrollToSectionForError(result.firstErrorKey);
                return;
              }

              setIsSubmitting(true);
              try {
                const payload = {
                  brandProductName: formData.brandProductName.trim(),
                  websiteLink: formData.websiteLink.trim(),
                  primaryContactEmail: formData.primaryContactEmail.trim(),
                  ...(formData.telegramId?.trim() && {
                    telegramId: formData.telegramId.trim(),
                  }),
                  ...(formData.whatsappNumber?.trim() && {
                    whatsappNumber: formData.whatsappNumber.trim(),
                  }),
                  ...(formData.categories?.length
                    ? { categories: formData.categories }
                    : {}),
                  ...(formData.audienceReadinessLevel?.trim() && {
                    audienceReadinessLevel: formData.audienceReadinessLevel.trim(),
                  }),
                  ...(formData.campaignGoals?.length
                    ? { campaignGoals: formData.campaignGoals }
                    : {}),
                  ...(formData.monetizationModel?.length
                    ? { monetizationModel: formData.monetizationModel }
                    : {}),
                  ...(formData.revenueModel?.trim() && {
                    revenueModel: formData.revenueModel.trim(),
                  }),
                  ...(formData.marketFocus?.trim() && {
                    marketFocus: formData.marketFocus.trim(),
                  }),
                  ...(formData.primaryAudienceGeography?.length
                    ? { primaryAudienceGeography: formData.primaryAudienceGeography }
                    : {}),
                  ...(formData.ageRange?.trim() && { ageRange: formData.ageRange.trim() }),
                  ...(formData.genderSkew?.trim() && {
                    genderSkew: formData.genderSkew.trim(),
                  }),
                  ...(formData.geographicLocation?.trim() && {
                    geographicLocation: formData.geographicLocation.trim(),
                  }),
                  ...(formData.campaignStartTimeline?.trim() && {
                    campaignStartTimeline: formData.campaignStartTimeline.trim(),
                  }),
                  ...(formData.campaignStartDate?.trim() && {
                    campaignStartDate: formData.campaignStartDate.trim(),
                  }),
                  ...(formData.campaignEndDate?.trim() && {
                    campaignEndDate: formData.campaignEndDate.trim(),
                  }),
                  ...(formData.customBrief?.trim() && {
                    customBrief: formData.customBrief.trim(),
                  }),
                };

                const data = await signupWebClient(payload);

                try {
                  await fetch("/api/brand-intake", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                } catch (sheetErr) {
                  console.error("Brand intake Google Sheet request failed:", sheetErr);
                }

                resetForm();

                const client: AuthClient = {
                  id: data.client.id,
                  name: data.client.name,
                  email: data.client.email,
                  telegramId:
                    (data.client as { telegramId?: string | null }).telegramId ?? null,
                  whatsAppNumber:
                    (data.client as { whatsAppNumber?: string | null }).whatsAppNumber ??
                    null,
                };
                login(client, data.token);
                toast.success(data.message ?? "Account created. Redirecting...");
                router.push(DASHBOARD_HOME);
              } catch (err: unknown) {
                const message =
                  err &&
                  typeof err === "object" &&
                  "response" in err &&
                  err.response &&
                  typeof err.response === "object" &&
                  "data" in err.response &&
                  err.response.data &&
                  typeof (err.response.data as { error?: string }).error === "string"
                    ? (err.response.data as { error: string }).error
                    : "Failed to submit. Please try again.";
                toast.error(message);
              } finally {
                setIsSubmitting(false);
              }
            }}
            disabled={isSubmitting}
            className={`px-6 py-3 bg-[#7B46F8] text-white rounded-lg hover:bg-[#6B3EE8] transition-colors shadow-md font-medium ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}
