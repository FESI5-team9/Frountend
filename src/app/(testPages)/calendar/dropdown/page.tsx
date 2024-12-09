"use client";

import DropdownCalendar from "@/components/Calendar/DropdownCalendar";
import useDateStore from "@/store/dateStore";

export default function Page() {
  const { firstDate, secondDate } = useDateStore();

  return (
    <div className="h-screen bg-slate-400">
      <DropdownCalendar />
      <p className="mt-[400px]">
        선택된 날짜1: {firstDate ? firstDate.toLocaleDateString() : "날짜가 선택되지 않았습니다"}
      </p>
      <p>
        선택된 날짜2: {secondDate ? secondDate.toLocaleDateString() : "날짜가 선택되지 않았습니다"}
      </p>
    </div>
  );
}
