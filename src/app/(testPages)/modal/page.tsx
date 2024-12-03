"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import Popup from "@/components/Popup";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState<string | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenPopup = (id: string) => setIsPopupOpen(id);
  const handleClosePopup = () => setIsPopupOpen(null);

  return (
    <div className="flex h-[100vh] flex-row items-center justify-center">
      <div className="flex gap-4">
        <button
          onClick={handleOpenModal}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Open Modal
        </button>
        <button
          onClick={() => handleOpenPopup("test1")}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Open Popup 1
        </button>
        <button
          onClick={() => handleOpenPopup("test2")}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Open Popup 2
        </button>
      </div>

      <Modal title="하이" isOpen={isModalOpen} onClose={handleCloseModal}>
        <p className="text-gray-700">Modal content goes here!</p>
        <button
          onClick={handleCloseModal}
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Close Modal
        </button>
      </Modal>

      <Popup id="test1" isOpen={isPopupOpen === "test1"} onClose={handleClosePopup}>
        <h2 className="mb-4 text-lg font-semibold">프롭스 제목이구여</h2>
        <p className="text-gray-700">테스트1</p>
      </Popup>

      <Popup id="test2" isOpen={isPopupOpen === "test2"} onClose={handleClosePopup}>
        <h2 className="mb-4 text-lg font-semibold">프롭스 제목이구여</h2>
        <p className="text-gray-700">테스트2</p>
      </Popup>
    </div>
  );
}
