"use client";

// URL에서 검색 파라미터 가져오기
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button/Button";
import { categories } from "../../../constants/categoryList";
import CreateClub from "./CreateClub";

export default function SelectedType() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL에서 type 파라미터를 읽어 초기화
  useEffect(() => {
    const typeParam = searchParams.get("type"); // "type" 파라미터 값 가져오기
    if (typeParam) {
      setSelectedCategory(typeParam); // URL 값으로 상태 업데이트
    }
  }, [searchParams]);

  // 태그 바꾸기
  const handleTagHandler = (selectedOption: string) => {
    const newCategory = selectedCategory === selectedOption ? "" : selectedOption;
    setSelectedCategory(newCategory);
    const currentParams = new URLSearchParams(window.location.search);

    if (newCategory === "") {
      currentParams.delete("type");
    } else {
      currentParams.set("type", newCategory);
    }
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="mb-2 flex justify-between border-b-2 px-2 pb-2 tablet:px-0">
      <CreateClub isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <ul className="flex gap-3 p-2 text-lg tablet:justify-between tablet:gap-4">
        {categories.map(category => (
          <li
            key={category.name}
            className={`flex list-none items-center gap-[3px] border-b-2 hover:cursor-pointer ${
              selectedCategory === category.link
                ? `border-black text-black`
                : "border-transparent text-gray-400"
            }`}
            onClick={() => handleTagHandler(category.link)} // 링크와 선택된 카테고리 전달
          >
            <p>{category.name}</p>
            <Image
              src={selectedCategory === category.link ? category.icon : category.disabled}
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
          // console.log(isModalOpen);
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
