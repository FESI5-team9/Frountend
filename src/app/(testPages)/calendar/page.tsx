"use client";

import Calendar from "@/components/Calendar/Calendar";
import useDateStore from "@/store/dateStore";

export default function Page() {
  const { selectedDate } = useDateStore();

  return (
    <div className="h-screen bg-slate-400 pt-20">
      <Calendar />
      <p className="mt-48">선택된 날짜: {selectedDate?.toLocaleDateString()}</p>
    </div>
  );
}
