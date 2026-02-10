"use client";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Step {
  id: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Basic Info", description: "Name, startup & website" },
  { id: 2, title: "Stage & Revenue", description: "" },
  { id: 3, title: "Conversations", description: "" },
  { id: 4, title: "Details & Contact", description: "" },
];

interface FormData {
  fullName: string;
  startupName: string;
  startupWebsite: string;
  stage: string;
  generatingRevenue: string;
  monthlyRevenue: string;
  conversationTopics: string[];
  hateAboutGroups: string;
  yearsBuilding: string;
  openToMatching: string;
  city: string;
  heardAbout: string;
  preferredMode: string;
  contactDetail: string;
  otherTopic: string;
}

const initialFormData: FormData = {
  fullName: "",
  startupName: "",
  startupWebsite: "",
  stage: "",
  generatingRevenue: "",
  monthlyRevenue: "",
  conversationTopics: [],
  hateAboutGroups: "",
  yearsBuilding: "",
  openToMatching: "",
  city: "",
  heardAbout: "",
  preferredMode: "",
  contactDetail: "",
  otherTopic: "",
};

const errorMessages: Record<string, string> = {
  fullName: "Full name is required.",
  startupName: "Startup name is required.",
  startupWebsite: "Startup website is required.",
  stage: "Please select your current stage.",
  generatingRevenue: "Please indicate if you are generating revenue.",
  monthlyRevenue: "Please select your monthly revenue range.",
  conversationTopics: "Please select at least one conversation topic.",
  otherTopic: "Please specify your other topic.",
  hateAboutGroups: "Please tell us what you hate about founder groups (min 10 words).",
  yearsBuilding: "Please select how many years you have been building.",
  openToMatching: "Please indicate if you are open to 1:1 matching.",
  city: "Please enter your city.",
  heardAbout: "Please tell us how you heard about us.",
  preferredMode: "Please select your preferred communication mode.",
  contactDetail: "Please enter your WhatsApp number or Slack email.",
};

// Step 2: slide 0 = stage, 1 = generatingRevenue, 2 = monthlyRevenue
const FOUNDER_STEP2_FIELD_TO_SLIDE: Record<string, number> = { stage: 0, generatingRevenue: 1, monthlyRevenue: 2 };
// Step 3: slide 0 = conversationTopics, otherTopic, 1 = hateAboutGroups
const FOUNDER_STEP3_FIELD_TO_SLIDE: Record<string, number> = { conversationTopics: 0, otherTopic: 0, hateAboutGroups: 1 };
// Step 4: slide 0 = yearsBuilding, 1 = openToMatching, 2 = city/heardAbout, 3 = preferredMode/contactDetail
const FOUNDER_STEP4_FIELD_TO_SLIDE: Record<string, number> = {
  yearsBuilding: 0, openToMatching: 1, city: 2, heardAbout: 2, preferredMode: 3, contactDetail: 3,
};

const FounderInquiryForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pendingSlideToField, setPendingSlideToField] = useState<string | null>(null);
  const step2SwiperRef = useRef<SwiperType | null>(null);
  const step3SwiperRef = useRef<SwiperType | null>(null);
  const step4SwiperRef = useRef<SwiperType | null>(null);
  const stepContentRef = useRef<HTMLDivElement | null>(null);
  const [stepSlideIndex, setStepSlideIndex] = useState<Record<number, number>>({});

  const stepFields: Record<number, string[]> = {
    1: ["fullName", "startupName", "startupWebsite"],
    2: ["stage", "generatingRevenue", "monthlyRevenue"],
    3: ["conversationTopics", "hateAboutGroups"],
    4: ["yearsBuilding", "openToMatching", "city", "heardAbout", "preferredMode", "contactDetail"],
  };

  /* ====================== COMPLETED STEPS ====================== */
  useEffect(() => {
    const completed = new Set<number>();
    if (formData.fullName?.trim() && formData.startupName?.trim() && formData.startupWebsite?.trim()) completed.add(1);
    if (formData.stage && formData.generatingRevenue && formData.monthlyRevenue) completed.add(2);
    if (
      formData.conversationTopics?.length > 0 &&
      formData.hateAboutGroups?.trim() &&
      formData.hateAboutGroups.trim().split(/\s+/).length >= 10 &&
      !(formData.conversationTopics.includes("Something else") && !formData.otherTopic?.trim())
    )
      completed.add(3);
    if (
      formData.yearsBuilding &&
      formData.openToMatching &&
      formData.city?.trim() &&
      formData.heardAbout?.trim() &&
      formData.preferredMode &&
      formData.contactDetail?.trim()
    )
      completed.add(4);
    setCompletedSteps(completed);
  }, [formData]);

  /* ====================== VALIDATE CURRENT STEP ====================== */
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fields = stepFields[currentStep] || [];

    for (const field of fields) {
      const value: unknown = (formData as unknown as Record<string, unknown>)[field];
      if (field === "conversationTopics") {
        if (!Array.isArray(value) || value.length === 0) {
          newErrors.conversationTopics = errorMessages.conversationTopics;
        } else if (value.includes("Something else") && !formData.otherTopic.trim()) {
          newErrors.otherTopic = errorMessages.otherTopic;
        }
        continue;
      }
      if (typeof value === "string" && !value.trim()) {
        const label = field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
        newErrors[field] = errorMessages[field] || `${label} is required.`;
      }
    }
    if (currentStep === 1 && formData.startupWebsite?.trim()) {
      const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;
      if (!websiteRegex.test(formData.startupWebsite.trim())) {
        newErrors.startupWebsite = "Please enter a valid website URL (e.g., https://example.com)";
      }
    }
    if (currentStep === 3 && formData.hateAboutGroups?.trim()) {
      const wordCount = formData.hateAboutGroups.trim().split(/\s+/).length;
      if (wordCount < 10) {
        newErrors.hateAboutGroups = "Please write at least 10 words about what you hate about founder groups.";
      }
    }
    if (currentStep === 4 && formData.preferredMode && formData.contactDetail?.trim()) {
      if (formData.preferredMode === "WhatsApp") {
        const phoneRegex = /^\+?[0-9\s\-\(\)]{10,18}$/;
        if (!phoneRegex.test(formData.contactDetail.trim())) {
          newErrors.contactDetail = "Please enter a valid phone number (e.g., +1 234 567 8900).";
        }
      } else if (formData.preferredMode === "Slack") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.contactDetail.trim())) {
          newErrors.contactDetail = "Please enter a valid email address.";
        }
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstMessage = Object.values(newErrors)[0];
      const firstKey = Object.keys(newErrors)[0];
      toast.error(firstMessage);
      setPendingSlideToField(firstKey);
      return false;
    }
    return true;
  };

  // When validation fails, slide to the field's slide and scroll step into view
  useEffect(() => {
    if (!pendingSlideToField || !currentStep) return;
    if (currentStep === 2 && FOUNDER_STEP2_FIELD_TO_SLIDE[pendingSlideToField] !== undefined) {
      step2SwiperRef.current?.slideTo(FOUNDER_STEP2_FIELD_TO_SLIDE[pendingSlideToField]);
    } else if (currentStep === 3 && FOUNDER_STEP3_FIELD_TO_SLIDE[pendingSlideToField] !== undefined) {
      step3SwiperRef.current?.slideTo(FOUNDER_STEP3_FIELD_TO_SLIDE[pendingSlideToField]);
    } else if (currentStep === 4 && FOUNDER_STEP4_FIELD_TO_SLIDE[pendingSlideToField] !== undefined) {
      step4SwiperRef.current?.slideTo(FOUNDER_STEP4_FIELD_TO_SLIDE[pendingSlideToField]);
    }
    stepContentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setPendingSlideToField(null);
  }, [currentStep, pendingSlideToField]);

  /* ====================== FULL FORM VALIDATION (SUBMIT) ====================== */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;

    if (!formData.fullName.trim()) newErrors.fullName = errorMessages.fullName;
    if (!formData.startupName.trim()) newErrors.startupName = errorMessages.startupName;
    if (!formData.startupWebsite.trim()) {
      newErrors.startupWebsite = "Startup website is required.";
    } else if (!websiteRegex.test(formData.startupWebsite.trim())) {
      newErrors.startupWebsite = "Please enter a valid website URL (e.g., https://example.com)";
    }
    if (!formData.stage) newErrors.stage = errorMessages.stage;
    if (!formData.generatingRevenue) newErrors.generatingRevenue = errorMessages.generatingRevenue;
    if (!formData.monthlyRevenue) newErrors.monthlyRevenue = errorMessages.monthlyRevenue;
    if (formData.conversationTopics.length === 0) newErrors.conversationTopics = errorMessages.conversationTopics;
    if (formData.conversationTopics.includes("Something else") && !formData.otherTopic?.trim()) {
      newErrors.otherTopic = errorMessages.otherTopic;
    }
    if (!formData.hateAboutGroups.trim()) {
      newErrors.hateAboutGroups = "Please tell us what you hate about founder groups.";
    } else {
      const hateWordCount = formData.hateAboutGroups.trim().split(/\s+/).length;
      if (hateWordCount < 10) newErrors.hateAboutGroups = "Please write at least 10 words.";
    }
    if (!formData.yearsBuilding) newErrors.yearsBuilding = errorMessages.yearsBuilding;
    if (!formData.openToMatching) newErrors.openToMatching = errorMessages.openToMatching;
    if (!formData.city.trim()) newErrors.city = errorMessages.city;
    if (!formData.heardAbout.trim()) newErrors.heardAbout = errorMessages.heardAbout;
    if (!formData.preferredMode) newErrors.preferredMode = errorMessages.preferredMode;
    if (!formData.contactDetail.trim()) {
      newErrors.contactDetail =
        formData.preferredMode === "WhatsApp"
          ? "Please enter your WhatsApp phone number."
          : "Please enter your Slack email.";
    } else if (formData.preferredMode === "WhatsApp") {
      const phoneRegex = /^\+?[0-9\s\-\(\)]{10,18}$/;
      if (!phoneRegex.test(formData.contactDetail.trim())) {
        newErrors.contactDetail = "Please enter a valid phone number (e.g., +1 234 567 8900).";
      }
    } else if (formData.preferredMode === "Slack") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactDetail.trim())) {
        newErrors.contactDetail = "Please enter a valid email address.";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstMessage = Object.values(newErrors)[0];
      const firstKey = Object.keys(newErrors)[0];
      toast.error(firstMessage);
      for (const [stepStr, fields] of Object.entries(stepFields)) {
        if (fields.includes(firstKey) || (firstKey === "otherTopic" && fields.includes("conversationTopics"))) {
          setCurrentStep(Number(stepStr));
          break;
        }
      }
      setPendingSlideToField(firstKey);
      return false;
    }
    return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      conversationTopics: checked
        ? [...prev.conversationTopics, value]
        : prev.conversationTopics.filter((t) => t !== value),
    }));
    if (errors.conversationTopics) setErrors((prev) => ({ ...prev, conversationTopics: "" }));
    if (errors.otherTopic) setErrors((prev) => ({ ...prev, otherTopic: "" }));
  };

  const isStepCompleted = (stepId: number) => completedSteps.has(stepId);
  const isStepActive = (stepId: number) => stepId === currentStep;
  const isStepClickable = (stepId: number) =>
    stepId === currentStep ||
    stepId < currentStep ||
    (stepId === currentStep + 1 && isStepCompleted(currentStep));

  const handleStepClick = (stepId: number) => {
    if (isStepClickable(stepId)) setCurrentStep(stepId);
  };

  const handleNext = () => {
    if (validateCurrentStep()) setCurrentStep((s) => Math.min(4, s + 1));
  };

  const handleBack = () => {
    const stepsWithSwiper: Record<number, React.MutableRefObject<SwiperType | null>> = {
      2: step2SwiperRef,
      3: step3SwiperRef,
      4: step4SwiperRef,
    };
    const ref = stepsWithSwiper[currentStep];
    const currentSlide = stepSlideIndex[currentStep] ?? 0;
    if (ref?.current && currentSlide > 0) {
      ref.current.slideTo(currentSlide - 1);
      setStepSlideIndex((prev) => ({ ...prev, [currentStep]: currentSlide - 1 }));
    } else {
      setCurrentStep((s) => Math.max(1, s - 1));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/founderfuel/form", formData);
      if (response.status === 201) {
        toast.success("Application submitted successfully! We'll be in touch soon.");
        setCurrentStep(1);
        setFormData(initialFormData);
        setCompletedSteps(new Set());
        setErrors({});
        console.log("Form submitted with leadID:", response.data.leadID);
        router.push("/founderfuel/success");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Form submission error:", error);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError = false) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent ${hasError ? "border-red-500" : "border-gray-300"}`;
  const labelClass = "block text-sm font-medium text-gray-700";
  const diamond = <div className="w-2 h-2 bg-[#7B46F8] rotate-45 flex-shrink-0" />;

  const renderStepContent = () => {
    switch (currentStep) {
    case 1:
      return (
        <div>
          <div className="flex items-center gap-2 mb-6">
            {diamond}
            <h2 className="text-2xl font-semibold text-gray-900">Basic Info</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {diamond}
                <label className={labelClass}>1. What&apos;s your full name? <span className="text-red-500">*</span></label>
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass(!!errors.fullName)}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                {diamond}
                <label className={labelClass}>2. Startup name <span className="text-red-500">*</span></label>
              </div>
              <input
                type="text"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                placeholder="Startup name"
                className={inputClass(!!errors.startupName)}
              />
              {errors.startupName && <p className="text-red-500 text-sm mt-1">{errors.startupName}</p>}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                {diamond}
                <label className={labelClass}>3. Startup website link <span className="text-red-500">*</span></label>
              </div>
              <input
                type="url"
                name="startupWebsite"
                value={formData.startupWebsite}
                onChange={handleChange}
                placeholder="https://yourstartup.com"
                className={inputClass(!!errors.startupWebsite)}
              />
              {errors.startupWebsite && <p className="text-red-500 text-sm mt-1">{errors.startupWebsite}</p>}
            </div>
          </div>
        </div>
      );

    case 2: {
      const stageOptions = ["Pre-seed (some revenue / MVP live)", "Seed (steady revenue & small team)", "Series A (scaling operations)"];
      const revenueOptions = ["Yes, consistently", "Yes, but irregular", "Not yet"];
      const monthlyOptions = ["< $10 K", "$10 K – $50 K", "$50 K – $200 K", "$200 K +"];
      return (
        <div>
          <style dangerouslySetInnerHTML={{
            __html: `
              .founderfuel-step2-slider .swiper { width: 100%; overflow: hidden; }
              .founderfuel-step2-slider .swiper-slide { height: auto; box-sizing: border-box; }
              .founderfuel-step2-slider .swiper-pagination { position: relative; margin-top: 24px; display: flex; justify-content: center; gap: 8px; }
              .founderfuel-step2-slider .swiper-pagination-bullet { background: #D1D5DB; width: 8px; height: 8px; opacity: 1; margin: 0 4px; }
              .founderfuel-step2-slider .swiper-pagination-bullet-active { background: #7B46F8; }
            `,
          }} />
          <div className="flex items-center gap-2 mb-6">
            {diamond}
            <h2 className="text-2xl font-semibold text-gray-900">Stage & Revenue</h2>
          </div>
          {/* Desktop: slider */}
          <div className="hidden md:block">
            <Swiper
              onSwiper={(swiper) => { step2SwiperRef.current = swiper; }}
              onSlideChangeTransitionEnd={(swiper) => setStepSlideIndex((prev) => ({ ...prev, 2: swiper.activeIndex }))}
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="founderfuel-step2-slider"
            >
              {/* Slide 1: Question 4 - Stage */}
              <SwiperSlide>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {diamond}
                    <h3 className="text-lg font-semibold text-gray-900">4. What stage are you currently at? <span className="text-red-500">*</span></h3>
                  </div>
                  <div className="space-y-3">
                    {stageOptions.map((opt) => (
                      <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.stage === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                        <input type="radio" name="stage" value={opt} checked={formData.stage === opt} onChange={handleChange} className="sr-only" />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.stage === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                          {formData.stage === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.stage && <p className="text-red-500 text-sm mt-2">{errors.stage}</p>}
                </div>
              </SwiperSlide>
              {/* Slide 2: Question 5 - Generating revenue */}
              <SwiperSlide>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {diamond}
                    <h3 className="text-lg font-semibold text-gray-900">5. Are you currently generating revenue? <span className="text-red-500">*</span></h3>
                  </div>
                  <div className="space-y-3">
                    {revenueOptions.map((opt) => (
                      <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.generatingRevenue === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                        <input type="radio" name="generatingRevenue" value={opt} checked={formData.generatingRevenue === opt} onChange={handleChange} className="sr-only" />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.generatingRevenue === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                          {formData.generatingRevenue === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.generatingRevenue && <p className="text-red-500 text-sm mt-2">{errors.generatingRevenue}</p>}
                </div>
              </SwiperSlide>
              {/* Slide 3: Question 6 - Monthly revenue range */}
              <SwiperSlide>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {diamond}
                    <h3 className="text-lg font-semibold text-gray-900">6. What&apos;s your current monthly revenue range? <span className="text-red-500">*</span></h3>
                  </div>
                  <div className="space-y-3">
                    {monthlyOptions.map((opt) => (
                      <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.monthlyRevenue === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                        <input type="radio" name="monthlyRevenue" value={opt} checked={formData.monthlyRevenue === opt} onChange={handleChange} className="sr-only" />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.monthlyRevenue === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                          {formData.monthlyRevenue === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.monthlyRevenue && <p className="text-red-500 text-sm mt-2">{errors.monthlyRevenue}</p>}
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Mobile: single step - all sections stacked */}
          <div className="md:hidden space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {diamond}
                <h3 className="text-lg font-semibold text-gray-900">4. What stage are you currently at? <span className="text-red-500">*</span></h3>
              </div>
              <div className="space-y-3">
                {stageOptions.map((opt) => (
                  <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.stage === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="stage" value={opt} checked={formData.stage === opt} onChange={handleChange} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.stage === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                      {formData.stage === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.stage && <p className="text-red-500 text-sm mt-2">{errors.stage}</p>}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                {diamond}
                <h3 className="text-lg font-semibold text-gray-900">5. Are you currently generating revenue? <span className="text-red-500">*</span></h3>
              </div>
              <div className="space-y-3">
                {revenueOptions.map((opt) => (
                  <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.generatingRevenue === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="generatingRevenue" value={opt} checked={formData.generatingRevenue === opt} onChange={handleChange} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.generatingRevenue === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                      {formData.generatingRevenue === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.generatingRevenue && <p className="text-red-500 text-sm mt-2">{errors.generatingRevenue}</p>}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                {diamond}
                <h3 className="text-lg font-semibold text-gray-900">6. What&apos;s your current monthly revenue range? <span className="text-red-500">*</span></h3>
              </div>
              <div className="space-y-3">
                {monthlyOptions.map((opt) => (
                  <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.monthlyRevenue === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="monthlyRevenue" value={opt} checked={formData.monthlyRevenue === opt} onChange={handleChange} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.monthlyRevenue === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                      {formData.monthlyRevenue === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.monthlyRevenue && <p className="text-red-500 text-sm mt-2">{errors.monthlyRevenue}</p>}
            </div>
          </div>
        </div>
      );
    }

    case 3: {
      const conversationTopicsList = [
        "Mental health & burnout",
        "Fundraising pressure",
        "Hiring / firing / leadership",
        "Loneliness & founder guilt",
        "Product-market fit struggles",
        "Relationships / life balance",
      ];
      return (
        <div>
          <style dangerouslySetInnerHTML={{
            __html: `
              .founderfuel-step3-slider .swiper { width: 100%; overflow: hidden; }
              .founderfuel-step3-slider .swiper-slide { height: auto; box-sizing: border-box; }
              .founderfuel-step3-slider .swiper-pagination { position: relative; margin-top: 24px; display: flex; justify-content: center; gap: 8px; }
              .founderfuel-step3-slider .swiper-pagination-bullet { background: #D1D5DB; width: 8px; height: 8px; opacity: 1; margin: 0 4px; }
              .founderfuel-step3-slider .swiper-pagination-bullet-active { background: #7B46F8; }
            `,
          }} />
          <div className="flex items-center gap-2 mb-6">
            {diamond}
            <h2 className="text-2xl font-semibold text-gray-900">Conversations</h2>
          </div>
          {/* Desktop: slider */}
          <div className="hidden md:block">
            <Swiper
              onSwiper={(swiper) => { step3SwiperRef.current = swiper; }}
              onSlideChangeTransitionEnd={(swiper) => setStepSlideIndex((prev) => ({ ...prev, 3: swiper.activeIndex }))}
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="founderfuel-step3-slider"
            >
              <SwiperSlide>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {diamond}
                    <h3 className="text-lg font-semibold text-gray-900">7. What kind of conversations do you wish you could have with other founders? <span className="text-red-500">*</span> <span className="text-gray-500 font-normal">(choose up to 3)</span></h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {conversationTopicsList.map((topic) => (
                      <label
                        key={topic}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${formData.conversationTopics.includes(topic) ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}
                      >
                        <input type="checkbox" value={topic} checked={formData.conversationTopics.includes(topic)} onChange={handleCheckboxChange} className="sr-only" />
                        <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${formData.conversationTopics.includes(topic) ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"}`}>
                          {formData.conversationTopics.includes(topic) && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{topic}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${formData.conversationTopics.includes("Something else") ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                      <input type="checkbox" value="Something else" checked={formData.conversationTopics.includes("Something else")} onChange={handleCheckboxChange} className="sr-only" />
                      <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${formData.conversationTopics.includes("Something else") ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"}`}>
                        {formData.conversationTopics.includes("Something else") && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">Something else</span>
                    </label>
                    {formData.conversationTopics.includes("Something else") && (
                      <>
                        <input type="text" name="otherTopic" value={formData.otherTopic} onChange={handleChange} placeholder="Please specify" className={`mt-2 ${inputClass(!!errors.otherTopic)}`} />
                        {errors.otherTopic && <p className="text-red-500 text-sm mt-1">{errors.otherTopic}</p>}
                      </>
                    )}
                  </div>
                  {errors.conversationTopics && <p className="text-red-500 text-sm mt-2">{errors.conversationTopics}</p>}
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {diamond}
                    <label className={labelClass}>8. What do you hate about most founder groups today? <span className="text-red-500">*</span></label>
                  </div>
                  <textarea
                    name="hateAboutGroups"
                    value={formData.hateAboutGroups}
                    onChange={handleChange}
                    placeholder="Be honest — this helps us keep the vibe right. (min 10 words)"
                    rows={4}
                    maxLength={500}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent bg-[#FAFAFA] ${errors.hateAboutGroups ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.hateAboutGroups && <p className="text-red-500 text-sm mt-1">{errors.hateAboutGroups}</p>}
                  <p className="text-xs text-gray-400 mt-1">{formData.hateAboutGroups.length}/500 characters</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Mobile: single step - both sections stacked */}
          <div className="md:hidden space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {diamond}
                <h3 className="text-lg font-semibold text-gray-900">7. What kind of conversations do you wish you could have with other founders? <span className="text-red-500">*</span> <span className="text-gray-500 font-normal">(choose up to 3)</span></h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {conversationTopicsList.map((topic) => (
                  <label key={topic} className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${formData.conversationTopics.includes(topic) ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                    <input type="checkbox" value={topic} checked={formData.conversationTopics.includes(topic)} onChange={handleCheckboxChange} className="sr-only" />
                    <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${formData.conversationTopics.includes(topic) ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"}`}>
                      {formData.conversationTopics.includes(topic) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{topic}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3">
                <label className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${formData.conversationTopics.includes("Something else") ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                  <input type="checkbox" value="Something else" checked={formData.conversationTopics.includes("Something else")} onChange={handleCheckboxChange} className="sr-only" />
                  <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${formData.conversationTopics.includes("Something else") ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"}`}>
                    {formData.conversationTopics.includes("Something else") && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-sm font-medium text-gray-700">Something else</span>
                </label>
                {formData.conversationTopics.includes("Something else") && (
                  <>
                    <input type="text" name="otherTopic" value={formData.otherTopic} onChange={handleChange} placeholder="Please specify" className={`mt-2 ${inputClass(!!errors.otherTopic)}`} />
                    {errors.otherTopic && <p className="text-red-500 text-sm mt-1">{errors.otherTopic}</p>}
                  </>
                )}
              </div>
              {errors.conversationTopics && <p className="text-red-500 text-sm mt-2">{errors.conversationTopics}</p>}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                {diamond}
                <label className={labelClass}>8. What do you hate about most founder groups today? <span className="text-red-500">*</span></label>
              </div>
              <textarea name="hateAboutGroups" value={formData.hateAboutGroups} onChange={handleChange} placeholder="Be honest — this helps us keep the vibe right. (min 10 words)" rows={4} maxLength={500} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent bg-[#FAFAFA] ${errors.hateAboutGroups ? "border-red-500" : "border-gray-300"}`} />
              {errors.hateAboutGroups && <p className="text-red-500 text-sm mt-1">{errors.hateAboutGroups}</p>}
              <p className="text-xs text-gray-400 mt-1">{formData.hateAboutGroups.length}/500 characters</p>
            </div>
          </div>
        </div>
      );
    }

    case 4: {
      const yearsOptions = ["< 1 year", "1 – 3 years", "3 – 5 years", "5 + years"];
      const matchingOptions = ["Yes", "Maybe, depends on schedule", "No, prefer group convos only"];
      return (
        <div>
          <style dangerouslySetInnerHTML={{
            __html: `
              .founderfuel-step4-slider .swiper { width: 100%; overflow: hidden; }
              .founderfuel-step4-slider .swiper-slide { height: auto; box-sizing: border-box; }
              .founderfuel-step4-slider .swiper-pagination { position: relative; margin-top: 24px; display: flex; justify-content: center; gap: 8px; }
              .founderfuel-step4-slider .swiper-pagination-bullet { background: #D1D5DB; width: 8px; height: 8px; opacity: 1; margin: 0 4px; }
              .founderfuel-step4-slider .swiper-pagination-bullet-active { background: #7B46F8; }
            `,
          }} />
          <div className="flex items-center gap-2 mb-6">
            {diamond}
            <h2 className="text-2xl font-semibold text-gray-900">Details & Contact</h2>
          </div>
          {/* Desktop: slider */}
          <div className="hidden md:block">
            <Swiper
              onSwiper={(swiper) => { step4SwiperRef.current = swiper; }}
              onSlideChangeTransitionEnd={(swiper) => setStepSlideIndex((prev) => ({ ...prev, 4: swiper.activeIndex }))}
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="founderfuel-step4-slider"
            >
              <SwiperSlide>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {diamond}
                    <h3 className="text-lg font-semibold text-gray-900">9. How many years have you been building this startup? <span className="text-red-500">*</span></h3>
                  </div>
                  <div className="space-y-3">
                    {yearsOptions.map((opt) => (
                      <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.yearsBuilding === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                        <input type="radio" name="yearsBuilding" value={opt} checked={formData.yearsBuilding === opt} onChange={handleChange} className="sr-only" />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.yearsBuilding === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                          {formData.yearsBuilding === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.yearsBuilding && <p className="text-red-500 text-sm mt-2">{errors.yearsBuilding}</p>}
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {diamond}
                    <h3 className="text-lg font-semibold text-gray-900">10. Would you be open to being matched 1:1 with another founder for a private conversation every 2 weeks?</h3>
                  </div>
                  <div className="space-y-3">
                    {matchingOptions.map((opt) => (
                      <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.openToMatching === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                        <input type="radio" name="openToMatching" value={opt} checked={formData.openToMatching === opt} onChange={handleChange} className="sr-only" />
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.openToMatching === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                          {formData.openToMatching === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.openToMatching && <p className="text-red-500 text-sm mt-2">{errors.openToMatching}</p>}
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {diamond}
                      <label className="text-lg font-semibold text-gray-900">11. What city are you based in? <span className="text-red-500">*</span></label>
                    </div>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" className={inputClass(!!errors.city)} />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {diamond}
                      <label className="text-lg font-semibold text-gray-900">12. How did you hear about us? <span className="text-red-500">*</span></label>
                    </div>
                    <input type="text" name="heardAbout" value={formData.heardAbout} onChange={handleChange} placeholder="Tell us how you found us" className={inputClass(!!errors.heardAbout)} />
                    {errors.heardAbout && <p className="text-red-500 text-sm mt-1">{errors.heardAbout}</p>}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      {diamond}
                      <h3 className="text-lg font-semibold text-gray-900">13. Preferred mode to communicate? <span className="text-red-500">*</span></h3>
                    </div>
                    <div className="space-y-3">
                      {["WhatsApp", "Slack"].map((opt) => (
                        <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.preferredMode === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                          <input type="radio" name="preferredMode" value={opt} checked={formData.preferredMode === opt} onChange={handleChange} className="sr-only" />
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.preferredMode === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                            {formData.preferredMode === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                    {errors.preferredMode && <p className="text-red-500 text-sm mt-2">{errors.preferredMode}</p>}
                  </div>
                  {formData.preferredMode && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {diamond}
                        <label className={labelClass}>
                          {formData.preferredMode === "WhatsApp" ? "WhatsApp Phone Number" : "Slack Email"} <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <input
                        name="contactDetail"
                        type={formData.preferredMode === "WhatsApp" ? "tel" : "email"}
                        value={formData.contactDetail}
                        onChange={handleChange}
                        placeholder={formData.preferredMode === "WhatsApp" ? "e.g. +1 234 567 8900" : "e.g. founder@startup.com"}
                        className={inputClass(!!errors.contactDetail)}
                      />
                      {errors.contactDetail && <p className="text-red-500 text-sm mt-1">{errors.contactDetail}</p>}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Mobile: single step - all sections stacked */}
          <div className="md:hidden space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {diamond}
                <h3 className="text-lg font-semibold text-gray-900">9. How many years have you been building this startup? <span className="text-red-500">*</span></h3>
              </div>
              <div className="space-y-3">
                {yearsOptions.map((opt) => (
                  <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.yearsBuilding === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="yearsBuilding" value={opt} checked={formData.yearsBuilding === opt} onChange={handleChange} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.yearsBuilding === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                      {formData.yearsBuilding === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.yearsBuilding && <p className="text-red-500 text-sm mt-2">{errors.yearsBuilding}</p>}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                {diamond}
                <h3 className="text-lg font-semibold text-gray-900">10. Would you be open to being matched 1:1 with another founder for a private conversation every 2 weeks?</h3>
              </div>
              <div className="space-y-3">
                {matchingOptions.map((opt) => (
                  <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.openToMatching === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="openToMatching" value={opt} checked={formData.openToMatching === opt} onChange={handleChange} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.openToMatching === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                      {formData.openToMatching === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.openToMatching && <p className="text-red-500 text-sm mt-2">{errors.openToMatching}</p>}
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {diamond}
                  <label className="text-lg font-semibold text-gray-900">11. What city are you based in? <span className="text-red-500">*</span></label>
                </div>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" className={inputClass(!!errors.city)} />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {diamond}
                  <label className="text-lg font-semibold text-gray-900">12. How did you hear about us? <span className="text-red-500">*</span></label>
                </div>
                <input type="text" name="heardAbout" value={formData.heardAbout} onChange={handleChange} placeholder="Tell us how you found us" className={inputClass(!!errors.heardAbout)} />
                {errors.heardAbout && <p className="text-red-500 text-sm mt-1">{errors.heardAbout}</p>}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {diamond}
                  <h3 className="text-lg font-semibold text-gray-900">13. Preferred mode to communicate? <span className="text-red-500">*</span></h3>
                </div>
                <div className="space-y-3">
                  {["WhatsApp", "Slack"].map((opt) => (
                    <label key={opt} className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.preferredMode === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}>
                      <input type="radio" name="preferredMode" value={opt} checked={formData.preferredMode === opt} onChange={handleChange} className="sr-only" />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.preferredMode === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}>
                        {formData.preferredMode === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.preferredMode && <p className="text-red-500 text-sm mt-2">{errors.preferredMode}</p>}
              </div>
              {formData.preferredMode && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {diamond}
                    <label className={labelClass}>
                      {formData.preferredMode === "WhatsApp" ? "WhatsApp Phone Number" : "Slack Email"} <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input name="contactDetail" type={formData.preferredMode === "WhatsApp" ? "tel" : "email"} value={formData.contactDetail} onChange={handleChange} placeholder={formData.preferredMode === "WhatsApp" ? "e.g. +1 234 567 8900" : "e.g. founder@startup.com"} className={inputClass(!!errors.contactDetail)} />
                  {errors.contactDetail && <p className="text-red-500 text-sm mt-1">{errors.contactDetail}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
    }
  };

  return (
    <div className="relative bg-white ">
      <div className="bg-[#7B46F8] relative py-24">
        <div className="absolute top-0 right-0 z-10">
          <Image src="/icons/hero-arrow.png" width={100} height={100} alt="" className="w-full h-[100px] md:h-[150px] object-cover" />
        </div>
        <div className="absolute -top-[40px] md:-top-[65px] left-0 z-10">
          <Image src="/pattern/flower.png" width={1000} height={1000} alt="" className="w-full h-[100px] md:h-[150px] object-cover" />
        </div>
        <div className="flex md:flex-row flex-col md:items-start items-center justify-center gap-2 max-w-5xl mx-auto px-2">
          {/* <Image src="/logo/white.jpg" width={1000} height={1000} alt="ampli" className="h-[48px] md:h-[55px] w-auto pt-1" /> */}
          <h1 className="text-white text-center text-3xl sm:text-4xl md:text-5xl font-semibold ">
            A private space for founders of revenue-generating startups
          </h1>
        </div>
        <div className="absolute -bottom-[50px] lg:left-[345px] sm:left-[80px] left-[40%] z-10">
          <Image src="/icons/Star-fill.png" width={1000} height={1000} alt="" className="w-full h-[100px] object-cover" />
        </div>
      </div>

      {!showForm && (
        <div className="text-center py-24 max-w-5xl mx-auto px-2">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black/80 mb-4">
            (Pre-Seed to Series A) who want to talk openly about struggles, burn, hiring nightmares, co-founder conflicts, investor pressure, or just… the silence that comes after &quot;how&apos;s it going?&quot;.
          </p>
          <p className="text-base md:text-lg text-black/70 mb-4 md:mb-8">No pitches. No flexing. Just real talk.</p>
          <p className="text-base md:text-lg text-black/70 mb-4 md:mb-8">Let&apos;s see if this space is right for you.</p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center bg-[#7B46F8] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#6B3EE8] transition-colors"
          >
            I&apos;m in
          </button>
        </div>
      )}
      {showForm && (
        <div className="flex h-full">
          <div className="bg-white min-w-[400px] p-8 hidden lg:block border-r border-gray-200">
            <div className="space-y-10">
              {STEPS.map((step, index) => {
                const isCompleted = isStepCompleted(step.id);
                const isActive = isStepActive(step.id);
                const isClickable = isStepClickable(step.id);
                return (
                  <div key={step.id} className="relative">
                    {index < STEPS.length - 1 && (
                      <div
                        className="absolute left-[15px] top-[32px] h-16 w-0.5"
                        style={{
                          background: isCompleted || isActive ? "#7B46F8" : "none",
                          borderLeft: isCompleted || isActive ? "none" : "1px dashed #D1D5DB",
                        }}
                      />
                    )}
                    <div
                      onClick={() => isClickable && handleStepClick(step.id)}
                      className={`flex items-start gap-6 transition-colors ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-[#7B46F8] border-2 border-[#7B46F8]" : isCompleted ? "bg-[#7B46F8] border-2 border-[#7B46F8]" : "bg-[#F8F8F8] border-2 border-gray-300 border-dashed"
                        }`}
                      >
                        {isActive && <div className="w-3 h-3 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3
                          className={`text-lg font-medium ${isActive ? "text-[#7B46F8] font-semibold" : isCompleted ? "text-gray-900 font-medium" : "text-gray-600 font-normal"
                          }`}
                        >
                          {step.title}
                        </h3>
                        {step.description && (
                          <p className={`text-xs mt-1 ${isActive || isCompleted ? "text-gray-500" : "text-gray-400"}`}>{step.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="bg-[#F8F8F8] h-full py-12 px-4 sm:px-8 pb-24 w-screen lg:w-[calc(100vw_-_415px)]">
            <div className="rounded-lg flex flex-col justify-between h-full w-full">
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <div key={currentStep} className="sm:p-8 p-4 bg-white rounded-lg" ref={stepContentRef}>
                  {renderStepContent()}
                </div>

                {/* Navigation Buttons - Fixed at bottom (all viewports, same as mobile) */}
                <div className="fixed bottom-0 left-0 right-0 w-full bg-white p-4 md:p-6 border-t border-gray-200 flex justify-end gap-4 rounded-t-lg shadow-lg z-10">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-white text-[#7B46F8] border-2 border-[#7B46F8] rounded-lg hover:bg-[#7B46F8] hover:text-white transition-colors font-medium disabled:opacity-50"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-[#7B46F8] text-white rounded-lg hover:bg-[#6B3EE8] transition-colors shadow-md font-medium disabled:opacity-50"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 bg-[#7B46F8] text-white rounded-lg hover:bg-[#6B3EE8] transition-colors shadow-md font-medium ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isSubmitting ? (
                        <span className="flex justify-center items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>)}
    </div>
  );
};

export default FounderInquiryForm;
