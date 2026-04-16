import axios from "axios";
import type { WebUserAuthSuccess, WebUserSendOtpSuccess } from "@/src/types/manageWebUserAuth";

const baseURL = process.env.NEXT_PUBLIC_DASHBOARD_API_URL || "";

const publicClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export async function sendManageWebUserOtp(email: string): Promise<WebUserSendOtpSuccess> {
  const res = await publicClient.post<WebUserSendOtpSuccess>("/web/user/auth/send-otp", {
    email: email.trim(),
  });
  return res.data;
}

export async function verifyManageWebUserOtp(
  email: string,
  code: string
): Promise<WebUserAuthSuccess> {
  const res = await publicClient.post<WebUserAuthSuccess>("/web/user/auth/verify-otp", {
    email: email.trim(),
    code: String(code).trim(),
  });
  return res.data;
}
