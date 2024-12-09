"use client";

import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Button from "@/components/Button/Button";
import Calendar from "@/components/Calendar/Calendar";
import FilterButton from "@/components/Filter/FilterButton";
import useDateStore from "@/store/dateStore";

export default function DropdownCalendar() {
  const { selectedOption, setSelectedOption, setFirstDate, setSecondDate, firstDate } =
    useDateStore();
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

  const submitDates = () => {
    if (firstDate) setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="w-[330px]">
      <FilterButton
        selectedDateOption={selectedOption}
        filterType="selectionFilter"
        onToggle={toggleDropdown}
      />

      <div
        className={`absolute z-50 mt-3 flex w-[300px] flex-col items-center justify-center rounded-[12px] border-[2px] border-[#F3F4F6] bg-white ${isOpen ? "block" : "hidden"}`}
      >
        <Calendar multipleDates={true} />
        <div className="mb-3 flex w-full justify-around px-3">
          <Button onClick={resetDate} size="small" className="w-[118px] bg-[#F3F4F6] font-semibold">
            초기화
          </Button>
          <Button
            onClick={submitDates}
            size="small"
            className="w-[118px] bg-[#FFFACD] font-semibold"
          >
            적용
          </Button>
        </div>
      </div>
    </div>
  );
}
