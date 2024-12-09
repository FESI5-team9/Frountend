"use client";

import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Calendar from "@/components/Calendar/Calendar";
import FilterButton from "@/components/Filter/FilterButton";
import useDateStore from "@/store/dateStore";

export default function DropdownCalendar() {
  const { selectedOption, setSelectedOption, setFirstDate, setSecondDate } = useDateStore();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const resetDate = () => {
    setFirstDate(null);
    setSecondDate(null);
    setSelectedOption("날짜 선택");
  };

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const resetAndCloseDropdown = () => {
    resetDate();
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, resetAndCloseDropdown);

  return (
    <div ref={dropdownRef} className="w-[330px]">
      <FilterButton
        selectedDateOption={selectedOption}
        filterType="selectionFilter"
        onToggle={toggleDropdown}
      />

      <div
        className={`absolute z-50 mt-3 flex w-[330px] flex-col items-center justify-center rounded-[12px] bg-white ${isOpen ? "block" : "hidden"}`}
      >
        <Calendar multipleDates={true} />
        <div className="mb-3 flex w-[250px] justify-between">
          <button onClick={resetDate} className="h-10 w-[118px]">
            초기화
          </button>
          <button onClick={() => setIsOpen(false)} className="h-10 w-[118px]">
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
