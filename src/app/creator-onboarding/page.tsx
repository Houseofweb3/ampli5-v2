"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCreatorOnboardingFormStore } from "@/src/store/creatorOnboardingForm";
import Select from "react-select";
import type { StylesConfig } from "react-select";
import {
  PLATFORM_OPTIONS,
  INDUSTRY_OPTIONS,
  INDUSTRY_CATEGORY_OPTIONS,
  PLATFORM_INVENTORY_OPTIONS,
  GEOGRAPHY_OPTIONS,
  CREATOR_TYPE_OPTIONS,
  COLLABORATION_PROOF_SLOTS,
  EMPTY_PLATFORM_COLLABORATION_PROOF,
  type CollaborationProofImageField,
  getAudienceProofHeaderExamples,
  getPlatformDisplay,
  type AudienceProofScreenshotField,
  ALL_INSTAGRAM_INVENTORY_KEYS,
  getInventoryOptionsForPlatform,
  type InstagramInventoryMode,
} from "@/src/constants/creatorOnboardingFilters";
import {
  submitCreatorOnboarding,
  getInstagramOAuthUrl,
  disconnectInstagram,
} from "@/src/services/creatorOnboardingApi";
import {
  buildOnboardingFolderName,
  deleteAmpli5ImageByUrl,
  uploadAmpli5Image,
} from "@/src/services/ampli5Images";
import { OnboardingImagePreview } from "@/src/components/creator-onboarding/OnboardingImagePreview";
import { openOnboardingFancyboxGallery } from "@/src/components/creator-onboarding/useOnboardingFancybox";

const SECTION_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

function getErrorKeyToSectionId(key: string): number {
  if (key === "type") return 1;
  if (
    key === "channelBrandName" ||
    key === "primaryContactEmail" ||
    key === "telegramOrWhatsApp" ||
    key === "primaryCountry" ||
    key === "primaryTimezone" ||
    key === "platforms" ||
    key.startsWith("platformUrl_")
  )
    return 1;
  if (key === "industries") return 2;
  if (key === "categories") return 3;
  if (key === "inventoryItems" || key === "instagramInventoryMode") return 4;
  if (key === "primaryAudienceGeography" || key === "secondaryAudienceGeography") return 5;
  if (key.startsWith("audienceProof_")) return 6;
  if (key === "paymentTerms") return 7;
  if (key === "turnaroundTimes") return 8;
  if (key.startsWith("collaborationProof_")) return 9;
  if (key === "finalConfirmation") return 10;
  return 1;
}

const MAX_CATEGORY_SELECTIONS = 2;
/** Selling price = user price + 16%, rounded to nearest 100 (e.g. 554 → 600, 549 → 500). */
function roundToNearest100(x: number): number {
  return Math.round(x / 100) * 100;
}
function getSellingPrice(userPrice: number): number {
  return roundToNearest100(userPrice * 1.16);
}
/** CPM = (sellingPrice / avgViews) × 1,000. Returns null if avgViews <= 0. */
function getCpm(sellingPrice: number, avgViews: number): number | null {
  if (!avgViews || avgViews <= 0) return null;
  return (sellingPrice / avgViews) * 1000;
}

const COUNTRY_OPTIONS = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Egypt",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "Hong Kong",
  "Hungary",
  "India",
  "Indonesia",
  "Iran",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Kenya",
  "South Korea",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Other",
];

const TIMEZONE_OPTIONS = [
  "GMT-12",
  "GMT-11",
  "GMT-10",
  "GMT-9",
  "GMT-8",
  "GMT-7",
  "GMT-6",
  "GMT-5",
  "GMT-4",
  "GMT-3",
  "GMT-2",
  "GMT-1",
  "GMT",
  "GMT+1",
  "GMT+2",
  "GMT+3",
  "GMT+4",
  "GMT+5",
  "GMT+5:30",
  "GMT+6",
  "GMT+7",
  "GMT+8",
  "GMT+9",
  "GMT+9:30",
  "GMT+10",
  "GMT+11",
  "GMT+12",
  "GMT+13",
  "GMT+14",
];

const countrySelectOptions = COUNTRY_OPTIONS.map((c) => ({
  value: c,
  label: c,
}));
const timezoneSelectOptions = TIMEZONE_OPTIONS.map((tz) => ({
  value: tz,
  label: tz,
}));

function isValidUrl(value: string): boolean {
  const trimmed = (value || "").trim();
  if (!trimmed) return false;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    new URL(withProtocol);
    return true;
  } catch {
    return false;
  }
}

type SelectOption = { value: string; label: string };
type ControlState = {
  isFocused?: boolean;
  selectProps?: { menuIsOpen?: boolean };
};
type OptionState = { isSelected?: boolean; isFocused?: boolean };

function getSelectStyles(hasError: boolean, withIcon = false): StylesConfig<SelectOption, false> {
  return {
    control: (base: Record<string, unknown>, state: ControlState) => ({
      ...base,
      minHeight: 48,
      paddingLeft: 16,
      paddingRight: withIcon ? 40 : 16,
      borderRadius: 8,
      borderColor: hasError ? "#ef4444" : state.isFocused ? "#7B46F8" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(123, 70, 248, 0.2)" : "none",
      "&:hover": { borderColor: hasError ? "#ef4444" : "#9ca3af" },
    }),
    placeholder: (base: Record<string, unknown>) => ({
      ...base,
      color: "#9ca3af",
    }),
    singleValue: (base: Record<string, unknown>) => ({
      ...base,
      color: "#111827",
    }),
    input: (base: Record<string, unknown>) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base: Record<string, unknown>, state: ControlState) => ({
      ...base,
      color: "#9ca3af",
      padding: 8,
      "&:hover": { color: "#6b7280" },
      transform: state.selectProps?.menuIsOpen ? "rotate(180deg)" : undefined,
    }),
    menu: (base: Record<string, unknown>) => ({
      ...base,
      borderRadius: 8,
      border: "1px solid #e5e7eb",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
    }),
    option: (base: Record<string, unknown>, state: OptionState) => ({
      ...base,
      backgroundColor: state.isSelected ? "#ede9fe" : state.isFocused ? "#f5f3ff" : "white",
      color: state.isSelected ? "#7B46F8" : "#111827",
    }),
  };
}

const LocationPinIcon = () => (
  <svg
    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default function CreatorOnboardingForm() {
  const router = useRouter();
  const { formData, updateFormData, resetForm } = useCreatorOnboardingFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [numberPickupCountry] = useState<string>("us");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadingFields, setUploadingFields] = useState<Set<string>>(new Set());
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  /** UI-only: which Instagram inventory list to show (not sent in submit payload). */
  const [instagramInventoryMode, setInstagramInventoryMode] =
    useState<InstagramInventoryMode | null>(null);
  /** UI-only: true while the "Login with Instagram" popup round-trip is in flight. */
  const [connectingInstagram, setConnectingInstagram] = useState<boolean>(false);
  /** UI-only: friendly, client-ready error shown in the Instagram card after a failed connect. */
  const [instagramError, setInstagramError] = useState<string>("");

  useEffect(() => {
    if (!formData.platforms?.includes("Instagram")) {
      setInstagramInventoryMode(null);
    }
  }, [formData.platforms]);

  // Listen for the OAuth popup result (postMessage from the backend callback page).
  // On success, store the verified summary + auto-fill the Instagram URL/handle/followers.
  useEffect(() => {
    // The popup callback runs on the backend origin. In local dev that's the dashboard
    // API origin; behind an HTTPS tunnel (e.g. ngrok) set NEXT_PUBLIC_IG_CALLBACK_ORIGIN
    // to the tunnel origin so the postMessage isn't dropped.
    const allowedOrigins = [
      (() => {
        try {
          return new URL(process.env.NEXT_PUBLIC_DASHBOARD_API_URL || "").origin;
        } catch {
          return "";
        }
      })(),
      process.env.NEXT_PUBLIC_IG_CALLBACK_ORIGIN || "",
    ].filter(Boolean);

    const onMessage = (event: MessageEvent) => {
      if (allowedOrigins.length > 0 && !allowedOrigins.includes(event.origin)) return;
      const data = event.data as
        | {
            source?: string;
            success?: boolean;
            reason?: string;
            instagram?: Record<string, unknown>;
            error?: string;
          }
        | undefined;
      // Only handle our own OAuth popup messages (marker set by the backend callback).
      if (!data || typeof data !== "object" || data.source !== "ampli5-instagram") return;

      setConnectingInstagram(false);
      if (data.success === false || !data.instagram) {
        const friendly =
          data.error ||
          (data.reason === "cancelled"
            ? "Instagram login was cancelled."
            : "We couldn’t connect your Instagram account. Please try again.");
        setInstagramError(friendly);
        toast.error(friendly);
        return;
      }
      setInstagramError("");

      const ig = data.instagram as {
        igUserId: string;
        username: string;
        followersCount: number;
        accountType: string;
        topCountries?: { key: string; value: number }[];
        topCities?: { key: string; value: number }[];
        age?: { key: string; value: number }[];
        gender?: { key: string; value: number }[];
        note?: string;
      };

      updateFormData({
        instagramConnected: true,
        instagramUserId: ig.igUserId,
        instagramVerified: {
          username: ig.username,
          followersCount: ig.followersCount,
          accountType: ig.accountType,
          topCountries: ig.topCountries,
          topCities: ig.topCities,
          age: ig.age,
          gender: ig.gender,
        },
        instagramHandle: ig.username,
        instagramFollowers: String(ig.followersCount ?? ""),
        platformUrls: {
          ...(useCreatorOnboardingFormStore.getState().formData.platformUrls || {}),
          Instagram: `https://instagram.com/${ig.username}`,
        },
      });
      setErrors((prev) => ({ ...prev, platformUrl_Instagram: "" }));
      toast.success(`Connected as @${ig.username}`);
      if (ig.note) toast(ig.note, { icon: "ℹ️" });
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [updateFormData]);

  const handleConnectInstagram = async () => {
    try {
      setInstagramError("");
      setConnectingInstagram(true);
      const { url } = await getInstagramOAuthUrl();
      const popup = window.open(url, "ig_oauth", "width=600,height=700");
      if (!popup) {
        setConnectingInstagram(false);
        const msg = "Popup blocked. Please allow popups for this site and try again.";
        setInstagramError(msg);
        toast.error(msg);
      }
    } catch (e) {
      console.error("Error connecting Instagram:", e);
      setConnectingInstagram(false);
      const msg = "Couldn’t start Instagram login. Please try again in a moment.";
      setInstagramError(msg);
      toast.error(msg);
    }
  };

  const handleDisconnectInstagram = async () => {
    const igUserId = formData.instagramUserId;
    // Clear local state immediately; revoke the stored connection on the backend too.
    updateFormData({
      instagramConnected: false,
      instagramUserId: "",
      instagramVerified: undefined,
    });
    setInstagramError("");
    if (igUserId) {
      try {
        await disconnectInstagram(igUserId);
      } catch (e) {
        // Local state is already cleared; surface a non-blocking notice.
        toast.error("Disconnected locally, but the server cleanup failed. Please retry if it reconnects.");
      }
    }
  };

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
      case 1: {
        if (!formData.type?.trim()) {
          newErrors.type = "Please select one option";
        }
        if (!formData.channelBrandName.trim()) {
          newErrors.channelBrandName = "Channel / Brand Name is required";
        }
        if (!formData.primaryContactEmail.trim()) {
          newErrors.primaryContactEmail = "Primary Contact Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryContactEmail)) {
          newErrors.primaryContactEmail = "Please enter a valid email address";
        }
        const hasTelegram = formData.telegramId?.trim();
        const hasWhatsApp = formData.whatsappNumber?.trim();
        if (!hasTelegram && !hasWhatsApp) {
          newErrors.telegramOrWhatsApp =
            "Please provide at least one: Telegram ID or WhatsApp Number";
        }
        if (!formData.primaryCountry.trim()) {
          newErrors.primaryCountry = "Primary Country is required";
        }
        if (!formData.primaryTimezone.trim()) {
          newErrors.primaryTimezone = "Primary Timezone is required";
        }
        if (!formData.platforms || formData.platforms.length === 0) {
          newErrors.platforms = "Please select at least one platform";
        } else {
          const platformUrls = formData.platformUrls || {};
          for (const p of formData.platforms) {
            const url = (platformUrls[p] ?? "").trim();
            if (!url) {
              newErrors[`platformUrl_${p}`] = `Please enter your ${p} profile URL`;
              break;
            }
            if (!isValidUrl(url)) {
              newErrors[`platformUrl_${p}`] = `Please enter a valid URL for ${p}`;
              break;
            }
          }
        }
        break;
      }
      case 2:
        if (!formData.industries || formData.industries.length === 0) {
          newErrors.industries = "Please select one industry";
        }
        break;
      case 3: {
        const selectedInd = formData.industries?.[0];
        const hasCategories =
          selectedInd && (INDUSTRY_CATEGORY_OPTIONS[selectedInd]?.length ?? 0) > 0;
        if (hasCategories) {
          const count = formData.categories?.length ?? 0;
          if (count === 0) {
            newErrors.categories = "Please select at least one category";
          } else if (count > MAX_CATEGORY_SELECTIONS) {
            newErrors.categories = `Please select at most ${MAX_CATEGORY_SELECTIONS} categories`;
          }
        }
        break;
      }
      case 4: {
        const platforms = formData.platforms || [];
        const inventoryItems = formData.inventoryItems || {};
        if (platforms.includes("Instagram") && instagramInventoryMode === null) {
          newErrors.instagramInventoryMode =
            "Please select whether you are an Influencer or Clipping Channel for Instagram.";
          break;
        }
        for (const platform of platforms) {
          const optionsForPlatform = getInventoryOptionsForPlatform(
            platform,
            instagramInventoryMode
          );
          if (optionsForPlatform.length > 0) {
            const selectedForPlatform = optionsForPlatform.filter(
              (item) => inventoryItems[item]?.selected
            );
            if (selectedForPlatform.length === 0) {
              newErrors.inventoryItems = `Please select at least one inventory item for ${platform}.`;
              break;
            }
            const itemsWithoutValidRate = selectedForPlatform.filter((item) => {
              const rate = inventoryItems[item]?.rate?.trim() ?? "";
              return !rate || rate === "0";
            });
            if (itemsWithoutValidRate.length > 0) {
              newErrors.inventoryItems =
                "Please enter a rate greater than 0 for all selected inventory items.";
              break;
            }
            const itemsWithoutAverageViews = selectedForPlatform.filter((item) => {
              const avgViews = (inventoryItems[item]?.averageViews ?? "").trim();
              return !avgViews;
            });
            if (itemsWithoutAverageViews.length > 0) {
              newErrors.inventoryItems =
                "Please enter average views (last 5 posts) for all selected inventory items.";
              break;
            }
          }
        }
        break;
      }
      case 5:
        if (!formData.primaryAudienceGeography || formData.primaryAudienceGeography.length === 0) {
          newErrors.primaryAudienceGeography = "Please select one primary audience region";
        } else if (formData.primaryAudienceGeography.length > 1) {
          newErrors.primaryAudienceGeography =
            "Select only one target geography for primary audience";
        }
        if (
          !formData.secondaryAudienceGeography ||
          formData.secondaryAudienceGeography.length === 0
        ) {
          newErrors.secondaryAudienceGeography = "Please select one secondary audience region";
        } else if (formData.secondaryAudienceGeography.length > 1) {
          newErrors.secondaryAudienceGeography =
            "Select only one target geography for secondary audience";
        }
        break;
      case 6:
        // Audience Proof - validate image uploads for each selected platform
        if (!formData.platforms || formData.platforms.length === 0) {
          newErrors.platforms = "Please select at least one platform first";
          break;
        }
        for (const platform of formData.platforms) {
          // Instagram audience data comes from the verified OAuth connection, so skip
          // the manual screenshot requirement when the creator has connected Instagram.
          if (platform === "Instagram" && formData.instagramConnected) {
            continue;
          }
          const proof = (formData.platformAudienceProof || {})[platform];
          if (!proof?.ageScreenshot?.trim()) {
            newErrors[`audienceProof_${platform}_ageScreenshot`] =
              `Age screenshot is required for ${platform}`;
            break;
          }
          if (!proof?.genderScreenshot?.trim()) {
            newErrors[`audienceProof_${platform}_genderScreenshot`] =
              `Gender screenshot is required for ${platform}`;
            break;
          }
          if (!proof?.topCountriesScreenshot?.trim()) {
            newErrors[`audienceProof_${platform}_topCountriesScreenshot`] =
              `Top countries screenshot is required for ${platform}`;
            break;
          }
        }
        break;
      case 7:
        if (!formData.paymentTerms || !formData.paymentTerms.trim()) {
          newErrors.paymentTerms = "Please select a payment term";
        }
        break;
      case 8:
        if (!formData.turnaroundTimes || formData.turnaroundTimes.length === 0) {
          newErrors.turnaroundTimes = "Please select a turnaround time";
        }
        break;
      case 9:
        // Previous Collaborations - validate collaboration screenshots per platform
        if (!formData.platforms || formData.platforms.length === 0) {
          newErrors.platforms = "Please select at least one platform first";
          break;
        }
        for (const platform of formData.platforms) {
          const proof = (formData.platformCollaborationProof || {})[platform];
          for (const slot of COLLABORATION_PROOF_SLOTS) {
            const link = (proof?.[slot.linkField] ?? "").trim();
            const image = (proof?.[slot.imageField] ?? "").trim();
            if (!link) {
              newErrors[`collaborationProof_${platform}_${slot.linkField}`] =
                `Collaboration post link is required for ${platform} (${slot.sectionTitle})`;
              break;
            }
            if (!isValidUrl(link)) {
              newErrors[`collaborationProof_${platform}_${slot.linkField}`] =
                `Please enter a valid URL for ${platform} (${slot.sectionTitle})`;
              break;
            }
            if (!image) {
              newErrors[`collaborationProof_${platform}_${slot.imageField}`] =
                `Collaboration screenshot is required for ${platform} (${slot.sectionTitle})`;
              break;
            }
          }
          if (Object.keys(newErrors).some((k) => k.startsWith(`collaborationProof_${platform}_`)))
            break;
        }
        break;
      case 10:
        if (!formData.finalConfirmation) {
          newErrors.finalConfirmation = "Please confirm that all information is accurate";
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

  const renderSection = (step: number) => {
    switch (step) {
      case 1: {
        const handleCreatorTypeSelect = (option: string) => {
          updateFormData({ type: formData.type === option ? "" : option });
          if (errors.type) setErrors((prev) => ({ ...prev, type: "" }));
        };

        const handlePlatformChange = (platform: string) => {
          const currentPlatforms = formData.platforms || [];
          const isRemoving = currentPlatforms.includes(platform);
          const newPlatforms = isRemoving
            ? currentPlatforms.filter((p) => p !== platform)
            : [...currentPlatforms, platform];
          const newPlatformUrls = { ...(formData.platformUrls || {}) };
          if (isRemoving) delete newPlatformUrls[platform];
          updateFormData({
            platforms: newPlatforms,
            platformUrls: newPlatformUrls,
          });
          if (errors.platforms) setErrors((prev) => ({ ...prev, platforms: "" }));
          if (errors[`platformUrl_${platform}`])
            setErrors((prev) => ({ ...prev, [`platformUrl_${platform}`]: "" }));
        };

        return (
          <div>
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About me</h3>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I am a <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {CREATOR_TYPE_OPTIONS.map((option) => {
                    const isSelected = formData.type === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleCreatorTypeSelect(option)}
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                          isSelected
                            ? "bg-[#7B46F8] border-[#7B46F8] text-white"
                            : "bg-gray-100 border-gray-200 text-gray-800 hover:border-gray-300"
                        }`}
                      >
                        {!isSelected && <span className="text-gray-500">+</span>}
                        {option}
                      </button>
                    );
                  })}
                </div>
                {errors.type && <p className="mt-2 text-sm text-red-500">{errors.type}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <label className="block text-sm font-medium text-gray-700">
                    Channel / Brand Name <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.channelBrandName}
                  onChange={(e) => {
                    updateFormData({ channelBrandName: e.target.value });
                    if (errors.channelBrandName) {
                      setErrors((prev) => ({ ...prev, channelBrandName: "" }));
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                    errors.channelBrandName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter channel or brand name"
                />
                {errors.channelBrandName && (
                  <p className="mt-1 text-sm text-red-500">{errors.channelBrandName}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Contact Email <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="email"
                  value={formData.primaryContactEmail}
                  onChange={(e) => {
                    updateFormData({ primaryContactEmail: e.target.value });
                    if (errors.primaryContactEmail) {
                      setErrors((prev) => ({
                        ...prev,
                        primaryContactEmail: "",
                      }));
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
              <p className="text-sm text-gray-500 md:col-span-2">At least one required</p>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <label className="block text-sm font-medium text-gray-700">Telegram ID</label>
                </div>
                <input
                  type="text"
                  value={formData.telegramId}
                  onChange={(e) => {
                    updateFormData({ telegramId: e.target.value });
                    if (errors.telegramOrWhatsApp) {
                      setErrors((prev) => ({
                        ...prev,
                        telegramOrWhatsApp: "",
                      }));
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                    errors.telegramOrWhatsApp ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="XXX XXX XXXX"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                </div>
                <PhoneInput
                  country={numberPickupCountry}
                  value={formData.whatsappNumber}
                  onChange={(value: string) => {
                    updateFormData({ whatsappNumber: value });
                    if (errors.telegramOrWhatsApp) {
                      setErrors((prev) => ({
                        ...prev,
                        telegramOrWhatsApp: "",
                      }));
                    }
                  }}
                  enableLongNumbers
                  disableCountryCode={false}
                  inputStyle={{
                    width: "100%",
                    height: "48px",
                    padding: "14px 60px",
                    border: errors.telegramOrWhatsApp ? "2px solid #ef4444" : "2px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "16px",
                    backgroundColor: "#fff",
                    color: "#1F2937",
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                  buttonStyle={{
                    border: errors.telegramOrWhatsApp ? "2px solid #ef4444" : "2px solid #D1D5DB",
                    borderRadius: "8px 0 0 8px",
                    backgroundColor: "#fff",
                  }}
                  dropdownStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #D1D5DB",
                    borderRadius: "8px",
                  }}
                />
                {errors.telegramOrWhatsApp && (
                  <p className="mt-1 text-sm text-red-500">{errors.telegramOrWhatsApp}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Country <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative">
                  <Select<SelectOption>
                    isClearable
                    isSearchable
                    placeholder="Select Country"
                    options={countrySelectOptions}
                    value={
                      formData.primaryCountry
                        ? {
                            value: formData.primaryCountry,
                            label: formData.primaryCountry,
                          }
                        : null
                    }
                    onChange={(opt: SelectOption | null) => {
                      updateFormData({ primaryCountry: opt?.value ?? "" });
                      if (errors.primaryCountry)
                        setErrors((prev) => ({ ...prev, primaryCountry: "" }));
                    }}
                    styles={getSelectStyles(!!errors.primaryCountry, true)}
                    classNamePrefix="creator-country-select-mobile"
                  />
                  <LocationPinIcon />
                </div>
                {errors.primaryCountry && (
                  <p className="mt-1 text-sm text-red-500">{errors.primaryCountry}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Timezone <span className="text-red-500">*</span>
                  </label>
                </div>
                <Select<SelectOption>
                  isClearable
                  isSearchable
                  placeholder="GMT+"
                  options={timezoneSelectOptions}
                  value={
                    formData.primaryTimezone
                      ? {
                          value: formData.primaryTimezone,
                          label: formData.primaryTimezone,
                        }
                      : null
                  }
                  onChange={(opt: SelectOption | null) => {
                    updateFormData({ primaryTimezone: opt?.value ?? "" });
                    if (errors.primaryTimezone)
                      setErrors((prev) => ({ ...prev, primaryTimezone: "" }));
                  }}
                  styles={getSelectStyles(!!errors.primaryTimezone)}
                  classNamePrefix="creator-timezone-select-mobile"
                />
                {errors.primaryTimezone && (
                  <p className="mt-1 text-sm text-red-500">{errors.primaryTimezone}</p>
                )}
              </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Platform You're Active On <span className="text-red-500">*</span>
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateFormData({ platforms: [], platformUrls: {} });
                      setErrors((prev) => {
                        const next = { ...prev };
                        PLATFORM_OPTIONS.forEach((p) => delete next[`platformUrl_${p}`]);
                        delete next.platforms;
                        return next;
                      });
                    }}
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
                <p className="text-sm text-gray-500 mb-3">
                  Select platforms and enter your profile/channel URL in the box. Required when
                  checked.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PLATFORM_OPTIONS.map((platform) => {
                    const isSelected = formData.platforms?.includes(platform) || false;
                    const url = (formData.platformUrls || {})[platform] ?? "";
                    const errKey = `platformUrl_${platform}`;
                    const hasError = !!errors[errKey];
                    const isInstagram = platform === "Instagram";
                    const igConnected = isInstagram && !!formData.instagramConnected;
                    return (
                      <div
                        key={platform}
                        className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg transition-all border-2 ${
                          isInstagram ? "sm:flex-wrap" : ""
                        } ${
                          isSelected
                            ? "border-[#7B46F8] bg-white"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <label className="flex items-center cursor-pointer flex-1 min-w-0">
                          <input
                            type="checkbox"
                            name="platform-selection-mobile"
                            checked={isSelected}
                            onChange={() => handlePlatformChange(platform)}
                            className="sr-only"
                          />
                          <div
                            className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 flex-shrink-0 ${
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
                            className={`text-sm font-medium ${isSelected ? "text-gray-900" : "text-gray-700"} break-words`}
                          >
                            {platform}
                          </span>
                        </label>
                        <div
                          className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto sm:min-w-[200px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-sm text-gray-500 whitespace-nowrap">URL</span>
                          <input
                            type="url"
                            value={url}
                            onChange={(e) => {
                              updateFormData({
                                platformUrls: {
                                  ...(formData.platformUrls || {}),
                                  [platform]: e.target.value,
                                },
                              });
                              if (errors[errKey])
                                setErrors((prev) => ({
                                  ...prev,
                                  [errKey]: "",
                                }));
                            }}
                            placeholder="Enter URL"
                            disabled={!isSelected}
                            readOnly={igConnected}
                            className={`flex-1 min-w-0 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 ${
                              igConnected ? "bg-gray-50 cursor-not-allowed" : ""
                            } ${hasError ? "border-red-500" : "border-gray-300"}`}
                          />
                        </div>
                        {isInstagram && isSelected && (
                          <div className="w-full basis-full">
                            {igConnected ? (
                              (() => {
                                const v = formData.instagramVerified;
                                const top = (
                                  rows?: { key: string; value: number }[]
                                ) => rows?.[0]?.key;
                                const details = [
                                  top(v?.topCountries) && `Top country: ${top(v?.topCountries)}`,
                                  top(v?.topCities) && `Top city: ${top(v?.topCities)}`,
                                  top(v?.age) && `Top age: ${top(v?.age)}`,
                                  top(v?.gender) && `Top gender: ${top(v?.gender)}`,
                                ].filter(Boolean) as string[];
                                return (
                                  <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                      <span className="text-sm text-green-800">
                                        ✓ Connected as{" "}
                                        <span className="font-semibold">@{v?.username}</span>
                                        {typeof v?.followersCount === "number" && (
                                          <>
                                            {" · "}
                                            {v.followersCount.toLocaleString()} followers
                                          </>
                                        )}
                                        {v?.accountType && (
                                          <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                            {v.accountType} · verified
                                          </span>
                                        )}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={handleDisconnectInstagram}
                                        className="self-start text-sm font-medium text-green-700 underline hover:text-green-900"
                                      >
                                        Disconnect
                                      </button>
                                    </div>
                                    {details.length > 0 ? (
                                      <p className="mt-1 text-xs text-green-700">
                                        {details.join("  ·  ")}
                                      </p>
                                    ) : (
                                      <p className="mt-1 text-xs text-green-700">
                                        Audience demographics need a Business/Creator account with
                                        100+ followers.
                                      </p>
                                    )}
                                  </div>
                                );
                              })()
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={handleConnectInstagram}
                                  disabled={connectingInstagram}
                                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#7B46F8] to-pink-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {connectingInstagram ? "Connecting…" : "Login with Instagram"}
                                </button>
                                {instagramError && (
                                  <p className="mt-2 text-sm text-red-600">{instagramError}</p>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {errors.platforms && (
                  <p className="mt-2 text-sm text-red-500">{errors.platforms}</p>
                )}
                {(() => {
                  const urlErrorKey = Object.keys(errors).find((k) => k.startsWith("platformUrl_"));
                  return urlErrorKey ? (
                    <p className="mt-2 text-sm text-red-500">{errors[urlErrorKey]}</p>
                  ) : null;
                })()}
              </div>
            </div>
          </div>
        );
      }
      case 2:
        const handleIndustryChange = (industry: string) => {
          const currentIndustries = formData.industries || [];
          const newIndustries = currentIndustries.includes(industry) ? [] : [industry];
          updateFormData({ industries: newIndustries, categories: [] });
          if (errors.industries) {
            setErrors((prev) => ({ ...prev, industries: "" }));
          }
        };

        return (
          <div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select The Industry You Operate In <span className="text-red-500">*</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {INDUSTRY_OPTIONS.map((industry) => {
                    const isSelected = formData.industries?.includes(industry) || false;
                    return (
                      <label
                        key={industry}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                          isSelected
                            ? "border-[#7B46F8] bg-white"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="industry-selection"
                          checked={isSelected}
                          onChange={() => handleIndustryChange(industry)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${
                            isSelected
                              ? "bg-[#7B46F8] border-[#7B46F8]"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {industry}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.industries && (
                  <p className="mt-2 text-sm text-red-500">{errors.industries}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 3: {
        const selectedIndustry = formData.industries?.[0];
        const categoryOptions = selectedIndustry
          ? (INDUSTRY_CATEGORY_OPTIONS[selectedIndustry] ?? [])
          : [];

        const selectedCategoryCount = formData.categories?.length ?? 0;
        const atCategoryLimit = selectedCategoryCount >= MAX_CATEGORY_SELECTIONS;

        const handleCategoryChange = (category: string) => {
          const currentCategories = formData.categories || [];
          if (currentCategories.includes(category)) {
            updateFormData({
              categories: currentCategories.filter((c) => c !== category),
            });
          } else {
            if (currentCategories.length >= MAX_CATEGORY_SELECTIONS) {
              toast.error(`You can select at most ${MAX_CATEGORY_SELECTIONS} categories`);
              return;
            }
            updateFormData({ categories: [...currentCategories, category] });
          }
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
                    Select categories for {selectedIndustry || "your industry"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    (select up to {MAX_CATEGORY_SELECTIONS})
                  </span>
                </div>
                {!selectedIndustry ? (
                  <p className="text-sm text-gray-500">
                    Please complete Step 2 (Industry selection) first.
                  </p>
                ) : categoryOptions.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No categories for this industry. You can proceed to the next step.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {categoryOptions.map((category) => {
                      const isSelected = formData.categories?.includes(category) || false;
                      const isDisabled = !isSelected && atCategoryLimit;
                      return (
                        <label
                          key={category}
                          className={`flex items-center p-4 rounded-lg transition-all border-2 ${
                            isDisabled
                              ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                              : isSelected
                                ? "border-[#7B46F8] bg-white cursor-pointer"
                                : "border-gray-200 bg-white hover:border-gray-300 cursor-pointer"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={isDisabled}
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
                )}
                {errors.categories && (
                  <p className="mt-2 text-sm text-red-500">{errors.categories}</p>
                )}
              </div>
            </div>
          </div>
        );
      }
      case 4: {
        const selectedPlatforms = formData.platforms || [];

        const defaultInventoryItem = () => ({
          selected: false,
          rate: "",
          averageViews: "",
        });

        const handleInventoryChange = (item: string) => {
          const currentItems = formData.inventoryItems || {};
          const currentItem = currentItems[item] || defaultInventoryItem();
          const newItems = {
            ...currentItems,
            [item]: {
              selected: !currentItem.selected,
              rate: currentItem.rate,
              averageViews: currentItem.averageViews ?? "",
            },
          };
          updateFormData({ inventoryItems: newItems });
          if (errors.inventoryItems) {
            setErrors((prev) => ({ ...prev, inventoryItems: "" }));
          }
        };

        const handleInventoryRateChange = (item: string, rate: string) => {
          const currentItems = formData.inventoryItems || {};
          const currentItem = currentItems[item] || defaultInventoryItem();
          const newItems = {
            ...currentItems,
            [item]: {
              selected: currentItem.selected,
              rate,
              averageViews: currentItem.averageViews ?? "",
            },
          };
          updateFormData({ inventoryItems: newItems });
          if (errors.inventoryItems) {
            setErrors((prev) => ({ ...prev, inventoryItems: "" }));
          }
        };

        const handleInventoryAverageViewsChange = (item: string, averageViews: string) => {
          const currentItems = formData.inventoryItems || {};
          const currentItem = currentItems[item] || defaultInventoryItem();
          const newItems = {
            ...currentItems,
            [item]: {
              selected: currentItem.selected,
              rate: currentItem.rate,
              averageViews,
            },
          };
          updateFormData({ inventoryItems: newItems });
          if (errors.inventoryItems) {
            setErrors((prev) => ({ ...prev, inventoryItems: "" }));
          }
        };

        const handleInstagramModeChange = (mode: InstagramInventoryMode) => {
          setInstagramInventoryMode(mode);
          const visible = new Set(getInventoryOptionsForPlatform("Instagram", mode));
          const current = formData.inventoryItems || {};
          const newItems = { ...current };
          for (const key of ALL_INSTAGRAM_INVENTORY_KEYS) {
            if (!visible.has(key) && newItems[key] != null) {
              delete newItems[key];
            }
          }
          updateFormData({ inventoryItems: newItems });
          if (errors.inventoryItems || errors.instagramInventoryMode) {
            setErrors((prev) => ({
              ...prev,
              inventoryItems: "",
              instagramInventoryMode: "",
            }));
          }
        };

        const resetInventoryForPlatform = (platform: string) => {
          if (platform === "Instagram") {
            setInstagramInventoryMode(null);
          }
          const keysToReset =
            platform === "Instagram"
              ? ALL_INSTAGRAM_INVENTORY_KEYS
              : (PLATFORM_INVENTORY_OPTIONS[platform] ?? []);
          const currentItems = formData.inventoryItems || {};
          const newItems = { ...currentItems };
          keysToReset.forEach((k) => {
            newItems[k] = defaultInventoryItem();
          });
          updateFormData({ inventoryItems: newItems });
        };

        return (
          <div>
            <div className="space-y-8">
              {selectedPlatforms.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Please complete Step 1 (Basic Details) and select at least one platform first.
                </p>
              ) : (
                selectedPlatforms.map((platform) => {
                  const inventoryOptions = getInventoryOptionsForPlatform(
                    platform,
                    instagramInventoryMode
                  );
                  const showInstagramTypePicker = platform === "Instagram";
                  return (
                    <div key={platform}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                          <h3 className="text-lg font-semibold text-gray-900">{platform}</h3>
                        </div>
                        {(showInstagramTypePicker || inventoryOptions.length > 0) && (
                          <button
                            type="button"
                            onClick={() => resetInventoryForPlatform(platform)}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            Reset
                          </button>
                        )}
                      </div>
                      {showInstagramTypePicker && (
                        <div
                          className="mb-6 rounded-lg border-2 border-gray-200 bg-white p-4 sm:p-5"
                          role="group"
                          aria-label="Instagram creator type"
                        >
                          <p className="text-sm font-semibold text-gray-900 mb-3">
                            Are you an Influencer or Clipping Channel?
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <label
                              className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                                instagramInventoryMode === "influencer"
                                  ? "border-[#7B46F8] bg-violet-50/50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="radio"
                                name="instagram-inventory-mode"
                                checked={instagramInventoryMode === "influencer"}
                                onChange={() => handleInstagramModeChange("influencer")}
                                className="h-4 w-4 shrink-0 cursor-pointer border-gray-300 accent-[#7B46F8] focus:outline-none "
                              />
                              <span className="text-sm font-medium text-gray-900">
                                For Influencers
                              </span>
                            </label>
                            <label
                              className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                                instagramInventoryMode === "clipping"
                                  ? "border-[#7B46F8] bg-violet-50/50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="radio"
                                name="instagram-inventory-mode"
                                checked={instagramInventoryMode === "clipping"}
                                onChange={() => handleInstagramModeChange("clipping")}
                                className="h-4 w-4 shrink-0 cursor-pointer border-gray-300 accent-[#7B46F8] focus:outline-none"
                              />
                              <span className="text-sm font-medium text-gray-900">
                                For Clipping Channels
                              </span>
                            </label>
                          </div>
                          {errors.instagramInventoryMode && (
                            <p className="mt-3 text-sm text-red-500" role="alert">
                              {errors.instagramInventoryMode}
                            </p>
                          )}
                        </div>
                      )}
                      {showInstagramTypePicker && instagramInventoryMode === null ? (
                        <p className="text-sm text-gray-500">
                          Select an option above to see Instagram inventory and rates.
                        </p>
                      ) : inventoryOptions.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No inventory options for this platform.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {inventoryOptions.map((item) => {
                            const inventoryItem =
                              formData.inventoryItems?.[item] || defaultInventoryItem();
                            const isSelected = inventoryItem.selected;
                            const rateTrimmed = inventoryItem.rate?.trim() ?? "";
                            const avgViewsTrimmed = (inventoryItem.averageViews ?? "").trim();
                            const hasInvalidRate =
                              isSelected && (!rateTrimmed || rateTrimmed === "0");
                            const hasInvalidAverageViews = isSelected && !avgViewsTrimmed;
                            const userPriceNum = parseFloat(rateTrimmed) || 0;
                            const avgViewsNum = parseFloat(avgViewsTrimmed) || 0;
                            const sellingPrice = getSellingPrice(userPriceNum);
                            const cpmValue = getCpm(sellingPrice, avgViewsNum);
                            const cpmDisplay =
                              cpmValue != null
                                ? Number.isFinite(cpmValue)
                                  ? cpmValue.toFixed(2)
                                  : ""
                                : "";
                            return (
                              <div
                                key={item}
                                className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-4 rounded-lg transition-all border-2 ${
                                  isSelected
                                    ? "border-[#7B46F8] bg-white"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                              >
                                <label className="flex items-center cursor-pointer flex-1 min-w-0">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleInventoryChange(item)}
                                    className="sr-only"
                                  />
                                  <div
                                    className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 flex-shrink-0 ${
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
                                    className={`text-sm font-medium ${isSelected ? "text-gray-900" : "text-gray-700"} break-words`}
                                  >
                                    {item}
                                  </span>
                                </label>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-sm text-gray-600">$</span>
                                  <input
                                    type="text"
                                    value={inventoryItem.rate}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/[^0-9]/g, "");
                                      handleInventoryRateChange(item, value);
                                    }}
                                    placeholder="0"
                                    disabled={!isSelected}
                                    className={`w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 ${
                                      hasInvalidRate ? "border-red-500" : "border-gray-300"
                                    }`}
                                  />
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span
                                    className="text-sm text-gray-600 whitespace-nowrap"
                                    title="Average Views of last 5 posts"
                                  >
                                    Avg views (last 5){" "}
                                    {isSelected && <span className="text-red-500">*</span>}
                                  </span>
                                  <input
                                    type="text"
                                    value={inventoryItem.averageViews ?? ""}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/[^0-9]/g, "");
                                      handleInventoryAverageViewsChange(item, value);
                                    }}
                                    placeholder="0"
                                    title="Average Views of last 5 posts"
                                    disabled={!isSelected}
                                    className={`w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 ${hasInvalidAverageViews ? "border-red-500" : "border-gray-300"}`}
                                  />
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-sm text-gray-600 whitespace-nowrap">
                                    CPM
                                  </span>
                                  <input
                                    type="text"
                                    value={cpmDisplay}
                                    readOnly
                                    disabled
                                    title="CPM = (Selling Price ÷ Avg Views) × 1,000 (auto-calculated)"
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 cursor-not-allowed opacity-90"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              {errors.inventoryItems && (
                <p className="mt-2 text-sm text-red-500">{errors.inventoryItems}</p>
              )}
            </div>
          </div>
        );
      }
      case 5:
        const handlePrimaryGeographyChange = (option: string) => {
          updateFormData({ primaryAudienceGeography: [option] });
          if (errors.primaryAudienceGeography) {
            setErrors((prev) => ({ ...prev, primaryAudienceGeography: "" }));
          }
        };

        const handleSecondaryGeographyChange = (option: string) => {
          updateFormData({ secondaryAudienceGeography: [option] });
          if (errors.secondaryAudienceGeography) {
            setErrors((prev) => ({ ...prev, secondaryAudienceGeography: "" }));
          }
        };

        return (
          <div>
            <div className="space-y-8">
              <div className="max-w-full box-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Primary Audience Geography <span className="text-red-500">*</span>
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">Select your target geography</p>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
                  role="radiogroup"
                  aria-label="Primary audience geography"
                >
                  {GEOGRAPHY_OPTIONS.map((option) => {
                    const isSelected = formData.primaryAudienceGeography?.includes(option) || false;
                    return (
                      <label
                        key={option}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}
                      >
                        <input
                          type="radio"
                          name="creator-primary-audience-geography-mobile"
                          value={option}
                          checked={isSelected}
                          onChange={() => handlePrimaryGeographyChange(option)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${isSelected ? "border-[#7B46F8] bg-white" : "border-gray-300 bg-white"}`}
                        >
                          {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#7B46F8]" />}
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
              <div className="max-w-full box-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Secondary Audience Geography <span className="text-red-500">*</span>
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">Select your target geography</p>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
                  role="radiogroup"
                  aria-label="Secondary audience geography"
                >
                  {GEOGRAPHY_OPTIONS.map((option) => {
                    const isSelected =
                      formData.secondaryAudienceGeography?.includes(option) || false;
                    return (
                      <label
                        key={option}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}
                      >
                        <input
                          type="radio"
                          name="creator-secondary-audience-geography-mobile"
                          value={option}
                          checked={isSelected}
                          onChange={() => handleSecondaryGeographyChange(option)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${isSelected ? "border-[#7B46F8] bg-white" : "border-gray-300 bg-white"}`}
                        >
                          {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#7B46F8]" />}
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
                {errors.secondaryAudienceGeography && (
                  <p className="mt-2 text-sm text-red-500">{errors.secondaryAudienceGeography}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 6:
        type AudienceProofField = "ageScreenshot" | "genderScreenshot" | "topCountriesScreenshot";
        const allowedAudienceProofImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/bmp",
          "image/svg+xml",
        ];

        const getPlatformProof = (platform: string) => {
          const proof = (formData.platformAudienceProof || {})[platform];
          return (
            proof ?? {
              ageScreenshot: "",
              genderScreenshot: "",
              topCountriesScreenshot: "",
              ageScreenshotPublicId: "",
              genderScreenshotPublicId: "",
              topCountriesScreenshotPublicId: "",
            }
          );
        };

        const getLatestPlatformProof = (platform: string) => {
          const latestMap =
            useCreatorOnboardingFormStore.getState().formData.platformAudienceProof || {};
          const proof = latestMap[platform];
          return (
            proof ?? {
              ageScreenshot: "",
              genderScreenshot: "",
              topCountriesScreenshot: "",
              ageScreenshotPublicId: "",
              genderScreenshotPublicId: "",
              topCountriesScreenshotPublicId: "",
            }
          );
        };

        const setPlatformProof = (
          platform: string,
          patch: Partial<ReturnType<typeof getPlatformProof>>
        ) => {
          // IMPORTANT: read latest state from the store to avoid race overwrites
          // when multiple uploads finish out-of-order.
          const prevMap =
            useCreatorOnboardingFormStore.getState().formData.platformAudienceProof || {};
          const prev = getLatestPlatformProof(platform);
          updateFormData({
            platformAudienceProof: {
              ...prevMap,
              [platform]: { ...prev, ...patch },
            },
          });
        };

        const handlePlatformImageUpload = async (
          platform: string,
          field: AudienceProofField,
          file: File
        ) => {
          if (
            !file.type.startsWith("image/") ||
            !allowedAudienceProofImageTypes.includes(file.type.toLowerCase())
          ) {
            toast.error(
              "Please upload an image file only (JPG, PNG, GIF, WebP, BMP, or SVG). Documents and videos are not allowed."
            );
            return;
          }

          if (file.size > 10 * 1024 * 1024) {
            toast.error("File size must be less than 10MB");
            return;
          }

          const uploadingKey = `audienceProof:${platform}:${field}`;
          setUploadingFields((prev) => new Set(prev).add(uploadingKey));

          try {
            const folderName = buildOnboardingFolderName(formData.channelBrandName);
            const { url } = await uploadAmpli5Image(file, folderName);
            const publicIdKey = `${field}PublicId`;
            setPlatformProof(platform, { [field]: url, [publicIdKey]: "" } as any);

            const errKey = `audienceProof_${platform}_${field}`;
            if (errors[errKey]) {
              setErrors((prev) => ({ ...prev, [errKey]: "" }));
            }

            toast.success("Image uploaded successfully");
          } catch (error: any) {
            console.error("Error uploading image:", error);
            toast.error(error.message || "Failed to upload image. Please try again.");
          } finally {
            setUploadingFields((prev) => {
              const next = new Set(prev);
              next.delete(uploadingKey);
              return next;
            });
          }
        };

        const handlePlatformImageDelete = async (platform: string, field: AudienceProofField) => {
          const proof = getPlatformProof(platform);
          const currentUrl = (proof as any)[field] as string;
          if (!currentUrl) return;

          const publicIdKey = `${field}PublicId`;
          const deletingKey = `audienceProof:delete:${platform}:${field}`;
          setUploadingFields((prev) => new Set(prev).add(deletingKey));

          try {
            await deleteAmpli5ImageByUrl(currentUrl);
            setPlatformProof(platform, { [field]: "", [publicIdKey]: "" } as any);
            toast.success("Image deleted successfully");
          } catch (error) {
            console.error("Error deleting image:", error);
            setPlatformProof(platform, { [field]: "", [publicIdKey]: "" } as any);
            toast.error("Error deleting image");
          } finally {
            setUploadingFields((prev) => {
              const next = new Set(prev);
              next.delete(deletingKey);
              return next;
            });
          }
        };

        const PlatformImageUploadField = ({
          platform,
          field,
          label,
        }: {
          platform: string;
          field: AudienceProofField;
          label: string;
        }) => {
          const proof = getPlatformProof(platform);
          const url = ((proof as any)[field] as string) || "";
          const hasImage = !!url;
          const uploadingKey = `audienceProof:${platform}:${field}`;
          const isUploading = uploadingFields.has(uploadingKey);
          const deletingKey = `audienceProof:delete:${platform}:${field}`;
          const isDeleting = uploadingFields.has(deletingKey);
          const isBusy = isUploading || isDeleting;
          const fileInputRef = useRef<HTMLInputElement>(null);
          const [isFocused, setIsFocused] = useState(false);
          const errKey = `audienceProof_${platform}_${field}`;
          const fieldError = errors[errKey];

          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            if (files.length > 1) {
              toast.error("Please upload only one image at a time");
              if (fileInputRef.current) fileInputRef.current.value = "";
              return;
            }

            const file = files[0];
            if (file) handlePlatformImageUpload(platform, field, file);
            if (fileInputRef.current) fileInputRef.current.value = "";
          };

          const inputId = `file-input-${platform}-${field}`.replace(/\s+/g, "-");

          return (
            <div className="flex min-w-0 flex-col gap-2">
              <span className="text-xs font-medium text-gray-700 leading-snug">{label}</span>
              {fieldError && <p className="text-xs text-red-500">{fieldError}</p>}
              {hasImage ? (
                <OnboardingImagePreview
                  url={url}
                  alt={`${platform}: ${label}`}
                  onDelete={() => handlePlatformImageDelete(platform, field)}
                  isDeleting={isDeleting}
                  deleteDisabled={isBusy}
                  layout="column"
                />
              ) : (
                <div className="relative min-h-[100px]">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml"
                    onChange={handleFileChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isBusy}
                    className="hidden"
                    id={inputId}
                  />
                  <label
                    htmlFor={inputId}
                    className={`flex min-h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border px-2 py-3 text-center transition-all ${
                      isBusy
                        ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-50"
                        : isFocused
                          ? "border-2 border-[#7B46F8] bg-white"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-xs font-medium text-gray-600">
                      {isUploading ? "Uploading..." : isDeleting ? "Deleting..." : "Upload"}
                    </span>
                    {isBusy ? (
                      <svg
                        className="animate-spin h-5 w-5 text-[#7B46F8]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </label>
                </div>
              )}
            </div>
          );
        };

        return (
          <div>
            <div className="flex items-center justify-end mb-6">
              <button
                onClick={async () => {
                  setIsResetting(true);
                  const proofMap = formData.platformAudienceProof || {};
                  const urls = Object.values(proofMap)
                    .flatMap((p: any) => [
                      p?.ageScreenshot,
                      p?.genderScreenshot,
                      p?.topCountriesScreenshot,
                    ])
                    .filter((u) => typeof u === "string" && u.trim() !== "");

                  if (urls.length > 0) {
                    try {
                      const deletePromises = urls.map((url) =>
                        deleteAmpli5ImageByUrl(url).catch(() => ({ deleted: false }))
                      );

                      const results = await Promise.allSettled(deletePromises);

                      // Check if all deletions were successful
                      const allSuccessful = results.every(
                        (result) => result.status === "fulfilled"
                      );

                      if (allSuccessful) {
                        toast.success("All images deleted successfully");
                      } else {
                        toast.error("Some images could not be deleted");
                      }
                    } catch (error) {
                      console.error("Error deleting images:", error);
                      toast.error("Error deleting images");
                    }
                  }

                  // Clear form data regardless of deletion result
                  updateFormData({
                    platformAudienceProof: {},
                    // also clear legacy fields (kept only for backward compatibility)
                    ageScreenshot: "",
                    genderScreenshot: "",
                    topCountriesScreenshot: "",
                    ageScreenshotPublicId: "",
                    genderScreenshotPublicId: "",
                    topCountriesScreenshotPublicId: "",
                  });
                  setIsResetting(false);
                }}
                disabled={isResetting}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isResetting
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {isResetting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>Reset</span>
                  </>
                )}
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Upload Audience Demographics Screenshots (per platform)
                </h3>
              </div>

              {(!formData.platforms || formData.platforms.length === 0) && (
                <p className="text-sm text-gray-500">
                  Please select at least one platform in Step 1.
                </p>
              )}

              <div className="space-y-8">
                {(formData.platforms || []).map((platform) => {
                  const platformDisplay = getPlatformDisplay(platform);
                  const headerExamples = getAudienceProofHeaderExamples(platform);

                  // Instagram, when connected via OAuth, shows verified imported
                  // demographics instead of the manual screenshot uploaders.
                  if (platform === "Instagram" && formData.instagramConnected) {
                    const v = formData.instagramVerified;
                    const fmt = (rows?: { key: string; value: number }[]) =>
                      (rows || [])
                        .slice(0, 3)
                        .map((r) => `${r.key} (${r.value.toLocaleString()})`)
                        .join(", ") || "—";
                    return (
                      <div
                        key={platform}
                        className="border border-green-200 bg-green-50/40 rounded-lg p-4 sm:p-6"
                      >
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          {platformDisplay.iconSrc ? (
                            <Image
                              src={platformDisplay.iconSrc}
                              alt=""
                              width={22}
                              height={22}
                              className="h-5 w-5 object-contain"
                            />
                          ) : null}
                          <h4 className="text-base font-semibold text-gray-900">
                            {platformDisplay.shortLabel}
                          </h4>
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            ✓ Verified via Instagram
                          </span>
                        </div>
                        <p className="mb-3 text-sm text-gray-600">
                          Audience data was imported directly from{" "}
                          <span className="font-semibold">@{v?.username}</span> — no
                          screenshots needed.
                        </p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <div className="rounded-md bg-white p-3 text-sm">
                            <span className="font-medium text-gray-900">Top countries:</span>{" "}
                            <span className="text-gray-600">{fmt(v?.topCountries)}</span>
                          </div>
                          <div className="rounded-md bg-white p-3 text-sm">
                            <span className="font-medium text-gray-900">Top cities:</span>{" "}
                            <span className="text-gray-600">{fmt(v?.topCities)}</span>
                          </div>
                          <div className="rounded-md bg-white p-3 text-sm">
                            <span className="font-medium text-gray-900">Age:</span>{" "}
                            <span className="text-gray-600">{fmt(v?.age)}</span>
                          </div>
                          <div className="rounded-md bg-white p-3 text-sm">
                            <span className="font-medium text-gray-900">Gender:</span>{" "}
                            <span className="text-gray-600">{fmt(v?.gender)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                  <div key={platform} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      {platformDisplay.iconSrc ? (
                        <Image
                          src={platformDisplay.iconSrc}
                          alt=""
                          width={22}
                          height={22}
                          className="h-5 w-5 object-contain"
                        />
                      ) : null}
                      <h4 className="text-base font-semibold text-gray-900">
                        {platformDisplay.shortLabel}
                      </h4>
                      {headerExamples && (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#7B46F8] hover:text-[#6a3de0]"
                          title="View example screenshots for this platform"
                          onClick={() => openOnboardingFancyboxGallery(headerExamples)}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Ex.
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {(
                        [
                          {
                            field: "ageScreenshot" as const,
                            label: "Age screenshot",
                          },
                          {
                            field: "genderScreenshot" as const,
                            label: "Gender screenshot",
                          },
                          {
                            field: "topCountriesScreenshot" as const,
                            label: "Top countries screenshot",
                          },
                        ] satisfies {
                          field: AudienceProofScreenshotField;
                          label: string;
                        }[]
                      ).map(({ field, label }) => (
                        <PlatformImageUploadField
                          key={`${platform}-${field}`}
                          platform={platform}
                          field={field}
                          label={label}
                        />
                      ))}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 7:
        const paymentTermOptions = [
          "50% fixed + 50% based on milestones",
          "50% advance + 50% after 15 days of delivery",
          "Affiliate Deal",
          "Barter Deal",
          "100% Advance",
        ];

        const handlePaymentTermChange = (term: string) => {
          updateFormData({ paymentTerms: term });
          if (errors.paymentTerms) {
            setErrors((prev) => ({ ...prev, paymentTerms: "" }));
          }
        };

        return (
          <div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Select Payment Terms</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paymentTermOptions.map((term) => {
                    const isSelected = formData.paymentTerms === term;
                    return (
                      <label
                        key={term}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                          isSelected
                            ? "border-[#7B46F8] bg-white"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentTerms"
                          value={term}
                          checked={isSelected}
                          onChange={() => handlePaymentTermChange(term)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${
                            isSelected
                              ? "bg-[#7B46F8] border-[#7B46F8]"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                        </div>
                        <span
                          className={`text-sm font-medium flex-1 ${
                            isSelected ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {term}
                        </span>
                        {isSelected && (
                          <svg
                            className="w-5 h-5 text-[#7B46F8] flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </label>
                    );
                  })}
                </div>
                {errors.paymentTerms && (
                  <p className="mt-2 text-sm text-red-500">{errors.paymentTerms}</p>
                )}
                <p className="mt-4 text-xs text-gray-500">*Requires CEO's Approval</p>
              </div>
            </div>
          </div>
        );
      case 8:
        const turnaroundTimeOptions = ["Same day", "24 hours", "48-72 hours", "3-5 days"];

        const handleTurnaroundTimeChange = (time: string) => {
          updateFormData({ turnaroundTimes: [time] });
          if (errors.turnaroundTimes) {
            setErrors((prev) => ({ ...prev, turnaroundTimes: "" }));
          }
        };

        return (
          <div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Average Turnaround Time After Confirmation
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {turnaroundTimeOptions.map((time) => {
                    const isSelected = formData.turnaroundTimes?.[0] === time;
                    return (
                      <label
                        key={time}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                          isSelected
                            ? "border-[#7B46F8] bg-white"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="turnaroundTime"
                          value={time}
                          checked={isSelected}
                          onChange={() => handleTurnaroundTimeChange(time)}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${
                            isSelected
                              ? "bg-[#7B46F8] border-[#7B46F8]"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                        </div>
                        <span
                          className={`text-sm font-medium flex-1 ${
                            isSelected ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {time}
                        </span>
                        {isSelected && (
                          <svg
                            className="w-5 h-5 text-[#7B46F8] flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </label>
                    );
                  })}
                </div>
                {errors.turnaroundTimes && (
                  <p className="mt-2 text-sm text-red-500">{errors.turnaroundTimes}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 9:
        const allowedCollaborationProofImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/bmp",
          "image/svg+xml",
        ];

        const getPlatformCollab = (platform: string) => {
          const proof = (formData.platformCollaborationProof || {})[platform];
          return proof ?? { ...EMPTY_PLATFORM_COLLABORATION_PROOF };
        };

        const getLatestPlatformCollab = (platform: string) => {
          const latestMap =
            useCreatorOnboardingFormStore.getState().formData.platformCollaborationProof || {};
          const proof = latestMap[platform];
          return proof ?? { ...EMPTY_PLATFORM_COLLABORATION_PROOF };
        };

        const setPlatformCollab = (
          platform: string,
          patch: Partial<ReturnType<typeof getPlatformCollab>>
        ) => {
          // IMPORTANT: read latest state from the store to avoid race overwrites
          // when multiple uploads finish out-of-order.
          const prevMap =
            useCreatorOnboardingFormStore.getState().formData.platformCollaborationProof || {};
          const prev = getLatestPlatformCollab(platform);
          updateFormData({
            platformCollaborationProof: {
              ...prevMap,
              [platform]: { ...prev, ...patch },
            },
          });
        };

        const handlePlatformCollabUpload = async (
          platform: string,
          field: CollaborationProofImageField,
          file: File
        ) => {
          if (
            !file.type.startsWith("image/") ||
            !allowedCollaborationProofImageTypes.includes(file.type.toLowerCase())
          ) {
            toast.error(
              "Please upload an image file only (JPG, PNG, GIF, WebP, BMP, or SVG). Documents and videos are not allowed."
            );
            return;
          }

          if (file.size > 10 * 1024 * 1024) {
            toast.error("File size must be less than 10MB");
            return;
          }

          const uploadingKey = `collaborationProof:${platform}:${field}`;
          setUploadingFields((prev) => new Set(prev).add(uploadingKey));

          try {
            const folderName = buildOnboardingFolderName(formData.channelBrandName);
            const { url } = await uploadAmpli5Image(file, folderName);
            const publicIdKey = `${field}PublicId`;
            setPlatformCollab(platform, { [field]: url, [publicIdKey]: "" } as any);

            const errKey = `collaborationProof_${platform}_${field}`;
            if (errors[errKey]) {
              setErrors((prev) => ({ ...prev, [errKey]: "" }));
            }

            toast.success("Image uploaded successfully");
          } catch (error: any) {
            console.error("Error uploading image:", error);
            toast.error(error.message || "Failed to upload image. Please try again.");
          } finally {
            setUploadingFields((prev) => {
              const next = new Set(prev);
              next.delete(uploadingKey);
              return next;
            });
          }
        };

        const handlePlatformCollabDelete = async (
          platform: string,
          field: CollaborationProofImageField
        ) => {
          const proof = getPlatformCollab(platform);
          const currentUrl = (proof as any)[field] as string;
          if (!currentUrl) return;

          const publicIdKey = `${field}PublicId`;
          const deletingKey = `collaborationProof:delete:${platform}:${field}`;
          setUploadingFields((prev) => new Set(prev).add(deletingKey));

          try {
            await deleteAmpli5ImageByUrl(currentUrl);
            setPlatformCollab(platform, { [field]: "", [publicIdKey]: "" } as any);
            toast.success("Image deleted successfully");
          } catch (error) {
            console.error("Error deleting image:", error);
            setPlatformCollab(platform, { [field]: "", [publicIdKey]: "" } as any);
            toast.error("Error deleting image");
          } finally {
            setUploadingFields((prev) => {
              const next = new Set(prev);
              next.delete(deletingKey);
              return next;
            });
          }
        };

        const PlatformCollabProofSlot = ({
          platform,
          imageField,
          linkField,
          sectionTitle,
          linkLabel,
          uploadLabel,
        }: (typeof COLLABORATION_PROOF_SLOTS)[number] & { platform: string }) => {
          const proof = getPlatformCollab(platform);
          const url = proof[imageField] || "";
          const linkValue = proof[linkField] || "";
          const hasImage = !!url;
          const uploadingKey = `collaborationProof:${platform}:${imageField}`;
          const isUploading = uploadingFields.has(uploadingKey);
          const deletingKey = `collaborationProof:delete:${platform}:${imageField}`;
          const isDeleting = uploadingFields.has(deletingKey);
          const isBusy = isUploading || isDeleting;
          const fileInputRef = useRef<HTMLInputElement>(null);
          const [isFocused, setIsFocused] = useState(false);
          const imageErrKey = `collaborationProof_${platform}_${imageField}`;
          const linkErrKey = `collaborationProof_${platform}_${linkField}`;
          const imageError = errors[imageErrKey];
          const linkError = errors[linkErrKey];

          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            if (files.length > 1) {
              toast.error("Please upload only one image at a time");
              if (fileInputRef.current) fileInputRef.current.value = "";
              return;
            }
            const file = files[0];
            if (file) handlePlatformCollabUpload(platform, imageField, file);
            if (fileInputRef.current) fileInputRef.current.value = "";
          };

          const inputId = `collab-file-input-${platform}-${imageField}`.replace(/\s+/g, "-");

          return (
            <div className="space-y-3 rounded-lg border border-gray-100 bg-white p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h5 className="text-sm font-semibold text-gray-900">{sectionTitle}</h5>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {linkLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={linkValue}
                  onChange={(e) => {
                    setPlatformCollab(platform, { [linkField]: e.target.value });
                    if (errors[linkErrKey]) {
                      setErrors((prev) => ({ ...prev, [linkErrKey]: "" }));
                    }
                  }}
                  placeholder="https://"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent text-sm ${
                    linkError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {linkError && <p className="mt-1 text-sm text-red-500">{linkError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {uploadLabel} <span className="text-red-500">*</span>
                </label>
                {imageError && <p className="mb-1 text-sm text-red-500">{imageError}</p>}
                {hasImage ? (
                  <OnboardingImagePreview
                    url={url}
                    alt={`${platform}: ${uploadLabel}`}
                    onDelete={() => handlePlatformCollabDelete(platform, imageField)}
                    isDeleting={isDeleting}
                    deleteDisabled={isBusy}
                  />
                ) : (
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml"
                    onChange={handleFileChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isBusy}
                    className="hidden"
                    id={inputId}
                  />
                  <label
                    htmlFor={inputId}
                    className={`w-full px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                      isBusy
                        ? "opacity-50 cursor-not-allowed bg-gray-50 border border-gray-200"
                        : isFocused
                          ? "border-2 border-[#7B46F8] bg-white"
                          : "bg-gray-50 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {isUploading
                        ? "Uploading..."
                        : isDeleting
                          ? "Deleting..."
                          : uploadLabel}
                    </span>
                    {isBusy ? (
                      <svg
                        className="animate-spin h-5 w-5 text-[#7B46F8]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </label>
                </div>
                )}
              </div>
            </div>
          );
        };

        return (
          <div>
            <div className="space-y-6">
              <div className="space-y-8">
                <div className="max-w-full box-border space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Proof of last collaboration and results
                    </h3>
                  </div>
                  {(!formData.platforms || formData.platforms.length === 0) && (
                    <p className="text-sm text-gray-500">
                      Please select at least one platform in Step 1.
                    </p>
                  )}

                  <div className="space-y-8">
                    {(formData.platforms || []).map((platform) => (
                      <div key={platform} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                          <h4 className="text-base font-semibold text-gray-900">{platform}</h4>
                        </div>
                        <div className="space-y-4">
                          {COLLABORATION_PROOF_SLOTS.map((slot) => (
                            <PlatformCollabProofSlot
                              key={`${platform}-${slot.imageField}`}
                              platform={platform}
                              {...slot}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          For each slot: collaboration post link and screenshot (post + analytics)
                          are required.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 10:
        const handleConfirmationChange = (checked: boolean) => {
          updateFormData({ finalConfirmation: checked });
          if (errors.finalConfirmation) {
            setErrors((prev) => ({ ...prev, finalConfirmation: "" }));
          }
        };

        return (
          <div>
            <div className="space-y-6">
              <div>
                <label
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                    formData.finalConfirmation
                      ? "border-[#7B46F8] bg-white"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.finalConfirmation}
                    onChange={(e) => handleConfirmationChange(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 flex-shrink-0 ${
                      formData.finalConfirmation
                        ? "bg-[#7B46F8] border-[#7B46F8]"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {formData.finalConfirmation && (
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
                    className={`text-sm font-medium flex-1 ${
                      formData.finalConfirmation ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    I confirm that all information, rates, and screenshots shared are accurate.
                  </span>
                </label>
                {errors.finalConfirmation && (
                  <p className="mt-2 text-sm text-red-500">{errors.finalConfirmation}</p>
                )}
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
      <div className="bg-white relative">
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
              Creator Onboarding
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
                setInstagramInventoryMode(null);
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
                const inventoryItems = formData.inventoryItems || {};
                const inventoryItemsWithCpm: Record<
                  string,
                  { selected: boolean; rate: string; averageViews: string; cpm?: string }
                > = {};
                for (const key of Object.keys(inventoryItems)) {
                  const item = inventoryItems[key];
                  inventoryItemsWithCpm[key] = {
                    ...item,
                    averageViews: item.averageViews ?? "",
                  };
                  if (item.selected) {
                    const userPrice = parseFloat(item.rate?.trim() || "0") || 0;
                    const avgViews = parseFloat((item.averageViews ?? "").trim() || "0") || 0;
                    const selling = getSellingPrice(userPrice);
                    const cpm = getCpm(selling, avgViews);
                    inventoryItemsWithCpm[key].cpm =
                      cpm != null && Number.isFinite(cpm) ? String(cpm.toFixed(2)) : "";
                  }
                }
                const selectedPlatforms = formData.platforms || [];
                const proofMap = formData.platformAudienceProof || {};
                const filteredProofMap: typeof proofMap = {};
                for (const p of selectedPlatforms) {
                  if (proofMap[p]) filteredProofMap[p] = proofMap[p];
                }

                const collabMap = formData.platformCollaborationProof || {};
                const filteredCollabMap: typeof collabMap = {};
                for (const p of selectedPlatforms) {
                  if (collabMap[p]) filteredCollabMap[p] = collabMap[p];
                }

                const firstPlatform = selectedPlatforms[0];
                const firstProof = firstPlatform ? filteredProofMap[firstPlatform] : undefined;
                const firstCollab = firstPlatform ? filteredCollabMap[firstPlatform] : undefined;

                const payload = {
                  ...formData,
                  type: formData.type?.trim() ?? "",
                  // Links created influencers to the connected InstagramAccount row.
                  instagramUserId: formData.instagramUserId?.trim() ?? "",
                  inventoryItems: inventoryItemsWithCpm,
                  platformAudienceProof: filteredProofMap,
                  platformCollaborationProof: filteredCollabMap,
                  ageScreenshot: firstProof?.ageScreenshot ?? "",
                  genderScreenshot: firstProof?.genderScreenshot ?? "",
                  topCountriesScreenshot: firstProof?.topCountriesScreenshot ?? "",
                  ageScreenshotPublicId: firstProof?.ageScreenshotPublicId ?? "",
                  genderScreenshotPublicId: firstProof?.genderScreenshotPublicId ?? "",
                  topCountriesScreenshotPublicId: firstProof?.topCountriesScreenshotPublicId ?? "",
                  firstCollaborationImage1: firstCollab?.image1 ?? "",
                  firstCollaborationImage2: firstCollab?.image2 ?? "",
                  firstCollaborationPostLink1: firstCollab?.postLink1 ?? "",
                  firstCollaborationPostLink2: firstCollab?.postLink2 ?? "",
                  firstCollaborationImage1PublicId: firstCollab?.image1PublicId ?? "",
                  firstCollaborationImage2PublicId: firstCollab?.image2PublicId ?? "",
                };
                const data = await submitCreatorOnboarding(payload);

                try {
                  const sheetRes = await fetch("/api/creator-onboarding-sheet", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                  if (!sheetRes.ok) {
                    const errBody = await sheetRes.json().catch(() => ({}));
                    console.error(
                      "Creator onboarding Google Sheet sync failed:",
                      sheetRes.status,
                      errBody
                    );
                  }
                } catch (sheetErr) {
                  console.error("Creator onboarding Google Sheet sync error:", sheetErr);
                }

                setErrors({});
                resetForm();
                toast.success(data.message ?? "Form submitted successfully!");
                router.push("/creator-onboarding/success");
              } catch (error: unknown) {
                console.error("Error submitting form:", error);
                const err = error as {
                  response?: { data?: { message?: string }; status?: number };
                };
                const message =
                  err?.response?.data?.message ||
                  "Something went wrong. Please try again later.";
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
