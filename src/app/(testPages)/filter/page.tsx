"use client";

import { useState } from "react";
import { FilterDropDown } from "@/components/FilterDropDown";

export default function Page() {
  const [sortOption, setSortOption] = useState("");
  const [locationOption, setLocationOption] = useState("");

  const handleSortFilter = (selectedOption: string) => {
    setSortOption(selectedOption);
  };

  const handleLocationFilter = (selectedOption: string) => {
    setLocationOption(selectedOption);
  };

  return (
    <div className="h-screen bg-slate-300">
      <div className="flex">
        <FilterDropDown filterType="sort" handleFilter={handleSortFilter} />
        <FilterDropDown filterType="location" handleFilter={handleLocationFilter} />
      </div>
      <div>
        <h1>선택된 값들</h1>
        <p>sort: {sortOption}</p>
        <p>location: {locationOption}</p>
      </div>
    </div>
  );
}
