"use client";

import { useCallback, useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Dropdown from "@/components/Filter/Dropdown";
import FilterButton from "@/components/Filter/FilterButton";

export function FilterDropDown({ filterType, options, onSelectFilterOption }: FilterDropdownProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionSelect = useCallback(
    (option: OptionType) => {
      setSelectedOption(option);
      onSelectFilterOption(option.ko);
      setIsOpen(false);
    },
    [onSelectFilterOption],
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const closeDropdown = () => {
    if (isOpen) setIsOpen(false);
  };

  useClickOutside(dropdownRef, closeDropdown);

  return (
    <div ref={dropdownRef}>
      <FilterButton
        selectedOption={selectedOption}
        filterType={filterType}
        onToggle={toggleDropdown}
      />

      <Dropdown
        options={options}
        isOpen={isOpen}
        selectedOption={selectedOption}
        onSelectOption={handleOptionSelect}
        filterType={filterType}
      />
    </div>
  );
}
