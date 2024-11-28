"use client";

import { useState } from "react";
import { DAYS_OF_WEEK, MONTH_OF_YEAR } from "@/constants/calendar";

function DateCell({
  date,
  type,
  currentDate,
  selectedDate,
  handleSelectedDate,
  handlePrevMonth,
  handleNextMonth,
}: DateCellProps) {
  const isSelected =
    type === "current" &&
    selectedDate.getFullYear() === currentDate.getFullYear() &&
    selectedDate.getMonth() === currentDate.getMonth() &&
    selectedDate.getDate() === date;

  return (
    <td
      onClick={
        type === "current"
          ? handleSelectedDate
          : type === "prev"
            ? handlePrevMonth
            : handleNextMonth
      }
      className="flex h-8 w-9 cursor-pointer text-center"
    >
      <span
        className={`flex h-full w-full select-none items-center justify-center rounded-[8px] ${
          type === "prev" || type === "next" ? "text-gray-500" : ""
        } ${isSelected ? "bg-yellow-primary" : ""}`}
      >
        {date}
      </span>
    </td>
  );
}

export default function Calendar({ getSelectedDate }: CalendarProp) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const lastDayOfPrevMonth = new Date(year, month, 0).getDate();

  const leadingEmptyDays = firstDayOfMonth.getDay();
  const trailingEmptyDays = 6 - lastDayOfMonth.getDay();

  const prevMonthDates = Array.from(
    { length: leadingEmptyDays },
    (_, i) => lastDayOfPrevMonth - leadingEmptyDays + i + 1,
  );
  const nextMonthDates = Array.from({ length: trailingEmptyDays }, (_, i) => i + 1);

  const dates = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);

  const allDates = [
    ...prevMonthDates.map(date => ({ date, type: "prev" })),
    ...dates.map(date => ({ date, type: "current" })),
    ...nextMonthDates.map(date => ({ date, type: "next" })),
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleSelectedDate = (date: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(date);

    setSelectedDate(newDate);
    getSelectedDate(newDate);
  };

  return (
    <div className="ml-5 flex h-[250px] w-[336px] flex-col items-center justify-center rounded-[12px] bg-white">
      <div className="flex h-8 w-[250px] items-center justify-between">
        <button onClick={handlePrevMonth}>
          <img className="rotate-180" src="/images/ic_arrow.png" alt="" />
        </button>
        <div className="flex gap-1">
          <span>{MONTH_OF_YEAR[month]}</span>
          <span>{year}</span>
        </div>
        <button onClick={handleNextMonth}>
          <img src="/images/ic_arrow.png" alt="" />
        </button>
      </div>

      <table className="w-[250px] table-fixed">
        <thead>
          <tr className="flex w-[250px] justify-between">
            {DAYS_OF_WEEK.map(day => (
              <th className="h-8 w-9 select-none text-center" key={day}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flex w-[250px] flex-col justify-between">
          {Array.from({ length: Math.ceil(allDates.length / 7) }).map((_, rowIndex) => (
            <tr className="flex w-[250px] justify-between" key={rowIndex}>
              {allDates.slice(rowIndex * 7, rowIndex * 7 + 7).map(({ date, type }, colIndex) => (
                <DateCell
                  key={colIndex}
                  date={date}
                  type={type}
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  handleSelectedDate={() => handleSelectedDate(date)}
                  handlePrevMonth={handlePrevMonth}
                  handleNextMonth={handleNextMonth}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
