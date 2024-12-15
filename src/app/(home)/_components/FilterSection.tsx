"use client";

import { useState } from "react";
import useQueryBuilder from "@/hooks/useUrlParams";
import { FilterDropDown } from "@/components/Filter/FilterDropDown";
import { DIRECTION_OPTIONS, LOCATION_OPTIONS, SORT_OPTIONS } from "@/constants/filter";

export default function FilterSection() {
  const [, setSortOption] = useState("");
  const [, setLocationOption] = useState("");
  const updateQueryParams = useQueryBuilder();

  // 선택된 옵션의 영문 값을 반환하는 함수
  const getEnglishValue = (options: { ko: string; eng: string }[], selectedOption: string) => {
    const foundOption = options.find(option => option.ko === selectedOption); // 한글로 검색
    return foundOption ? foundOption.eng : ""; // 영어 값 반환
  };

  // 정렬 기준 변경 핸들러
  const handleSortFilter = (selectedOption: string) => {
    const englishValue = getEnglishValue(SORT_OPTIONS, selectedOption);
    setSortOption(englishValue);
    updateQueryParams({ sort: englishValue }); // URL에 영문 값 반영
  };

  // 지역 변경 핸들러
  const handleLocationFilter = (selectedOption: string) => {
    const englishValue = getEnglishValue(LOCATION_OPTIONS, selectedOption);
    setLocationOption(englishValue);
    updateQueryParams({ location: englishValue }); // URL에 영문 값 반영
  };

  // 정렬 방향 변경 핸들러
  const handleDirectionFilter = (selectedOption: string) => {
    const englishValue = getEnglishValue(DIRECTION_OPTIONS, selectedOption);
    setLocationOption(englishValue);
    updateQueryParams({ direction: englishValue }); // URL에 영문 값 반영
  };

  return (
    <div className="mt-2 flex flex-row justify-between tablet:mt-4">
      <div className="flex flex-row tablet:gap-4">
        {/* 지역 필터 */}
        <FilterDropDown
          filterType="selectionFilter"
          options={LOCATION_OPTIONS}
          onSelectFilterOption={handleLocationFilter}
        />
        {/* 정렬 기준 필터 */}
        <FilterDropDown
          filterType="sortFilter"
          options={SORT_OPTIONS}
          onSelectFilterOption={handleSortFilter}
        />
      </div>
      {/* 정렬 방향 필터 */}
      <FilterDropDown
        filterType="sortFilter"
        options={DIRECTION_OPTIONS}
        onSelectFilterOption={handleDirectionFilter}
      />
    </div>
  );
}
