"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { sendManageWebUserOtp, verifyManageWebUserOtp } from "@/src/services/manageWebUserAuth";
import {
  rehydrateManageWebUserAuth,
  useManageWebUserAuthStore,
} from "@/src/store/manageWebUserAuthStore";

const OTP_LENGTH = 6;

function getAuthErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err) && err.response?.data) {
    const data = err.response.data as { error?: string; message?: string; code?: string };
    if (data.error && typeof data.error === "string") return data.error;
    if (data.message && typeof data.message === "string") return data.message;
  }
  if (err instanceof Error && err.message) return err.message;
  return "Something went wrong. Please try again.";
}

function ManageLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/manage/blogs";

  const token = useManageWebUserAuthStore((s) => s.token);
  const login = useManageWebUserAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(() => Array(OTP_LENGTH).fill(""));
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [expiresInMinutes, setExpiresInMinutes] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    rehydrateManageWebUserAuth().then(() => {
      if (!cancelled) setReady(true);
    });
    const t = setTimeout(() => {
      if (!cancelled) setReady(true);
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!ready || !token) return;
    router.replace(nextPath.startsWith("/manage") ? nextPath : "/manage/blogs");
  }, [ready, token, router, nextPath]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const data = await sendManageWebUserOtp(trimmed);
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
      const data = await verifyManageWebUserOtp(email.trim(), code);
      login(data.user, data.token);
      toast.success(data.message || "Signed in");
      router.replace(nextPath.startsWith("/manage") ? nextPath : "/manage/blogs");
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

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-sm">Loading…</div>
    );
  }

  if (token) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-sm">
        Redirecting…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage blogs</h1>
        <p className="text-sm text-gray-600 mb-8">Sign in with the email on your Ampli5 user account. We will email you a one-time code.</p>

        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label htmlFor="manage-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="manage-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="you@company.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primaryHover disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter the {OTP_LENGTH}-digit code sent to <strong>{email.trim()}</strong>
              {expiresInMinutes != null ? ` (expires in ${expiresInMinutes} min).` : "."}
            </p>
            <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
              {otpDigits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-10 h-12 text-center text-lg font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  autoFocus={i === 0}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primaryHover disabled:opacity-50"
            >
              {loading ? "Verifying…" : "Verify and sign in"}
            </button>
            <button
              type="button"
              onClick={backToEmail}
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Use a different email
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          <Link href="/blogs" className="text-primary hover:underline">
            Back to public blogs
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ManageLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-sm">Loading…</div>
      }
    >
      <ManageLoginInner />
    </Suspense>
  );
}
