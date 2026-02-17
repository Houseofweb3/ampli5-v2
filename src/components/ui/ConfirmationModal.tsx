"use client";
import React, { useEffect, useRef } from "react";
import useOutsideClick from "@/src/hooks/useOutsideClick";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-dark-purple1-bg text-white",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle outside click
  useOutsideClick({
    ref: modalRef as React.RefObject<HTMLElement>,
    onOutsideClick: onClose,
  });

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 md:p-8 animate-in fade-in-0 zoom-in-95"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-white text-dark-purple1-bg border-2 border-dark-purple1-bg rounded-4xl hover:scale-105 transition-all duration-300 font-medium"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-2 ${confirmButtonClass} rounded-4xl hover:scale-105 transition-all duration-300 font-medium`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
