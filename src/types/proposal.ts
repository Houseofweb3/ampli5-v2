/**
 * GET /api/v1/web/proposal/:token
 */
export interface ProposalCartClient {
  id: string;
  name: string;
  email: string;
}

export interface ProposalCartItem {
  id: string;
  influencerId: string;
  quantity: number;
  price: string;
  notes: string | null;
  proofOfWork: string | null;
  isApproved: boolean;
  /** Optional if API expands with influencer details */
  influencer?: {
    id: string;
    name: string;
    platform: string;
    contentType?: string;
    socialMediaLink?: string;
    dpLink?: string;
  };
}

export interface ProposalCart {
  id: string;
  clientId: string;
  status: string;
  createdAt: string;
  subtotal: string;
  discountPercent: string;
  discountAmount: string;
  managementFeePercent: string;
  managementFeeAmount: string;
  total: string;
  client: ProposalCartClient;
  items: ProposalCartItem[];
}

export interface GetProposalResponse {
  cart: ProposalCart;
}

/**
 * POST /api/v1/web/proposal/:token/submit
 */
export interface SubmitProposalItem {
  id: string;
  accepted: boolean;
}

export interface SubmitProposalPayload {
  items: SubmitProposalItem[];
  registeredCompanyName?: string;
  registeredCompanyAddress?: string;
  authorizedSignatoryName?: string;
  authorizedSignatoryDesignation?: string;
  officialEmailId?: string;
  phoneNumber?: string;
  preferredPaymentMode?: "bank_transfer" | "crypto";
  docusignProofLink?: string;
  isTermsConfirmed: boolean;
}

export interface SubmitProposalResponse {
  success: boolean;
  message: string;
}
