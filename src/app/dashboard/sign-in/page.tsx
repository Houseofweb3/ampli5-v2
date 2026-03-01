"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { sendOtp, verifyOtp } from "@/src/services/dashboardAuth";
import { useDashboardAuth } from "@/src/context/DashboardAuthContext";
import { ALLROUTES } from "@/src/utils/constants";
import { SignData } from "./data";
import Image from "next/image";

const OTP_LENGTH = 6;

function getAuthErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err) && err.response?.data) {
    const data = err.response.data as { error?: string; code?: string };
    if (data.error && typeof data.error === "string") return data.error;
  }
  if (err instanceof Error && err.message) return err.message;
  return "Something went wrong. Please try again.";
}

export default function SignInPage() {
  const router = useRouter();
  const { login } = useDashboardAuth();
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(() => Array(OTP_LENGTH).fill(""));
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [expiresInMinutes, setExpiresInMinutes] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const data = await sendOtp(trimmed);
      setExpiresInMinutes(data.expiresInMinutes);
      setStep("code");
      toast.success(data.message || "Code sent to your email");
    } catch (err: unknown) {
      toast.error(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const code = otpDigits.join("");

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < OTP_LENGTH) {
      toast.error("Please enter the full verification code");
      return;
    }
    setLoading(true);
    try {
      const data = await verifyOtp(email.trim(), code);
      login(data.client, data.token);
      toast.success("Signed in successfully");
      setTimeout(() => router.push(ALLROUTES.HOME), 0);
    } catch (err: unknown) {
      const is401 = axios.isAxiosError(err) && err.response?.status === 401;
      toast.error(is401 ? "Invalid or expired code. Please try again." : getAuthErrorMessage(err));
      setOtpDigits(Array(OTP_LENGTH).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } finally {
      setLoading(false);
    }
  };

  const backToEmail = () => {
    setStep("email");
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    setExpiresInMinutes(null);
  };

  const setDigit = useCallback((index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      setOtpDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const chars = pasted.split("");
    const next = [...otpDigits];
    chars.forEach((char, i) => {
      if (i < OTP_LENGTH) next[i] = char;
    });
    setOtpDigits(next);
    const focusIndex = Math.min(chars.length, OTP_LENGTH) - 1;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="w-full h-[calc(100vh_-_90px)] flex flex-col md:flex-row items-center justify-center container mx-auto gap-6">
      <div className="w-full md:w-[50%] flex flex-col justify-center">
        <div className="font-[700] font-Jakarta text-[24px] xl:text-[36px] ">
          Sign in to Dashboard
        </div>

        <div className="font-[500] xl:text-[20px] font-Nunito leading-[27px] text-gray-300">
          To unlock your all-access pass to Web3 marketing supremacy!
        </div>

        <div className="flex flex-col gap-3 pt-5">
          {SignData.map((data, index) => (
            <div key={data.text ?? index} className="flex items-center gap-3">
              <div className="xl:w-[32px] w-[24px] h-[24px] xl:h-[32px]">
                <Image src={data.icon} alt="img" className="w-full h-full object-cover " />
              </div>
              <div className="font-Nunito font-[600] text-[12px] xl:text-[16px]">
                {data.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-[50%] flex flex-col items-center justify-center gap-4">

        <div className="w-full max-w-xl font-Jakarta">
          <Image src={"/logo.svg"} alt="img" width={100} height={100} className="w-fit h-10 object-cover mb-2 " />
          <div className="font-[400] text-[16px] font-Jakarta text-gray-half">
            Use your work email to receive a one-time verification code.
          </div>
        </div>
        <div className="w-full max-w-xl font-Jakarta">
          {step === "email" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#7B46F8] text-white rounded-lg hover:bg-[#6B3EE8] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Send code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-sm text-gray-600">
                Code sent to <strong>{email}</strong>. Check your inbox.
                {expiresInMinutes != null && (
                  <span className="block mt-1 text-gray-500">Expires in {expiresInMinutes} minutes</span>
                )}
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification code
                </label>
                <div className="flex gap-2 justify-center">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      value={digit}
                      onChange={(e) => setDigit(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      maxLength={1}
                      disabled={loading}
                      className="w-11 h-12 sm:w-12 sm:h-14 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B46F8] focus:border-transparent text-center text-lg font-semibold"
                      aria-label={`Digit ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || code.length < OTP_LENGTH}
                className="w-full py-3 bg-[#7B46F8] text-white rounded-lg hover:bg-[#6B3EE8] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying…" : "Verify & sign in"}
              </button>
              <button
                type="button"
                onClick={backToEmail}
                className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                Use a different email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
