"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getReviews } from "@/apis/reviewsApi";
import Rating from "@/app/mypage/components/mypage/Rating";
import { ReviewRes } from "@/types/api/reviews";
import { AllReviewCardProps } from "@/types/components/card";

export default function AllReviewCard({
  image,
  score,
  comment,
  location,
  date,
}: AllReviewCardProps) {
  const [review, setReview] = useState<ReviewRes[]>([]);
  //   const isDateTime = "";
  //   const dateString = "MM월 dd일";
  //   const timeString = "HH:mm";
  //   const gatheringDate = formatToKoreanTime(isDateTime, dateString);
  //   const gatheringTime = formatToKoreanTime(isDateTime, timeString);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReview(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchReviews();
  });

  return (
    <>
      <div className="flex h-[355px] w-full flex-col gap-6 tablet:h-[153px] tablet:flex-row">
        <div className="relative flex h-[153px] w-[272px] items-center justify-center overflow-hidden rounded-3xl">
          <Image src={image} fill alt="음식 이미지" />
        </div>
        <div className="flex flex-col">
          <div>
            <Rating score={score} />
          </div>
          <p className="mt-[10px] inline-block text-xl text-gray-800">{comment}</p>
          <span className="mt-[10px] inline-block text-gray-800">{location}</span>
          <span className="mt-2 inline-block text-gray-disable">{date}</span>
          <div className="mt-auto border border-dashed border-b-gray-disable"></div>
        </div>
      </div>
    </>
  );
}
