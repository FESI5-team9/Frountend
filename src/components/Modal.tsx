"useClient";

import { useEffect } from "react";
import { ModalProps } from "@/types/components/modalPopup";

export default function Modal({ title, isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-scroll bg-black bg-opacity-50">
      <div className="flex max-h-[80vh] w-96 flex-col gap-4 rounded-lg bg-white p-4 shadow-lg">
        <div className="flex flex-row justify-between">
          <div className="text-lg font-semibold">{title}</div>
          <button
            className="right-2 top-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Close Modal"
          >
            ✖️
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
