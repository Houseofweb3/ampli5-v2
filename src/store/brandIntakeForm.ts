import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BrandIntakeFormData {
  // Step 1: Brand Snapshot
  brandProductName: string;
  websiteLink: string;

  // Step 2: Market & Audience Readiness
  categories: string[];
  targetMarket: string;
  audienceReadinessLevel: string;

  // Step 3: Campaign Goal
  campaignGoals: string[];

  // Step 4: Revenue Model & Market focus
  monetizationModel: string[];
  revenueModel: string;
  marketFocus: string;

  // Step 5: Demographics
  primaryAudienceGeography: string[];
  ageRange: string;
  genderSkew: string;
  geographicLocation: string;

  // Step 6: Timeline
  primaryContactEmail: string;
  telegramId: string;
  whatsappNumber: string;
  campaignStartTimeline: string;
  campaignStartDate: string;
  campaignEndDate: string;

  // Step 7: Custom Brief
  customBrief: string;
}

interface BrandIntakeFormState {
  formData: BrandIntakeFormData;
  updateFormData: (data: Partial<BrandIntakeFormData>) => void;
  resetForm: () => void;
}

const initialFormData: BrandIntakeFormData = {
  brandProductName: '',
  websiteLink: '',
  categories: [],
  targetMarket: '',
  audienceReadinessLevel: '',
  campaignGoals: [],
  monetizationModel: [],
  revenueModel: '',
  marketFocus: '',
  primaryAudienceGeography: [],
  ageRange: '',
  genderSkew: '',
  geographicLocation: '',
  primaryContactEmail: '',
  telegramId: '',
  whatsappNumber: '',
  campaignStartTimeline: '',
  campaignStartDate: '',
  campaignEndDate: '',
  customBrief: '',
};

export const useBrandIntakeFormStore = create<BrandIntakeFormState>()(
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
      name: 'brand-intake-form',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
