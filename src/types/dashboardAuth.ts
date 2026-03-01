/**
 * Web client auth types (dashboard) – align with API_WEB_CLIENT_AUTH.
 */

export interface AuthClient {
  id: string;
  name: string;
  email: string;
  telegramId: string | null;
  whatsAppNumber: string | null;
}

export interface ClientAuthSuccess {
  message: string;
  client: AuthClient;
  token: string;
}

export interface ClientSendOtpSuccess {
  message: string;
  expiresInMinutes: number;
}

export interface ClientSendOtpPayload {
  email: string;
}

export interface ClientVerifyOtpPayload {
  email: string;
  code: string;
}

export interface ApiError {
  error: string;
  code?: string;
}

/** Payload for POST /api/v1/web/client/auth/signup (brand intake signup). */
export interface ClientSignupPayload {
  brandProductName: string;
  websiteLink: string;
  primaryContactEmail: string;
  telegramId?: string;
  whatsappNumber?: string;
  categories?: string[];
  audienceReadinessLevel?: string;
  campaignGoals?: string[];
  monetizationModel?: string[];
  revenueModel?: string;
  marketFocus?: string;
  primaryAudienceGeography?: string[];
  ageRange?: string;
  genderSkew?: string;
  geographicLocation?: string;
  campaignStartTimeline?: string;
  campaignStartDate?: string;
  campaignEndDate?: string;
  customBrief?: string;
}
