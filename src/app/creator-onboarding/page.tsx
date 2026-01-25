"use client";
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useCreatorOnboardingFormStore } from '@/src/store/creatorOnboardingForm'

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "Basic Details",
    description: "Short answer (required)"
  },
  {
    id: 2,
    title: "Industry selection",
    description: ""
  },
  {
    id: 3,
    title: "Category Selection",
    description: ""
  },
  {
    id: 4,
    title: "Inventory selection & Rates",
    description: ""
  },
  {
    id: 5,
    title: "Audience & GEO",
    description: ""
  },
  {
    id: 6,
    title: "Audience Proof",
    description: ""
  },
  {
    id: 7,
    title: "Payment Terms",
    description: ""
  },
  {
    id: 8,
    title: "Turnaround & Reliability",
    description: ""
  },
  {
    id: 9,
    title: "Previous Collaborations",
    description: ""
  },
  {
    id: 10,
    title: "Final Confirmation",
    description: ""
  }
];

export default function CreatorOnboardingForm() {
  const router = useRouter();
  const { formData, updateFormData, resetForm } = useCreatorOnboardingFormStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [numberPickupCountry] = useState<string>('us');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load completed steps from formData
  useEffect(() => {
    const completed = new Set<number>();
    // Check which steps have data - will be updated as we implement each step
    if (formData.channelBrandName && formData.primaryContactEmail && formData.telegramId && formData.whatsappNumber && formData.primaryCountry && formData.primaryTimezone && formData.platforms && formData.platforms.length > 0) completed.add(1);
    if (formData.industries && formData.industries.length > 0) completed.add(2);
    if (formData.categories && formData.categories.length > 0) completed.add(3);
    const inventoryItems = formData.inventoryItems || {};
    const selectedInventoryItems = Object.entries(inventoryItems).filter(([, item]) => item.selected);
    if (selectedInventoryItems.length > 0 && selectedInventoryItems.every(([, item]) => item.rate && item.rate.trim() !== '')) completed.add(4);
    if (formData.primaryAudienceGeography && formData.primaryAudienceGeography.length > 0) completed.add(5);
    // Steps 6-10 completion logic will be added as we implement each step
    setCompletedSteps(completed);
  }, [formData]);

  const handleStepClick = (stepId: number) => {
    if (completedSteps.has(stepId) || stepId === currentStep) {
      setCurrentStep(stepId);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
    case 1:
      if (!formData.channelBrandName.trim()) {
        newErrors.channelBrandName = 'Channel / Brand Name is required';
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
      if (!formData.primaryCountry.trim()) {
        newErrors.primaryCountry = 'Primary Country is required';
      }
      if (!formData.primaryTimezone.trim()) {
        newErrors.primaryTimezone = 'Primary Timezone is required';
      }
      if (!formData.platforms || formData.platforms.length === 0) {
        newErrors.platforms = 'Please select at least one platform';
      }
      break;
    case 2:
      if (!formData.industries || formData.industries.length === 0) {
        newErrors.industries = 'Please select at least one industry';
      }
      break;
    case 3:
      if (!formData.categories || formData.categories.length === 0) {
        newErrors.categories = 'Please select at least one category';
      }
      break;
    case 4:
      const inventoryItems = formData.inventoryItems || {};
      const selectedInventoryItems = Object.entries(inventoryItems).filter(([, item]) => item.selected);
      if (selectedInventoryItems.length === 0) {
        newErrors.inventoryItems = 'Please select at least one inventory item';
      } else {
        // Check if all selected items have rates
        const itemsWithoutRates = selectedInventoryItems.filter(([, item]) => !item.rate || item.rate.trim() === '');
        if (itemsWithoutRates.length > 0) {
          newErrors.inventoryItems = 'Please enter rates for all selected inventory items';
        }
      }
      break;
    case 5:
      if (!formData.primaryAudienceGeography || formData.primaryAudienceGeography.length === 0) {
        newErrors.primaryAudienceGeography = 'Please select at least one primary audience region';
      }
      break;
    case 6:
      if (!formData.availabilityStatus.trim()) {
        newErrors.availabilityStatus = 'Availability Status is required';
      }
      if (!formData.preferredCollaborationTypes || formData.preferredCollaborationTypes.length === 0) {
        newErrors.preferredCollaborationTypes = 'Please select at least one collaboration type';
      }
      break;
    case 7:
      // Payment Terms validation - to be implemented
      break;
    case 8:
      // Turnaround & Reliability validation - to be implemented
      break;
    case 9:
      // Previous Collaborations validation - to be implemented
      break;
    case 10:
      // Final Confirmation validation - to be implemented
      break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast.error('Please fill in all required fields');
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


  const renderStepContent = () => {
    switch (currentStep) {
    case 1:
      const platformOptions = ['X', 'Youtube', 'Instagram', 'TikTok', 'Newsletter', 'Spotify', 'PR/Editorial'];

      const handlePlatformChange = (platform: string) => {
        const currentPlatforms = formData.platforms || [];
        const newPlatforms = currentPlatforms.includes(platform)
          ? currentPlatforms.filter(p => p !== platform)
          : [...currentPlatforms, platform];
        updateFormData({ platforms: newPlatforms });
        if (errors.platforms) {
          setErrors(prev => ({ ...prev, platforms: '' }));
        }
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Basic Details</h2>
          </div>
          <div className="hidden md:block w-full overflow-hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="brand-snapshot-slider"
            >
              {/* First Slide: Channel / Brand Name and Primary Contact Email */}
              <SwiperSlide>
                <div className="space-y-6 w-full">
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
                          setErrors(prev => ({ ...prev, channelBrandName: '' }));
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.channelBrandName ? 'border-red-500' : 'border-gray-300'
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
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.primaryContactEmail}
                        onChange={(e) => {
                          updateFormData({ primaryContactEmail: e.target.value });
                          if (errors.primaryContactEmail) {
                            setErrors(prev => ({ ...prev, primaryContactEmail: '' }));
                          }
                        }}
                        className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.primaryContactEmail ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="arun@abc.com"
                      />
                      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {errors.primaryContactEmail && (
                      <p className="mt-1 text-sm text-red-500">{errors.primaryContactEmail}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
              {/* Second Slide: Telegram ID and WhatsApp Number */}
              <SwiperSlide>
                <div className="space-y-6 w-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      <label className="block text-sm font-medium text-gray-700">
                          Telegram ID <span className="text-red-500">*</span>
                      </label>
                    </div>
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
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      <label className="block text-sm font-medium text-gray-700">
                          WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                    </div>
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
              {/* Third Slide: Primary Country and Primary Timezone */}
              <SwiperSlide>
                <div className="space-y-6 w-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      <label className="block text-sm font-medium text-gray-700">
                          Primary Country <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.primaryCountry}
                        onChange={(e) => {
                          updateFormData({ primaryCountry: e.target.value });
                          if (errors.primaryCountry) {
                            setErrors(prev => ({ ...prev, primaryCountry: '' }));
                          }
                        }}
                        className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.primaryCountry ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Select Country"
                      />
                      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
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
                    <input
                      type="text"
                      value={formData.primaryTimezone}
                      onChange={(e) => {
                        updateFormData({ primaryTimezone: e.target.value });
                        if (errors.primaryTimezone) {
                          setErrors(prev => ({ ...prev, primaryTimezone: '' }));
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.primaryTimezone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="GMT+"
                    />
                    {errors.primaryTimezone && (
                      <p className="mt-1 text-sm text-red-500">{errors.primaryTimezone}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
              {/* Fourth Slide: Platform You're Active On */}
              <SwiperSlide>
                <div className="space-y-6 w-full">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      <h3 className="text-lg font-semibold text-gray-900">Platform You're Active On</h3>
                    </div>
                    <div className="space-y-3">
                      {platformOptions.map((platform) => {
                        const isSelected = formData.platforms?.includes(platform) || false;
                        return (
                          <label
                            key={platform}
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                              ? 'border-[#7B46F8] bg-white'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handlePlatformChange(platform)}
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
                              {platform}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.platforms && (
                      <p className="mt-2 text-sm text-red-500">{errors.platforms}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Mobile view - stacked fields */}
          <div className="md:hidden space-y-6">
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
                    setErrors(prev => ({ ...prev, channelBrandName: '' }));
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.channelBrandName ? 'border-red-500' : 'border-gray-300'
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
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <label className="block text-sm font-medium text-gray-700">
                    Telegram ID <span className="text-red-500">*</span>
                </label>
              </div>
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
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <label className="block text-sm font-medium text-gray-700">
                    WhatsApp Number <span className="text-red-500">*</span>
                </label>
              </div>
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
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <label className="block text-sm font-medium text-gray-700">
                    Primary Country <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="text"
                value={formData.primaryCountry}
                onChange={(e) => {
                  updateFormData({ primaryCountry: e.target.value });
                  if (errors.primaryCountry) {
                    setErrors(prev => ({ ...prev, primaryCountry: '' }));
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.primaryCountry ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Select Country"
              />
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
              <input
                type="text"
                value={formData.primaryTimezone}
                onChange={(e) => {
                  updateFormData({ primaryTimezone: e.target.value });
                  if (errors.primaryTimezone) {
                    setErrors(prev => ({ ...prev, primaryTimezone: '' }));
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${errors.primaryTimezone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="GMT+"
              />
              {errors.primaryTimezone && (
                <p className="mt-1 text-sm text-red-500">{errors.primaryTimezone}</p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">Platform You're Active On</h3>
              </div>
              <div className="space-y-3">
                {platformOptions.map((platform) => {
                  const isSelected = formData.platforms?.includes(platform) || false;
                  return (
                    <label
                      key={platform}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                        ? 'border-[#7B46F8] bg-white'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handlePlatformChange(platform)}
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
                        {platform}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.platforms && (
                <p className="mt-2 text-sm text-red-500">{errors.platforms}</p>
              )}
            </div>
          </div>
        </div>
      );
    case 2:
      const industries = [
        'Crypto',
        'AI',
        'Startups',
        'Fintech',
        'Robotics & Hardware',
        'Motivation / Mindset',
        'Health & Fitness',
        'Entertainment'
      ];

      const handleIndustryChange = (industry: string) => {
        const currentIndustries = formData.industries || [];
        const newIndustries = currentIndustries.includes(industry)
          ? currentIndustries.filter(i => i !== industry)
          : [...currentIndustries, industry];
        updateFormData({ industries: newIndustries });
        if (errors.industries) {
          setErrors(prev => ({ ...prev, industries: '' }));
        }
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Industry selection</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">Select The Industries You Operate In</h3>
              </div>
              <div className="space-y-3">
                {industries.map((industry) => {
                  const isSelected = formData.industries?.includes(industry) || false;
                  return (
                    <label
                      key={industry}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${isSelected
                        ? 'border-[#7B46F8] bg-white'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleIndustryChange(industry)}
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
    case 3:
      const categoryOptions = [
        'Defi',
        'Infrastructure',
        'Trading & prediction markets',
        'Memecoins',
        'Podcasters',
        'Clippers'
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
            <h2 className="text-2xl font-semibold text-gray-900">Category Selection</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">Select Category</h3>
              </div>
              <div className="space-y-3">
                {categoryOptions.map((category) => {
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
    case 4:
      const inventoryOptions = [
        'Single tweet',
        'Thread (5-7 tweets)',
        'Quote tweet',
        'Pinned tweet (7 days)',
        'AMA (X Spaces - 60 mins)'
      ];

      const handleInventoryChange = (item: string) => {
        const currentItems = formData.inventoryItems || {};
        const currentItem = currentItems[item] || { selected: false, rate: '' };
        const newItems = {
          ...currentItems,
          [item]: {
            selected: !currentItem.selected,
            rate: currentItem.rate
          }
        };
        updateFormData({ inventoryItems: newItems });
        if (errors.inventoryItems) {
          setErrors(prev => ({ ...prev, inventoryItems: '' }));
        }
      };

      const handleInventoryRateChange = (item: string, rate: string) => {
        const currentItems = formData.inventoryItems || {};
        const currentItem = currentItems[item] || { selected: false, rate: '' };
        const newItems = {
          ...currentItems,
          [item]: {
            selected: currentItem.selected,
            rate: rate
          }
        };
        updateFormData({ inventoryItems: newItems });
        if (errors.inventoryItems) {
          setErrors(prev => ({ ...prev, inventoryItems: '' }));
        }
      };

      const resetInventory = () => {
        updateFormData({ inventoryItems: {} });
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Inventory selection & Rates</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Select Inventory Selection & Rates</h3>
                </div>
                <button
                  onClick={resetInventory}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                    Reset
                </button>
              </div>
              <div className="space-y-3">
                {inventoryOptions.map((item) => {
                  const inventoryItem = formData.inventoryItems?.[item] || { selected: false, rate: '' };
                  const isSelected = inventoryItem.selected;
                  return (
                    <div
                      key={item}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all border-2 ${isSelected
                        ? 'border-[#7B46F8] bg-white'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <label className="flex items-center cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleInventoryChange(item)}
                          className="sr-only"
                        />
                        <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 flex-shrink-0 ${isSelected
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
                          {item}
                        </span>
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">$</span>
                        <input
                          type="text"
                          value={inventoryItem.rate}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            handleInventoryRateChange(item, value);
                          }}
                          placeholder="0"
                          className={`w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent text-sm ${errors.inventoryItems ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors.inventoryItems && (
                <p className="mt-2 text-sm text-red-500">{errors.inventoryItems}</p>
              )}
            </div>
          </div>
        </div>
      );
    case 5:
      const geographyOptions = ['US & Canada', 'UK', 'EU', 'India', 'MENA (includes Pakistan)', 'SEA', 'LATAM'];

      const handlePrimaryGeographyChange = (option: string) => {
        const currentGeography = formData.primaryAudienceGeography || [];
        const newGeography = currentGeography.includes(option)
          ? currentGeography.filter(g => g !== option)
          : [...currentGeography, option];
        updateFormData({ primaryAudienceGeography: newGeography });
        if (errors.primaryAudienceGeography) {
          setErrors(prev => ({ ...prev, primaryAudienceGeography: '' }));
        }
      };

      const handleSecondaryGeographyChange = (option: string) => {
        const currentGeography = formData.secondaryAudienceGeography || [];
        const newGeography = currentGeography.includes(option)
          ? currentGeography.filter(g => g !== option)
          : [...currentGeography, option];
        updateFormData({ secondaryAudienceGeography: newGeography });
        if (errors.secondaryAudienceGeography) {
          setErrors(prev => ({ ...prev, secondaryAudienceGeography: '' }));
        }
      };



      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Audience & GEO</h2>
          </div>
          <div className="w-full overflow-hidden">
            <style jsx global>{`
                                .audience-geo-slider .swiper {
                                    width: 100%;
                                    max-width: 100%;
                                    box-sizing: border-box;
                                }
                                .audience-geo-slider .swiper-wrapper {
                                    max-width: 100%;
                                    box-sizing: border-box;
                                    flex-shrink: 0;
                                }
                                .audience-geo-slider .swiper-slide {
                                    max-width: 100%;
                                    box-sizing: border-box;
                                    flex-shrink: 0;
                                }
                                .audience-geo-slider .swiper-pagination {
                                    position: relative;
                                    margin-top: 24px;
                                }
                                .audience-geo-slider .swiper-pagination-bullet {
                                    width: 8px;
                                    height: 8px;
                                    background: #D1D5DB;
                                    opacity: 1;
                                }
                                .audience-geo-slider .swiper-pagination-bullet-active {
                                    background: #7B46F8;
                                }
                            `}</style>
            <Swiper
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="audience-geo-slider"
            >
              {/* Slide 1: Primary Audience Regions */}
              <SwiperSlide>
                <div className="max-w-full box-border">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                    <h3 className="text-lg font-semibold text-gray-900">Primary Audience Regions</h3>
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
                            onChange={() => handlePrimaryGeographyChange(option)}
                            className="sr-only"
                          />
                          <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 flex-shrink-0 ${isSelected
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

              {/* Slide 2: Secondary Audience Regions */}
              <SwiperSlide>
                <div className="max-w-full box-border">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                    <h3 className="text-lg font-semibold text-gray-900">Secondary Audience Regions</h3>
                  </div>
                  <div className="space-y-3">
                    {geographyOptions.map((option) => {
                      const isSelected = formData.secondaryAudienceGeography?.includes(option) || false;
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
                            onChange={() => handleSecondaryGeographyChange(option)}
                            className="sr-only"
                          />
                          <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 flex-shrink-0 ${isSelected
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
                  {errors.secondaryAudienceGeography && (
                    <p className="mt-2 text-sm text-red-500">{errors.secondaryAudienceGeography}</p>
                  )}
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      );
    case 6:
      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Audience Proof</h2>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">Audience Proof step - to be implemented</p>
          </div>
        </div>
      );
    case 7:
      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Payment Terms</h2>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">Payment Terms step - to be implemented</p>
          </div>
        </div>
      );
    case 8:
      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Turnaround & Reliability</h2>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">Turnaround & Reliability step - to be implemented</p>
          </div>
        </div>
      );
    case 9:
      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Previous Collaborations</h2>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">Previous Collaborations step - to be implemented</p>
          </div>
        </div>
      );
    case 10:
      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Final Confirmation</h2>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">Final Confirmation step - to be implemented</p>
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
            <h1 className='text-white text-center text-4xl md:text-5xl font-semibold'>Creator Onboarding</h1>
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
          <div className='bg-[#F8F8F8] h-full  py-12 px-4 sm:px-8 min-h-[600px] pb-24 md:pb-12 w-screen lg:w-[calc(100vw_-_415px)]'>
            <div className="rounded-lg flex flex-col justify-between h-full w-full">
              <div className='sm:p-8 p-4 bg-white rounded-lg'>
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
                      if (!validateStep(currentStep)) {
                        toast.error('Please fill in all required fields');
                        return;
                      }

                      setIsSubmitting(true);
                      try {
                        const response = await fetch('/api/creator-onboarding', {
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
                          router.push('/creator-onboarding/success');
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
