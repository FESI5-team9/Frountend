"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Chip from "@/components/Chips";
import Rating from "@/app/mypage/components/mypage/Rating";
import { GetMyJoinedGathering } from "@/types/api/gatheringApi";
import { ReviewRes } from "@/types/api/reviews";
import { formatToKoreanTime } from "@/utils/date";

interface AllReviewCardProps {
  review: GetMyJoinedGathering[];
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
      <div className="flex flex-col gap-6">
        <div className="flex gap-2">
          <Button className="bg-gray-700 text-white" onClick={() => setActiveTab("uncompleted")}>
            작성 가능한 리뷰
          </Button>
          <Button className="bg-gray-300 text-gray-700" onClick={() => setActiveTab("completed")}>
            작성한 리뷰
          </Button>
        </div>
        {/* 작성 가능한 리뷰 */}
        <div className="flex h-[153px] w-full flex-col gap-6">
          {activeTab === "uncompleted" &&
            review?.map(item => (
              <div key={item.id} className="flex w-full gap-4">
                <div className="relative flex h-[153px] w-[272px] items-center justify-center overflow-hidden rounded-3xl">
                  <Image src={item.image} fill alt="모임 이미지" className="" />
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 flex gap-2">
                    <Chip
                      type="state"
                      bgColor="bg-orange-100"
                      textColor="text-orange-primary"
                      className="flex items-center justify-center"
                    >
                      이용 예정 {/*API 연동 필요*/}
                    </Chip>
                    <Chip
                      type="state"
                      textColor="text-orange-primary"
                      bgColor="bg-transparent"
                      className="flex items-center justify-center outline outline-orange-100"
                    >
                      개설 예정 {/*API 연동 필요*/}
                    </Chip>
                  </div>
                  <div className="flex gap-3">
                    <div className="mb-[18px] flex flex-col gap-1.5">
                      <span className="flex items-center gap-2 text-lg font-semibold">
                        <span className="inline-block">{item.name}</span>
                        <span className="inline-block">|</span>
                        <span className="text-#3C3C3C inline-block text-sm">
                          &nbsp;{`${item.location} ${item.address1}`}
                        </span>
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-#3C3C3C flex gap-3 text-sm">{`${item.dateTime} ·`}</span>
                        <span className="flex gap-0.5">
                          <Image
                            src="/icons/person.svg"
                            width={16}
                            height={16}
                            alt="참여 인원"
                            className="inline-block"
                          />
                          <span className="inline-block text-sm">{`${item.participantCount}/${item.capacity}`}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[120px]">
                    <Button
                      size="small"
                      isFilled
                      className="border border-orange-primary px-0 text-[14px] text-orange-primary"
                    >
                      예약 취소하기
                    </Button>
                  </div>
                </div>
              </div>
            ))}

          {/* 작성한 리뷰 */}
          {activeTab === "completed" &&
            reviewed?.map(item => (
              <div
                key={item.id}
                className="flex h-[355px] w-full flex-col gap-6 tablet:h-[153px] tablet:flex-row"
              >
                <div className="relative flex h-[153px] w-[272px] max-w-[272px] items-center justify-center overflow-hidden rounded-3xl">
                  <Image
                    src={
                      typeof item.gathering.image === "string"
                        ? item.gathering.image
                        : "/images/image.png"
                    }
                    fill
                    alt="이미지"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div>
                    <Rating score={item.score} />
                  </div>
                  <p className="mt-[10px] inline-block w-full text-sm text-gray-800">
                    {item.comment}
                  </p>
                  <span className="mt-[10px] inline-block text-xs text-gray-800">
                    {item.gathering.location}
                  </span>
                  <span className="mt-2 inline-block text-xs text-gray-disable">
                    {item.gathering.dateTime
                      ? formatToKoreanTime(item.gathering.dateTime as string, "yyyy.MM.dd")
                      : "날짜 정보 없음"}
                  </span>
                  <div className="mt-auto w-full border border-dashed border-b-gray-disable"></div>
                </div>
              </div>
            ))}
        </div>
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
