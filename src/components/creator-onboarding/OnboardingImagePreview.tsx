"use client";

import Image from "next/image";
import { openOnboardingFancybox } from "@/src/components/creator-onboarding/useOnboardingFancybox";

type OnboardingImagePreviewProps = {
  url: string;
  alt: string;
  onDelete: () => void;
  isDeleting: boolean;
  deleteDisabled?: boolean;
  /** `column` stacks thumbnail and actions (for grid cells in a single row). */
  layout?: "row" | "column";
};

export function OnboardingImagePreview({
  url,
  alt,
  onDelete,
  isDeleting,
  deleteDisabled = false,
  layout = "row",
}: OnboardingImagePreviewProps) {
  const handleView = () => openOnboardingFancybox(url, alt);

  return (
    <div
      className={`flex rounded-lg border border-gray-200 bg-gray-50 p-2 ${
        layout === "column" ? "flex-col items-center gap-2 text-center" : "items-center gap-3"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white ${
          layout === "column" ? "h-20 w-20" : "h-20 w-20"
        }`}
      >
        <Image src={url} alt={alt} fill className="object-cover" unoptimized />
      </div>
      <div
        className={`flex min-w-0 flex-col gap-1 ${
          layout === "column" ? "w-full items-center" : "flex-1 items-start"
        }`}
      >
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7B46F8] hover:text-[#6a3de0]"
          onClick={handleView}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={deleteDisabled || isDeleting}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Deleting...
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
}
