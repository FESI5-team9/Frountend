"use client";

import { useState } from "react";
import Image from "next/image";
import { FilterDropDown } from "@/components/Filter/FilterDropDown";
import { LOCATION_OPTIONS, SORT_OPTIONS } from "@/constants/filter";
import Card from "./components/Card";

type TagType = "식당" | "카페" | "비건" | "펍바";

function Gathering() {
  const [, setSortOption] = useState(SORT_OPTIONS[0]);
  const [, setLocationOption] = useState(LOCATION_OPTIONS[0]);
  const [, setTagSelect] = useState<TagType>("식당");

  const handleSortFilter = (selectedOption: string) => {
    setSortOption(selectedOption);
  };

  const handleLocationFilter = (selectedOption: string) => {
    setLocationOption(selectedOption);
  };
  const handleTagHandler = (selectedOption: TagType) => {
    setTagSelect(selectedOption);
  };

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col justify-between bg-gray-backgroundBright px-2 py-[59px] tablet:w-[744px] tablet:justify-start tablet:px-1.5 desktop:w-[1200px] desktop:px-0">
      <div className="mb-10 flex flex-row items-center gap-4 px-2 tablet:px-0">
        <Image src="/images/mainPage/head.svg" width={72} height={72} alt="head" />
        <div>
          <h4 className="pb-2 text-sm">함꼐 힐 사람이 없나요?</h4>
          <h1 className="text-2xl">지금 모임에 참여해보세요</h1>
        </div>
      </div>
      <div className="mb-2 flex justify-between border-b-2 px-2 pb-2 tablet:px-0">
        <ul className="flex gap-3 text-lg tablet:justify-between">
          <li
            className="flex list-none items-center gap-[2px]"
            onClick={() => {
              handleTagHandler("식당");
            }}
          >
            <p>식당</p>
            <Image
              src="/images/mainPage/category/restaurant-black.svg"
              alt="category-food"
              width={18}
              height={20}
              className="hidden tablet:block"
            />
          </li>
          <li
            className="flex list-none items-center gap-[2px]"
            onClick={() => {
              handleTagHandler("카페");
            }}
          >
            <div>카페</div>
            <Image
              src="/images/mainPage/category/cafe-gray.svg"
              alt="category-cafe"
              width={18}
              height={20}
              className="hidden tablet:block"
            />
          </li>
          <li className="flex list-none items-center gap-[2px]">
            <div>카페</div>
            <Image
              src="/images/mainPage/category/cafe-gray.svg"
              alt="category-cafe"
              width={18}
              height={20}
              className="hidden tablet:block"
            />
          </li>
          <li className="flex list-none items-center gap-[2px]">
            <div>카페</div>
            <Image
              src="/images/mainPage/category/cafe-gray.svg"
              alt="category-cafe"
              width={18}
              height={20}
              className="hidden tablet:block"
            />
          </li>
        </ul>
        <button className="w-[127px] rounded-lg bg-yellow-primary p-2 !text-black">
          모임 만들기
        </button>
      </div>
      <div className="mt-2 flex flex-row justify-between tablet:mt-4">
        <div className="flex flex-row tablet:gap-4">
          <FilterDropDown
            filterType="sortFilter"
            options={LOCATION_OPTIONS}
            handleFilter={handleLocationFilter}
          />
          <FilterDropDown
            filterType="sortFilter"
            options={LOCATION_OPTIONS}
            handleFilter={handleLocationFilter}
          />
        </div>
        <FilterDropDown
          filterType="sortFilter"
          options={SORT_OPTIONS}
          handleFilter={handleSortFilter}
        />
      </div>
      {/* 컴포넌트 박스 */}
      <div className="mt-5 flex flex-col gap-4">
        {/* 컴포넌트 */}
        {/* 카드 리스트 */}
        <div className="mt-5 flex flex-col gap-4 p-2">
          {Array(9)
            .fill(null)
            .map((_, idx) => (
              <Card key={idx} />
            ))}
        </div>
      </div>
    </main>
  );
}

export default Gathering;
