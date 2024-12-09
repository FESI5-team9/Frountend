"use client";

import { useState } from "react";
import useQueryBuilder from "@/hooks/useUrlParams";
import { FilterDropDown } from "@/components/Filter/FilterDropDown";
import { DIRECTION_OPTIONS, LOCATION_OPTIONS, SORT_OPTIONS } from "@/constants/filter";

export default function FilterSection() {
  const [, setSortOption] = useState("");
  const [, setLocationOption] = useState("");
  const updateQueryParams = useQueryBuilder();

  const handleSortFilter = (selectedOption: string) => {
    setSortOption(selectedOption);
    updateQueryParams({ sortBy: selectedOption });
  };

  const handleLocationFilter = (selectedOption: string) => {
    setLocationOption(selectedOption);
    updateQueryParams({ location: selectedOption });
  };
  const handleDirectionFilter = (selectedOption: string) => {
    setLocationOption(selectedOption);
    updateQueryParams({ direction: selectedOption });
  };
  return (
    <div className="mt-2 flex flex-row justify-between tablet:mt-4">
      <div className="flex flex-row tablet:gap-4">
        <FilterDropDown
          filterType="selectionFilter"
          options={LOCATION_OPTIONS}
          onSelectFilterOption={handleLocationFilter}
        />
        <FilterDropDown
          filterType="sortFilter"
          options={SORT_OPTIONS}
          onSelectFilterOption={handleSortFilter}
        />
      </div>
      <FilterDropDown
        filterType="sortFilter"
        options={DIRECTION_OPTIONS}
        onSelectFilterOption={handleDirectionFilter}
      />
    </div>
  );
}
