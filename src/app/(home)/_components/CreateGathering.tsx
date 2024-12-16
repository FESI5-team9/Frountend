"use client";

import { useEffect, useState } from "react";
import {
  CreateGatheringFormData,
  handleAddressSelect,
  handleChange,
  handleFileChange,
  handleKeywordAddition,
  handleKeywordChange,
  handleSubmit,
  handleTimeSelect,
} from "@/hooks/CreateGathering/fromHandlers";
import Button from "@/components/Button/Button";
import Calendar from "@/components/Calendar/Calendar";
import Kakao from "@/components/Kakaomap/Kakao";
import Modal from "@/components/Modal";
import useDateStore from "@/store/dateStore";
import { amTime, categories, pmTime } from "../../../constants/categoryList";
import { Input } from "./Input";

export default function CreateGathering({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState<CreateGatheringFormData>({
    name: "",
    type: "RESTAURANT",
    location: "",
    dateTime: "",
    capacity: 0, //모집정원(최소 5인 이상)
    description: "",
    address1: "",
    address2: "",
    keyword: [] as string[], // 키워드 리스트
  });
  const [selectedDate] = useState<Date>(); // 선택된 날짜
  const [selectedTime, setSelectedTime] = useState<string>(""); // 선택된 시간
  const [, setSelectedAddress] = useState({
    location: "",
    address1: "",
    address2: "",
  });
  const [selectedService, setSelectedService] = useState("식당");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 주소
  const [keywordInput, setKeywordInput] = useState("");
  const { firstDate } = useDateStore();

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  // 날짜가 변경되었을 때 formData 업데이트
  useEffect(() => {
    if (firstDate) {
      setFormData(prev => ({
        ...prev,
        dateTime: `${firstDate.split("T")[0]}${selectedTime ? `T${selectedTime}:00` : ""}`,
      }));
    }
  }, [firstDate, selectedTime]); // firstDate, secondDate, selectedTime 변경 시 실행

  return (
    <Modal title="모임 만들기" isOpen={isOpen} onClose={handleCloseModal}>
      <form
        onSubmit={e => handleSubmit(e, formData, setIsOpen)}
        className="flex flex-col gap-4 overflow-y-scroll pb-4"
      >
        <div className="mt-2 flex w-full flex-col gap-1">
          <div>모임 이름</div>
          <Input
            type="text"
            name="name"
            value={formData.name}
            placeholder="모임이름을 정해주세요"
            onChange={e => handleChange(e, setFormData)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <div>장소</div>
          <div className="relative flex items-center">
            {/* 장소 입력 필드 */}
            <div className="flex-1 rounded-lg border border-none border-gray-400 bg-gray-100 px-2 py-2">
              {formData.address2 ? (
                formData.address2
              ) : (
                <p className="text-gray-400">장소를 선택해주세요</p>
              )}
            </div>

            {/* 🔍 버튼 */}
            <button
              className="absolute right-2"
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              🔍
            </button>
          </div>

          {isSearchOpen && (
            <div className="">
              <Kakao
                onAddressSelect={(location, address1, address2) =>
                  handleAddressSelect(
                    location,
                    address1,
                    address2,
                    setSelectedAddress,
                    setFormData,
                    setIsSearchOpen,
                  )
                }
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h1>이미지</h1>
          <div className="flex flex-row gap-2">
            <div className="flex-1 rounded-lg border border-none border-gray-400 bg-gray-100 px-2 py-2 text-gray-400">
              {formData.image ? formData.image.name : "이미지를 첨부해주세요"}
            </div>

            {/* 숨겨진 파일 입력 */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={e => handleFileChange(e, setFormData)}
            />

            {/* 커스텀 버튼 */}
            <button
              type="button"
              onClick={handleButtonClick}
              className="rounded-lg border border-orange-400 bg-white px-4 py-2 text-orange-400 hover:bg-orange-100"
            >
              파일 찾기
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1>선택 서비스</h1>
          <div className="flex gap-2">
            {categories.map((category, index) => (
              <button
                type="button"
                key={index}
                name="type"
                onClick={() => {
                  setSelectedService(category.name); // 선택된 서비스 업데이트
                  setFormData(prev => ({
                    ...prev,
                    type: category.link, // formData의 type 업데이트
                  }));
                }}
                className={`flex items-center gap-2 rounded-lg px-[10px] py-[5px] font-medium ${
                  selectedService === category.name
                    ? "border border-black bg-black text-white"
                    : "border border-gray-300 bg-gray-100 text-black"
                }`}
              >
                {/* 체크 아이콘 */}
                <span className="flex h-5 w-5 items-center justify-center rounded-xl border border-gray-300 bg-white">
                  <span
                    className={`${selectedService === category.name ? "text-orange-500" : "hidden"}`}
                  >
                    ✔
                  </span>
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1> 날짜</h1>
          <div className="flex w-full justify-center border">
            {/* multipleDates : 날짜 두 가지 선택 유무 옵션 */}
            <Calendar multipleDates={false} />
          </div>
          <p>오전</p>
          {/* 시간 선택 Chips */}
          <div className="flex gap-1">
            {amTime.map((time, index) => (
              <button
                key={index}
                type="button" // 선택된 시간 강조
                onClick={() => handleTimeSelect(time, selectedDate, setSelectedTime, setFormData)}
                className={`${selectedTime === time ? `bg-yellow-primary` : ""} rounded-lg border p-1`}
              >
                {time}
              </button>
            ))}
          </div>
          <p>오후</p>
          {/* 시간 선택 Chips */}
          <div className="flex gap-1 overflow-x-scroll">
            {pmTime.map((time, index) => (
              <button
                key={index}
                type="button" // 선택된 시간 강조
                onClick={() => handleTimeSelect(time, selectedDate, setSelectedTime, setFormData)}
                className={`${selectedTime === time ? `bg-yellow-primary` : ""} rounded-lg border p-1`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <h2>모집 정원</h2>
          <Input
            type="number"
            value={formData.capacity}
            name="capacity"
            onChange={e => handleChange(e, setFormData)}
          ></Input>
        </div>
        <div className="flex w-full flex-col">
          <h2>최소 인원</h2>
          <Input
            type="number"
            value={formData.openParticipantCount}
            name="openParticipantCount"
            onChange={e => handleChange(e, setFormData)}
          ></Input>
        </div>

        <div className="flex w-full flex-col">
          <div>description</div>
          <textarea
            value={formData.description}
            name="description"
            onChange={e => handleChange(e, setFormData)}
            className="rounded-lg border border-none border-gray-400 bg-gray-100 py-1"
          ></textarea>
        </div>
        <div>
          <p>키워드</p>
          <div className="mb-1 flex h-[30px] w-full flex-row gap-1">
            {Array.isArray(formData.keyword) &&
              formData.keyword.map((word, index) => (
                <div key={index} className="flex rounded-2xl border bg-yellow-200 px-2 py-1">
                  {word}
                </div>
              ))}
          </div>
          <Input
            name="keywords"
            placeholder="Enter keywords with #"
            value={keywordInput} // 동적으로 입력값 관리
            onChange={e => {
              handleKeywordChange(e.target.value, setKeywordInput); // 입력값 업데이트
              handleKeywordAddition(e.target.value, setFormData, setKeywordInput); // 키워드 추가
            }}
          />
        </div>

        <Button type="submit" bgColor="yellow">
          확인
        </Button>
      </form>
      <div className="border-t-1 mt-2 border">
        <p>모임 이름 : {formData.name}</p>
        <p>Location(서울): {formData.location}</p>
        <p>address1(서울 중구): {formData.address1}</p>
        <p>address2(풀 주소): {formData.address2}</p>
        <h2>선택한 날짜와 시간</h2>
        <p>날짜: {formData.dateTime || "선택되지 않음"}</p>
        <p>선택서비스 :{formData.type}</p>
        <p>모집 정원 : {formData.capacity}</p>
        <p>최소 인원 : {formData.openParticipantCount}</p>
        <p>
          <strong>Keywords:</strong>{" "}
          {Array.isArray(formData.keyword) && formData.keyword?.join(", ")}
        </p>
      </div>
    </Modal>
  );
}
