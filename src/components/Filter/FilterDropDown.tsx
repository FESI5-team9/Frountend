"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Dropdown from "@/components/Filter/Dropdown";
import FilterButton from "@/components/Filter/FilterButton";

export function FilterDropDown({
  filterType,
  options,
  onSelectFilterOption,
  initialSelected,
}: FilterDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<OptionType>(() => {
    if (initialSelected) {
      const initialOption = options.find(opt => opt.ko === initialSelected);
      return initialOption || options[0];
    }
    return options[0];
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialSelected) {
      const newOption = options.find(opt => opt.ko === initialSelected);
      if (newOption) {
        setSelectedOption(newOption);
      } else {
        setSelectedOption(options[0]);
      }
    }
  }, [initialSelected, options]);

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
