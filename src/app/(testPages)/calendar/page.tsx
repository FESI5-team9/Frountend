"use client";

import Calendar from "@/components/Calendar/Calendar";
import useDateStore from "@/store/dateStore";

// import { useEffect } from "react";

export default function Page() {
  // const { firstDate, secondDate } = useDateStore();
  const { firstDate } = useDateStore();

  // useEffect(()=>{
  //   console.log('date: ', firstDate)
  //   console.log('formed date: ', firstDate?.toISOString().split("T")[0])
  // },[firstDate, secondDate])

  return (
    <div className="flex h-screen w-full flex-col items-center pt-20">
      {/* 날짜 두 개 선택
      <Calendar multipleDates={true} />
      <div className="">
        <p className="mt-20">선택된 날짜: {firstDate ? firstDate : "없음"}</p>
        <p className="">선택된 날짜: {secondDate ? secondDate : "없음"}</p>
      </div> */}
      <Calendar multipleDates={false} />
      <div className="">
        <p className="mt-20">선택된 날짜: {firstDate ? firstDate : "없음"}</p>
      </div>
    </div>
  );
}
