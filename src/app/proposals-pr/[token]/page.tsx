"use client";
import { toast } from "react-hot-toast";
import axiosInstance from "@/src/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import Input from "@/src/components/ui/input";
import { INPUT_VARIANTS } from "@/src/utils/constants";
import { notFound, useRouter } from "next/navigation";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";

interface DRItem {
  id: string;
  drId: string;
  price: string;
  note: string | null;
  profOfWork: string | null;
  quantity?: number | string;
  isClientApproved: boolean;
  dr: {
    id: string;
    website: string;
    deliverables: string;
    dr: number;
    price: string;
    quantity?: string;
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
  drItems: DRItem[];
  cartId: string;
  email: string;
}

export default function PRProposalPage({ params }: { params: { token: string } }) {
  const { token } = params;
  if (!token) {
    notFound();
  }
  const router = useRouter();
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showBillingForm, setShowBillingForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [approvalStates, setApprovalStates] = useState<Record<string, boolean | null>>({});

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
      setLoading(false);
      return;
    }
    setLoading(false);

    const fetchProposal = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/proposal-pr/${token}`);
        console.log(response.data, "response.data");

        if (response.data.isSubmitted) {
          router.push("/");
          return;
        }
        if (response.status === 200) {
          const data = response.data;
          setProposal(data);

          // Initialize approval states based on isClientApproved from API
          if (data.drItems) {
            const initialApprovalStates: Record<string, boolean | null> = {};
            data.drItems.forEach((item: DRItem) => {
              initialApprovalStates[item.id] = item.isClientApproved ? true : null;
            });
            setApprovalStates(initialApprovalStates);
          }

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
              managementFeePercentage: data.billingInfo.managementFeePercentage || 15,
              discount: data.billingInfo.discount || 0,
            });
          }
        } else {
          toast.error(response.data.message || "Something went wrong", {
            duration: 2000,
          });
          router.push("/");
          return;
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || error.message || "Something went wrong";
        toast.error(errorMessage, { duration: 2000 });
        router.push("/");
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [token, router]);

  const handleApprovalChange = (itemId: string) => {
    setApprovalStates((prev) => {
      const currentState = prev[itemId];
      // Toggle between true and false (only accept checkbox)
      if (currentState === true) {
        return {
          ...prev,
          [itemId]: false,
        };
      } else {
        return {
          ...prev,
          [itemId]: true,
        };
      }
    });
  };

  // Calculate pricing summary
  const calculatePricing = (): {
    subtotal: number;
    managementFee: number;
    discountPercentage: number;
    discountAmount: number;
    total: number;
  } => {
    if (!proposal?.drItems) {
      return {
        subtotal: 0,
        managementFee: 0,
        discountPercentage: billingForm.discount || 0,
        discountAmount: 0,
        total: 0,
      };
    }

    // Calculate subtotal from accepted items only
    const subtotal = proposal.drItems.reduce((sum, item) => {
      if (approvalStates[item.id] === true) {
        const price = parseFloat(item.price || item.dr.price || "0");
        const quantity = Number(item.quantity || item.dr.quantity || 1);
        return sum + price * quantity;
      }
      return sum;
    }, 0);

    // Calculate management fee
    const managementFeePercentage = billingForm.managementFeePercentage || 15;
    const managementFee = (subtotal * managementFeePercentage) / 100;

    // Calculate discount as percentage of subtotal
    const discountPercentage = billingForm.discount || 0;
    const discountAmount = (subtotal * discountPercentage) / 100;

    // Calculate total
    const total = subtotal + managementFee - discountAmount;

    return {
      subtotal,
      managementFee,
      discountPercentage,
      discountAmount,
      total,
    };
  };

  const pricing = calculatePricing();

  // Format price with comma separators
  const formatPrice = (price: string | number | null | undefined): string => {
    if (!price) return "$0";
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numPrice)) return "$0";
    return `$${numPrice.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const handleBillingFormChange = (field: keyof BillingInfo, value: string | number) => {
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
    if (!billingForm.projectName.trim()) {
      toast.error("Project name is required");
      return false;
    }
    if (!billingForm.projectUrl.trim()) {
      toast.error("Project URL is required");
      return false;
    }
    if (billingForm.projectUrl && !/^https?:\/\/.+/.test(billingForm.projectUrl)) {
      toast.error("Please enter a valid URL (must start with http:// or https://)");
      return false;
    }
    if (!billingForm.telegramId.trim()) {
      toast.error("Telegram ID is required");
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
      // Prepare DR items with approval status
      const updatedDRItems = proposal?.drItems.map((item) => ({
        id: item.id,
        isClientApproved: approvalStates[item.id] || false,
      }));

      // Prepare update payload
      const updateData = {
        billingInfo: {
          ...billingForm,
        },
        drItems: updatedDRItems,
      };
      await axiosInstance.put(`/proposal-pr/${token}/submit`, updateData);

      router.push("/proposals-pr/success");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to update proposal";
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Common Header Layout */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  The only tool you need to 'amplify' your messaging in crypto.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#7B46F8] mb-2">
              {showBillingForm ? "Billing Information" : "Proposal Review"}
            </h1>
            <p className="text-gray-600">
              {showBillingForm
                ? "Please provide your billing information to complete the proposal"
                : "Review and approve DR items for your campaign"}
            </p>
          </div>

          {/* Pitch Section */}
          {!showBillingForm && (
            <div className="my-8">
              <p className="text-base md:text-lg text-gray-900 mb-6">
                Confluence between Artificial & Human intelligence to deliver best ROI on influencer
                campaigns.
              </p>

              <div className="flex gap-4">
                {/* Purple vertical line */}
                <div className="w-1 bg-[#7B46F8] rounded-full flex-shrink-0"></div>

                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Our Pitch?</h2>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#7B46F8] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base font-semibold text-gray-900 uppercase">
                        LOWEST PRICE GUARANTEE
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#7B46F8] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base font-semibold text-gray-900 uppercase">
                        NON-BOTTED, DATA BACKED KOL
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#7B46F8] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base font-semibold text-gray-900 uppercase">
                        ACTIVATION UNDER 72-HOUR
                      </span>
                    </li>
                  </ul>

                  <div className="space-y-3 text-sm md:text-base text-gray-700">
                    <p>
                      Leverage our proprietary APIs with{" "}
                      <span className="font-bold">Tweet Scout</span> &{" "}
                      <span className="font-bold">KAITO</span>.
                    </p>
                    <p>
                      Collaborate with top <span className="font-bold">YAPPERS</span> on{" "}
                      <span className="font-bold">KAITO</span> for authentic engagement.
                    </p>
                    <p>
                      Find YouTube KOLs with <span className="font-bold">loyal audiences</span>,
                      measured by <span className="font-bold">repeat viewers</span>, not just unique
                      views.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Desktop Table View */}
        {!showBillingForm && (
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      DR Rating
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Deliverables
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Prof of Work
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proposal?.drItems?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-900">
                          <a
                            href={item.dr.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {item.dr.website || "Unknown"}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900 font-semibold">
                          {item.dr.dr || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {item.dr.deliverables || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.note ? (
                          <textarea
                            rows={3}
                            cols={30}
                            readOnly
                            className="text-sm text-gray-900 max-w-xs word-wrap:break-word"
                            value={item.note}
                          />
                        ) : (
                          <div className="text-sm text-gray-900">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.profOfWork ? (
                          <textarea
                            rows={3}
                            cols={30}
                            readOnly
                            className="text-sm text-gray-900 max-w-xs word-wrap:break-word"
                            value={item.profOfWork}
                          />
                        ) : (
                          <div className="text-sm text-gray-900">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">
                          {item.quantity || item.dr.quantity || "1"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{formatPrice(item.price)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={approvalStates[item.id] === true}
                              onChange={() => handleApprovalChange(item.id)}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-green-600 font-medium">Accept</span>
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
            {proposal?.drItems?.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold text-gray-900 mb-2">
                      <a
                        href={item.dr.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {item.dr.website || "Unknown"}
                      </a>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">DR Rating:</span>{" "}
                        <span className="font-semibold">{item.dr.dr || "-"}</span>
                      </div>
                      <div>
                        <span className="font-medium">Deliverables:</span>{" "}
                        <span className="font-semibold">{item.dr.deliverables || "-"}</span>
                      </div>
                      <div>
                        <span className="font-medium">Quantity:</span>{" "}
                        <span className="font-semibold">
                          {item.quantity || item.dr.quantity || "1"}
                        </span>
                      </div>
                      {item.note && (
                        <div>
                          <span className="font-medium">Note:</span>{" "}
                          <span className="font-semibold">{item.note}</span>
                        </div>
                      )}
                      {item.profOfWork && (
                        <div>
                          <span className="font-medium">Prof of Work:</span>{" "}
                          <span className="font-semibold">{item.profOfWork}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={approvalStates[item.id] === true}
                          onChange={() => handleApprovalChange(item.id)}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-green-600 font-medium">Accept</span>
                      </label>
                      <div className="ml-auto">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.price || item.dr.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pricing Summary */}
        {!showBillingForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">{formatPrice(pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  Management Fee ({billingForm.managementFeePercentage || 15}%)
                </span>
                <span className="text-gray-900 font-medium">
                  {formatPrice(pricing.managementFee)}
                </span>
              </div>
              {pricing.discountPercentage > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount ({pricing.discountPercentage}%)</span>
                  <span className="text-green-600 font-medium">
                    -{formatPrice(pricing.discountAmount)}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-[#7B46F8]">
                    {formatPrice(pricing.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Billing Information Button */}
        {!showBillingForm && (
          <div className="flex justify-end mb-8">
            <button
              type="button"
              onClick={() => {
                // Check if any DR items are accepted
                const hasAcceptedItems = proposal?.drItems?.some(
                  (item) => approvalStates[item.id] === true
                );

                if (!hasAcceptedItems) {
                  setShowConfirmModal(true);
                } else {
                  setShowBillingForm(true);
                }
              }}
              className="px-6 py-2  bg-dark-purple1-bg text-white 
                cursor-pointer
               disabled:opacity-50 disabled:pointer-events-none rounded-4xl hover:scale-105 transition-all duration-300"
            >
              Proceed
            </button>
          </div>
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => setShowBillingForm(true)}
          title="No Items Selected"
          message="You haven't accepted any items. Are you sure you want to proceed without selecting any items?"
          confirmText="Yes, Proceed"
          cancelText="Cancel"
        />

        {/* Billing Information Form */}
        {showBillingForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="First Name"
                  name="firstName"
                  value={billingForm.firstName}
                  onChange={(e) => handleBillingFormChange("firstName", e.target.value)}
                  required
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Last Name"
                  name="lastName"
                  value={billingForm.lastName}
                  onChange={(e) => handleBillingFormChange("lastName", e.target.value)}
                  required
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={proposal?.email || ""}
                  disabled
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Project Name"
                  name="projectName"
                  value={billingForm.projectName}
                  onChange={(e) => handleBillingFormChange("projectName", e.target.value)}
                  required
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Project URL"
                  name="projectUrl"
                  type="url"
                  value={billingForm.projectUrl}
                  onChange={(e) => handleBillingFormChange("projectUrl", e.target.value)}
                  placeholder="https://example.com"
                  required
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Telegram ID"
                  name="telegramId"
                  value={billingForm.telegramId}
                  onChange={(e) => handleBillingFormChange("telegramId", e.target.value)}
                  placeholder="@username or numeric ID"
                  required
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
            </div>

            {/* Pricing Summary in Billing Form */}
            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">{formatPrice(pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Management Fee ({billingForm.managementFeePercentage || 15}
                    %)
                  </span>
                  <span className="text-gray-900 font-medium">
                    {formatPrice(pricing.managementFee)}
                  </span>
                </div>
                {pricing.discountPercentage > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discount ({pricing.discountPercentage}%)</span>
                    <span className="text-green-600 font-medium">
                      -{formatPrice(pricing.discountAmount)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-[#7B46F8]">
                      {formatPrice(pricing.total)}
                    </span>
                  </div>
                </div>
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
