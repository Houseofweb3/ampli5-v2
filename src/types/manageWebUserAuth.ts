export interface WebUserSendOtpSuccess {
  message: string;
  expiresInMinutes: number;
}

export interface WebUserPrincipal {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
}

export interface WebUserAuthSuccess {
  message: string;
  user: WebUserPrincipal;
  token: string;
}
