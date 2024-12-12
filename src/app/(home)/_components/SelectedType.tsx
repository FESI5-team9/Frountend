"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button/Button";
import { categories } from "../../../constants/categoryList";
import CreateClub from "./CreateGathering";

export default function SelectedType() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>({});
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL에서 초기 필터 값 설정
  useEffect(() => {
    const params: Record<string, string | null> = {};
    searchParams.forEach((value, key) => {
      params[key] = value; // URL의 모든 쿼리 파라미터를 객체로 저장
    });
    setSelectedFilters(params);
  }, [searchParams]);

  // 필터 변경 핸들러
  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...selectedFilters };

    // 동일한 값 클릭 시 제거
    if (updatedFilters[key] === value) {
      updatedFilters[key] = null;
    } else {
      updatedFilters[key] = value;
    }

    setSelectedFilters(updatedFilters);

    // URL 파라미터 업데이트
    const currentParams = new URLSearchParams(window.location.search);
    if (updatedFilters[key] === null) {
      currentParams.delete(key); // 해당 키 삭제
    } else {
      currentParams.set(key, updatedFilters[key]!); // 해당 키 업데이트
    }

    const newUrl = `?${currentParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="mb-2 flex justify-between border-b-2 pb-2">
      <CreateClub isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <ul className="flex gap-3 p-2 text-lg tablet:justify-between tablet:gap-4">
        {categories.map(category => (
          <li
            key={category.name}
            className={`flex list-none items-center gap-[3px] border-b-2 hover:cursor-pointer ${
              selectedFilters.type === category.link
                ? `border-black text-black`
                : "border-transparent text-gray-400"
            }`}
            onClick={() => handleFilterChange("type", category.link)} // 여긴 그대로 두셔도 돼요!
          >
            <p>{category.name}</p>
            <Image
              src={selectedFilters.type === category.link ? category.icon : category.disabled}
              alt={category.alt}
              width={18}
              height={20}
              className="hidden h-[20px] w-[18px] object-contain tablet:block"
            />
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
        size="small"
        bgColor="yellow"
        className="w-[127px] cursor-pointer focus:outline-none"
      >
        모임 만들기
      </Button>
    </div>
  );
}
