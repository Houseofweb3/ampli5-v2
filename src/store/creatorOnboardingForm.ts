import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CreatorOnboardingFormData {
  // Step 1: Basic Details
  channelBrandName: string;
  primaryContactEmail: string;
  telegramId: string;
  whatsappNumber: string;
  primaryCountry: string;
  primaryTimezone: string;
  platforms: string[];

  // Step 2: Industry selection
  industries: string[];

  // Step 3: Category Selection
  categories: string[];

  // Step 4: Inventory selection & Rates
  inventoryItems: Record<string, { selected: boolean; rate: string }>;

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

  // Step 7: Portfolio & Additional Info
  portfolioLink: string;
  portfolioAdditionalInfo: string;
}

interface CreatorOnboardingFormState {
  formData: CreatorOnboardingFormData;
  // eslint-disable-next-line no-unused-vars
  updateFormData: (data: Partial<CreatorOnboardingFormData>) => void;
  resetForm: () => void;
}

const initialFormData: CreatorOnboardingFormData = {
  channelBrandName: '',
  primaryContactEmail: '',
  telegramId: '',
  whatsappNumber: '',
  primaryCountry: '',
  primaryTimezone: '',
  platforms: [],
  industries: [],
  categories: [],
  inventoryItems: {},
  primaryAudienceGeography: [],
  secondaryAudienceGeography: [],
  twitterHandle: '',
  twitterFollowers: '',
  instagramHandle: '',
  instagramFollowers: '',
  youtubeHandle: '',
  youtubeSubscribers: '',
  linkedinHandle: '',
  linkedinFollowers: '',
  otherPlatform: '',
  otherPlatformHandle: '',
  otherPlatformFollowers: '',
  niches: [],
  otherNiche: '',
  ageRange: '',
  genderSkew: '',
  pricingModel: [],
  baseRate: '',
  availabilityStatus: '',
  preferredCollaborationTypes: [],
  portfolioLink: '',
  portfolioAdditionalInfo: '',
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
      name: 'creator-onboarding-form',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
