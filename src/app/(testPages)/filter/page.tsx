"use client";

import { useState } from "react";
import { FilterDropDown } from "@/components/FilterDropDown";
import { LOCATION_OPTIONS, SORT_OPTIONS } from "@/constants/filter";

export default function Page() {
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
  const [locationOption, setLocationOption] = useState(LOCATION_OPTIONS[0]);

  const handleSortFilter = (selectedOption: string) => {
    setSortOption(selectedOption);
  };

  const handleLocationFilter = (selectedOption: string) => {
    setLocationOption(selectedOption);
  };

  // 데이터 받아오거나 다른 옵션 적용한 필터 쓰고싶을 때
  const otherOptions = ["option1", "option2", "option3"];
  const [otherOption, setOtherOption] = useState(otherOptions[0]);

  const handleOtherOptionFilter = (selectedOption: string) => {
    setOtherOption(selectedOption);
  };

  return (
    <div className="h-screen bg-slate-300">
      <div className="flex">
        <FilterDropDown
          filterType="sortFilter"
          options={SORT_OPTIONS}
          handleFilter={handleSortFilter}
        />
        <FilterDropDown
          filterType="selectionFilter"
          options={LOCATION_OPTIONS}
          handleFilter={handleLocationFilter}
        />
        {/* 다른 옵션 */}
        <FilterDropDown
          filterType="selectionFilter"
          options={otherOptions}
          handleFilter={handleOtherOptionFilter}
        />
      </div>
      <div>
        <h1>선택된 값들</h1>
        <p>sort: {sortOption}</p>
        <p>location: {locationOption}</p>
        <p>other: {otherOption}</p>
      </div>
    </div>
  );
}
