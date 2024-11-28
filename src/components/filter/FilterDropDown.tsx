"use client";

import { useState } from "react";
import Dropdown from "./Dropdown";
import FilterButton from "./FilterButton";

export function FilterDropDown({ filterType, options, handleFilter }: DropDownProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (textContent: string) => {
    setSelectedOption(textContent);
    handleFilter(textContent);
  };

  const handleFilterButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <FilterButton
        selectedOption={selectedOption}
        filterType={filterType}
        onClick={handleFilterButtonClick}
      />

      <Dropdown
        options={options}
        isOpen={isOpen}
        selectedOption={selectedOption}
        handleOptionSelect={handleOptionSelect}
        filterType={filterType}
      />
    </div>
  );
}
