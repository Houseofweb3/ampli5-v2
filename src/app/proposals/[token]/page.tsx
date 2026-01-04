"use client";
import { toast } from "react-hot-toast";
import axiosInstance from "@/src/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/src/components/ui/input";
import { INPUT_VARIANTS } from "@/src/utils/constants";
import { useRouter } from "next/navigation";

interface Influencer {
  id: string;
  influencerId: string;
  price: string;
  note: string | null;
  profOfWork: string | null;
  isClientApproved: boolean;
  influencer: {
    id: string;
    name: string;
    platform: string;
    socialMediaLink: string;
    contentType: string;
    dpLink: string;
    quantity: string;
  };
}

interface BillingInfo {
  firstName: string;
  lastName: string;
  projectName: string;
  telegramId: string;
  projectUrl: string;
  campaignLiveDate: string;
  note: string;
  managementFeePercentage: number;
  discount: number;
}

interface ProposalData {
  token: string;
  billingInfo: BillingInfo;
  influencerItems: Influencer[];
  cartId: string;
  email: string;
}

export default function ProposalPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  const router = useRouter();
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showBillingForm, setShowBillingForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [approvalStates, setApprovalStates] = useState<
    Record<string, boolean | null>
  >({});

  // Billing form state
  const [billingForm, setBillingForm] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    projectName: "",
    telegramId: "",
    projectUrl: "",
    campaignLiveDate: "",
    note: "",
    managementFeePercentage: 15,
    discount: 0,
  });

  useEffect(() => {
    if (!token) {
      setError("Link is invalid or expired");
      setLoading(false);
      return;
    }

    const fetchProposal = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/proposal/${token}`);
        if (response.status === 200) {
          const isSubmitted = response.data?.isSubmitted === true;
          if (isSubmitted) {
            router.push("/proposals/success");
            return;
          }

          const data = response.data;
          setProposal(data);

          // Initialize approval states
          const initialStates: Record<string, boolean | null> = {};
          data.influencerItems?.forEach((item: Influencer) => {
            initialStates[item.id] = item.isClientApproved ?? null;
          });
          setApprovalStates(initialStates);

          // Initialize billing form with existing data
          if (data.billingInfo) {
            setBillingForm({
              firstName: data.billingInfo.firstName || "",
              lastName: data.billingInfo.lastName || "",
              projectName: data.billingInfo.projectName || "",
              telegramId: data.billingInfo.telegramId || "",
              projectUrl: data.billingInfo.projectUrl || "",
              campaignLiveDate: data.billingInfo.campaignLiveDate || "",
              note: data.billingInfo.note || "",
              managementFeePercentage:
                data.billingInfo.managementFeePercentage || 15,
              discount: data.billingInfo.discount || 0,
            });
          }
        } else {
          toast.error(response.data.message || "Something went wrong", {
            duration: 2000,
          });
          setError(response.data.message || "Failed to load proposal");
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        toast.error(errorMessage, { duration: 2000 });
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [token]);

  const handleApprovalChange = (itemId: string, approved: boolean) => {
    setApprovalStates((prev) => {
      const currentState = prev[itemId];
      // If clicking the same checkbox, toggle it off (set to null)
      if (currentState === approved) {
        return {
          ...prev,
          [itemId]: null,
        };
      }
      // Otherwise, set the new state
      return {
        ...prev,
        [itemId]: approved,
      };
    });
  };

  const handleBillingFormChange = (
    field: keyof BillingInfo,
    value: string | number
  ) => {
    setBillingForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateBillingForm = (): boolean => {
    if (!billingForm.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!billingForm.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!proposal?.email) {
      toast.error("Email is required");
      return false;
    }
    if (
      billingForm.projectUrl &&
      !/^https?:\/\/.+/.test(billingForm.projectUrl)
    ) {
      toast.error(
        "Please enter a valid URL (must start with http:// or https://)"
      );
      return false;
    }
    return true;
  };

  const handleUpdateProposal = async () => {
    if (!validateBillingForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare influencer items with approval status
      const updatedInfluencerItems = proposal?.influencerItems.map((item) => ({
        id: item.id,
        isClientApproved: approvalStates[item.id] || false,
      }));

      // Prepare update payload
      const updateData = {
        billingInfo: {
          ...billingForm,
        },
        influencerItems: updatedInfluencerItems,
      };
      await axiosInstance.put(`/proposal/${token}/submit`, updateData);

      router.push("/proposals/success");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update proposal";
      toast.error(errorMessage, { duration: 2000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading proposal...</p>
        </div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">
            {error || "Link is invalid or expired"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Proposal Review
          </h1>
          <p className="text-gray-600">
            Review and approve influencers for your campaign
          </p>
        </div>

        {/* Desktop Table View */}
        {!showBillingForm && (
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Profile
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Content Type
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proposal.influencerItems?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <Image
                              src={
                                item.influencer.dpLink ||
                                "/placeholder-avatar.png"
                              }
                              alt={item.influencer.name}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.influencer.name.trim() || "Unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.influencer.quantity || "1"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={item.influencer.socialMediaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          {item.influencer.platform}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.influencer.contentType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={approvalStates[item.id] === true}
                              onChange={() =>
                                handleApprovalChange(item.id, true)
                              }
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-green-600 font-medium">
                              Accept
                            </span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={approvalStates[item.id] === false}
                              onChange={() =>
                                handleApprovalChange(item.id, false)
                              }
                              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <span className="ml-2 text-sm text-red-600 font-medium">
                              Reject
                            </span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile Card View */}
        {!showBillingForm && (
          <div className="md:hidden space-y-4 mb-8">
            {proposal.influencerItems?.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.influencer.dpLink || "/placeholder-avatar.png"}
                      alt={item.influencer.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold text-gray-900 mb-2">
                      {item.influencer.name.trim() || "Unknown"}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Quantity:</span>{" "}
                        {item.influencer.quantity || "1"}
                      </div>
                      <div>
                        <span className="font-medium">Platform:</span>{" "}
                        <a
                          href={item.influencer.socialMediaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {item.influencer.platform}
                        </a>
                      </div>
                      <div>
                        <span className="font-medium">Content Type:</span>{" "}
                        {item.influencer.contentType}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={approvalStates[item.id] === true}
                          onChange={() => handleApprovalChange(item.id, true)}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-green-600 font-medium">
                          Accept
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={approvalStates[item.id] === false}
                          onChange={() => handleApprovalChange(item.id, false)}
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-red-600 font-medium">
                          Reject
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Billing Information Button */}
        {!showBillingForm && (
          <div className="flex justify-end mb-8">
            <button
              type="button"
              onClick={() => setShowBillingForm(true)}
              className="px-6 py-2  bg-dark-purple1-bg text-white 
                cursor-pointer
               disabled:opacity-50 disabled:pointer-events-none rounded-4xl hover:scale-105 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        )}

        {/* Billing Information Form */}
        {showBillingForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Billing Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="First Name"
                  name="firstName"
                  value={billingForm.firstName}
                  onChange={(e) =>
                    handleBillingFormChange("firstName", e.target.value)
                  }
                  required
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Last Name"
                  name="lastName"
                  value={billingForm.lastName}
                  onChange={(e) =>
                    handleBillingFormChange("lastName", e.target.value)
                  }
                  required
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={proposal.email}
                  disabled
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Project Name"
                  name="projectName"
                  value={billingForm.projectName}
                  onChange={(e) =>
                    handleBillingFormChange("projectName", e.target.value)
                  }
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Project URL"
                  name="projectUrl"
                  type="url"
                  value={billingForm.projectUrl}
                  onChange={(e) =>
                    handleBillingFormChange("projectUrl", e.target.value)
                  }
                  placeholder="https://example.com"
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Telegram ID"
                  name="telegramId"
                  value={billingForm.telegramId}
                  onChange={(e) =>
                    handleBillingFormChange("telegramId", e.target.value)
                  }
                  placeholder="@username or numeric ID"
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowBillingForm(false)}
                className="px-6 py-2  bg-white text-dark-purple1-bg 
                cursor-pointer
               disabled:opacity-50 disabled:pointer-events-none rounded-4xl hover:scale-105 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProposal}
                disabled={isSubmitting}
                className="px-6 py-2  bg-dark-purple1-bg text-white 
                cursor-pointer
               disabled:opacity-50 disabled:pointer-events-none rounded-4xl hover:scale-105 transition-all duration-300"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
