"use client";

import { useState } from "react";
import Calendar from "@/components/calendar/Calendar";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="h-screen bg-slate-400 pt-20">
      <Calendar handleDateSelect={handleDateSelect} />
      <p className="mt-48">선택된 날짜: {selectedDate.toLocaleDateString()}</p>
    </div>
  );
}
