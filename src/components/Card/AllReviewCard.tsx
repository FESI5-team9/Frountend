"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getReviews } from "@/apis/reviewsApi";
import { getMyJoinedGatherings } from "@/apis/searchGatheringApi";
import Button from "@/components/Button/Button";
import Rating from "@/app/mypage/components/mypage/Rating";
import { GetMyJoinedGatheringsRes, DIRECTION } from "@/types/api/gatheringApi";
import { ReviewsRes } from "@/types/api/reviews";
import { AllReviewCardProps } from "@/types/components/card";

export default function AllReviewCard({}: AllReviewCardProps) {
  const [completedReviews, setCompletedReviews] = useState<ReviewsRes>();
  const [unCompletedReviews, setUnCompletedReviews] = useState<GetMyJoinedGatheringsRes>();
  const [activeTab, setActiveTab] = useState<"uncompleted" | "completed">("uncompleted");

  //   const isDateTime = "";
  //   const dateString = "MM월 dd일";
  //   const timeString = "HH:mm";
  //   const gatheringDate = formatToKoreanTime(isDateTime, dateString);
  //   const gatheringTime = formatToKoreanTime(isDateTime, timeString);
  type Direction = "asc" | "desc";

  const fetchReviews = async () => {
    try {
      // 작성한 리뷰 목록 가져오기
      const completedReviewsParams = {
        size: 10,
        page: 0,
        sort: "createdAt",
        direction: "DESC",
      };
      const completedReviewsData: ReviewsRes = await getReviews(completedReviewsParams);

      // 로그인된 사용자가 참석한 모임 중 리뷰가 작성되지 않은 목록 가져오기
      const myJoinedGatheringsParams = {
        completed: true,
        reviewed: false,
        size: 10,
        page: 0,
        sort: "id.gathering.dateTime",
        direction: DIRECTION.DESC,
      };
      const myJoinedGatherings: GetMyJoinedGatheringsRes = await getMyJoinedGatherings(
        myJoinedGatheringsParams
      );

      // 상태 업데이트
      setCompletedReviews(completedReviewsData);
      setUnCompletedReviews(myJoinedGatherings);
    } catch (err) {
      console.error("리뷰 데이터를 가져오는 중 오류 발생:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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
        {unCompletedReviews.map((item) => (
          <div key={index} className="flex gap-4">
            <Image
              src={}
              width={100}
              height={50}
              alt={item.gathering.name}
              className="h-32 w-32 rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.gathering.name}</h3>
              <p className="text-gray-600">{item.review.comment}</p>
              <p className="text-sm text-gray-500">평점: {item.review.score}</p>
              <p className="text-sm text-gray-500">{item.gathering.location}</p>
            </div>
          </div>
        ))}

        {/* 작성한 리뷰 */}
        {completedReviews.map((item, index) => (
          <div key={index} className="flex gap-4">
            <Image
              src={}
              width={100}
              height={50}
              alt=""
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
}

/* api/my/reviews 날려도 될까요 ?? 
작성된 리뷰 -> 리뷰 목록에서 유저 아이디로 검색
작정가능한 리뷰 -> 로그인된 사용자가 참석한 모임조회 에서 completed=true , reviewed=false 주면 될거같아요 */
