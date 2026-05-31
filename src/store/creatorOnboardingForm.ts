import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PlatformCollaborationProof } from "@/src/constants/creatorOnboardingFilters";

interface CreatorOnboardingFormData {
  /** Creator role (“I am a”); submitted as `type` in API payload. */
  type: string;
  // Step 1: Basic Details
  channelBrandName: string;
  primaryContactEmail: string;
  telegramId: string;
  whatsappNumber: string;
  primaryCountry: string;
  primaryTimezone: string;
  platforms: string[];
  /** Profile/channel URL per platform (Step 1, fourth slide). Key = platform name e.g. 'X', 'Youtube'. */
  platformUrls: Record<string, string>;

  // Instagram Login (OAuth) — set after the "Login with Instagram" popup round-trip.
  /** Instagram user id from a connect; sent in submit payload to link the InstagramAccount row. */
  instagramUserId: string;
  /** True once the creator has connected Instagram via OAuth. */
  instagramConnected: boolean;
  /** Verified audience summary echoed back from the OAuth popup (read-only display). */
  instagramVerified?: {
    username: string;
    followersCount: number;
    accountType: string;
    topCountries?: { key: string; value: number }[];
    topCities?: { key: string; value: number }[];
    age?: { key: string; value: number }[];
    gender?: { key: string; value: number }[];
  };

  // Step 2: Industry selection
  industries: string[];

  // Step 3: Category Selection
  categories: string[];

  // Step 4: Inventory selection & Rates
  inventoryItems: Record<string, { selected: boolean; rate: string; averageViews: string }>;

  // Step 5: Audience & GEO
  primaryAudienceGeography: string[];
  secondaryAudienceGeography: string[];

  // Step 6: Social Media Profiles
  twitterHandle: string;
  twitterFollowers: string;
  instagramHandle: string;
  instagramFollowers: string;
  youtubeHandle: string;
  youtubeSubscribers: string;
  linkedinHandle: string;
  linkedinFollowers: string;
  otherPlatform: string;
  otherPlatformHandle: string;
  otherPlatformFollowers: string;

  // Step 3: Content Niche
  niches: string[];
  otherNiche: string;

  // Step 4: Audience Demographics (legacy, keeping for compatibility)
  ageRange: string;
  genderSkew: string;

  // Step 5: Rates & Pricing
  pricingModel: string[];
  baseRate: string;

  // Step 6: Availability
  availabilityStatus: string;
  preferredCollaborationTypes: string[];

  // Step 7: Payment Terms
  paymentTerms: string;

  // Step 8: Turnaround & Reliability
  turnaroundTimes: string[];

  // Step 9: Previous Collaborations
  // First slide - two screenshots per platform
  firstCollaborationImage1: string; // URL as string for Excel export
  firstCollaborationImage2: string; // URL as string for Excel export
  firstCollaborationPostLink1: string;
  firstCollaborationPostLink2: string;
  firstCollaborationImage1PublicId?: string; // PublicId for deletion
  firstCollaborationImage2PublicId?: string; // PublicId for deletion
  /**
   * Per-platform proof of last collaboration and results.
   * Key = platform name (must match `platforms` values).
   */
  platformCollaborationProof: Record<string, PlatformCollaborationProof>;

  // Step 10: Final Confirmation
  finalConfirmation: boolean;

  // Step 7: Portfolio & Additional Info
  portfolioLink: string;
  portfolioAdditionalInfo: string;

  // Step 6: Audience Proof (Images)
  ageScreenshot: string; // URL as string for Excel export
  genderScreenshot: string; // URL as string for Excel export
  topCountriesScreenshot: string; // URL as string for Excel export
  ageScreenshotPublicId?: string; // PublicId for deletion
  genderScreenshotPublicId?: string; // PublicId for deletion
  topCountriesScreenshotPublicId?: string; // PublicId for deletion

  /**
   * Per-platform audience proof screenshots.
   * Key = platform name (must match `platforms` values).
   */
  platformAudienceProof: Record<
    string,
    {
      ageScreenshot: string;
      genderScreenshot: string;
      topCountriesScreenshot: string;
      ageScreenshotPublicId?: string;
      genderScreenshotPublicId?: string;
      topCountriesScreenshotPublicId?: string;
    }
  >;
}

interface CreatorOnboardingFormState {
  formData: CreatorOnboardingFormData;
  // eslint-disable-next-line no-unused-vars
  updateFormData: (data: Partial<CreatorOnboardingFormData>) => void;
  resetForm: () => void;
}

const initialFormData: CreatorOnboardingFormData = {
  type: "",
  channelBrandName: "",
  primaryContactEmail: "",
  telegramId: "",
  whatsappNumber: "",
  primaryCountry: "",
  primaryTimezone: "",
  platforms: [],
  platformUrls: {},
  instagramUserId: "",
  instagramConnected: false,
  instagramVerified: undefined,
  industries: [],
  categories: [],
  inventoryItems: {},
  primaryAudienceGeography: [],
  secondaryAudienceGeography: [],
  twitterHandle: "",
  twitterFollowers: "",
  instagramHandle: "",
  instagramFollowers: "",
  youtubeHandle: "",
  youtubeSubscribers: "",
  linkedinHandle: "",
  linkedinFollowers: "",
  otherPlatform: "",
  otherPlatformHandle: "",
  otherPlatformFollowers: "",
  niches: [],
  otherNiche: "",
  ageRange: "",
  genderSkew: "",
  pricingModel: [],
  baseRate: "",
  availabilityStatus: "",
  preferredCollaborationTypes: [],
  paymentTerms: "",
  turnaroundTimes: [],
  firstCollaborationImage1: "",
  firstCollaborationImage2: "",
  firstCollaborationPostLink1: "",
  firstCollaborationPostLink2: "",
  firstCollaborationImage1PublicId: "",
  firstCollaborationImage2PublicId: "",
  platformCollaborationProof: {},
  finalConfirmation: false,
  portfolioLink: "",
  portfolioAdditionalInfo: "",
  ageScreenshot: "",
  genderScreenshot: "",
  topCountriesScreenshot: "",
  ageScreenshotPublicId: "",
  genderScreenshotPublicId: "",
  topCountriesScreenshotPublicId: "",
  platformAudienceProof: {},
};

export const useCreatorOnboardingFormStore = create<CreatorOnboardingFormState>()(
  persist(
    (set) => ({
      formData: initialFormData,
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetForm: () =>
        set({
          formData: initialFormData,
        }),
    }),
    {
      name: "creator-onboarding-form",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
