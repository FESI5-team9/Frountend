"use client";

import DropdownCalendar from "@/components/calendars/DropdownCalendar";
import useDateStore from "@/store/dateStore";

export default function Page() {
  const { selectedDate } = useDateStore();

  return (
    <div className="h-screen bg-slate-400">
      <DropdownCalendar />
      <p className="mt-[400px]">
        선택된 날짜:{" "}
        {selectedDate ? selectedDate.toLocaleDateString() : "날짜가 선택되지 않았습니다"}
      </p>
    </div>
  );
}
