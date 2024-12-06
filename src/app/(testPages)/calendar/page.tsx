"use client";

import Calendar from "@/components/Calendar/Calendar";
import useDateStore from "@/store/dateStore";

// import { useEffect } from "react";

export default function Page() {
  const { firstDate, secondDate } = useDateStore();

  // useEffect(()=>{
  //   console.log('date: ', firstDate)
  //   console.log('formed date: ', firstDate?.toISOString().split("T")[0])
  // },[firstDate, secondDate])

  return (
    <div className="flex h-screen w-full flex-col items-center bg-slate-400 pt-20">
      <Calendar multipleDates={true} />

      <div className="">
        <p className="mt-20">선택된 날짜: {firstDate ? firstDate.toLocaleDateString() : "없음"}</p>
        <p className="">선택된 날짜: {secondDate ? secondDate.toLocaleDateString() : "없음"}</p>
      </div>
    </div>
  );
}
