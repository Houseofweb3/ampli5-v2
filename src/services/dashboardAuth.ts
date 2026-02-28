import type { ClientAuthSuccess, ClientSendOtpSuccess } from "@/src/types/dashboardAuth";
import { dashboardClient } from "@/src/lib/dashboardClient";

export { getToken, getClient, clearAuth } from "@/src/store/dashboardAuthStore";

export async function sendOtp(email: string): Promise<ClientSendOtpSuccess> {
  const res = await dashboardClient.post<ClientSendOtpSuccess>("/web/client/auth/send-otp", {
    email: email.trim(),
  });
  return res.data;
}

export async function verifyOtp(email: string, code: string): Promise<ClientAuthSuccess> {
  const res = await dashboardClient.post<ClientAuthSuccess>("/web/client/auth/verify-otp", {
    email: email.trim(),
    code: String(code).trim(),
  });
  return res.data;
}
