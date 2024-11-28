"use client";

import { format } from "date-fns";
import { useCallback, useState } from "react";
import useDateStore from "@/store/dateStore";
import FilterButton from "../filter/FilterButton";
import Calendar from "./Calendar";

export default function DropdownCalendar() {
  const { selectedOption, setSelectedOption, setSelectedDate } = useDateStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterButtonClick = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleDateSelect = useCallback(
    (date: Date) => {
      setSelectedOption(format(date, "yy/MM/dd"));
    },
    [setSelectedOption],
  );

  const resetDate = useCallback(() => {
    setSelectedDate(null);
    setSelectedOption("날짜 선택");
  }, [setSelectedDate, setSelectedOption]);

  return (
    <div className="w-[330px]">
      <FilterButton
        selectedOption={selectedOption}
        filterType="selectionFilter"
        onClick={handleFilterButtonClick}
      />

      <div
        className={`absolute z-50 mt-3 flex w-[330px] flex-col items-center justify-center rounded-[12px] bg-white ${isOpen ? "block" : "hidden"}`}
      >
        <Calendar handleDateSelect={handleDateSelect} />
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
