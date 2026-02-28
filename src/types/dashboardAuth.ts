/**
 * Web client auth types (dashboard) – align with API_WEB_CLIENT_AUTH.
 */

export interface AuthClient {
  id: string;
  name: string;
  email: string;
  projectName: string | null;
  projectUrl: string | null;
  telegramId: string | null;
  whatsAppNumber: string | null
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
