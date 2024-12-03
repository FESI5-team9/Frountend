"use client";

import React, { useEffect, useRef } from "react";
import { PopupProps } from "@/types/components/modalPopup";

const popupControls: { [key: string]: (isOpen: boolean) => void } = {};

export default function Popup({ id, isOpen, onClose, children }: PopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef(() => onClose());

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    if (id) {
      popupControls[id] = controlRef.current;
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose, id]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="relative w-96 rounded-lg bg-white p-6 shadow-lg" ref={modalRef}>
        {children}
      </div>
    </div>
  );
}
