"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ProposalSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <div className=" p-8 md:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2">Your submission was successful</p>
          <p className="text-base text-gray-500 mb-8">
            We have received your proposal and will review it shortly. You will be notified once the
            review is complete.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-dark-purple1-bg text-white rounded-4xl hover:scale-105 transition-all duration-300 font-medium"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
