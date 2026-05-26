"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

type OnboardingImagePreviewProps = {
  url: string;
  alt: string;
  onDelete: () => void;
  isDeleting: boolean;
  deleteDisabled?: boolean;
};

export function OnboardingImagePreview({
  url,
  alt,
  onDelete,
  isDeleting,
  deleteDisabled = false,
}: OnboardingImagePreviewProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, closeLightbox]);

  return (
    <>
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B46F8]"
          aria-label={`View: ${alt}`}
        >
          <Image src={url} alt={alt} fill className="object-cover" unoptimized />
        </button>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-[#7B46F8] hover:text-[#6a3de0]"
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
            className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close preview"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="relative max-h-[90vh] max-w-[min(100%,56rem)] w-full aspect-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[min(90vh,720px)] w-full">
              <Image
                src={url}
                alt={alt}
                fill
                className="object-contain"
                unoptimized
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
