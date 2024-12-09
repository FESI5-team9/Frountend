"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Dropdown from "@/components/Filter/Dropdown";
import FilterButton from "@/components/Filter/FilterButton";

function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
}

export function FilterDropDown({ filterType, options, onSelectFilterOption }: FilterDropdownProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  const dropdownRef = useClickOutside(handleClickOutside);

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
