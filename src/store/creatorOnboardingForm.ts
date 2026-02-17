import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CreatorOnboardingFormData {
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
  // First slide - three images
  firstCollaborationImage1: string; // URL as string for Excel export
  firstCollaborationImage2: string; // URL as string for Excel export
  firstCollaborationImage3: string; // URL as string for Excel export
  firstCollaborationImage1PublicId?: string; // PublicId for deletion
  firstCollaborationImage2PublicId?: string; // PublicId for deletion
  firstCollaborationImage3PublicId?: string; // PublicId for deletion
  // Second slide - links to previous content
  xLink: string; // X (Twitter) link
  instagramLink: string; // Instagram link
  youtubeLink: string; // YouTube link
  tiktokLink: string; // TikTok link
  newsletterLink: string; // Newsletter link

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
}

interface CreatorOnboardingFormState {
  formData: CreatorOnboardingFormData;
  // eslint-disable-next-line no-unused-vars
  updateFormData: (data: Partial<CreatorOnboardingFormData>) => void;
  resetForm: () => void;
}

const initialFormData: CreatorOnboardingFormData = {
  channelBrandName: "",
  primaryContactEmail: "",
  telegramId: "",
  whatsappNumber: "",
  primaryCountry: "",
  primaryTimezone: "",
  platforms: [],
  platformUrls: {},
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
  firstCollaborationImage3: "",
  firstCollaborationImage1PublicId: "",
  firstCollaborationImage2PublicId: "",
  firstCollaborationImage3PublicId: "",
  xLink: "",
  instagramLink: "",
  youtubeLink: "",
  tiktokLink: "",
  newsletterLink: "",
  finalConfirmation: false,
  portfolioLink: "",
  portfolioAdditionalInfo: "",
  ageScreenshot: "",
  genderScreenshot: "",
  topCountriesScreenshot: "",
  ageScreenshotPublicId: "",
  genderScreenshotPublicId: "",
  topCountriesScreenshotPublicId: "",
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
