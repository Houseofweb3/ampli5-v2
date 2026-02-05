"use client";
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useBrandIntakeFormStore } from '@/src/store/brandIntakeForm'

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "Brand Snapshot",
    description: "Short answer (required)"
  },
  {
    id: 2,
    title: "Market & Audience Readiness",
    description: ""
  },
  {
    id: 3,
    title: "Campaign Goal",
    description: ""
  },
  {
    id: 4,
    title: "Revenue Model & Market focus",
    description: ""
  },
  {
    id: 5,
    title: "Demographics",
    description: ""
  },
  {
    id: 6,
    title: "Timeline",
    description: ""
  },
  {
    id: 7,
    title: "Custom Brief",
    description: ""
  }
];

// Step 1: slide 0 = brandProductName, websiteLink; slide 1 = primaryContactEmail, telegramId, whatsappNumber
const BRAND_STEP1_FIELD_TO_SLIDE: Record<string, number> = {
  brandProductName: 0, websiteLink: 0, primaryContactEmail: 1, telegramId: 1, whatsappNumber: 1,
};
// Step 5: slide 0 = primaryAudienceGeography, 1 = ageRange, 2 = genderSkew
const BRAND_STEP5_FIELD_TO_SLIDE: Record<string, number> = {
  primaryAudienceGeography: 0, ageRange: 1, genderSkew: 2,
};

export default function BrandIntakeForm() {
  const router = useRouter();
  const { formData, updateFormData, resetForm } = useBrandIntakeFormStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [numberPickupCountry] = useState<string>('us');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pendingSlideToField, setPendingSlideToField] = useState<string | null>(null);
  const brandSwiperRef = useRef<SwiperType | null>(null);
  const demographicsSwiperRef = useRef<SwiperType | null>(null);
  const stepContentRef = useRef<HTMLDivElement | null>(null);

  // Load completed steps from formData
  useEffect(() => {
    const completed = new Set<number>();
    // Check which steps have data
    if (formData.brandProductName && formData.websiteLink && formData.primaryContactEmail && formData.telegramId && formData.whatsappNumber) completed.add(1);
    if (formData.categories && formData.categories.length > 0) completed.add(2);
    if (formData.campaignGoals && formData.campaignGoals.length > 0) completed.add(3);
    if (formData.monetizationModel && formData.monetizationModel.length > 0) completed.add(4);
    if (formData.primaryAudienceGeography && formData.primaryAudienceGeography.length > 0 && formData.ageRange && formData.genderSkew) completed.add(5);
    if (formData.campaignStartTimeline) completed.add(6);
    if (formData.customBrief && formData.customBrief.trim().split(/\s+/).filter(word => word.length > 0).length <= 500) completed.add(7);
    setCompletedSteps(completed);
  }, [formData]);

  const handleStepClick = (stepId: number) => {
    if (completedSteps.has(stepId) || stepId === currentStep) {
      setCurrentStep(stepId);
    }
  };

  type ValidateResult = { valid: true; firstErrorMessage?: undefined; firstErrorKey?: undefined } | { valid: false; firstErrorMessage: string; firstErrorKey: string };
  const validateStep = (step: number): ValidateResult => {
    const newErrors: Record<string, string> = {};

    switch (step) {
    case 1:
      if (!formData.brandProductName.trim()) {
        newErrors.brandProductName = 'Brand Product Name is required';
      }
      if (!formData.websiteLink.trim()) {
        newErrors.websiteLink = 'Website / Landing / Podcast Page Link is required';
      } else if (!/^https?:\/\/.+/.test(formData.websiteLink) && !formData.websiteLink.startsWith('www.')) {
        newErrors.websiteLink = 'Please enter a valid URL';
      }
      if (!formData.primaryContactEmail.trim()) {
        newErrors.primaryContactEmail = 'Primary Contact Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryContactEmail)) {
        newErrors.primaryContactEmail = 'Please enter a valid email address';
      }
      if (!formData.telegramId.trim()) {
        newErrors.telegramId = 'Telegram ID is required';
      }
      if (!formData.whatsappNumber.trim()) {
        newErrors.whatsappNumber = 'WhatsApp Number is required';
      }
      break;
    case 2:
      if (!formData.categories || formData.categories.length === 0) {
        newErrors.categories = 'Please select at least one category';
      }
      break;
    case 3:
      if (!formData.campaignGoals || formData.campaignGoals.length === 0) {
        newErrors.campaignGoals = 'Please select at least one campaign goal';
      }
      break;
    case 4:
      if (!formData.monetizationModel || formData.monetizationModel.length === 0) {
        newErrors.monetizationModel = 'Please select at least one monetization model';
      }
      break;
    case 5:
      if (!formData.primaryAudienceGeography || formData.primaryAudienceGeography.length === 0) {
        newErrors.primaryAudienceGeography = 'Please select at least one geography option';
      }
      if (!formData.ageRange.trim()) {
        newErrors.ageRange = 'Age Range is required';
      }
      if (!formData.genderSkew.trim()) {
        newErrors.genderSkew = 'Gender Skew is required';
      }
      break;
    case 6:
      if (!formData.campaignStartTimeline.trim()) {
        newErrors.campaignStartTimeline = 'Campaign Start Timeline is required';
      }
      break;
    case 7:
      if (!formData.customBrief.trim()) {
        newErrors.customBrief = 'Custom Brief is required';
      } else {
        const wordCount = formData.customBrief.trim().split(/\s+/).filter(word => word.length > 0).length;
        if (wordCount > 500) {
          newErrors.customBrief = 'Custom Brief must be 500 words or less';
        }
      }
      break;
    }

    setErrors(newErrors);
    const keys = Object.keys(newErrors);
    if (keys.length === 0) return { valid: true as const, firstErrorMessage: undefined, firstErrorKey: undefined };
    return { valid: false as const, firstErrorMessage: newErrors[keys[0]], firstErrorKey: keys[0] };
  };

  // When validation fails, slide to the field's slide (if step has Swiper) and scroll step into view
  useEffect(() => {
    if (!pendingSlideToField || !currentStep) return;
    const step = currentStep;
    if (step === 1 && BRAND_STEP1_FIELD_TO_SLIDE[pendingSlideToField] !== undefined) {
      brandSwiperRef.current?.slideTo(BRAND_STEP1_FIELD_TO_SLIDE[pendingSlideToField]);
    } else if (step === 5 && BRAND_STEP5_FIELD_TO_SLIDE[pendingSlideToField] !== undefined) {
      demographicsSwiperRef.current?.slideTo(BRAND_STEP5_FIELD_TO_SLIDE[pendingSlideToField]);
    }
    stepContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setPendingSlideToField(null);
  }, [currentStep, pendingSlideToField]);

  const handleNext = () => {
    const result = validateStep(currentStep);
    if (!result.valid) {
      toast.error(result.firstErrorMessage ?? 'Please fill in all required fields');
      if (result.firstErrorKey) setPendingSlideToField(result.firstErrorKey);
      return;
    }

    if (currentStep < STEPS.length) {
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        newSet.add(currentStep);
        return newSet;
      });
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const isStepCompleted = (stepId: number) => completedSteps.has(stepId);
  const isStepActive = (stepId: number) => stepId === currentStep;
  const isStepClickable = (stepId: number) => isStepCompleted(stepId) || isStepActive(stepId);

  const handleCampaignGoalChange = (goal: string) => {
    const currentGoals = formData.campaignGoals || [];
    if (currentGoals.includes(goal)) {
      updateFormData({
        campaignGoals: currentGoals.filter(g => g !== goal)
      });
    } else {
      updateFormData({
        campaignGoals: [...currentGoals, goal]
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
    case 1:
      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Brand Snapshot</h2>
          </div>
          <div className="hidden md:block w-full overflow-hidden">
            <Swiper
              onSwiper={(swiper) => { brandSwiperRef.current = swiper; }}
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="brand-snapshot-slider"
            >
              {/* First Slide: Brand Product Name and Website Link */}
              <SwiperSlide>
                <div className="space-y-6 w-full">
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
                          setErrors(prev => ({ ...prev, brandProductName: '' }));
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.brandProductName ? 'border-red-500' : 'border-gray-300'
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
                    <input
                      type="text"
                      value={formData.websiteLink}
                      onChange={(e) => {
                        updateFormData({ websiteLink: e.target.value });
                        if (errors.websiteLink) {
                          setErrors(prev => ({ ...prev, websiteLink: '' }));
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.websiteLink ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="www.example.com"
                    />
                    {errors.websiteLink && (
                      <p className="mt-1 text-sm text-red-500">{errors.websiteLink}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
              {/* Second Slide: Contact Information */}
              <SwiperSlide>
                <div className="space-y-6 w-full">
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
                          setErrors(prev => ({ ...prev, primaryContactEmail: '' }));
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.primaryContactEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="arun@abc.com"
                    />
                    {errors.primaryContactEmail && (
                      <p className="mt-1 text-sm text-red-500">{errors.primaryContactEmail}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telegram ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.telegramId}
                      onChange={(e) => {
                        updateFormData({ telegramId: e.target.value });
                        if (errors.telegramId) {
                          setErrors(prev => ({ ...prev, telegramId: '' }));
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.telegramId ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="XXX XXX XXXX"
                    />
                    {errors.telegramId && (
                      <p className="mt-1 text-sm text-red-500">{errors.telegramId}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      country={numberPickupCountry}
                      value={formData.whatsappNumber}
                      onChange={(value: string) => {
                        updateFormData({ whatsappNumber: value });
                        if (errors.whatsappNumber) {
                          setErrors(prev => ({ ...prev, whatsappNumber: '' }));
                        }
                      }}
                      enableLongNumbers
                      disableCountryCode={false}
                      inputStyle={{
                        width: '100%',
                        height: '48px',
                        padding: '14px 60px',
                        border: errors.whatsappNumber ? '2px solid #ef4444' : '2px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '16px',
                        backgroundColor: '#fff',
                        color: '#1F2937',
                      }}
                      containerStyle={{
                        width: '100%',
                      }}
                      buttonStyle={{
                        border: errors.whatsappNumber ? '2px solid #ef4444' : '2px solid #D1D5DB',
                        borderRadius: '8px 0 0 8px',
                        backgroundColor: '#fff',
                      }}
                      dropdownStyle={{
                        backgroundColor: '#fff',
                        border: '2px solid #D1D5DB',
                        borderRadius: '8px',
                      }}
                    />
                    {errors.whatsappNumber && (
                      <p className="mt-1 text-sm text-red-500">{errors.whatsappNumber}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Mobile view - stacked fields */}
          <div className="md:hidden space-y-6">
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
                    setErrors(prev => ({ ...prev, brandProductName: '' }));
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.brandProductName ? 'border-red-500' : 'border-gray-300'
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
              <input
                type="text"
                value={formData.websiteLink}
                onChange={(e) => {
                  updateFormData({ websiteLink: e.target.value });
                  if (errors.websiteLink) {
                    setErrors(prev => ({ ...prev, websiteLink: '' }));
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.websiteLink ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="www.example.com"
              />
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
                    setErrors(prev => ({ ...prev, primaryContactEmail: '' }));
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.primaryContactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="arun@abc.com"
              />
              {errors.primaryContactEmail && (
                <p className="mt-1 text-sm text-red-500">{errors.primaryContactEmail}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telegram ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.telegramId}
                onChange={(e) => {
                  updateFormData({ telegramId: e.target.value });
                  if (errors.telegramId) {
                    setErrors(prev => ({ ...prev, telegramId: '' }));
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.telegramId ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="XXX XXX XXXX"
              />
              {errors.telegramId && (
                <p className="mt-1 text-sm text-red-500">{errors.telegramId}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country={numberPickupCountry}
                value={formData.whatsappNumber}
                onChange={(value: string) => {
                  updateFormData({ whatsappNumber: value });
                  if (errors.whatsappNumber) {
                    setErrors(prev => ({ ...prev, whatsappNumber: '' }));
                  }
                }}
                enableLongNumbers
                disableCountryCode={false}
                inputStyle={{
                  width: '100%',
                  height: '48px',
                  padding: '14px 60px',
                  border: errors.whatsappNumber ? '2px solid #ef4444' : '2px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#fff',
                  color: '#1F2937',
                }}
                containerStyle={{
                  width: '100%',
                }}
                buttonStyle={{
                  border: errors.whatsappNumber ? '2px solid #ef4444' : '2px solid #D1D5DB',
                  borderRadius: '8px 0 0 8px',
                  backgroundColor: '#fff',
                }}
                dropdownStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #D1D5DB',
                  borderRadius: '8px',
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
        'Crypto',
        'AI',
        'Startups',
        'Fintech',
        'Robotics & Hardware',
        'Productivity (matches to motivation)',
        'Health'
      ];

      const handleCategoryChange = (category: string) => {
        const currentCategories = formData.categories || [];
        const newCategories = currentCategories.includes(category)
          ? currentCategories.filter(c => c !== category)
          : [...currentCategories, category];
        updateFormData({ categories: newCategories });
        if (errors.categories) {
          setErrors(prev => ({ ...prev, categories: '' }));
        }
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Market & Audience Readiness</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">Select The Category <span className="text-red-500">*</span></h3>
              </div>
              <div className="space-y-3">
                {categories.map((category) => {
                  const isSelected = formData.categories?.includes(category) || false;
                  return (
                    <label
                      key={category}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                        ? 'border-[#7B46F8] bg-white'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCategoryChange(category)}
                        className="sr-only"
                      />
                      <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${isSelected
                        ? 'bg-[#7B46F8] border-[#7B46F8]'
                        : 'bg-white border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'
                      }`}>
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
        'Awareness / reach',
        'Traffic to site',
        'Sign-ups / installs / subscribers / Conversions',
        'Affiliate sales'
      ];

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Primary Campaign Goal <span className="text-red-500">*</span></h2>
          </div>
          <div className="space-y-3">
            {campaignGoals.map((goal) => {
              const isSelected = formData.campaignGoals?.includes(goal) || false;
              return (
                <label
                  key={goal}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                    ? 'border-[#7B46F8] bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      handleCampaignGoalChange(goal);
                      if (errors.campaignGoals) {
                        setErrors(prev => ({ ...prev, campaignGoals: '' }));
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${isSelected
                    ? 'bg-[#7B46F8] border-[#7B46F8]'
                    : 'bg-white border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'
                  }`}>
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
        'Subscriptions',
        'One-time purchase',
        'Freemium → Paid',
        'Trading',
        'Token / asset-based'
      ];

      const handleMonetizationModelChange = (model: string) => {
        const currentModels = formData.monetizationModel || [];
        const newModels = currentModels.includes(model)
          ? currentModels.filter(m => m !== model)
          : [...currentModels, model];
        updateFormData({ monetizationModel: newModels });
        if (errors.monetizationModel) {
          setErrors(prev => ({ ...prev, monetizationModel: '' }));
        }
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Revenue Model & Market focus</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">Monetization Model <span className="text-red-500">*</span></h3>
              </div>
              <div className="space-y-3">
                {monetizationModels.map((model) => {
                  const isSelected = formData.monetizationModel?.includes(model) || false;
                  return (
                    <label
                      key={model}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                        ? 'border-[#7B46F8] bg-white'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleMonetizationModelChange(model)}
                        className="sr-only"
                      />
                      <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${isSelected
                        ? 'bg-[#7B46F8] border-[#7B46F8]'
                        : 'bg-white border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'
                      }`}>
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
      const geographyOptions = ['US & Canada', 'UK', 'EU', 'South Asia', 'Mena', 'SEA', 'LATAM'];
      const ageRangeOptions = ['18 - 24', '25 - 45', '45 - 60'];
      const genderSkewOptions = ['Skewed male', 'Balanced', 'Skewed Female'];

      const handleGeographyChange = (option: string) => {
        const currentGeography = formData.primaryAudienceGeography || [];
        const newGeography = currentGeography.includes(option)
          ? currentGeography.filter(g => g !== option)
          : [...currentGeography, option];
        updateFormData({ primaryAudienceGeography: newGeography });
        if (errors.primaryAudienceGeography) {
          setErrors(prev => ({ ...prev, primaryAudienceGeography: '' }));
        }
      };

      const handleAgeRangeChange = (option: string) => {
        updateFormData({ ageRange: option });
        if (errors.ageRange) {
          setErrors(prev => ({ ...prev, ageRange: '' }));
        }
      };

      const handleGenderSkewChange = (option: string) => {
        updateFormData({ genderSkew: option });
        if (errors.genderSkew) {
          setErrors(prev => ({ ...prev, genderSkew: '' }));
        }
      };

      const resetGeography = () => {
        updateFormData({ primaryAudienceGeography: [] });
      };

      const resetAgeRange = () => {
        updateFormData({ ageRange: '' });
      };

      const resetGenderSkew = () => {
        updateFormData({ genderSkew: '' });
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Demographics</h2>
          </div>
          {/* Desktop: slider */}
          <div className="hidden md:block w-full">
            <Swiper
              onSwiper={(swiper) => { demographicsSwiperRef.current = swiper; }}
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="demographics-slider"
            >
              {/* Slide 1: Primary Audience Geography */}
              <SwiperSlide>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      <h3 className="text-lg font-semibold text-gray-900">Primary Audience Geography <span className="text-red-500">*</span></h3>
                    </div>
                    <button
                      onClick={resetGeography}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                        Reset
                    </button>
                  </div>
                  <div className="space-y-3">
                    {geographyOptions.map((option) => {
                      const isSelected = formData.primaryAudienceGeography?.includes(option) || false;
                      return (
                        <label
                          key={option}
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                            ? 'border-[#7B46F8] bg-white'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleGeographyChange(option)}
                            className="sr-only"
                          />
                          <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${isSelected
                            ? 'bg-[#7B46F8] border-[#7B46F8]'
                            : 'bg-white border-gray-300'
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'
                          }`}>
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
              </SwiperSlide>

              {/* Slide 2: Primary Audience Age Range */}
              <SwiperSlide>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      <h3 className="text-lg font-semibold text-gray-900">Primary Audience Age Range <span className="text-red-500">*</span></h3>
                    </div>
                    <button
                      onClick={resetAgeRange}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                        Reset
                    </button>
                  </div>
                  <div className="space-y-3">
                    {ageRangeOptions.map((option) => {
                      const isSelected = formData.ageRange === option;
                      return (
                        <label
                          key={option}
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                            ? 'border-[#7B46F8] bg-white'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="ageRange"
                            checked={isSelected}
                            onChange={() => handleAgeRangeChange(option)}
                            className="sr-only"
                          />
                          <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${isSelected
                            ? 'bg-[#7B46F8] border-[#7B46F8]'
                            : 'bg-white border-gray-300'
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.ageRange && (
                    <p className="mt-2 text-sm text-red-500">{errors.ageRange}</p>
                  )}
                </div>
              </SwiperSlide>

              {/* Slide 3: Gender Skew */}
              <SwiperSlide>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      <h3 className="text-lg font-semibold text-gray-900">Gender Skew (Best Estimate) <span className="text-red-500">*</span></h3>
                    </div>
                    <button
                      onClick={resetGenderSkew}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                        Reset
                    </button>
                  </div>
                  <div className="space-y-3">
                    {genderSkewOptions.map((option) => {
                      const isSelected = formData.genderSkew === option;
                      return (
                        <label
                          key={option}
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                            ? 'border-[#7B46F8] bg-white'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="genderSkew"
                            checked={isSelected}
                            onChange={() => handleGenderSkewChange(option)}
                            className="sr-only"
                          />
                          <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${isSelected
                            ? 'bg-[#7B46F8] border-[#7B46F8]'
                            : 'bg-white border-gray-300'
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'
                          }`}>
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
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Mobile: single step - all sections stacked */}
          <div className="md:hidden space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Primary Audience Geography <span className="text-red-500">*</span></h3>
                </div>
                <button type="button" onClick={resetGeography} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Reset
                </button>
              </div>
              <div className="space-y-3">
                {geographyOptions.map((option) => {
                  const isSelected = formData.primaryAudienceGeography?.includes(option) || false;
                  return (
                    <label key={option} className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? 'border-[#7B46F8] bg-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                      <input type="checkbox" checked={isSelected} onChange={() => handleGeographyChange(option)} className="sr-only" />
                      <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${isSelected ? 'bg-[#7B46F8] border-[#7B46F8]' : 'bg-white border-gray-300'}`}>
                        {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{option}</span>
                    </label>
                  );
                })}
              </div>
              {errors.primaryAudienceGeography && <p className="mt-2 text-sm text-red-500">{errors.primaryAudienceGeography}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Primary Audience Age Range <span className="text-red-500">*</span></h3>
                </div>
                <button type="button" onClick={resetAgeRange} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Reset
                </button>
              </div>
              <div className="space-y-3">
                {ageRangeOptions.map((option) => {
                  const isSelected = formData.ageRange === option;
                  return (
                    <label key={option} className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? 'border-[#7B46F8] bg-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                      <input type="radio" name="ageRange-mobile" checked={isSelected} onChange={() => handleAgeRangeChange(option)} className="sr-only" />
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${isSelected ? 'bg-[#7B46F8] border-[#7B46F8]' : 'bg-white border-gray-300'}`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{option}</span>
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
                  <h3 className="text-lg font-semibold text-gray-900">Gender Skew (Best Estimate) <span className="text-red-500">*</span></h3>
                </div>
                <button type="button" onClick={resetGenderSkew} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Reset
                </button>
              </div>
              <div className="space-y-3">
                {genderSkewOptions.map((option) => {
                  const isSelected = formData.genderSkew === option;
                  return (
                    <label key={option} className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? 'border-[#7B46F8] bg-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                      <input type="radio" name="genderSkew-mobile" checked={isSelected} onChange={() => handleGenderSkewChange(option)} className="sr-only" />
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${isSelected ? 'bg-[#7B46F8] border-[#7B46F8]' : 'bg-white border-gray-300'}`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{option}</span>
                    </label>
                  );
                })}
              </div>
              {errors.genderSkew && <p className="mt-2 text-sm text-red-500">{errors.genderSkew}</p>}
            </div>
          </div>
        </div>
      );
    case 6:
      const timelineOptions = ['Immediate', '1-2 weeks', '3-4 weeks', 'Flexible'];

      const handleTimelineChange = (option: string) => {
        updateFormData({ campaignStartTimeline: option });
        if (errors.campaignStartTimeline) {
          setErrors(prev => ({ ...prev, campaignStartTimeline: '' }));
        }
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Timeline</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">+ Campaign Start Timeline <span className="text-red-500">*</span></h3>
              </div>
              <div className="space-y-3">
                {timelineOptions.map((option) => {
                  const isSelected = formData.campaignStartTimeline === option;
                  return (
                    <label
                      key={option}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                        ? 'border-[#7B46F8] bg-white'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="campaignStartTimeline"
                        checked={isSelected}
                        onChange={() => handleTimelineChange(option)}
                        className="sr-only"
                      />
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${isSelected
                        ? 'bg-[#7B46F8] border-[#7B46F8]'
                        : 'bg-white border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'
                      }`}>
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
      const wordCount = formData.customBrief ? formData.customBrief.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
      const maxWords = 500;

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Custom Brief <span className="text-red-500">*</span></h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">+ Please Provide Custom Brief <span className="text-red-500">*</span></h3>
              </div>
              <textarea
                value={formData.customBrief}
                onChange={(e) => {
                  const text = e.target.value;
                  updateFormData({ customBrief: text });
                  if (errors.customBrief) {
                    setErrors(prev => ({ ...prev, customBrief: '' }));
                  }
                }}
                rows={8}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent resize-none ${errors.customBrief || wordCount > maxWords ? 'border-red-500' : 'border-gray-300'
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
                <p className={`text-sm ${wordCount > maxWords ? 'text-red-500' : 'text-gray-500'}`}>
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
      <style dangerouslySetInnerHTML={{
        __html: `
                .brand-snapshot-slider .swiper-button-next,
                .brand-snapshot-slider .swiper-button-prev {
                    color: #7B46F8;
                    width: 40px;
                    height: 40px;
                    background: white;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                .brand-snapshot-slider .swiper-button-next:after,
                .brand-snapshot-slider .swiper-button-prev:after {
                    font-size: 18px;
                    font-weight: bold;
                }
                .brand-snapshot-slider {
                    width: 100%;
                    overflow: hidden;
                }
                .brand-snapshot-slider .swiper-wrapper {
                    width: 100%;
                }
                .brand-snapshot-slider .swiper-slide {
                    width: 100%;
                    box-sizing: border-box;
                }
                .brand-snapshot-slider .swiper-pagination {
                    position: relative;
                    margin-top: 24px;
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                }
                .brand-snapshot-slider .swiper-pagination-bullet {
                    background: #D1D5DB;
                    width: 8px;
                    height: 8px;
                    opacity: 1;
                    margin: 0 4px;
                }
                .brand-snapshot-slider .swiper-pagination-bullet-active {
                    background: #7B46F8;
                }
                .demographics-slider .swiper-pagination {
                    position: relative;
                    margin-top: 24px;
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                }
                .demographics-slider .swiper-pagination-bullet {
                    background: #D1D5DB;
                    width: 8px;
                    height: 8px;
                    opacity: 1;
                    margin: 0 4px;
                }
                .demographics-slider .swiper-pagination-bullet-active {
                    background: #7B46F8;
                }
            `}} />
      <div className='bg-white relative min-h-screen'>
        <div className='bg-[#7B46F8] relative py-24'>
          <div className='absolute top-0 right-0 z-10'>
            <Image src={"/icons/hero-arrow.png"} width={100} height={100} alt="bg" className='w-full h-[100px] md:h-[150px] object-cover' />
          </div>
          <div className='absolute -top-[40px] md:-top-[65px] left-0 z-10'>
            <Image src={"/pattern/flower.png"} width={1000} height={1000} alt="bg" className='w-full h-[100px] md:h-[150px] object-cover' />
          </div>
          <div className='flex md:flex-row flex-col md:items-start items-center justify-center gap-2'>
            <Image src={"/logo/white.jpg"} width={1000} height={1000} alt="bg" className='h-[48px] md:h-[55px] w-auto pt-1' />
            <h1 className='text-white text-center text-4xl md:text-5xl font-semibold'>Brand Intake Form</h1>
          </div>
          <div className='absolute -bottom-[50px] lg:left-[345px] left-[80px] z-10'>
            <Image src={"/icons/Star-fill.png"} width={1000} height={1000} alt="bg" className='w-full h-[100px]  object-cover' />
          </div>
        </div>
        <div className='flex h-full'>
          {/* Left Sidebar - Step Navigation */}
          <div className='bg-white min-w-[400px] p-8 hidden lg:block border-r border-gray-200'>
            <div className="space-y-10">
              {STEPS.map((step, index) => {
                const isCompleted = isStepCompleted(step.id);
                const isActive = isStepActive(step.id);
                const isClickable = isStepClickable(step.id);

                return (
                  <div key={step.id} className="relative">
                    {/* Progress Line */}
                    {index < STEPS.length - 1 && (
                      <div
                        className="absolute left-[15px] top-[32px] h-16 w-0.5"
                        style={{
                          background: isCompleted || isActive
                            ? '#7B46F8'
                            : 'none',
                          borderLeft: isCompleted || isActive
                            ? 'none'
                            : '1px dashed #D1D5DB',
                        }}
                      />
                    )}

                    {/* Step Item */}
                    <div
                      onClick={() => isClickable && handleStepClick(step.id)}
                      className={`flex items-start gap-6 transition-colors ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                      }`}
                    >
                      {/* Step Circle */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isActive
                          ? 'bg-[#7B46F8] border-2 border-[#7B46F8]'
                          : isCompleted
                            ? 'bg-[#7B46F8] border-2 border-[#7B46F8]'
                            : 'bg-[#F8F8F8] border-2 border-gray-300 border-dashed'
                        }`}
                      >
                        {isActive && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pt-1">
                        <h3
                          className={`text-lg font-medium ${isActive
                            ? 'text-[#7B46F8] font-semibold'
                            : isCompleted
                              ? 'text-gray-900 font-medium'
                              : 'text-gray-600 font-normal'
                          }`}
                        >
                          {step.title}
                        </h3>
                        {step.description && (
                          <p className={`text-xs mt-1 ${isActive || isCompleted
                            ? 'text-gray-500'
                            : 'text-gray-400'
                          }`}>
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content Area */}
          <div className='bg-[#F8F8F8] h-full  py-12 px-4 sm:px-8 pb-24 md:pb-12 w-screen lg:w-[calc(100vw_-_415px)]'>
            <div className="rounded-lg flex flex-col justify-between h-full w-full">
              <div className='sm:p-8 p-4 bg-white rounded-lg' ref={stepContentRef}>
                {renderStepContent()}
              </div>

              {/* Navigation Buttons - Fixed on mobile, relative on md+ */}
              <div className="fixed md:relative bottom-0 left-0 right-0 md:left-auto md:right-auto md:bottom-auto w-full md:w-auto mt-8 bg-white md:bg-transparent p-4 md:p-8 border-t md:border-t-0 border-gray-200 md:border-0 flex justify-end gap-4 rounded-t-lg md:rounded-lg shadow-lg md:shadow-none z-10">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-white text-[#7B46F8] border-2 border-[#7B46F8] rounded-lg hover:bg-[#7B46F8] hover:text-white transition-colors font-medium"
                  >
                    Back
                  </button>
                )}
                {currentStep < STEPS.length ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-[#7B46F8] text-white rounded-lg hover:bg-[#6B3EE8] transition-colors shadow-md font-medium"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      const result = validateStep(currentStep);
                      if (!result.valid) {
                        toast.error(result.firstErrorMessage ?? 'Please fill in all required fields');
                        if (result.firstErrorKey) setPendingSlideToField(result.firstErrorKey);
                        return;
                      }

                      setIsSubmitting(true);
                      try {
                        const response = await fetch('/api/brand-intake', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(formData),
                        });

                        const data = await response.json();

                        if (response.ok) {
                          setCompletedSteps(prev => {
                            const newSet = new Set(prev);
                            newSet.add(currentStep);
                            return newSet;
                          });
                          // Reset form data
                          resetForm();
                          // Redirect to thank you page
                          router.push('/brand-intake-form/success');
                        } else {
                          toast.error(data.message || 'Failed to submit form. Please try again.');
                        }
                      } catch (error) {
                        console.error('Error submitting form:', error);
                        toast.error('Something went wrong. Please try again later.');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-[#7B46F8] text-white rounded-lg hover:bg-[#6B3EE8] transition-colors shadow-md font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
