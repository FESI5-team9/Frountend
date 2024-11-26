"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import Popup from "@/components/Popup";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex h-[100vh] flex-row items-center justify-center">
      {/* 모달 */}
      <div className="flex gap-4">
        <button
          onClick={handleOpenModal}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Open Modal
        </button>
        <button
          onClick={handleOpenPopup}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Open Popup
        </button>
      </div>
      {/* props 써야할 것 : title,isOpen,onClose함수,props(모달 컴포넌트 안에 들어갈) */}
      <Modal title="하이" isOpen={isModalOpen} onClose={handleCloseModal}>
        <p className="text-gray-700">Modal content goes here!</p>
        <button
          onClick={handleCloseModal}
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Close Modal
        </button>
      </Modal>

      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <h2 className="mb-4 text-lg font-semibold">프롭스 제목이구여</h2>
        <p className="text-gray-700">이건 내용입니다.</p>
        <div>
          <input type="text" placeholder="ㅎㅇ" />
          <button>버튼!</button>
        </div>
        <div>
          <input type="text" placeholder="ㅎㅇ" />
          <button>버튼!</button>
        </div>
        <div>
          <input type="text" placeholder="ㅎㅇ" />
          <button>버튼!</button>
        </div>
        <div className="">
          <input type="text" placeholder="ㅎㅇ" />
          <button>버튼!</button>
          <button>버튼!</button>
          <button>버튼!</button>
          <button>버튼!</button>
          <button>버튼!</button>
        </div>
      </Popup>
    </div>
  );
}
