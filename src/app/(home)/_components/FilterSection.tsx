"use client";

// React Query
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useQueryBuilder from "@/hooks/useUrlParams";
import DropdownCalendar from "@/components/Calendar/DropdownCalendar";
import { FilterDropDown } from "@/components/Filter/FilterDropDown";
import { DIRECTION_OPTIONS, LOCATION_OPTIONS } from "@/constants/filter";

export default function FilterSection() {
  const [, setLocationOption] = useState("");
  const queryClient = useQueryClient(); // React Query의 QueryClient
  const updateQueryParams = useQueryBuilder(); // URL 파라미터 관리 훅

  // 선택된 옵션의 영문 값을 반환하는 함수

  // 필터 변경 후 React Query 갱신
  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["gatherings"] }); // 캐싱된 데이터 무효화
  };

  // 지역 변경 핸들러
  const handleLocationFilter = (selectedOption: string) => {
    setLocationOption(selectedOption);
    updateQueryParams({ location: selectedOption });
    refreshData();
  };

  // 정렬 방향 변경 핸들러
  const handleDirectionFilter = (selectedOption: string) => {
    setLocationOption(selectedOption);
    updateQueryParams({ direction: selectedOption });
    refreshData();
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
        <DropdownCalendar />
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
