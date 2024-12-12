"use client";

import { useState } from "react";
import Image from "next/image";
// import { useReviews } from "@/hooks/useReviews";
import Button from "@/components/Button/Button";
import Rating from "@/app/mypage/components/mypage/Rating";
import { GetMyJoinedGatheringsRes } from "@/types/api/gatheringApi";
import { ReviewRes } from "@/types/api/reviews";

interface AllReviewCardProps {
  review: GetMyJoinedGatheringsRes[];
  reviewed: ReviewRes[];
}

export default function AllReviewCard({ review, reviewed }: AllReviewCardProps) {
  // const { completedReviews, unCompletedReviews, loading, error } = useReviews();

  // const [completedReviews, setCompletedReviews] = useState<ReviewsRes>([]);
  // const [unCompletedReviews, setUnCompletedReviews] = useState<GetMyJoinedGatheringsRes[]>([]);
  const [activeTab, setActiveTab] = useState<"uncompleted" | "completed">("uncompleted");

  //   const isDateTime = "";
  //   const dateString = "MM월 dd일";
  //   const timeString = "HH:mm";
  //   const gatheringDate = formatToKoreanTime(isDateTime, dateString);
  //   const gatheringTime = formatToKoreanTime(isDateTime, timeString);

  return (
    <>
      <div className="flex gap-2">
        <Button className="bg-gray-700 text-white" onClick={() => setActiveTab("uncompleted")}>
          작성 가능한 리뷰
        </Button>
        <Button className="bg-gray-300 text-gray-700" onClick={() => setActiveTab("completed")}>
          작성한 리뷰
        </Button>
      </div>
      {/* 작성 가능한 리뷰 */}
      <div className="flex flex-col gap-6">
        {activeTab === "uncompleted" &&
          review?.map(item => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.image}
                width={100}
                height={50}
                alt="이미지"
                className="h-32 w-32 rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{}</h3>
                <p className="text-gray-600">{}</p>
                <p className="text-sm text-gray-500">평점: {}</p>
                <p className="text-sm text-gray-500">{}</p>
              </div>
            </div>
          ))}

        {/* 작성한 리뷰 */}
        {activeTab === "completed" &&
          reviewed?.map(item => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={
                  typeof item.gathering.image === "string"
                    ? item.gathering.image
                    : "/images/image.png"
                }
                width={100}
                height={50}
                alt="이미지"
                className="h-32 w-32 rounded-lg"
              />
              <div>
                <Rating score={item.score} />
                <h3 className="text-lg font-semibold">{}</h3>
                <p className="text-sm text-gray-500">{}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
// return (
//   <>
//     <div className="flex h-[355px] w-full flex-col gap-6 tablet:h-[153px] tablet:flex-row">
//       <div className="relative flex h-[153px] w-[272px] items-center justify-center overflow-hidden rounded-3xl">
//         <Image src={review.image} fill alt="음식 이미지" />
//       </div>
//       <div className="flex flex-col">
//         <div>
//           <Rating score={review.score} />
//         </div>
//         <p className="mt-[10px] inline-block text-xl text-gray-800">{review.comment}</p>
//         <span className="mt-[10px] inline-block text-gray-800">{review.location}</span>
//         <span className="mt-2 inline-block text-gray-disable">{review.date}</span>
//         <div className="mt-auto border border-dashed border-b-gray-disable"></div>
//       </div>
//     </div>
//   </>
// );

/* api/my/reviews 날려도 될까요 ?? 
작성된 리뷰 -> 리뷰 목록에서 유저 아이디로 검색
작정가능한 리뷰 -> 로그인된 사용자가 참석한 모임조회 에서 completed=true , reviewed=false 주면 될거같아요 */
