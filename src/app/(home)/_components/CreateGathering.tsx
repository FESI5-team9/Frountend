"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  CreateGatheringFormData,
  handleKeywordAdditionTest,
  handleKeywordChange,
  handleKeywordDelete,
  handleNumberChange,
  handleSubmitToServer,
  validateCapacityAndParticipant,
} from "@/hooks/CreateGathering/formHandler";
import Button from "@/components/Button/Button";
import Calendar from "@/components/Calendar/Calendar";
import Kakao from "@/components/Kakaomap/Kakao";
import Modal from "@/components/Modal";
import useDateStore from "@/store/dateStore";
import { timeChips } from "../../../constants/categoryList";
import { Input } from "./Input";

export default function CreateGathering({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 주소 검색 상태
  const [selectedTime, setSelectedTime] = useState<string>(""); // 선택된 시간
  const [keywordValue, setKeywordValue] = useState("");
  const { firstDate } = useDateStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateGatheringFormData>({
    defaultValues: {
      name: "",
      type: "RESTAURANT",
      location: "",
      address1: "",
      address2: "",
      dateTime: "",
      capacity: 0,
      openParticipantCount: 0,
      description: "",
    },
  });

  const keywords = watch("keyword") || [];

  useEffect(() => {
    if (firstDate && selectedTime) {
      setValue("dateTime", `${firstDate.split("T")[0]}T${selectedTime}:00`);
    }
  }, [firstDate, selectedTime, setValue]);

  return (
    <Modal title="모임 만들기" isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <form
        onSubmit={handleSubmit(data => handleSubmitToServer(data, setIsOpen))}
        className="flex flex-col gap-4 overflow-y-scroll pb-6 font-medium"
      >
        {/* 모임 이름 */}
        <div className="flex w-full flex-col gap-1">
          <p>모임 이름</p>
          <Input
            {...register("name", { required: "모임 이름은 필수 입력입니다." })}
            placeholder="모임 이름을 입력하세요"
            className={`rounded-lg p-2 ${errors.name ? "border-red-500" : "border-green-500"}`}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* 장소 */}
        <div className="flex w-full flex-col gap-1">
          <p>장소</p>
          <div
            className="relative flex items-center hover:cursor-pointer"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
            }}
          >
            <Input
              placeholder="장소를 선택해주세요"
              readOnly
              {...register("location", {
                required: "모임 이름은 필수에요.",
                onChange: e => {
                  e.stopPropagation();
                },
              })}
              className={`flex-1 rounded-lg border bg-gray-100 px-2 py-2 hover:cursor-pointer ${
                errors.name ? "border-red-500" : "border-green-500"
              }`}
            />
            <button className="absolute right-2" type="button">
              <Image src="/icons/magnifier.svg" alt="searchImage" width={20} height={20} />
            </button>
          </div>
          {isSearchOpen && (
            <Kakao
              onAddressSelect={(location, address1, address2) => {
                setValue("location", location);
                setValue("address1", address1);
                setValue("address2", address2);
                setIsSearchOpen(false);
              }}
            />
          )}
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        </div>

        {/* 이미지 업로드 */}
        <div className="flex flex-col gap-1">
          <p>이미지</p>
          <div className="flex flex-row gap-2">
            {/* 파일 이름 표시 */}

            <div className="flex-1 rounded-lg border border-none border-gray-400 bg-gray-100 px-2 py-2 text-gray-400">
              {watch("image")?.name || "이미지를 첨부해주세요"}
            </div>

            {/* 숨겨진 파일 입력 */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              {...register("image", {
                validate: files => {
                  if (!files) return "파일을 선택해주세요.";
                  if (files.size > 5 * 1024 * 1024) return "이미지는 5MB 이하만 업로드 가능합니다.";
                  return true; // 유효한 경우
                },
              })}
            />

            {/* 커스텀 버튼 */}
            <button
              type="button"
              onClick={() => document.getElementById("fileInput")?.click()}
              className="rounded-lg border border-orange-400 bg-white px-4 py-2 text-orange-400 hover:bg-orange-100"
            >
              파일 찾기
            </button>
          </div>
          {/* 에러 메시지 */}
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>
        {/* 날짜 */}
        <div className="flex flex-col gap-1">
          <p>날짜</p>
          <div className="flex w-full justify-center border">
            <Calendar multipleDates={false} />
          </div>
        </div>

        {/* 시간 */}
        <div className="flex flex-col gap-1">
          <p>시간</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2 overflow-x-scroll">
            {timeChips.map((time, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedTime(time);
                  setValue("dateTime", `${firstDate}T${time}:00`);
                }}
                className={`${selectedTime === time ? `bg-gray-700 text-white` : "bg-gray-100"} flex h-[30px] w-[57px] items-center justify-center rounded-lg border p-1 hover:cursor-pointer ${
                  errors.name ? "border-red-500" : "border-green-500"
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* 모집 정원 */}
        <div className="flex w-full flex-col">
          <p>모집 정원</p>
          <Input
            type="number"
            placeholder="최소 5인이상 입력해주세요"
            {...register("capacity", {
              required: "모집 정원은 필수에요.",
              onChange: e => handleNumberChange("capacity", e.target.value, setValue),
              min: { value: 5, message: "최소 5명 이상이어야 해요." },
              max: { value: 1000, message: "최대 1000명까지 가능해요." },
            })}
            className={`rounded-lg border p-2 ${
              errors.name ? "border-red-500" : "border-green-500"
            }`}
          />
          {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
        </div>

        {/* 최소 인원 */}
        <div className="flex w-full flex-col">
          <p>최소 인원</p>
          <Input
            type="number"
            placeholder="최소 인원을 입력 해주세요"
            {...register("openParticipantCount", {
              required: "최소 인원은 필수에요.",
              onChange: e => handleNumberChange("openParticipantCount", e.target.value, setValue),
              min: { value: 2, message: "최소 2명 이상이어야 해요." },
              validate: value => validateCapacityAndParticipant(watch("capacity"), Number(value)),
            })}
            className={`rounded-lg border p-2 ${
              errors.name ? "border-red-500" : "border-green-500"
            }`}
          />
          {errors.openParticipantCount && (
            <p className="text-red-500">{errors.openParticipantCount.message}</p>
          )}
        </div>

        {/* 설명 */}
        <div className="flex w-full flex-col">
          <p>모임 설명</p>
          <Input
            type="text-area"
            placeholder="모임 설명을 입력 해주세요"
            {...register("description", { required: "모임 설명을 입력 해주세요." })}
            className={`rounded-lg py-1 ${errors.name ? "border-red-500" : "border-green-500"}`}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* 키워드 */}
        <div className="flex flex-col gap-1 pb-4 font-medium">
          <div className="flex flex-row items-center gap-2">
            <p>관련 해시태그</p>
            {/* 키워드 리스트 */}
            <div className="flex h-[30px] flex-row items-center gap-1">
              {keywords.map((word, index) => (
                <div
                  key={index}
                  className="group relative flex items-center rounded-xl border bg-yellow-200 px-2 py-1"
                >
                  {word}
                  {/* X표시: 기본 hidden, 그룹 호버 시 나타남 */}
                  <button
                    type="button"
                    className="absolute -right-1 -top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-white group-hover:flex"
                    onClick={() => handleKeywordDelete(index, keywords, setValue)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* 키워드 입력 */}
          <div className="flex items-center gap-2">
            <Input
              name="keywords"
              type="text"
              placeholder="#키워드 입력 후 스페이스바"
              value={keywordValue}
              onChange={e => {
                handleKeywordChange(e.target.value, setKeywordValue);
              }}
              onKeyDown={e => {
                if (e.key === " ") {
                  e.preventDefault();
                  handleKeywordAdditionTest(
                    e.currentTarget.value,
                    keywords,
                    setKeywordValue,
                    setValue,
                  );
                }
              }}
              className="w-full rounded-lg border p-2"
            />
          </div>
        </div>

        <Button type="submit" bgColor="disabled" className="py-2 hover:bg-yellow-primary">
          확인
        </Button>
      </form>
    </Modal>
  );
}
