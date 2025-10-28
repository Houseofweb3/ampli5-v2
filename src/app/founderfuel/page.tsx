"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Container from "../../components/ui/container";
import Input from "../../components/ui/input";
import { toast } from "react-toastify";
import axios from "axios";

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
  contactDetail: string; // phone or email
  otherTopic: string;
}

const FounderInquiryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
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
  });

  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const stepFields: Record<number, string[]> = {
    1: ["fullName", "startupName", "startupWebsite"],
    2: ["stage", "generatingRevenue", "monthlyRevenue"],
    3: ["conversationTopics", "hateAboutGroups"],
    4: [
      "yearsBuilding",
      "openToMatching",
      "city",
      "heardAbout",
      "preferredMode",
      "contactDetail",
    ],
  };

  /* ====================== VALIDATE CURRENT STEP ====================== */
  const validateCurrentStep = (): boolean => {
    const fields = stepFields[currentStep] || [];

    for (const field of fields) {
      const value: any = (formData as any)[field];

      // Conversation topics
      if (field === "conversationTopics") {
        if (!Array.isArray(value) || value.length === 0) {
          toast.error("Please select at least one conversation topic.");
          return false;
        }
        if (value.includes("Something else") && !formData.otherTopic.trim()) {
          toast.error("Please specify your other topic.");
          return false;
        }
        continue;
      }

      // Required string fields
      if (typeof value === "string" && !value.trim()) {
        const messages: Record<string, string> = {
          fullName: "Full name is required.",
          startupName: "Startup name is required.",
          startupWebsite: "Startup website is required.",
          stage: "Please select your current stage.",
          generatingRevenue: "Please indicate if you are generating revenue.",
          monthlyRevenue: "Please select your monthly revenue range.",
          hateAboutGroups: "Please tell us what you hate about founder groups.",
          yearsBuilding: "Please select how many years you have been building.",
          openToMatching: "Please indicate if you are open to 1:1 matching.",
          city: "Please enter your city.",
          heardAbout: "Please tell us how you heard about us.",
          preferredMode: "Please select your preferred communication mode.",
          contactDetail:
            formData.preferredMode === "WhatsApp"
              ? "Please enter your WhatsApp phone number."
              : "Please enter your Slack email.",
        };
        toast.error(messages[field] || "Please complete the required fields.");
        return false;
      }
    }

    // Step 1: Website URL
    if (currentStep === 1 && formData.startupWebsite) {
      const websiteRegex =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;
      if (!websiteRegex.test(formData.startupWebsite.trim())) {
        toast.error(
          "Please enter a valid website URL (e.g., https://example.com)"
        );
        return false;
      }
    }

    // Step 3: Hate about groups - min 10 words
    if (currentStep === 3 && formData.hateAboutGroups) {
      const wordCount = formData.hateAboutGroups.trim().split(/\s+/).length;
      if (wordCount < 10) {
        toast.error(
          "Please write at least 10 words about what you hate about founder groups."
        );
        return false;
      }
    }

    // Step 4: Contact detail validation
    if (currentStep === 4 && formData.preferredMode && formData.contactDetail) {
      if (formData.preferredMode === "WhatsApp") {
        const phoneRegex = /^\+?[0-9\s\-\(\)]{10,18}$/;
        if (!phoneRegex.test(formData.contactDetail.trim())) {
          toast.error(
            "Please enter a valid phone number (e.g., +1 234 567 8900)."
          );
          return false;
        }
      } else if (formData.preferredMode === "Slack") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.contactDetail.trim())) {
          toast.error("Please enter a valid email address.");
          return false;
        }
      }
    }

    return true;
  };

  /* ====================== FULL FORM VALIDATION (SUBMIT) ====================== */
  const validateForm = (): boolean => {
    const websiteRegex =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;

    if (!formData.fullName.trim()) {
      toast.error("Full name is required.");
      return false;
    }
    if (!formData.startupName.trim()) {
      toast.error("Startup name is required.");
      return false;
    }
    if (!formData.startupWebsite.trim()) {
      toast.error("Startup website is required.");
      return false;
    }
    if (!websiteRegex.test(formData.startupWebsite.trim())) {
      toast.error(
        "Please enter a valid website URL (e.g., https://example.com)"
      );
      return false;
    }
    if (!formData.stage) {
      toast.error("Please select your current stage.");
      return false;
    }
    if (!formData.generatingRevenue) {
      toast.error("Please indicate if you are generating revenue.");
      return false;
    }
    if (!formData.monthlyRevenue) {
      toast.error("Please select your monthly revenue range.");
      return false;
    }
    if (formData.conversationTopics.length === 0) {
      toast.error("Please select at least one conversation topic.");
      return false;
    }
    if (!formData.hateAboutGroups.trim()) {
      toast.error("Please tell us what you hate about founder groups.");
      return false;
    }
    const hateWordCount = formData.hateAboutGroups.trim().split(/\s+/).length;
    if (hateWordCount < 10) {
      toast.error(
        "Please write at least 10 words about what you hate about founder groups."
      );
      return false;
    }
    if (!formData.yearsBuilding) {
      toast.error("Please select how many years you have been building.");
      return false;
    }
    if (!formData.openToMatching) {
      toast.error("Please indicate if you are open to 1:1 matching.");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("Please enter your city.");
      return false;
    }
    if (!formData.heardAbout.trim()) {
      toast.error("Please tell us how you heard about us.");
      return false;
    }
    if (!formData.preferredMode) {
      toast.error("Please select your preferred communication mode.");
      return false;
    }
    if (!formData.contactDetail.trim()) {
      toast.error(
        formData.preferredMode === "WhatsApp"
          ? "Please enter your WhatsApp phone number."
          : "Please enter your Slack email."
      );
      return false;
    }

    // Final contact validation
    if (formData.preferredMode === "WhatsApp") {
      const phoneRegex = /^\+?[0-9\s\-\(\)]{10,18}$/;
      if (!phoneRegex.test(formData.contactDetail.trim())) {
        toast.error(
          "Please enter a valid phone number (e.g., +1 234 567 8900)."
        );
        return false;
      }
    } else if (formData.preferredMode === "Slack") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactDetail.trim())) {
        toast.error("Please enter a valid email address.");
        return false;
      }
    }

    return true;
  };

  /* ====================== HANDLERS ====================== */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      conversationTopics: checked
        ? [...prev.conversationTopics, value]
        : prev.conversationTopics.filter((t) => t !== value),
    }));
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((s) => Math.min(4, s + 1));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/founderfuel/form", formData);

      if (response.status === 201) {
        toast.success(
          "Application submitted successfully! We'll be in touch soon."
        );
        setCurrentStep(1);
        console.log("Form submitted with leadID:", response.data.leadID);
      }

      // Reset form
      setFormData({
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
      });
    } catch (error: any) {
      console.error("Form submission error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ====================== RENDER ====================== */
  return (
    <div className="bg-cream-bg relative py-4 sm:py-8 md:py-12 bg_square w-full overflow-x-hidden">
      <Container>
        <div className="flex items-center justify-center">
          <div className="max-w-4xl w-full mx-auto">
            {/* Header Section */}
            <div className="text-center">
              {!showForm && (
                <>
                  <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black">
                    A private space for founders of revenue-generating startups
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black/80 mb-4">
                    (Pre-Seed to Series A) who want to talk openly — about
                    struggles, burn, hiring nightmares, co-founder conflicts,
                    investor pressure, or just… the silence that comes after
                    "how's it going?".
                  </p>
                  <p className="text-base md:text-lg text-black/70 mb-4 md:mb-8">
                    No pitches. No flexing. Just real talk.
                  </p>
                  <p className="text-base md:text-lg text-black/70 mb-4 md:mb-8">
                    Let's see if this space is right for you.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center justify-center bg-dark-purple1-bg text-white px-6 py-3 rounded-12 font-bold"
                  >
                    I'm in
                  </button>
                </>
              )}
            </div>

            {/* Form */}
            {showForm && (
              <div className="bg-white rounded-2xl p-4 md:p-8 lg:p-12 shadow-lg">
                <h1 className="text-xl md:text-4xl text-center font-bold mb-4 md:mb-6 text-black">
                  A private space for founders of revenue-generating startups
                </h1>

                {/* Step indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Step {currentStep} of 4</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-dark-purple1-bg transition-all duration-300"
                      style={{ width: `${(currentStep / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* ====================== STEP 1 ====================== */}
                  {currentStep === 1 && (
                    <div className="pb-0 sm:pb-8 space-y-6">
                      <Input
                        label="1. What's your full name?"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                      <Input
                        label="2. Startup name"
                        name="startupName"
                        type="text"
                        value={formData.startupName}
                        onChange={handleChange}
                        placeholder="Startup name"
                        required
                      />
                      <Input
                        label="3. Startup website link"
                        name="startupWebsite"
                        type="url"
                        value={formData.startupWebsite}
                        onChange={handleChange}
                        placeholder="https://yourstartup.com"
                      />
                    </div>
                  )}

                  {/* ====================== STEP 2 ====================== */}
                  {currentStep === 2 && (
                    <div className="pb-0 sm:pb-8 space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#686868]">
                          3. What stage are you currently at?
                        </label>
                        <div className="space-y-2">
                          {[
                            "Pre-seed (some revenue / MVP live)",
                            "Seed (steady revenue & small team)",
                            "Series A (scaling operations)",
                          ].map((opt) => (
                            <label
                              key={opt}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="stage"
                                value={opt}
                                checked={formData.stage === opt}
                                onChange={handleChange}
                                className="w-5 h-5 lg:w-4 lg:h-4 text-primary focus:ring-primary border-gray-300"
                              />
                              <span className="text-sm text-gray-700">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#686868]">
                          4. Are you currently generating revenue?
                        </label>
                        <div className="space-y-2">
                          {[
                            "Yes, consistently",
                            "Yes, but irregular",
                            "Not yet",
                          ].map((opt) => (
                            <label
                              key={opt}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="generatingRevenue"
                                value={opt}
                                checked={formData.generatingRevenue === opt}
                                onChange={handleChange}
                                className="w-5 h-5 lg:w-4 lg:h-4 text-primary focus:ring-primary border-gray-300"
                              />
                              <span className="text-sm text-gray-700">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#686868]">
                          5. What's your current monthly revenue range?
                        </label>
                        <div className="space-y-2">
                          {[
                            "< $10 K",
                            "$10 K – $50 K",
                            "$50 K – $200 K",
                            "$200 K +",
                          ].map((opt) => (
                            <label
                              key={opt}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="monthlyRevenue"
                                value={opt}
                                checked={formData.monthlyRevenue === opt}
                                onChange={handleChange}
                                className="w-5 h-5 lg:w-4 lg:h-4 text-primary focus:ring-primary border-gray-300"
                              />
                              <span className="text-sm text-gray-700">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ====================== STEP 3 ====================== */}
                  {currentStep === 3 && (
                    <div className="pb-0 sm:pb-8 space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#686868]">
                          6. What kind of conversations do you wish you could
                          have with other founders?
                          <span className="text-gray-500">
                            {" "}
                            (choose up to 3)
                          </span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "Mental health & burnout",
                            "Fundraising pressure",
                            "Hiring / firing / leadership",
                            "Loneliness & founder guilt",
                            "Product-market fit struggles",
                            "Relationships / life balance",
                          ].map((topic) => (
                            <label
                              key={topic}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                value={topic}
                                checked={formData.conversationTopics.includes(
                                  topic
                                )}
                                onChange={handleCheckboxChange}
                                className="w-5 h-5 lg:w-4 lg:h-4 text-primary focus:ring-primary border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">
                                {topic}
                              </span>
                            </label>
                          ))}
                        </div>

                        <div className="mt-2">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              value="Something else"
                              checked={formData.conversationTopics.includes(
                                "Something else"
                              )}
                              onChange={handleCheckboxChange}
                              className="w-5 h-5 lg:w-4 lg:h-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">
                              Something else
                            </span>
                          </label>
                          {formData.conversationTopics.includes(
                            "Something else"
                          ) && (
                            <Input
                              name="otherTopic"
                              type="text"
                              value={formData.otherTopic}
                              onChange={handleChange}
                              placeholder="Please specify"
                              className="mt-2"
                            />
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#686868]">
                          7. What do you hate about most founder groups today?
                        </label>
                        <textarea
                          name="hateAboutGroups"
                          value={formData.hateAboutGroups}
                          onChange={handleChange}
                          placeholder="Be honest — this helps us keep the vibe right."
                          rows={4}
                          maxLength={500}
                          className="w-full placeholder:text-[#0000004D] focus:outline-none rounded-lg p-3 border bg-[#FAFAFA] border-[#D0D5DD]"
                          required
                        />
                        <p className="text-sm text-gray-500">
                          Be honest — this helps us keep the vibe right.
                        </p>
                        <p className="text-xs text-gray-400">
                          {formData.hateAboutGroups.length}/500 characters
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ====================== STEP 4 ====================== */}
                  {currentStep === 4 && (
                    <div className="pb-0 sm:pb-8 space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#686868]">
                          8. How many years have you been building this startup?
                        </label>
                        <div className="space-y-2">
                          {[
                            "< 1 year",
                            "1 – 3 years",
                            "3 – 5 years",
                            "5 + years",
                          ].map((opt) => (
                            <label
                              key={opt}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="yearsBuilding"
                                value={opt}
                                checked={formData.yearsBuilding === opt}
                                onChange={handleChange}
                                className="w-5 h-5 lg:w-4 lg:h-4 text-primary focus:ring-primary border-gray-300"
                              />
                              <span className="text-sm text-gray-700">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#686868]">
                          9. Would you be open to being matched 1:1 with another
                          founder for a private conversation every 2 weeks?
                        </label>
                        <div className="space-y-2">
                          {[
                            "Yes",
                            "Maybe, depends on schedule",
                            "No, prefer group convos only",
                          ].map((opt) => (
                            <label
                              key={opt}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="openToMatching"
                                value={opt}
                                checked={formData.openToMatching === opt}
                                onChange={handleChange}
                                className="w-5 h-5 lg:w-4 lg:h-4 text-primary focus:ring-primary border-gray-300"
                              />
                              <span className="text-sm text-gray-700">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <Input
                        label="10. What city are you based in?"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                      />
                      <Input
                        label="11. How did you hear about us?"
                        name="heardAbout"
                        type="text"
                        value={formData.heardAbout}
                        onChange={handleChange}
                        placeholder="Tell us how you found us"
                      />

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#686868]">
                          12. Preferred mode to communicate?
                        </label>
                        <div className="space-y-2">
                          {["WhatsApp", "Slack"].map((opt) => (
                            <label
                              key={opt}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="preferredMode"
                                value={opt}
                                checked={formData.preferredMode === opt}
                                onChange={handleChange}
                                className="w-5 h-5 lg:w-4 lg:h-4 text-primary focus:ring-primary border-gray-300"
                              />
                              <span className="text-sm text-gray-700">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Conditional Contact Field */}
                      {formData.preferredMode && (
                        <div className="space-y-2 mt-4">
                          <label className="block text-sm font-medium text-[#686868]">
                            {formData.preferredMode === "WhatsApp"
                              ? "WhatsApp Phone Number"
                              : "Slack Email"}
                          </label>
                          <Input
                            name="contactDetail"
                            type={
                              formData.preferredMode === "WhatsApp"
                                ? "tel"
                                : "email"
                            }
                            value={formData.contactDetail}
                            onChange={handleChange}
                            placeholder={
                              formData.preferredMode === "WhatsApp"
                                ? "e.g. +1 234 567 8900"
                                : "e.g. founder@startup.com"
                            }
                            required
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* ====================== STEP CONTROLS ====================== */}
                  <div className="flex items-center gap-3 justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                      disabled={currentStep === 1 || isSubmitting}
                      className="w-fit bg-[#E5E7EB] text-black px-6 py-3 rounded-12 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Back
                    </button>

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="w-fit bg-dark-purple1-bg text-white px-6 py-3 rounded-12 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-fit bg-dark-purple1-bg text-white px-6 py-3 rounded-12 disabled:opacity-50 disabled:pointer-events-none"
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
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FounderInquiryForm;
