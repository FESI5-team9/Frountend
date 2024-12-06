"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import Calendar from "@/components/Calendar/Calendar";
import Kakao from "@/components/Kakaomap/Kakao";
import Modal from "@/components/Modal";
import { amTime, pmTime } from "../../../constants/categoryList";

export default function CreateClub({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    image: null as File | null,
    dateTime: "",
    capacity: 0,
    registrationEnd: "",
    // deadline: "",
    description: "",
    address1: "",
    address2: "",
    keywords: [] as string[], // 키워드 리스트
  });
  const [selectedDate, setSelectedDate] = useState<string>(""); // 선택된 날짜
  const [selectedTime, setSelectedTime] = useState<string>(""); // 선택된 시간
  const [endDate] = useState<string>("");

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 주소 업데이트 핸들러
  const handleAddressSelect = (address1: string, address2: string) => {
    setFormData(prev => ({
      ...prev,
      address1,
      address2,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files && e.target.files[0],
      }));
    }
  };
  // 모이는 날짜 핸들러
  const handleDateSelect = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);

    if (selectedTime) {
      setFormData(prev => ({
        ...prev,
        dateTime: `${formattedDate}T${selectedTime}:00`,
      }));
    }
  };

  // 시간 선택 핸들러
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);

    // 날짜와 시간이 모두 선택되었을 때 `formData.dateTime` 업데이트
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        dateTime: `${selectedDate}T${time}:00`,
      }));
    }
  };
  // 등록 마감일 핸들러
  // const handleEndDateSelect = (date: Date) => {
  //   const formattedDate = date.toISOString().split("T")[0];
  //   setEndDate(formattedDate);

  //   setFormData(prev => ({
  //     ...prev,
  //     registrationEnd: formattedDate,
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value as string | Blob);
      }
    });

    try {
      const response = await fetch("/api/create-club", {
        method: "POST",
        body: formDataToSend,
      });
      // console.log(formData);
      if (response.ok) {
        alert("모임이 성공적으로 생성되었습니다!");
        setIsOpen(false);
      } else {
        alert("모임 생성 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      //   alert("서버와 연결할 수 없습니다.");
      // console.log(formData);
    }
  };

  return (
    <Modal title="모임 만들기" isOpen={isOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-scroll pb-4">
        <div className="mt-2 flex w-full flex-col gap-1">
          <div>모임 이름</div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-lg border border-none border-gray-400 bg-gray-100 py-1"
          ></input>
        </div>
        {/* <div className="mt-2 flex w-full flex-col gap-1">
          <div>모임 장소</div>
          <input
            type="text"
            name="name"
            value={formData.location}
            onChange={handleChange}
            className="rounded-lg border border-none border-gray-400 bg-gray-100 py-1"
          ></input>
        </div> */}

        <div className="mt-2 flex w-full flex-col gap-1">
          <div>모임 서비스 종류</div>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="rounded-lg border border-none border-gray-400 bg-gray-100 py-1"
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <h1>이미지</h1>
          <div>
            <input
              type="file"
              className="rounded-lg border border-none border-gray-400 bg-gray-100 py-1"
              name="image"
              onChange={handleFileChange}
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1>모이는 날짜</h1>
          <div className="flex w-full justify-center border">
            <Calendar handleDateSelect={handleDateSelect} />
          </div>
          <p>오전</p>
          {/* 시간 선택 Chips */}
          <div className="flex gap-2">
            {amTime.map((time, index) => (
              <button
                key={index}
                type="button" // 선택된 시간 강조
                onClick={() => handleTimeSelect(time)}
                className={`${selectedTime === time ? `bg-yellow-primary` : ""} rounded-lg border p-1`}
              >
                {time}
              </button>
            ))}
          </div>
          <p>오후</p>
          {/* 시간 선택 Chips */}
          <div className="flex gap-2 overflow-x-scroll">
            {pmTime.map((time, index) => (
              <button
                key={index}
                type="button" // 선택된 시간 강조
                onClick={() => handleTimeSelect(time)}
                className={`${selectedTime === time ? `bg-yellow-primary` : ""} rounded-lg border p-1`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <h2>모집 정원</h2>
          <input
            type="number"
            value={formData.capacity}
            name="capacity"
            onChange={handleChange}
            className="rounded-lg border border-none border-gray-400 bg-gray-100 py-1"
          ></input>
        </div>

        <div className="z-50 mt-2 flex w-full flex-col gap-1">
          {/* <div>
            장소 선택{" "} */}
          {/* <button
              type="button"
              onClick={() => {
                setOpenSearch(!openSearch);
              }}
            >
              🔍
            </button> */}
          {/* </div> */}
          <div className="h-[400px] w-full overflow-hidden">
            <Kakao onAddressSelect={handleAddressSelect} />
            {/* <KakaoMap onAddressSelect={handleAddressSelect} /> */}
          </div>
        </div>

        <div className="flex w-full flex-col">
          <div>description</div>
          <textarea
            value={formData.description}
            name="description"
            onChange={handleChange}
            className="rounded-lg border border-none border-gray-400 bg-gray-100 py-1"
          ></textarea>
        </div>
        <div>
          <p>키워드</p>
        </div>

        <Button type="submit" bgColor="yellow">
          확인
        </Button>
      </form>
      <div className="mt-4">
        <h2>선택한 날짜와 시간</h2>
        <p>날짜: {selectedDate || "선택되지 않음"}</p>
        <p>시간: {selectedTime || "선택되지 않음"}</p>
        <p>엔드날짜 : {endDate}</p>
        <p>결과: {formData.dateTime || "날짜와 시간을 선택하세요"}</p>
        <h2>선택한 주소</h2>
        <p>주소 1: {formData.address1}</p>
        <p>주소 2: {formData.address2}</p>
      </div>
    </Modal>
  );
}
