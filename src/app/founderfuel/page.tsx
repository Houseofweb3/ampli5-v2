"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

const SECTION_IDS = [1, 2, 3, 4] as const;

function getErrorKeyToSectionId(key: string): number {
  if (key === "fullName" || key === "startupName" || key === "startupWebsite") return 1;
  if (key === "stage" || key === "generatingRevenue" || key === "monthlyRevenue") return 2;
  if (key === "conversationTopics" || key === "otherTopic" || key === "hateAboutGroups") return 3;
  if (
    key === "yearsBuilding" ||
    key === "openToMatching" ||
    key === "city" ||
    key === "heardAbout" ||
    key === "preferredMode" ||
    key === "contactDetail"
  )
    return 4;
  return 1;
}

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

const FounderInquiryForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const scrollToSectionForError = (errorKey: string) => {
    const sectionId = getErrorKeyToSectionId(errorKey);
    const el = sectionRefs.current[sectionId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
    if (formData.conversationTopics.length === 0)
      newErrors.conversationTopics = errorMessages.conversationTopics;
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
      scrollToSectionForError(firstKey);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/founderfuel/form", formData);
      if (response.status === 201) {
        toast.success("Application submitted successfully! We'll be in touch soon.");
        setFormData(initialFormData);
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

  const renderSection = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {diamond}
                  <label className={labelClass}>
                    1. What&apos;s your full name? <span className="text-red-500">*</span>
                  </label>
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
                  <label className={labelClass}>
                    2. Startup name <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  name="startupName"
                  value={formData.startupName}
                  onChange={handleChange}
                  placeholder="Startup name"
                  className={inputClass(!!errors.startupName)}
                />
                {errors.startupName && (
                  <p className="text-red-500 text-sm mt-1">{errors.startupName}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {diamond}
                  <label className={labelClass}>
                    3. Startup website link <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="url"
                  name="startupWebsite"
                  value={formData.startupWebsite}
                  onChange={handleChange}
                  placeholder="https://yourstartup.com"
                  className={inputClass(!!errors.startupWebsite)}
                />
                {errors.startupWebsite && (
                  <p className="text-red-500 text-sm mt-1">{errors.startupWebsite}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2: {
        const stageOptions = [
          "Pre-seed (some revenue / MVP live)",
          "Seed (steady revenue & small team)",
          "Series A (scaling operations)",
        ];
        const revenueOptions = ["Yes, consistently", "Yes, but irregular", "Not yet"];
        const monthlyOptions = ["< $10 K", "$10 K – $50 K", "$50 K – $200 K", "$200 K +"];
        return (
          <div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {diamond}
                  <h3 className="text-lg font-semibold text-gray-900">
                    4. What stage are you currently at? <span className="text-red-500">*</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {stageOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.stage === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input
                        type="radio"
                        name="stage"
                        value={opt}
                        checked={formData.stage === opt}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.stage === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}
                      >
                        {formData.stage === opt && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    5. Are you currently generating revenue? <span className="text-red-500">*</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {revenueOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.generatingRevenue === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input
                        type="radio"
                        name="generatingRevenue"
                        value={opt}
                        checked={formData.generatingRevenue === opt}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.generatingRevenue === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}
                      >
                        {formData.generatingRevenue === opt && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.generatingRevenue && (
                  <p className="text-red-500 text-sm mt-2">{errors.generatingRevenue}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {diamond}
                  <h3 className="text-lg font-semibold text-gray-900">
                    6. What&apos;s your current monthly revenue range?{" "}
                    <span className="text-red-500">*</span>
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {monthlyOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.monthlyRevenue === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input
                        type="radio"
                        name="monthlyRevenue"
                        value={opt}
                        checked={formData.monthlyRevenue === opt}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.monthlyRevenue === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}
                      >
                        {formData.monthlyRevenue === opt && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.monthlyRevenue && (
                  <p className="text-red-500 text-sm mt-2">{errors.monthlyRevenue}</p>
                )}
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
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {diamond}
                  <h3 className="text-lg font-semibold text-gray-900">
                    7. What kind of conversations do you wish you could have with other founders?{" "}
                    <span className="text-red-500">*</span>{" "}
                    <span className="text-gray-500 font-normal">(choose up to 3)</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {conversationTopicsList.map((topic) => (
                    <label
                      key={topic}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${formData.conversationTopics.includes(topic) ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}
                    >
                      <input
                        type="checkbox"
                        value={topic}
                        checked={formData.conversationTopics.includes(topic)}
                        onChange={handleCheckboxChange}
                        className="sr-only"
                      />
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${formData.conversationTopics.includes(topic) ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"}`}
                      >
                        {formData.conversationTopics.includes(topic) && (
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
                      <span className="text-sm font-medium text-gray-700">{topic}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <label
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${formData.conversationTopics.includes("Something else") ? "border-[#7B46F8] bg-white" : "border-gray-200 bg-white hover:border-gray-300"}`}
                  >
                    <input
                      type="checkbox"
                      value="Something else"
                      checked={formData.conversationTopics.includes("Something else")}
                      onChange={handleCheckboxChange}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 ${formData.conversationTopics.includes("Something else") ? "bg-[#7B46F8] border-[#7B46F8]" : "bg-white border-gray-300"}`}
                    >
                      {formData.conversationTopics.includes("Something else") && (
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
                    <span className="text-sm font-medium text-gray-700">Something else</span>
                  </label>
                  {formData.conversationTopics.includes("Something else") && (
                    <>
                      <input
                        type="text"
                        name="otherTopic"
                        value={formData.otherTopic}
                        onChange={handleChange}
                        placeholder="Please specify"
                        className={`mt-2 ${inputClass(!!errors.otherTopic)}`}
                      />
                      {errors.otherTopic && (
                        <p className="text-red-500 text-sm mt-1">{errors.otherTopic}</p>
                      )}
                    </>
                  )}
                </div>
                {errors.conversationTopics && (
                  <p className="text-red-500 text-sm mt-2">{errors.conversationTopics}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {diamond}
                  <label className={labelClass}>
                    8. What do you hate about most founder groups today?{" "}
                    <span className="text-red-500">*</span>
                  </label>
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
                {errors.hateAboutGroups && (
                  <p className="text-red-500 text-sm mt-1">{errors.hateAboutGroups}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {formData.hateAboutGroups.length}/500 characters
                </p>
              </div>
            </div>
          </div>
        );
      }

      case 4: {
        const yearsOptions = ["< 1 year", "1 – 3 years", "3 – 5 years", "5 + years"];
        const matchingOptions = [
          "Yes",
          "Maybe, depends on schedule",
          "No, prefer group convos only",
        ];
        return (
          <div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {diamond}
                  <h3 className="text-lg font-semibold text-gray-900">
                    9. How many years have you been building this startup?{" "}
                    <span className="text-red-500">*</span>
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {yearsOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.yearsBuilding === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input
                        type="radio"
                        name="yearsBuilding"
                        value={opt}
                        checked={formData.yearsBuilding === opt}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.yearsBuilding === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}
                      >
                        {formData.yearsBuilding === opt && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.yearsBuilding && (
                  <p className="text-red-500 text-sm mt-2">{errors.yearsBuilding}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {diamond}
                  <h3 className="text-lg font-semibold text-gray-900">
                    10. Would you be open to being matched 1:1 with another founder for a private
                    conversation every 2 weeks?
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {matchingOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.openToMatching === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input
                        type="radio"
                        name="openToMatching"
                        value={opt}
                        checked={formData.openToMatching === opt}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.openToMatching === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}
                      >
                        {formData.openToMatching === opt && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.openToMatching && (
                  <p className="text-red-500 text-sm mt-2">{errors.openToMatching}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {diamond}
                    <label className="text-lg font-semibold text-gray-900">
                      11. What city are you based in? <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className={inputClass(!!errors.city)}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {diamond}
                    <label className="text-lg font-semibold text-gray-900">
                      12. How did you hear about us? <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="heardAbout"
                    value={formData.heardAbout}
                    onChange={handleChange}
                    placeholder="Tell us how you found us"
                    className={inputClass(!!errors.heardAbout)}
                  />
                  {errors.heardAbout && (
                    <p className="text-red-500 text-sm mt-1">{errors.heardAbout}</p>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {diamond}
                    <h3 className="text-lg font-semibold text-gray-900">
                      13. Preferred mode to communicate? <span className="text-red-500">*</span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["WhatsApp", "Slack"].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center p-4 rounded-lg border-2 bg-white cursor-pointer transition-all ${formData.preferredMode === opt ? "border-[#7B46F8]" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <input
                          type="radio"
                          name="preferredMode"
                          value={opt}
                          checked={formData.preferredMode === opt}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.preferredMode === opt ? "bg-[#7B46F8] border-[#7B46F8]" : "border-gray-300"}`}
                        >
                          {formData.preferredMode === opt && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.preferredMode && (
                    <p className="text-red-500 text-sm mt-2">{errors.preferredMode}</p>
                  )}
                </div>
                {formData.preferredMode && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {diamond}
                      <label className={labelClass}>
                        {formData.preferredMode === "WhatsApp"
                          ? "WhatsApp Phone Number"
                          : "Slack Email"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <input
                      name="contactDetail"
                      type={formData.preferredMode === "WhatsApp" ? "tel" : "email"}
                      value={formData.contactDetail}
                      onChange={handleChange}
                      placeholder={
                        formData.preferredMode === "WhatsApp"
                          ? "e.g. +1 234 567 8900"
                          : "e.g. founder@startup.com"
                      }
                      className={inputClass(!!errors.contactDetail)}
                    />
                    {errors.contactDetail && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactDetail}</p>
                    )}
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
          <Image
            src="/icons/hero-arrow.png"
            width={100}
            height={100}
            alt=""
            className="w-full h-[100px] md:h-[150px] object-cover"
          />
        </div>
        <div className="absolute -top-[40px] md:-top-[65px] left-0 z-10">
          <Image
            src="/pattern/flower.png"
            width={1000}
            height={1000}
            alt=""
            className="w-full h-[100px] md:h-[150px] object-cover"
          />
        </div>
        <div className="flex md:flex-row flex-col md:items-start items-center justify-center gap-2 max-w-5xl mx-auto px-2">
          <h1 className="text-white text-center text-3xl sm:text-4xl md:text-5xl font-semibold ">
            A private space for founders of revenue-generating startups
          </h1>
        </div>
        <div className="absolute -bottom-[50px] lg:left-[345px] sm:left-[80px] left-[40%] z-10">
          <Image
            src="/icons/Star-fill.png"
            width={1000}
            height={1000}
            alt=""
            className="w-full h-[100px] object-cover"
          />
        </div>
      </div>

      {!showForm && (
        <div className="text-center py-24 max-w-5xl mx-auto px-2">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black/80 mb-4">
            (Pre-Seed to Series A) who want to talk openly about struggles, burn, hiring nightmares,
            co-founder conflicts, investor pressure, or just… the silence that comes after
            &quot;how&apos;s it going?&quot;.
          </p>
          <p className="text-base md:text-lg text-black/70 mb-4 md:mb-8">
            No pitches. No flexing. Just real talk.
          </p>
          <p className="text-base md:text-lg text-black/70 mb-4 md:mb-8">
            Let&apos;s see if this space is right for you.
          </p>
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
        <form onSubmit={handleSubmit}>
          <div className="bg-[#F8F8F8] py-12 px-4 sm:px-8 pb-32">
            <div className="max-w-5xl mx-auto bg-white rounded-lg sm:p-8 p-4">
              {SECTION_IDS.map((id, idx) => (
                <div
                  key={id}
                  ref={(el) => {
                    sectionRefs.current[id] = el;
                  }}
                  className={`scroll-mt-6 ${idx > 0 ? "mt-10 pt-10 border-t border-gray-200" : ""}`}
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
                  setFormData(initialFormData);
                  setErrors({});
                }
              }}
              disabled={isSubmitting}
              className="px-6 py-3 bg-white text-[#7B46F8] border-2 border-[#7B46F8] rounded-lg hover:bg-[#7B46F8] hover:text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset all
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-[#7B46F8] text-white rounded-lg hover:bg-[#6B3EE8] transition-colors shadow-md font-medium ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex justify-center items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FounderInquiryForm;
