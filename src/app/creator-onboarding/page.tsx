"use client";
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
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
  const [uploadingFields, setUploadingFields] = useState<Set<string>>(new Set());
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // Load completed steps from formData
  useEffect(() => {
    const completed = new Set<number>();
    // Check which steps have data - will be updated as we implement each step
    if (formData.channelBrandName && formData.primaryContactEmail && formData.telegramId && formData.whatsappNumber && formData.primaryCountry && formData.primaryTimezone && formData.platforms && formData.platforms.length > 0) completed.add(1);
    if (formData.industries && formData.industries.length > 0) completed.add(2);
    const industryCategoryMapCompleted: Record<string, string[]> = {
      'Crypto': ['DeFi', 'Infrastructure', 'Trading & Prediction Markets', 'Memecoins', 'Podcasters', 'Clippers'],
      'AI': ['AI Products & Tools Review', 'AI Education', 'AI News & Releases', 'Podcasters', 'Clippers'],
      'Startups': ['Startup News & Media', 'Startup Product Reviews', 'Business & Tech Explainers', 'Growth & Marketing', 'Podcasters', 'Clippers'],
      'Fintech': ['News & Trends', 'Fintech Product Reviews', 'Podcasters', 'Clippers'],
      'Robotics & Hardware': ['Tech & Gadget Creators', 'Lifestyle Tech Creators', 'Product Reviews', 'Innovation & Future Tech', 'Podcasters', 'Clippers'],
      'Motivation / Mindset': ['Motivational Speakers', 'Mindset & Discipline', 'Entrepreneur Motivation', 'Stoicism & Philosophy', 'Podcasters', 'Clippers'],
      'Health & Fitness': ['Physical Fitness', 'Diet & Nutrition', 'Biohacking', 'Podcasters', 'Clippers'],
    };
    const selInd = formData.industries?.[0];
    const hasCats = selInd && (industryCategoryMapCompleted[selInd]?.length ?? 0) > 0;
    if (formData.industries?.length === 1 && (!hasCats || (formData.categories && formData.categories.length > 0))) completed.add(3);
    const platformInventoryMapCompleted: Record<string, string[]> = {
      'X': ['Single tweet', 'Thread (5–7 tweets)', 'Quote tweet', 'Pinned tweet (7 days)', 'AMA (X Spaces – 60 mins)', 'Article'],
      'Youtube': ['Integrated video (≤3 mins)', 'Sponsored-by tag', 'Dedicated review / breakdown video', 'Streams/Live trading video', 'Shorts'],
      'Instagram': ['IG Reel – Original (Creator produces content) ( 24 hours )', 'IG Reel – Adapted (Brand provides content)( 24 hours )', 'IG Reel – Repost (Brand provides content) ( 24h )', 'IG Reel – Original (Creator produces content) ( 7 hours )', 'IG Reel – Adapted (Brand provides content)( 7 hours )', 'IG Reel – Repost (Brand provides content) ( 7h )', 'Carousel (3–5 slides)', 'Story sequence (3 slides)', 'Link in bio placement (7 days)', 'Reel pinned (7 days)', 'TikTok pinned (7 days)', 'IG Reel – Original (Creator produces content)'],
      'TikTok': ['IG Reel – Original (Creator produces content) ( 24 hours )', 'IG Reel – Adapted (Brand provides content)( 24 hours )', 'IG Reel – Repost (Brand provides content) ( 24h )', 'IG Reel – Original (Creator produces content) ( 7 hours )', 'IG Reel – Adapted (Brand provides content)( 7 hours )', 'IG Reel – Repost (Brand provides content) ( 7h )', 'Carousel (3–5 slides)', 'Story sequence (3 slides)', 'Link in bio placement (7 days)', 'Reel pinned (7 days)', 'TikTok pinned (7 days)', 'IG Reel – Original (Creator produces content)'],
      'Newsletter': ['Sponsored-by mention (top)', 'Sponsored-by mention (footer)', 'Contextual integration within main content'],
      'PR/Editorial': ['Organic PR with backlink', 'Thematic article (brand included in narrative)'],
      'Spotify': ['Dedicated podcast episode', 'Podcast sponsored mention', 'Short clips distribution (IG / Shorts / TikTok)', 'Short virtual podcast (IG / Shorts / TikTok)'],
    };
    const platformsStep4 = formData.platforms || [];
    const inventoryItems = formData.inventoryItems || {};
    const step4Complete = platformsStep4.length > 0 && platformsStep4.every((platform: string) => {
      const optionsStep4 = platformInventoryMapCompleted[platform] ?? [];
      if (optionsStep4.length === 0) return true;
      const selectedForPlatform = optionsStep4.filter((item: string) => inventoryItems[item]?.selected);
      if (selectedForPlatform.length === 0) return false;
      return selectedForPlatform.every((item: string) => {
        const r = inventoryItems[item]?.rate?.trim() ?? '';
        return r !== '' && r !== '0';
      });
    });
    if (step4Complete) completed.add(4);
    if (formData.primaryAudienceGeography && formData.primaryAudienceGeography.length > 0 && formData.secondaryAudienceGeography && formData.secondaryAudienceGeography.length > 0) completed.add(5);
    // Step 6: Audience Proof - check if at least one image is uploaded
    if (formData.ageScreenshot || formData.genderScreenshot || formData.topCountriesScreenshot) completed.add(6);
    // Step 7: Payment Terms - check if payment term is selected
    if (formData.paymentTerms && formData.paymentTerms.trim()) completed.add(7);
    // Step 8: Turnaround & Reliability - check if at least one turnaround time is selected
    if (formData.turnaroundTimes && formData.turnaroundTimes.length > 0) completed.add(8);
    // Step 9: Previous Collaborations - check if all three images and all five links are provided
    if (
      formData.firstCollaborationImage1 && 
      formData.firstCollaborationImage2 && 
      formData.firstCollaborationImage3 &&
      formData.xLink &&
      formData.instagramLink &&
      formData.youtubeLink &&
      formData.tiktokLink &&
      formData.newsletterLink
    ) completed.add(9);
    // Step 10: Final Confirmation - check if confirmation is checked
    if (formData.finalConfirmation) completed.add(10);
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
        newErrors.industries = 'Please select one industry';
      }
      break;
    case 3: {
      const industryCategoryMap: Record<string, string[]> = {
        'Crypto': ['DeFi', 'Infrastructure', 'Trading & Prediction Markets', 'Memecoins', 'Podcasters', 'Clippers'],
        'AI': ['AI Products & Tools Review', 'AI Education', 'AI News & Releases', 'Podcasters', 'Clippers'],
        'Startups': ['Startup News & Media', 'Startup Product Reviews', 'Business & Tech Explainers', 'Growth & Marketing', 'Podcasters', 'Clippers'],
        'Fintech': ['News & Trends', 'Fintech Product Reviews', 'Podcasters', 'Clippers'],
        'Robotics & Hardware': ['Tech & Gadget Creators', 'Lifestyle Tech Creators', 'Product Reviews', 'Innovation & Future Tech', 'Podcasters', 'Clippers'],
        'Motivation / Mindset': ['Motivational Speakers', 'Mindset & Discipline', 'Entrepreneur Motivation', 'Stoicism & Philosophy', 'Podcasters', 'Clippers'],
        'Health & Fitness': ['Physical Fitness', 'Diet & Nutrition', 'Biohacking', 'Podcasters', 'Clippers'],
      };
      const selectedInd = formData.industries?.[0];
      const hasCategories = selectedInd && (industryCategoryMap[selectedInd]?.length ?? 0) > 0;
      if (hasCategories && (!formData.categories || formData.categories.length === 0)) {
        newErrors.categories = 'Please select at least one category';
      }
      break;
    }
    case 4: {
      const platformInventoryMap: Record<string, string[]> = {
        'X': ['Single tweet', 'Thread (5–7 tweets)', 'Quote tweet', 'Pinned tweet (7 days)', 'AMA (X Spaces – 60 mins)', 'Article'],
        'Youtube': ['Integrated video (≤3 mins)', 'Sponsored-by tag', 'Dedicated review / breakdown video', 'Streams/Live trading video', 'Shorts'],
        'Instagram': ['IG Reel – Original (Creator produces content) ( 24 hours )', 'IG Reel – Adapted (Brand provides content)( 24 hours )', 'IG Reel – Repost (Brand provides content) ( 24h )', 'IG Reel – Original (Creator produces content) ( 7 hours )', 'IG Reel – Adapted (Brand provides content)( 7 hours )', 'IG Reel – Repost (Brand provides content) ( 7h )', 'Carousel (3–5 slides)', 'Story sequence (3 slides)', 'Link in bio placement (7 days)', 'Reel pinned (7 days)', 'TikTok pinned (7 days)', 'IG Reel – Original (Creator produces content)'],
        'TikTok': ['IG Reel – Original (Creator produces content) ( 24 hours )', 'IG Reel – Adapted (Brand provides content)( 24 hours )', 'IG Reel – Repost (Brand provides content) ( 24h )', 'IG Reel – Original (Creator produces content) ( 7 hours )', 'IG Reel – Adapted (Brand provides content)( 7 hours )', 'IG Reel – Repost (Brand provides content) ( 7h )', 'Carousel (3–5 slides)', 'Story sequence (3 slides)', 'Link in bio placement (7 days)', 'Reel pinned (7 days)', 'TikTok pinned (7 days)', 'IG Reel – Original (Creator produces content)'],
        'Newsletter': ['Sponsored-by mention (top)', 'Sponsored-by mention (footer)', 'Contextual integration within main content'],
        'PR/Editorial': ['Organic PR with backlink', 'Thematic article (brand included in narrative)'],
        'Spotify': ['Dedicated podcast episode', 'Podcast sponsored mention', 'Short clips distribution (IG / Shorts / TikTok)', 'Short virtual podcast (IG / Shorts / TikTok)'],
      };
      const platforms = formData.platforms || [];
      const inventoryItems = formData.inventoryItems || {};
      for (const platform of platforms) {
        const optionsForPlatform = platformInventoryMap[platform] ?? [];
        if (optionsForPlatform.length > 0) {
          const selectedForPlatform = optionsForPlatform.filter(item => inventoryItems[item]?.selected);
          if (selectedForPlatform.length === 0) {
            newErrors.inventoryItems = `Please select at least one inventory item for ${platform}.`;
            break;
          }
          const itemsWithoutValidRate = selectedForPlatform.filter(item => {
            const rate = inventoryItems[item]?.rate?.trim() ?? '';
            return !rate || rate === '0';
          });
          if (itemsWithoutValidRate.length > 0) {
            newErrors.inventoryItems = 'Please enter a rate greater than 0 for all selected inventory items.';
            break;
          }
        }
      }
      break;
    }
    case 5:
      if (!formData.primaryAudienceGeography || formData.primaryAudienceGeography.length === 0) {
        newErrors.primaryAudienceGeography = 'Please select at least one primary audience region';
      }
      if (!formData.secondaryAudienceGeography || formData.secondaryAudienceGeography.length === 0) {
        newErrors.secondaryAudienceGeography = 'Please select at least one secondary audience region';
      }
      break;
    case 6:
      // Audience Proof - validate image uploads
      if (!formData.ageScreenshot || !formData.ageScreenshot.trim()) {
        newErrors.ageScreenshot = 'Age screenshot is required';
      }
      if (!formData.genderScreenshot || !formData.genderScreenshot.trim()) {
        newErrors.genderScreenshot = 'Gender screenshot is required';
      }
      if (!formData.topCountriesScreenshot || !formData.topCountriesScreenshot.trim()) {
        newErrors.topCountriesScreenshot = 'Top countries screenshot is required';
      }
      break;
    case 7:
      if (!formData.paymentTerms || !formData.paymentTerms.trim()) {
        newErrors.paymentTerms = 'Please select a payment term';
      }
      break;
    case 8:
      if (!formData.turnaroundTimes || formData.turnaroundTimes.length === 0) {
        newErrors.turnaroundTimes = 'Please select at least one turnaround time';
      }
      break;
    case 9:
      // Previous Collaborations - validate image uploads and links
      // First slide - validate all three images
      if (!formData.firstCollaborationImage1 || !formData.firstCollaborationImage1.trim()) {
        newErrors.firstCollaborationImage1 = 'First collaboration image is required';
      }
      if (!formData.firstCollaborationImage2 || !formData.firstCollaborationImage2.trim()) {
        newErrors.firstCollaborationImage2 = 'Second collaboration image is required';
      }
      if (!formData.firstCollaborationImage3 || !formData.firstCollaborationImage3.trim()) {
        newErrors.firstCollaborationImage3 = 'Third collaboration image is required';
      }
      // Second slide - validate all links are required
      if (!formData.xLink || !formData.xLink.trim()) {
        newErrors.xLink = 'X link is required';
      }
      if (!formData.instagramLink || !formData.instagramLink.trim()) {
        newErrors.instagramLink = 'Instagram link is required';
      }
      if (!formData.youtubeLink || !formData.youtubeLink.trim()) {
        newErrors.youtubeLink = 'YouTube link is required';
      }
      if (!formData.tiktokLink || !formData.tiktokLink.trim()) {
        newErrors.tiktokLink = 'TikTok link is required';
      }
      if (!formData.newsletterLink || !formData.newsletterLink.trim()) {
        newErrors.newsletterLink = 'Newsletter link is required';
      }
      break;
    case 10:
      if (!formData.finalConfirmation) {
        newErrors.finalConfirmation = 'Please confirm that all information is accurate';
      }
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
  // Only allow clicking: current step, any previous step, or the immediate next step when current is completed (all fields required, no jumping ahead)
  const isStepClickable = (stepId: number) =>
    stepId === currentStep ||
    stepId < currentStep ||
    (stepId === currentStep + 1 && isStepCompleted(currentStep));


  const renderStepContent = () => {
    switch (currentStep) {
    case 1:
      const platformOptions = ['X', 'Youtube', 'Instagram', 'TikTok', 'Newsletter', 'Spotify', 'PR/Editorial'];

      const handlePlatformChange = (platform: string) => {
        const currentPlatforms = formData.platforms || [];
        const newPlatforms = currentPlatforms.includes(platform)
          ? currentPlatforms.filter((p) => p !== platform)
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
                      <h3 className="text-lg font-semibold text-gray-900">Platform You're Active On <span className="text-red-500">*</span></h3>
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
                              name="platform-selection"
                              checked={isSelected}
                              onChange={() => handlePlatformChange(platform)}
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
                <h3 className="text-lg font-semibold text-gray-900">Platform You're Active On <span className="text-red-500">*</span></h3>
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
                        name="platform-selection-mobile"
                        checked={isSelected}
                        onChange={() => handlePlatformChange(platform)}
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
      ];

      const handleIndustryChange = (industry: string) => {
        const currentIndustries = formData.industries || [];
        const newIndustries = currentIndustries.includes(industry) ? [] : [industry];
        updateFormData({ industries: newIndustries, categories: [] });
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
                <h3 className="text-lg font-semibold text-gray-900">Select The Industry You Operate In <span className="text-red-500">*</span></h3>
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
                        type="radio"
                        name="industry-selection"
                        checked={isSelected}
                        onChange={() => handleIndustryChange(industry)}
                        className="sr-only"
                      />
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 ${isSelected
                        ? 'bg-[#7B46F8] border-[#7B46F8]'
                        : 'bg-white border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
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
    case 3: {
      const INDUSTRY_CATEGORY_OPTIONS: Record<string, string[]> = {
        'Crypto': ['DeFi', 'Infrastructure', 'Trading & Prediction Markets', 'Memecoins', 'Podcasters', 'Clippers'],
        'AI': ['AI Products & Tools Review', 'AI Education', 'AI News & Releases', 'Podcasters', 'Clippers'],
        'Startups': ['Startup News & Media', 'Startup Product Reviews', 'Business & Tech Explainers', 'Growth & Marketing', 'Podcasters', 'Clippers'],
        'Fintech': ['News & Trends', 'Fintech Product Reviews', 'Podcasters', 'Clippers'],
        'Robotics & Hardware': ['Tech & Gadget Creators', 'Lifestyle Tech Creators', 'Product Reviews', 'Innovation & Future Tech', 'Podcasters', 'Clippers'],
        'Motivation / Mindset': ['Motivational Speakers', 'Mindset & Discipline', 'Entrepreneur Motivation', 'Stoicism & Philosophy', 'Podcasters', 'Clippers'],
        'Health & Fitness': ['Physical Fitness', 'Diet & Nutrition', 'Biohacking', 'Podcasters', 'Clippers'],
      };

      const selectedIndustry = formData.industries?.[0];
      const categoryOptions = selectedIndustry ? (INDUSTRY_CATEGORY_OPTIONS[selectedIndustry] ?? []) : [];

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
            <h2 className="text-2xl font-semibold text-gray-900">Category Selection <span className="text-red-500">*</span></h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Select categories for {selectedIndustry || 'your industry'}
                </h3>
              </div>
              {!selectedIndustry ? (
                <p className="text-sm text-gray-500">Please complete Step 2 (Industry selection) first.</p>
              ) : categoryOptions.length === 0 ? (
                <p className="text-sm text-gray-500">No categories for this industry. You can proceed to the next step.</p>
              ) : (
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
      const PLATFORM_INVENTORY_OPTIONS: Record<string, string[]> = {
        'X': [
          'Single tweet',
          'Thread (5–7 tweets)',
          'Quote tweet',
          'Pinned tweet (7 days)',
          'AMA (X Spaces – 60 mins)',
          'Article',
        ],
        'Youtube': [
          'Integrated video (≤3 mins)',
          'Sponsored-by tag',
          'Dedicated review / breakdown video',
          'Streams/Live trading video',
          'Shorts',
        ],
        'Instagram': [
          'IG Reel – Original (Creator produces content) ( 24 hours )',
          'IG Reel – Adapted (Brand provides content)( 24 hours )',
          'IG Reel – Repost (Brand provides content) ( 24h )',
          'IG Reel – Original (Creator produces content) ( 7 hours )',
          'IG Reel – Adapted (Brand provides content)( 7 hours )',
          'IG Reel – Repost (Brand provides content) ( 7h )',
          'Carousel (3–5 slides)',
          'Story sequence (3 slides)',
          'Link in bio placement (7 days)',
          'Reel pinned (7 days)',
          'TikTok pinned (7 days)',
          'IG Reel – Original (Creator produces content)',
        ],
        'TikTok': [
          'IG Reel – Original (Creator produces content) ( 24 hours )',
          'IG Reel – Adapted (Brand provides content)( 24 hours )',
          'IG Reel – Repost (Brand provides content) ( 24h )',
          'IG Reel – Original (Creator produces content) ( 7 hours )',
          'IG Reel – Adapted (Brand provides content)( 7 hours )',
          'IG Reel – Repost (Brand provides content) ( 7h )',
          'Carousel (3–5 slides)',
          'Story sequence (3 slides)',
          'Link in bio placement (7 days)',
          'Reel pinned (7 days)',
          'TikTok pinned (7 days)',
          'IG Reel – Original (Creator produces content)',
        ],
        'Newsletter': [
          'Sponsored-by mention (top)',
          'Sponsored-by mention (footer)',
          'Contextual integration within main content',
        ],
        'PR/Editorial': [
          'Organic PR with backlink',
          'Thematic article (brand included in narrative)',
        ],
        'Spotify': [
          'Dedicated podcast episode',
          'Podcast sponsored mention',
          'Short clips distribution (IG / Shorts / TikTok)',
          'Short virtual podcast (IG / Shorts / TikTok)',
        ],
      };

      const selectedPlatforms = formData.platforms || [];

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

      const resetInventoryForPlatform = (platform: string) => {
        const optionsForPlatform = PLATFORM_INVENTORY_OPTIONS[platform] ?? [];
        const currentItems = formData.inventoryItems || {};
        const newItems = { ...currentItems };
        optionsForPlatform.forEach((k) => {
          newItems[k] = { selected: false, rate: '' };
        });
        updateFormData({ inventoryItems: newItems });
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Inventory selection & Rates</h2>
          </div>
          <div className="space-y-8">
            {selectedPlatforms.length === 0 ? (
              <p className="text-sm text-gray-500">Please complete Step 1 (Basic Details) and select at least one platform first.</p>
            ) : (
              selectedPlatforms.map((platform) => {
                const inventoryOptions = PLATFORM_INVENTORY_OPTIONS[platform] ?? [];
                return (
                  <div key={platform}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {platform}
                        </h3>
                      </div>
                      {inventoryOptions.length > 0 && (
                        <button
                          type="button"
                          onClick={() => resetInventoryForPlatform(platform)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Reset
                        </button>
                      )}
                    </div>
                    {inventoryOptions.length === 0 ? (
                      <p className="text-sm text-gray-500">No inventory options for this platform.</p>
                    ) : (
                      <div className="space-y-3">
                        {inventoryOptions.map((item) => {
                          const inventoryItem = formData.inventoryItems?.[item] || { selected: false, rate: '' };
                          const isSelected = inventoryItem.selected;
                          const rateTrimmed = inventoryItem.rate?.trim() ?? '';
                          const hasInvalidRate = isSelected && (!rateTrimmed || rateTrimmed === '0');
                          return (
                            <div
                              key={item}
                              className={`flex items-center gap-4 p-4 rounded-lg transition-all border-2 ${isSelected
                                ? 'border-[#7B46F8] bg-white'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <label className="flex items-center cursor-pointer flex-1 min-w-0">
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
                                <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'} break-words`}>
                                  {item}
                                </span>
                              </label>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-sm text-gray-600">$</span>
                                <input
                                  type="text"
                                  value={inventoryItem.rate}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    handleInventoryRateChange(item, value);
                                  }}
                                  placeholder="0"
                                  className={`w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent text-sm ${hasInvalidRate ? 'border-red-500' : 'border-gray-300'
                                  }`}
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
                    <h3 className="text-lg font-semibold text-gray-900">Primary Audience Regions <span className="text-red-500">*</span></h3>
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
                    <h3 className="text-lg font-semibold text-gray-900">Secondary Audience Regions <span className="text-red-500">*</span></h3>
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
      const handleImageUpload = async (
        field: 'ageScreenshot' | 'genderScreenshot' | 'topCountriesScreenshot',
        file: File
      ) => {
        // Validate file type - only allow image files
        const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];
        if (!file.type.startsWith('image/') || !allowedImageTypes.includes(file.type.toLowerCase())) {
          toast.error('Please upload an image file only (JPG, PNG, GIF, WebP, BMP, or SVG). Documents and videos are not allowed.');
          return;
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error('File size must be less than 10MB');
          return;
        }

        setUploadingFields(prev => new Set(prev).add(field));

        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch('/api/cloudinary/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 408 || errorData.error === 'TIMEOUT') {
              throw new Error('TIMEOUT');
            }
            throw new Error(errorData.message || 'Upload failed');
          }

          const data = await response.json();
          // Store URL directly in form data for Excel export
          // Also store publicId in a separate field for deletion if needed
          updateFormData({ 
            [field]: data.url, // Store URL as string for Excel
            [`${field}PublicId`]: data.publicId // Store publicId separately for deletion
          });
          // Clear error for this field if it exists
          if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
          }
          toast.success('Image uploaded successfully');
        } catch (error: any) {
          console.error('Error uploading image:', error);
          if (error.message === 'TIMEOUT') {
            toast.error('Upload timeout. The image may be too large or your connection is slow. Please try again with a smaller image.');
          } else {
            toast.error(error.message || 'Failed to upload image. Please try again.');
          }
        } finally {
          setUploadingFields(prev => {
            const newSet = new Set(prev);
            newSet.delete(field);
            return newSet;
          });
        }
      };

      const handleImageDelete = async (field: 'ageScreenshot' | 'genderScreenshot' | 'topCountriesScreenshot') => {
        const currentData = formData[field];
        if (!currentData) return;

        try {
          // Get publicId from the separate field
          const publicIdField = `${field}PublicId` as keyof typeof formData;
          const publicId = formData[publicIdField] as string;

          if (publicId) {
            const response = await fetch('/api/cloudinary/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ publicId }),
            });

            if (response.ok) {
              updateFormData({ 
                [field]: '',
                [publicIdField]: ''
              });
              toast.success('Image deleted successfully');
            } else {
              toast.error('Failed to delete image');
            }
          } else {
            // If no publicId, just clear from form
            updateFormData({ 
              [field]: '',
              [publicIdField]: ''
            });
          }
        } catch (error) {
          console.error('Error deleting image:', error);
          // If error, just clear the fields
          const publicIdField = `${field}PublicId` as keyof typeof formData;
          updateFormData({ 
            [field]: '',
            [publicIdField]: ''
          });
          toast.error('Error deleting image');
        }
      };

      const getImageData = (field: 'ageScreenshot' | 'genderScreenshot' | 'topCountriesScreenshot') => {
        const data = formData[field];
        if (!data) return null;
        
        // Handle backward compatibility - check if it's JSON string
        try {
          const parsed = JSON.parse(data);
          if (parsed.url) {
            return { url: parsed.url, publicId: parsed.publicId || null };
          }
        } catch {
          // Not JSON, treat as URL string
        }
        
        // New format: URL is stored as string, publicId in separate field
        const publicIdField = `${field}PublicId` as keyof typeof formData;
        const publicId = formData[publicIdField] as string;
        return { url: data, publicId: publicId || null };
      };

      const ImageUploadField = ({ 
        field, 
        label 
      }: { 
        field: 'ageScreenshot' | 'genderScreenshot' | 'topCountriesScreenshot'; 
        label: string;
      }) => {
        const imageData = getImageData(field);
        const hasImage = !!imageData?.url;
        const isUploading = uploadingFields.has(field);
        const fileInputRef = useRef<HTMLInputElement>(null);
        const [isFocused, setIsFocused] = useState(false);
        const fieldError = errors[field];

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (!files || files.length === 0) return;
          
          // Only allow single file upload
          if (files.length > 1) {
            toast.error('Please upload only one image at a time');
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
            return;
          }
          
          const file = files[0];
          if (file) {
            handleImageUpload(field, file);
          }
          // Reset input so same file can be selected again
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        };

        return (
          <div className="space-y-3">
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
            {hasImage ? (
              <div className="relative border-2 border-gray-300 rounded-lg p-4">
                <div className="relative w-full h-64 mb-3 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={imageData.url}
                    alt={label}
                    fill
                    className="object-contain rounded-lg"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => handleImageDelete(field)}
                  disabled={isUploading}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Image
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml"
                  onChange={handleFileChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={isUploading}
                  className="hidden"
                  id={`file-input-${field}`}
                />
                <label
                  htmlFor={`file-input-${field}`}
                  className={`w-full px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                    isUploading
                      ? 'opacity-50 cursor-not-allowed bg-gray-50 border border-gray-200'
                      : isFocused || (field === 'ageScreenshot' && !hasImage)
                        ? 'border-2 border-[#7B46F8] bg-white'
                        : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-700">
                    {isUploading ? 'Uploading...' : label}
                  </span>
                  {isUploading ? (
                    <svg className="animate-spin h-5 w-5 text-[#7B46F8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
              <h2 className="text-2xl font-semibold text-gray-900">Audience Proof</h2>
            </div>
            <button
              onClick={async () => {
                setIsResetting(true);
                const imagesToDelete = [
                  { field: 'ageScreenshot' as const, publicId: formData.ageScreenshotPublicId },
                  { field: 'genderScreenshot' as const, publicId: formData.genderScreenshotPublicId },
                  { field: 'topCountriesScreenshot' as const, publicId: formData.topCountriesScreenshotPublicId },
                ].filter(img => img.publicId && img.publicId.trim() !== '');

                // Delete all images from Cloudinary
                if (imagesToDelete.length > 0) {
                  try {
                    const deletePromises = imagesToDelete.map(({ publicId }) =>
                      fetch('/api/cloudinary/delete', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ publicId }),
                      })
                    );

                    const results = await Promise.allSettled(deletePromises);
                    
                    // Check if all deletions were successful
                    const allSuccessful = results.every(
                      result => result.status === 'fulfilled' && result.value.ok
                    );

                    if (allSuccessful) {
                      toast.success('All images deleted from Cloudinary');
                    } else {
                      toast.error('Some images could not be deleted');
                    }
                  } catch (error) {
                    console.error('Error deleting images:', error);
                    toast.error('Error deleting images from Cloudinary');
                  }
                }

                // Clear form data regardless of deletion result
                updateFormData({
                  ageScreenshot: '',
                  genderScreenshot: '',
                  topCountriesScreenshot: '',
                  ageScreenshotPublicId: '',
                  genderScreenshotPublicId: '',
                  topCountriesScreenshotPublicId: '',
                });
                setIsResetting(false);
              }}
              disabled={isResetting}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isResetting
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isResetting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Reset</span>
                </>
              )}
            </button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
              <h3 className="text-lg font-semibold text-gray-900">Upload Audience Demographics Screenshot</h3>
            </div>
            
            <div className="space-y-4">
              <ImageUploadField 
                field="ageScreenshot" 
                label="Upload Age screenshot" 
              />
              
              <ImageUploadField 
                field="genderScreenshot" 
                label="Upload gender screenshot" 
              />
              
              <ImageUploadField 
                field="topCountriesScreenshot" 
                label="Upload top countries screenshot" 
              />
            </div>
          </div>
        </div>
      );
    case 7:
      const paymentTermOptions = [
        '50% fixed upfront + 50% milestone based',
        '50% advance + 50% post 7 days of delivery',
        'Milestone-based payment ( higher than 50-50 split )',
        '33% upfront + 33% milestone 1 + 34% milestone 2',
        '100% advance'
      ];

      const handlePaymentTermChange = (term: string) => {
        updateFormData({ paymentTerms: term });
        if (errors.paymentTerms) {
          setErrors(prev => ({ ...prev, paymentTerms: '' }));
        }
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Payment Terms</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">Select Payment Terms</h3>
              </div>
              <div className="space-y-3">
                {paymentTermOptions.map((term) => {
                  const isSelected = formData.paymentTerms === term;
                  return (
                    <label
                      key={term}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                        isSelected
                          ? 'border-[#7B46F8] bg-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
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
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#7B46F8] border-[#7B46F8]'
                          : 'bg-white border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium flex-1 ${
                        isSelected ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {term}
                      </span>
                      {isSelected && (
                        <svg className="w-5 h-5 text-[#7B46F8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
      const turnaroundTimeOptions = [
        'Same day',
        '24 hours',
        '48-72 hours',
        '3-5 days'
      ];

      const handleTurnaroundTimeChange = (time: string) => {
        const currentTimes = formData.turnaroundTimes || [];
        const newTimes = currentTimes.includes(time)
          ? currentTimes.filter(t => t !== time)
          : [...currentTimes, time];
        updateFormData({ turnaroundTimes: newTimes });
        if (errors.turnaroundTimes) {
          setErrors(prev => ({ ...prev, turnaroundTimes: '' }));
        }
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Turnaround & Reliability</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                <h3 className="text-lg font-semibold text-gray-900">Average Turnaround Time After Confirmation</h3>
              </div>
              <div className="space-y-3">
                {turnaroundTimeOptions.map((time) => {
                  const isSelected = formData.turnaroundTimes?.includes(time) || false;
                  return (
                    <label
                      key={time}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                        isSelected
                          ? 'border-[#7B46F8] bg-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleTurnaroundTimeChange(time)}
                        className="sr-only"
                      />
                      <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#7B46F8] border-[#7B46F8]'
                          : 'bg-white border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-medium flex-1 ${
                        isSelected ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {time}
                      </span>
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
      const handleCollaborationImageUpload = async (
        field: 'firstCollaborationImage1' | 'firstCollaborationImage2' | 'firstCollaborationImage3',
        file: File
      ) => {
        // Validate file type - only allow image files
        const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];
        if (!file.type.startsWith('image/') || !allowedImageTypes.includes(file.type.toLowerCase())) {
          toast.error('Please upload an image file only (JPG, PNG, GIF, WebP, BMP, or SVG). Documents and videos are not allowed.');
          return;
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error('File size must be less than 10MB');
          return;
        }

        setUploadingFields(prev => new Set(prev).add(field));

        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch('/api/cloudinary/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 408 || errorData.error === 'TIMEOUT') {
              throw new Error('TIMEOUT');
            }
            throw new Error(errorData.message || 'Upload failed');
          }

          const data = await response.json();
          updateFormData({ 
            [field]: data.url,
            [`${field}PublicId`]: data.publicId
          });
          // Clear error for this field if it exists
          if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
          }
          toast.success('Image uploaded successfully');
        } catch (error: any) {
          console.error('Error uploading image:', error);
          if (error.message === 'TIMEOUT') {
            toast.error('Upload timeout. The image may be too large or your connection is slow. Please try again with a smaller image.');
          } else {
            toast.error(error.message || 'Failed to upload image. Please try again.');
          }
        } finally {
          setUploadingFields(prev => {
            const newSet = new Set(prev);
            newSet.delete(field);
            return newSet;
          });
        }
      };

      const handleCollaborationImageDelete = async (field: 'firstCollaborationImage1' | 'firstCollaborationImage2' | 'firstCollaborationImage3') => {
        const currentData = formData[field];
        if (!currentData) return;

        try {
          const publicIdField = `${field}PublicId` as keyof typeof formData;
          const publicId = formData[publicIdField] as string;

          if (publicId) {
            const response = await fetch('/api/cloudinary/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ publicId }),
            });

            if (response.ok) {
              updateFormData({ 
                [field]: '',
                [publicIdField]: ''
              });
              toast.success('Image deleted successfully');
            } else {
              toast.error('Failed to delete image');
            }
          } else {
            updateFormData({ 
              [field]: '',
              [publicIdField]: ''
            });
          }
        } catch (error) {
          console.error('Error deleting image:', error);
          const publicIdField = `${field}PublicId` as keyof typeof formData;
          updateFormData({ 
            [field]: '',
            [publicIdField]: ''
          });
          toast.error('Error deleting image');
        }
      };

      const getCollaborationImageData = (field: 'firstCollaborationImage1' | 'firstCollaborationImage2' | 'firstCollaborationImage3') => {
        const data = formData[field];
        if (!data) return null;
        
        try {
          const parsed = JSON.parse(data);
          if (parsed.url) {
            return { url: parsed.url, publicId: parsed.publicId || null };
          }
        } catch {
          // Not JSON, treat as URL string
        }
        
        const publicIdField = `${field}PublicId` as keyof typeof formData;
        const publicId = formData[publicIdField] as string;
        return { url: data, publicId: publicId || null };
      };

      const CollaborationImageField = ({ 
        field, 
        label,
        showAsterisk = false
      }: { 
        field: 'firstCollaborationImage1' | 'firstCollaborationImage2' | 'firstCollaborationImage3'; 
        label: string;
        showAsterisk?: boolean;
      }) => {
        const imageData = getCollaborationImageData(field);
        const hasImage = !!imageData?.url;
        const isUploading = uploadingFields.has(field);
        const fileInputRef = useRef<HTMLInputElement>(null);
        const [isFocused, setIsFocused] = useState(false);
        const fieldError = errors[field];

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (!files || files.length === 0) return;
          
          // Only allow single file upload
          if (files.length > 1) {
            toast.error('Please upload only one image at a time');
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
            return;
          }
          
          const file = files[0];
          if (file) {
            handleCollaborationImageUpload(field, file);
          }
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        };

        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
              <label className="block text-sm font-medium text-gray-700">
                {label} {showAsterisk && <span className="text-red-500">*</span>}
              </label>
            </div>
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
            {hasImage ? (
              <div className="relative border-2 border-gray-300 rounded-lg p-4">
                <div className="relative w-full h-64 mb-3 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={imageData.url}
                    alt={label}
                    fill
                    className="object-contain rounded-lg"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => handleCollaborationImageDelete(field)}
                  disabled={isUploading}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Image
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml"
                  onChange={handleFileChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={isUploading}
                  className="hidden"
                  id={`collab-file-input-${field}`}
                />
                <label
                  htmlFor={`collab-file-input-${field}`}
                  className={`w-full px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                    isUploading
                      ? 'opacity-50 cursor-not-allowed bg-gray-50 border border-gray-200'
                      : isFocused
                        ? 'border-2 border-[#7B46F8] bg-white'
                        : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-700">
                    {isUploading ? 'Uploading...' : 'Upload screenshots'}
                  </span>
                  {isUploading ? (
                    <svg className="animate-spin h-5 w-5 text-[#7B46F8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Previous Collaborations</h2>
          </div>
          <div className="space-y-6">
            {/* <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
              <h3 className="text-lg font-semibold text-gray-900">Upload Proof Of Work</h3>
            </div>
             */}
            <div className="w-full overflow-hidden">
              <style jsx global>{`
                .collaboration-slider .swiper {
                  width: 100%;
                  max-width: 100%;
                  box-sizing: border-box;
                }
                .collaboration-slider .swiper-wrapper {
                  max-width: 100%;
                  box-sizing: border-box;
                }
                .collaboration-slider .swiper-slide {
                  max-width: 100%;
                  box-sizing: border-box;
                }
                .collaboration-slider .swiper-pagination {
                  position: relative;
                  margin-top: 24px;
                }
                .collaboration-slider .swiper-pagination-bullet {
                  width: 8px;
                  height: 8px;
                  background: #D1D5DB;
                  opacity: 1;
                }
                .collaboration-slider .swiper-pagination-bullet-active {
                  background: #7B46F8;
                }
              `}</style>
              <Swiper
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className="collaboration-slider"
              >
                <SwiperSlide>
                  <div className="max-w-full box-border space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      <h3 className="text-lg font-semibold text-gray-900">Upload Proof Of Work</h3>
                    </div>
                    <CollaborationImageField 
                      field="firstCollaborationImage1" 
                      label="Upload screenshots" 
                      showAsterisk={true}
                    />
                    <CollaborationImageField 
                      field="firstCollaborationImage2" 
                      label="Upload screenshots" 
                      showAsterisk={true}
                    />
                    <CollaborationImageField 
                      field="firstCollaborationImage3" 
                      label="Upload screenshots" 
                      showAsterisk={true}
                    />
                    <p className="mt-2 text-xs text-gray-500">Post screenshots, analytics screenshots</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="max-w-full box-border">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
                      <h3 className="text-lg font-semibold text-gray-900">Links To Previous Branded / Sponsored Content</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          X <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.xLink}
                          onChange={(e) => {
                            updateFormData({ xLink: e.target.value });
                            if (errors.xLink) {
                              setErrors(prev => ({ ...prev, xLink: '' }));
                            }
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                            errors.xLink ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="X"
                        />
                        {errors.xLink && (
                          <p className="mt-1 text-sm text-red-500">{errors.xLink}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.instagramLink}
                          onChange={(e) => {
                            updateFormData({ instagramLink: e.target.value });
                            if (errors.instagramLink) {
                              setErrors(prev => ({ ...prev, instagramLink: '' }));
                            }
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                            errors.instagramLink ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Instagram"
                        />
                        {errors.instagramLink && (
                          <p className="mt-1 text-sm text-red-500">{errors.instagramLink}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Youtube <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.youtubeLink}
                          onChange={(e) => {
                            updateFormData({ youtubeLink: e.target.value });
                            if (errors.youtubeLink) {
                              setErrors(prev => ({ ...prev, youtubeLink: '' }));
                            }
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                            errors.youtubeLink ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Youtube"
                        />
                        {errors.youtubeLink && (
                          <p className="mt-1 text-sm text-red-500">{errors.youtubeLink}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          TikTok <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.tiktokLink}
                          onChange={(e) => {
                            updateFormData({ tiktokLink: e.target.value });
                            if (errors.tiktokLink) {
                              setErrors(prev => ({ ...prev, tiktokLink: '' }));
                            }
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                            errors.tiktokLink ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="TikTok"
                        />
                        {errors.tiktokLink && (
                          <p className="mt-1 text-sm text-red-500">{errors.tiktokLink}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Newsletter links <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.newsletterLink}
                          onChange={(e) => {
                            updateFormData({ newsletterLink: e.target.value });
                            if (errors.newsletterLink) {
                              setErrors(prev => ({ ...prev, newsletterLink: '' }));
                            }
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${
                            errors.newsletterLink ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Newsletter links"
                        />
                        {errors.newsletterLink && (
                          <p className="mt-1 text-sm text-red-500">{errors.newsletterLink}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      );
    case 10:
      const handleConfirmationChange = (checked: boolean) => {
        updateFormData({ finalConfirmation: checked });
        if (errors.finalConfirmation) {
          setErrors(prev => ({ ...prev, finalConfirmation: '' }));
        }
      };

      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#7B46F8] rotate-45"></div>
            <h2 className="text-2xl font-semibold text-gray-900">Final Confirmation</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                  formData.finalConfirmation
                    ? 'border-[#7B46F8] bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.finalConfirmation}
                  onChange={(e) => handleConfirmationChange(e.target.checked)}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 flex-shrink-0 ${
                  formData.finalConfirmation
                    ? 'bg-[#7B46F8] border-[#7B46F8]'
                    : 'bg-white border-gray-300'
                }`}>
                  {formData.finalConfirmation && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm font-medium flex-1 ${
                  formData.finalConfirmation ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  I confirm that all information, rates, screenshots, and links shared are accurate.
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
              <div key={currentStep} className='sm:p-8 p-4 bg-white rounded-lg'>
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
                          // Reset all UI state first so form shows step 1 and empty before redirect
                          setCurrentStep(1);
                          setCompletedSteps(new Set());
                          setErrors({});
                          resetForm();
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
