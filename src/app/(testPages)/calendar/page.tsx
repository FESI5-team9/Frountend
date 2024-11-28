"use client";

import React, { useState } from "react";
import Calendar from "@/components/Calendar";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Calendar getSelectedDate={getSelectedDate} />
      <p className="mt-10">선택된 날짜: {selectedDate.toLocaleDateString()}</p>
    </div>
  );
}
