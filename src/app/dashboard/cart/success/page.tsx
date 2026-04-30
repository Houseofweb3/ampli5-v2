"use client";

import React from "react";
import Link from "next/link";
import { DASHBOARD_HOME } from "@/src/config/dashboardRoutes";
import { Button } from "@/src/components";
import { BUTTON_SIZES, BUTTON_TYPES } from "@/src/utils/constants";

const SUPPORT_EMAIL = "kolops@houseofweb3.com";

export default function CartSuccessPage() {
  return (
    <div className="flex flex-col w-full px-4 md:px-12 py-8 font-Jakarta">
      <div className="max-w-xl mx-auto w-full flex flex-col items-center text-center">
        <div className="rounded-full bg-primary-light w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-black mb-3">Nicely done!</h1>
        <p className="text-secondary-text text-base md:text-lg leading-relaxed mb-8">
          We&apos;ve got your proposal and will get back within 72 hours.
        </p>
        <p className="text-black/80 text-sm md:text-base mb-8">
          Questions? Reach out to us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary font-medium hover:underline">
            {SUPPORT_EMAIL}
          </a>
        </p>
        <Link href={DASHBOARD_HOME}>
          <Button size={BUTTON_SIZES.LARGE} type={BUTTON_TYPES.PRIMARY}>
            Back to Influencers
          </Button>
        </Link>
      </div>
    </div>
  );
}
