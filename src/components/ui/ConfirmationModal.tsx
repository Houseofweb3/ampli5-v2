"use client";
import React, { useCallback, useEffect, useId, useRef } from "react";
import useOutsideClick from "@/src/hooks/useOutsideClick";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** May return a Promise; errors should be handled inside the handler when `closeOnConfirm` is false. */
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  /** When true, confirm/cancel, backdrop, and Escape are inactive (e.g. during an async delete). */
  isPending?: boolean;
  /** If true (default), `onClose` runs after `onConfirm` finishes. If false, the caller closes the modal (e.g. only on success). */
  closeOnConfirm?: boolean;
  /** `danger` uses destructive styling when `confirmButtonClass` is not overridden. */
  variant?: "default" | "danger";
  /** Label on the confirm button while `isPending` is true. */
  pendingConfirmText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass,
  isPending = false,
  closeOnConfirm = true,
  variant = "default",
  pendingConfirmText = "Please wait…",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const safeClose = useCallback(() => {
    if (isPending) return;
    onClose();
  }, [isPending, onClose]);

  // Handle outside click
  useOutsideClick({
    ref: modalRef as React.RefObject<HTMLElement>,
    onOutsideClick: safeClose,
  });

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !isPending) {
        safeClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isPending, safeClose]);

  const resolvedConfirmClass =
    confirmButtonClass ??
    (variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600"
      : "bg-dark-purple1-bg text-white");

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (isPending) return;
    const result = onConfirm();
    if (result !== undefined && result !== null && typeof (result as Promise<void>).then === "function") {
      await result;
    }
    if (closeOnConfirm) {
      safeClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="presentation"
      onClick={isPending ? undefined : safeClose}
    >
      <div
        ref={modalRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 md:p-8 animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id={titleId} className="text-xl font-bold text-gray-900 mb-4">
          {title}
        </h3>
        <p id={descId} className="text-gray-600 mb-6">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={safeClose}
            disabled={isPending}
            className="px-6 py-2 bg-white text-dark-purple1-bg border-2 border-dark-purple1-bg rounded-4xl hover:scale-105 transition-all duration-300 font-medium disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={isPending}
            className={`px-6 py-2 ${resolvedConfirmClass} rounded-4xl hover:scale-105 transition-all duration-300 font-medium disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100`}
          >
            {isPending ? pendingConfirmText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
