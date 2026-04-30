"use client";
import { toast } from "react-hot-toast";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  proposalGetUrlLegacy,
  proposalGetUrlSlug,
  proposalSubmitUrlLegacy,
  proposalSubmitUrlSlug,
  type ProposalLinkMode,
  type ProposalSlugParams,
} from "@/src/lib/proposalApiPaths";

const getProposalBaseUrl = () => process.env.NEXT_PUBLIC_DASHBOARD_API_URL || "";

type Step = 1 | 2 | 3 | 4;

interface SubmitFormData {
  registeredCompanyName: string;
  registeredCompanyAddress: string;
  authorizedSignatoryName: string;
  authorizedSignatoryDesignation: string;
  officialEmailId: string;
  phoneNumber: string;
  preferredPaymentMode: "bank_transfer" | "crypto";
}

const initialSubmitForm: SubmitFormData = {
  registeredCompanyName: "",
  registeredCompanyAddress: "",
  authorizedSignatoryName: "",
  authorizedSignatoryDesignation: "",
  officialEmailId: "",
  phoneNumber: "",
  preferredPaymentMode: "bank_transfer",
};

function asNonEmptyString(value: unknown): string {
  if (typeof value !== "string") return "";
  const s = value.trim();
  return s;
}

function normalizePaymentMode(value: unknown): "bank_transfer" | "crypto" {
  return value === "crypto" ? "crypto" : "bank_transfer";
}

/** Avatar URL for influencer profile (same as influencer-table). */
function getInfluencerAvatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "U")}&background=random&size=128`;
}

/** Normalize proofOfWork: if array take first, if string use it. */
function normalizeProofOfWork(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === "string") return value.trim() || null;
  if (Array.isArray(value) && value.length > 0) {
    const first = value[0];
    return typeof first === "string" ? first.trim() || null : String(first);
  }
  return null;
}

/** Map dashboard API response (cart) to page shape (influencerItems, billingInfo, email). */
function normalizeProposalResponse(data: Record<string, unknown>): ProposalDataShape {
  const cart = data.cart as
    | {
        items?: Array<{
          id: string;
          influencerId: string;
          quantity?: string;
          price?: string;
          notes?: string | null;
          proofOfWork?: unknown;
          isApproved?: boolean;
          platform?: string;
          platformLink?: string;
          inventory?: string;
          influencerName?: string;
          influencer?: {
            id?: string;
            name?: string;
            platform?: string;
            contentType?: string;
            socialMediaLink?: string;
            dpLink?: string;
            price?: string;
            quantity?: string | number;
          };
        }>;
        client?: { id?: string; name?: string; email?: string };
        id?: string;
        currency?: string;
        priceRatio?: number;
        managementFeePercent?: string;
        discountPercent?: string;
      }
    | undefined;

  if (cart?.items) {
    const client = cart.client ?? {};
    const clientName = (client.name ?? "").trim();
    const parts = clientName ? clientName.split(/\s+/) : [];
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ") ?? "";
    const managementFeePercentNum =
      cart.managementFeePercent != null ? parseFloat(String(cart.managementFeePercent)) : 15;
    const discountNum = cart.discountPercent != null ? parseFloat(String(cart.discountPercent)) : 0;
    return {
      cartId: cart.id ?? "",
      email: (client.email as string) ?? "",
      currency: cart.currency ?? "USD",
      priceRatio: cart.priceRatio ?? 1,
      billingInfo: {
        firstName,
        lastName,
        projectName: "",
        telegramId: "",
        projectUrl: "",
        campaignLiveDate: "",
        note: "",
        managementFeePercentage: Number.isFinite(managementFeePercentNum)
          ? managementFeePercentNum
          : 15,
        discount: Number.isFinite(discountNum) ? discountNum : 0,
      },
      influencerItems: cart.items.map((it) => {
        const inf = it.influencer ?? {};
        const name = (it.influencerName ?? inf.name ?? it.influencerId ?? "—") as string;
        const platform = (it.platform ?? inf.platform ?? "—") as string;
        const platformLink = (it.platformLink ?? inf.socialMediaLink ?? "") as string;
        const contentType = (it.inventory ?? inf.contentType ?? "—") as string;
        return {
          id: it.id,
          influencerId: it.influencerId,
          price: it.price ?? (inf.price as string) ?? "0",
          note: it.notes ?? null,
          profOfWork: normalizeProofOfWork(it.proofOfWork),
          quantity: it.quantity ?? inf.quantity ?? 1,
          isClientApproved: it.isApproved ?? false,
          pricing: it.price ?? (inf.price as string) ?? "0",
          influencer: {
            id: (inf.id as string) ?? it.influencerId,
            name,
            platform,
            socialMediaLink: platformLink,
            contentType,
            dpLink: getInfluencerAvatarUrl(name),
            quantity: inf.quantity != null ? String(inf.quantity) : undefined,
            price: (inf.price as string) ?? it.price ?? "0",
          },
        };
      }),
    };
  }

  return data as unknown as ProposalDataShape;
}

interface ProposalDataShape {
  cartId?: string;
  email?: string;
  currency?: string;
  priceRatio?: number;
  billingInfo?: BillingInfo;
  influencerItems?: Influencer[];
  isSubmitted?: boolean;
}

import Image from "next/image";
import Input from "@/src/components/ui/input";
import { INPUT_VARIANTS } from "@/src/utils/constants";
import { notFound, useRouter } from "next/navigation";
import {
  MediumIcon,
  Podcast,
  InstagramIcon,
  XIcon2,
  YouTubeIcon2,
  TelegramIcon2,
  SpotifyIcon2,
} from "@/public/icons";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";
import TermsOfServiceContent from "@/src/components/TermsOfServiceContent";
import { GrDocumentText } from "react-icons/gr";

interface Influencer {
  id: string;
  influencerId: string;
  price: string;
  note: string | null;
  profOfWork: string | null;
  quantity?: number | string;
  isClientApproved: boolean;
  pricing: string;
  influencer: {
    id: string;
    name: string;
    platform: string;
    socialMediaLink: string;
    contentType: string;
    dpLink: string;
    quantity?: string;
    price: string;
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

const DEFAULT_BILLING_INFO: BillingInfo = {
  firstName: "",
  lastName: "",
  projectName: "",
  telegramId: "",
  projectUrl: "",
  campaignLiveDate: "",
  note: "",
  managementFeePercentage: 15,
  discount: 0,
};

interface ProposalData {
  /** Legacy JWT only; empty when using slug URL. */
  token: string;
  currency?: string;
  priceRatio?: number;
  billingInfo: BillingInfo;
  influencerItems: Influencer[];
  cartId: string;
  email: string;
}

export interface ProposalPageContentProps {
  mode: ProposalLinkMode;
  /** `/proposals/{token}` — JWT */
  legacyToken?: string;
  /** `/proposals/{clientSlug}/{date}/{cartId}` */
  clientSlug?: string;
  date?: string;
  cartId?: string;
}

export function ProposalPageContent({
  mode,
  legacyToken,
  clientSlug,
  date,
  cartId,
}: ProposalPageContentProps) {
  const router = useRouter();
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [approvalStates, setApprovalStates] = useState<Record<string, boolean | null>>({});
  const [submitForm, setSubmitForm] = useState<SubmitFormData>(initialSubmitForm);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [existingSignatureUrl, setExistingSignatureUrl] = useState<string | null>(null);
  const [signatureMode, setSignatureMode] = useState<"existing" | "draw">("draw");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const hasDrawnRef = useRef(false);
  const isDrawingSignatureRef = useRef(false);
  const signatureActivePointerIdRef = useRef<number | null>(null);

  // Billing form state (for pricing display only - managementFeePercentage from API)
  const [billingForm, setBillingForm] = useState<BillingInfo>(DEFAULT_BILLING_INFO);

  const slugParams = useMemo((): ProposalSlugParams | null => {
    if (mode !== "slug") return null;
    const cs = clientSlug?.trim();
    const d = date?.trim();
    const id = cartId?.trim();
    if (!cs || !d || !id) return null;
    return { clientSlug: cs, date: d, cartId: id };
  }, [mode, clientSlug, date, cartId]);

  useEffect(() => {
    if (mode === "legacy" && !legacyToken?.trim()) {
      setLoading(false);
      return;
    }
    if (mode === "slug" && !slugParams) {
      setLoading(false);
      return;
    }
    setLoading(false);

    const fetchProposal = async () => {
      try {
        setLoading(true);
        const baseUrl = getProposalBaseUrl();
        const getUrl =
          mode === "slug" && slugParams
            ? proposalGetUrlSlug(baseUrl, slugParams)
            : proposalGetUrlLegacy(baseUrl, legacyToken!.trim());

        const res = await fetch(getUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let data: Record<string, unknown> = {};
        try {
          data = await res.json();
        } catch {
          data = {};
        }

        if (res.status === 410) {
          toast.error(
            (typeof data?.message === "string" && data.message) ||
              "This proposal link has already been used or is no longer valid.",
            { duration: 5000 }
          );
          router.push("/");
          return;
        }

        if (data.isSubmitted) {
          router.push("/");
          return;
        }
        if (res.ok) {
          const normalized = normalizeProposalResponse(data as Record<string, unknown>);
          const proposalPayload: ProposalData = {
            token: mode === "legacy" ? (legacyToken ?? "").trim() : "",
            cartId: normalized.cartId ?? "",
            email: normalized.email ?? "",
            currency: normalized.currency ?? "USD",
            priceRatio: normalized.priceRatio ?? 1,
            billingInfo: normalized.billingInfo ?? DEFAULT_BILLING_INFO,
            influencerItems: normalized.influencerItems ?? [],
          };
          setProposal(proposalPayload);

          // Billing auto-fill (prefill) from API: billingInfoPrefill (client_billing_info)
          const prefill = (data as { billingInfoPrefill?: unknown })?.billingInfoPrefill as
            | Record<string, unknown>
            | null
            | undefined;
          if (prefill && typeof prefill === "object") {
            const prefillSignature = asNonEmptyString(prefill.docusignProofLink);
            if (prefillSignature) {
              setExistingSignatureUrl(prefillSignature);
              setSignatureDataUrl(prefillSignature);
              setSignatureMode("existing");
            }

            setSubmitForm((prev) => ({
              ...prev,
              registeredCompanyName:
                asNonEmptyString(prefill.registeredCompanyName) || prev.registeredCompanyName,
              registeredCompanyAddress:
                asNonEmptyString(prefill.registeredCompanyAddress) || prev.registeredCompanyAddress,
              authorizedSignatoryName:
                asNonEmptyString(prefill.authorizedSignatoryName) || prev.authorizedSignatoryName,
              authorizedSignatoryDesignation:
                asNonEmptyString(prefill.authorizedSignatoryDesignation) ||
                prev.authorizedSignatoryDesignation,
              officialEmailId: asNonEmptyString(prefill.officialEmailId) || prev.officialEmailId,
              phoneNumber: asNonEmptyString(prefill.phoneNumber) || prev.phoneNumber,
              preferredPaymentMode: normalizePaymentMode(prefill.preferredPaymentMode),
            }));

            if (prefill.isTermsConfirmed === true) {
              setTermsAccepted(true);
              setShowTermsError(false);
            }
          }

          if (normalized.influencerItems?.length) {
            const initialApprovalStates: Record<string, boolean | null> = {};
            normalized.influencerItems.forEach((item: Influencer) => {
              initialApprovalStates[item.id] = item.isClientApproved ? true : null;
            });
            setApprovalStates(initialApprovalStates);
          }

          if (normalized.billingInfo) {
            setBillingForm({
              firstName: normalized.billingInfo.firstName || "",
              lastName: normalized.billingInfo.lastName || "",
              projectName: normalized.billingInfo.projectName || "",
              telegramId: normalized.billingInfo.telegramId || "",
              projectUrl: normalized.billingInfo.projectUrl || "",
              campaignLiveDate: normalized.billingInfo.campaignLiveDate || "",
              note: normalized.billingInfo.note || "",
              managementFeePercentage: normalized.billingInfo.managementFeePercentage || 15,
              discount: normalized.billingInfo.discount || 0,
            });
          }
        } else {
          const errorMessage =
            (typeof data?.error === "string" && data.error) ||
            (typeof data?.message === "string" && data.message) ||
            "Something went wrong";
          toast.error(errorMessage, {
            duration: 4000,
          });
          router.push("/");
          return;
        }
      } catch (err: unknown) {
        const errorMessage =
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof (err as { message: string }).message === "string"
            ? (err as { message: string }).message
            : "Something went wrong";
        toast.error(errorMessage, { duration: 2000 });
        router.push("/");
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [mode, legacyToken, slugParams, router]);

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

  // Pricing summary: based on selected (accepted) influencers only, not all items in the cart
  const calculatePricing = (): {
    subtotal: number;
    managementFee: number;
    discountPercentage: number;
    discountAmount: number;
    total: number;
  } => {
    if (!proposal?.influencerItems) {
      return {
        subtotal: 0,
        managementFee: 0,
        discountPercentage: billingForm.discount || 0,
        discountAmount: 0,
        total: 0,
      };
    }

    const acceptedItemsOnly = proposal.influencerItems.filter(
      (item) => approvalStates[item.id] === true
    );
    const subtotal = acceptedItemsOnly.reduce((sum, item) => {
      const price = parseFloat(item.price || item.influencer?.price || "0");
      const quantity = Number(item.quantity ?? item.influencer?.quantity ?? 1);
      return sum + price * quantity;
    }, 0);

    const managementFeePercentage = billingForm.managementFeePercentage || 15;
    const managementFee = (subtotal * managementFeePercentage) / 100;
    const discountPercentage = billingForm.discount || 0;
    const discountAmount = (subtotal * discountPercentage) / 100;
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

  const getCurrencySymbol = (currency: string | null | undefined): string => {
    switch ((currency ?? "USD").toUpperCase()) {
      case "INR":
        return "₹";
      case "AED":
        return "AED";
      case "USD":
      default:
        return "$";
    }
  };

  // Format price with comma separators + correct currency symbol (USD/INR/AED)
  const formatPrice = (price: string | number | null | undefined): string => {
    const currencyCode = (proposal?.currency ?? "USD").toUpperCase();
    const symbol = getCurrencySymbol(currencyCode);

    const raw =
      typeof price === "number" ? price : typeof price === "string" ? parseFloat(price) : 0;

    const numPrice = Number.isFinite(raw) ? raw : 0;

    const formatted = numPrice.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    // AED reads better as currency code prefix: "AED 1,000"
    if (currencyCode === "AED") return `${symbol} ${formatted}`;
    return `${symbol}${formatted}`;
  };

  // Get platform icon component
  const getPlatformIcon = (platform: string) => {
    const platformLower = platform?.toLowerCase() || "";
    if (platformLower === "x" || platformLower === "twitter") {
      return <XIcon2 />;
    } else if (platformLower === "youtube") {
      return <YouTubeIcon2 />;
    } else if (platformLower === "telegram") {
      return <TelegramIcon2 />;
    } else if (platformLower === "podcast") {
      return <Podcast />;
    } else if (platformLower === "spotify") {
      return <SpotifyIcon2 />;
    } else if (platformLower === "medium") {
      return <MediumIcon />;
    } else if (platformLower === "instagram") {
      return <InstagramIcon />;
    }
    return platform;
  };

  const validateStep1 = (): boolean => {
    const hasOne = proposal?.influencerItems?.some((item) => approvalStates[item.id] === true);
    if (!hasOne) {
      toast.error("Please accept at least one influencer to proceed.");
      return false;
    }
    return true;
  };

  const validateSubmitForm = (): boolean => {
    return true;
  };

  const getCanvasPointFromClient = useCallback((clientX: number, clientY: number) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  const handleSignaturePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      signatureActivePointerIdRef.current = e.pointerId;

      const canvas = signatureCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      const { x, y } = getCanvasPointFromClient(e.clientX, e.clientY);
      ctx.beginPath();
      ctx.moveTo(x, y);
      hasDrawnRef.current = true;
      isDrawingSignatureRef.current = true;
    },
    [getCanvasPointFromClient]
  );

  const handleSignaturePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingSignatureRef.current || signatureActivePointerIdRef.current !== e.pointerId) {
        return;
      }
      e.preventDefault();
      const canvas = signatureCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { x, y } = getCanvasPointFromClient(e.clientX, e.clientY);
      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [getCanvasPointFromClient]
  );

  const handleSignaturePointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (signatureActivePointerIdRef.current !== e.pointerId) return;
    signatureActivePointerIdRef.current = null;
    isDrawingSignatureRef.current = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // releasePointerCapture can throw if capture was already cleared
    }
  }, []);

  const handleSignatureLostPointerCapture = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (signatureActivePointerIdRef.current === e.pointerId) {
        signatureActivePointerIdRef.current = null;
        isDrawingSignatureRef.current = false;
      }
    },
    []
  );

  const saveSignature = useCallback(() => {
    if (!hasDrawnRef.current) {
      toast.error("Please draw your signature.");
      return;
    }
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    setSignatureDataUrl(canvas.toDataURL("image/png"));
    setShowSignatureModal(false);
    setStep(4);
  }, []);

  const clearSignature = useCallback(() => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawnRef.current = false;
    setSignatureDataUrl(null);
  }, []);

  useEffect(() => {
    if (showSignatureModal && signatureCanvasRef.current) {
      if (signatureMode === "existing") return;
      const canvas = signatureCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Persist signature across step navigation:
      // - if we already captured a signatureDataUrl (data:image/*), re-render it into the canvas
      // - otherwise, clear canvas for a new draw
      if (signatureDataUrl && signatureDataUrl.startsWith("data:image/")) {
        const ImgCtor =
          typeof window !== "undefined" && typeof window.Image !== "undefined"
            ? window.Image
            : null;
        if (!ImgCtor) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          hasDrawnRef.current = false;
          return;
        }
        const img = new ImgCtor();
        img.onload = () => {
          try {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Fit image into canvas while preserving aspect ratio
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const w = img.width * scale;
            const h = img.height * scale;
            const x = (canvas.width - w) / 2;
            const y = (canvas.height - h) / 2;
            ctx.drawImage(img, x, y, w, h);
            hasDrawnRef.current = true;
          } catch {
            // if rendering fails, fall back to blank canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hasDrawnRef.current = false;
          }
        };
        img.src = signatureDataUrl;
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hasDrawnRef.current = false;
      }

      isDrawingSignatureRef.current = false;
      signatureActivePointerIdRef.current = null;
    }
  }, [showSignatureModal, signatureMode, signatureDataUrl]);

  if (mode === "legacy" && (!legacyToken || !legacyToken.trim())) {
    notFound();
  }
  if (mode === "slug" && !slugParams) {
    notFound();
  }

  const handleSubmitProposal = async () => {
    if (!validateStep1() || !validateSubmitForm()) return;
    if (!signatureDataUrl) {
      toast.error("Please provide your signature.");
      return;
    }
    if (!termsAccepted) {
      setShowTermsError(true);
      toast.error("Please accept the Terms and Conditions.");
      return;
    }
    setShowTermsError(false);
    if (!proposal?.influencerItems?.length) return;

    setIsSubmitting(true);
    try {
      const payload = {
        items: proposal.influencerItems.map((item) => ({
          id: item.id,
          accepted: approvalStates[item.id] === true,
        })),
        registeredCompanyName: submitForm.registeredCompanyName.trim(),
        registeredCompanyAddress: submitForm.registeredCompanyAddress.trim(),
        authorizedSignatoryName: submitForm.authorizedSignatoryName.trim(),
        authorizedSignatoryDesignation: submitForm.authorizedSignatoryDesignation.trim(),
        officialEmailId: submitForm.officialEmailId.trim(),
        phoneNumber: submitForm.phoneNumber.trim(),
        preferredPaymentMode: submitForm.preferredPaymentMode,
        docusignProofLink: signatureDataUrl || undefined,
        isTermsConfirmed: true,
      };
      const baseUrl = getProposalBaseUrl();
      const submitUrl =
        mode === "slug" && slugParams
          ? proposalSubmitUrlSlug(baseUrl, slugParams)
          : proposalSubmitUrlLegacy(baseUrl, legacyToken!.trim());

      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const resData = await res.json().catch(() => ({}));
      if (res.status === 410) {
        toast.error(
          resData?.error ??
            resData?.message ??
            "This proposal link has already been used or is no longer valid.",
          { duration: 5000 }
        );
        return;
      }
      if (!res.ok) {
        toast.error(resData?.error ?? resData?.message ?? "Failed to submit proposal", {
          duration: 2000,
        });
        return;
      }
      toast.success(resData?.message ?? "Proposal confirmed successfully.");
      router.push("/");
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Failed to submit proposal";
      toast.error(msg, { duration: 2000 });
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
              {step === 1 && "Proposal Review"}
              {step === 2 && "Billing Information"}
              {step === 3 && "Authorization"}
              {step === 4 && "Terms & Conditions"}
            </h1>
            <p className="text-gray-600">
              {step === 1 && "Review and approve influencers for your campaign"}
              {step === 2 && "Please provide your billing information to complete the proposal"}
              {step === 3 && "Confirm authorization and sign"}
              {step === 4 && "Review and accept the terms"}
            </p>
          </div>

          {/* Pitch Section */}
          {step === 1 && (
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

        {/* Client Information Card */}
        {step === 1 && proposal?.billingInfo && (
          <div className="mb-8 bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-bold text-[#7B46F8] mb-4 pb-2 border-b border-gray-200">
              Billing Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Name
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {[proposal.billingInfo.firstName, proposal.billingInfo.lastName]
                    .filter(Boolean)
                    .join(" ") || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-900">{proposal.email || "—"}</p>
              </div>
            </div>
            {proposal.billingInfo.note && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 no-break">
                  Note
                </p>
                <p className="text-sm text-gray-700 no-break">{proposal.billingInfo.note}</p>
              </div>
            )}
          </div>
        )}

        {/* Desktop Table View */}
        {step === 1 && (
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Profile
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Content Type
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
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proposal?.influencerItems?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <Image
                              src={item.influencer.dpLink || "/placeholder-avatar.png"}
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

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {item.influencer.socialMediaLink ? (
                          <a
                            href={item.influencer.socialMediaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            {getPlatformIcon(item.influencer.platform)}
                            <span className="text-sm">{item.influencer.platform}</span>
                          </a>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            {getPlatformIcon(item.influencer.platform)}
                            <span className="text-sm">{item.influencer.platform}</span>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{item.influencer.contentType}</div>
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
                      <td className="px-6 py-4 text-center flex items-center justify-center">
                        {item.profOfWork && (
                          <div>
                            {/^https?:\/\//i.test(item.profOfWork.trim()) ? (
                              <a
                                href={item.profOfWork.trim()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline break-all"
                              >
                                <GrDocumentText className="w-6 h-6" />
                              </a>
                            ) : (
                              <span className="font-medium">{item.profOfWork}</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">
                          {item.quantity || item.influencer.quantity || "1"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{formatPrice(item.price)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">
                          {formatPrice(
                            parseFloat(String(item.price || item.influencer?.price || 0)) *
                              Number(item.quantity ?? item.influencer?.quantity ?? 1)
                          )}
                        </div>
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
        {step === 1 && (
          <div className="md:hidden space-y-4 mb-8 w-full">
            {proposal?.influencerItems?.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 w-full">
                <div className="flex flex-col items-start space-y-4">
                  <div className="flex justify-start items-center gap-2">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.influencer.dpLink || getInfluencerAvatarUrl(item.influencer.name)}
                        alt={item.influencer.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="text-base font-semibold text-gray-900 ">
                        {item.influencer.name.trim() || "Unknown"}
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <span className="font-semibold">Platform:</span>{" "}
                        {item.influencer.socialMediaLink ? (
                          <a
                            href={item.influencer.socialMediaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            {getPlatformIcon(item.influencer.platform)}
                            <span>{item.influencer.platform}</span>
                          </a>
                        ) : (
                          <span className="flex items-center gap-2">
                            {getPlatformIcon(item.influencer.platform)}
                            {item.influencer.platform}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold">Content Type:</span>{" "}
                        <span className="">{item.influencer.contentType || "—"}</span>
                      </div>
                      {item.note && (
                        <div>
                          <span className="font-semibold">Note:</span> <span>{item.note}</span>
                        </div>
                      )}
                      {item.profOfWork && (
                        <div className="flex items-center justify-start gap-2">
                          <span className="font-semibold">Prof of Work:</span>{" "}
                          {/^https?:\/\//i.test(item.profOfWork.trim()) ? (
                            <a
                              href={item.profOfWork.trim()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className=" text-blue-600 hover:underline break-all"
                            >
                              <GrDocumentText className="w-4 h-4" />
                            </a>
                          ) : (
                            <span className="font-medium">{item.profOfWork}</span>
                          )}
                        </div>
                      )}
                      <div className="flex justify-start items-center gap-2">
                        <span className="font-semibold">Price:</span>{" "}
                        <span className="">
                          {formatPrice(item.price || item.influencer?.price || 0)}
                        </span>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <span className="font-semibold">Quantity:</span>{" "}
                        <span className="">{item.quantity || item.influencer?.quantity || 1}</span>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <span className="font-semibold">Total Price:</span>{" "}
                        <span className="">
                          {formatPrice(
                            parseFloat(String(item.price || item.influencer?.price || 0)) *
                              Number(item.quantity ?? item.influencer?.quantity ?? 1)
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-4">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pricing Summary — based on selected (accepted) influencers only */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Pricing Summary</h3>
            <p className="text-sm text-gray-500 mb-4">Based on accepted influencers only</p>
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
        {step === 1 && (
          <div className="flex justify-end mb-8">
            <button
              type="button"
              onClick={() => {
                const hasAcceptedInfluencers = proposal?.influencerItems?.some(
                  (item) => approvalStates[item.id] === true
                );
                if (!hasAcceptedInfluencers) {
                  setShowConfirmModal(true);
                  return;
                }
                if (validateStep1()) setStep(2);
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
          onConfirm={() => setShowConfirmModal(false)}
          title="No Influencers Selected"
          message="You haven't accepted any influencers. Are you sure you want to proceed without selecting any influencers?"
          confirmText="Yes, Proceed"
          cancelText="Cancel"
        />

        {/* Step 2: Client information form */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Registered Company Name (as per your entity)"
                  name="registeredCompanyName"
                  value={submitForm.registeredCompanyName}
                  onChange={(e) =>
                    setSubmitForm((prev) => ({ ...prev, registeredCompanyName: e.target.value }))
                  }
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Registered Company Address"
                  name="registeredCompanyAddress"
                  value={submitForm.registeredCompanyAddress}
                  onChange={(e) =>
                    setSubmitForm((prev) => ({ ...prev, registeredCompanyAddress: e.target.value }))
                  }
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Authorized Signatory Name"
                  name="authorizedSignatoryName"
                  value={submitForm.authorizedSignatoryName}
                  onChange={(e) =>
                    setSubmitForm((prev) => ({ ...prev, authorizedSignatoryName: e.target.value }))
                  }
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Authorized Signatory Designation"
                  name="authorizedSignatoryDesignation"
                  value={submitForm.authorizedSignatoryDesignation}
                  onChange={(e) =>
                    setSubmitForm((prev) => ({
                      ...prev,
                      authorizedSignatoryDesignation: e.target.value,
                    }))
                  }
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Official Email ID for documentation"
                  name="officialEmailId"
                  type="email"
                  value={submitForm.officialEmailId}
                  onChange={(e) =>
                    setSubmitForm((prev) => ({ ...prev, officialEmailId: e.target.value }))
                  }
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div>
                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  value={submitForm.phoneNumber}
                  onChange={(e) =>
                    setSubmitForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
                  }
                  variant={INPUT_VARIANTS.OUTLINED}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Preferred Mode of Payment
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredPaymentMode"
                      checked={submitForm.preferredPaymentMode === "bank_transfer"}
                      onChange={() =>
                        setSubmitForm((prev) => ({
                          ...prev,
                          preferredPaymentMode: "bank_transfer",
                        }))
                      }
                      className="rounded border-gray-300 text-[#7B46F8] focus:ring-[#7B46F8]"
                    />
                    <span>Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredPaymentMode"
                      checked={submitForm.preferredPaymentMode === "crypto"}
                      onChange={() =>
                        setSubmitForm((prev) => ({ ...prev, preferredPaymentMode: "crypto" }))
                      }
                      className="rounded border-gray-300 text-[#7B46F8] focus:ring-[#7B46F8]"
                    />
                    <span>Crypto</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-white text-dark-purple1-bg border border-gray-300 rounded-4xl hover:scale-105 transition-all duration-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateSubmitForm()) {
                    setStep(3);
                    setShowSignatureModal(true);
                  }
                }}
                className="px-6 py-2 bg-dark-purple1-bg text-white rounded-4xl hover:scale-105 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Signature modal */}
        {showSignatureModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
              <p className="text-gray-700 mb-4">
                I, <strong>{submitForm.authorizedSignatoryName || "—"}</strong>, confirm that I am
                duly authorized to act on behalf of{" "}
                <strong>{submitForm.registeredCompanyName || "—"}</strong> and make binding
                decisions regarding this matter.
              </p>

              {signatureMode === "existing" && existingSignatureUrl ? (
                <>
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 p-3">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="text-sm text-gray-700 font-medium">Existing signature</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSignatureMode("draw");
                          setSignatureDataUrl(null);
                          clearSignature();
                        }}
                        className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm"
                      >
                        Create new signature
                      </button>
                    </div>
                    <img
                      src={existingSignatureUrl}
                      alt="Existing signature"
                      className="w-full h-48 object-contain bg-white rounded-md"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setShowSignatureModal(false);
                        setStep(2);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSignatureDataUrl(existingSignatureUrl);
                        setShowSignatureModal(false);
                        setStep(4);
                      }}
                      className="px-4 py-2 bg-dark-purple1-bg text-white rounded-lg hover:opacity-90"
                    >
                      Use this signature
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <canvas
                      ref={signatureCanvasRef}
                      width={500}
                      height={200}
                      className="w-full h-48 touch-none cursor-crosshair block"
                      style={{ touchAction: "none" }}
                      onPointerDown={handleSignaturePointerDown}
                      onPointerMove={handleSignaturePointerMove}
                      onPointerUp={handleSignaturePointerUp}
                      onPointerCancel={handleSignaturePointerUp}
                      onLostPointerCapture={handleSignatureLostPointerCapture}
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 justify-between">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowSignatureModal(false);
                          setStep(2);
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                      >
                        Clear
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={saveSignature}
                      className="px-4 py-2 bg-dark-purple1-bg text-white rounded-lg hover:opacity-90"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Terms and conditions + Submit */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Terms & Conditions</h3>
            <div className="max-h-[60vh] overflow-y-auto border border-gray-200 rounded-lg p-4 md:p-6 mb-6 bg-gray-50/50">
              <TermsOfServiceContent />
            </div>
            <label className="flex items-center gap-3 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setShowTermsError(false);
                }}
                className="h-4 w-4 rounded border-gray-300 text-[#7B46F8] focus:ring-[#7B46F8]"
              />
              <span className="text-gray-700 font-medium">I accept</span>
            </label>
            {showTermsError && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                You must accept the terms and conditions before submitting.
              </p>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => {
                  setStep(3);
                  setShowSignatureModal(true);
                }}
                className="px-6 py-2 bg-white text-dark-purple1-bg border border-gray-300 rounded-4xl hover:scale-105 transition-all duration-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmitProposal}
                disabled={isSubmitting}
                className="px-6 py-2 bg-dark-purple1-bg text-white rounded-4xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
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
