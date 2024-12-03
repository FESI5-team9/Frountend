"use client";

// import { useEffect } from "react";
// import { useParams } from "next/navigation";
import Button from "@/components/Button/Button";
import DetailCard from "../_components/DetailCard";

const MOCK_DETAIL = {
  id: 123,
  type: "restaurant",
  name: "하이디라오 건대점",
  dateTime: "2024-12-03T04:16:28.268",
  registrationEnd: "2024-12-02T11:59:59",
  createdBy: "2024-12-03T04:16:28.268",
  canceledAt: "2024-12-03T04:16:28.268",
  location: "서울",
  address1: "서울 광진구",
  address2: "서울 광진구 능동로 110서울 광진구 능동로 110",
  description: "모임 설명이에요",
  image: "/images/image.png",
  favorite: false,
  keyword: ["처유마라훠궈(오리지널)", "처유마라훠궈(오리지널)", "처유마라훠궈(오리지널)"],
  participantCount: 16,
  capacity: 20,
  user: {
    id: 0,
    nickname: "닉네임이요",
    image: "/images/image.png",
  },
  participants: [
    { userId: 1234324, nickname: "haha", image: "/images/image.png" },
    { userId: 1234324, nickname: "hasha", image: "/images/image.png" },
    { userId: 1234324, nickname: "hahasda", image: "/images/image.png" },
    { userId: 1234324, nickname: "hahgfa", image: "/images/image.png" },
    { userId: 1234324, nickname: "hahsa", image: "/images/image.png" },
  ],
};

const MOCK_REVIEWS = [
  {
    id: 1,
    score: 5,
    comment: "gkgkkg",
    createdAt: "2024-11-29T08:43:22.102Z",
    user: {
      nickname: "hahha",
      image: "",
    },
  },
  {
    id: 3,
    score: 2,
    comment: "bbbbbbbbbbbbbbbbb",
    createdAt: "2024-11-29T08:43:22.102Z",
    user: {
      nickname: "hahha",
      image: "",
    },
  },
  {
    id: 5,
    score: 5,
    comment: "assfdgsdfgfdgfd",
    createdAt: "2024-11-29T08:43:22.102Z",
    user: {
      nickname: "hahha",
      image: "",
    },
  },
  {
    id: 7,
    score: 5,
    comment: "gkgkkg",
    createdAt: "2024-11-29T08:43:22.102Z",
    user: {
      nickname: "hahha",
      image: "",
    },
  },
];

function GroupDetailPage() {
  // const { id } = useParams();

  // useEffect(() => {
  //   console.log(id);
  // }, [id]);

  const submitJoin = () => {
    // console.log("button clicked", id)
  };

  return (
    <div className="mx-auto h-[calc(100vh-60px)] max-w-[1200px]">
      <div className="h-[calc(100vh-60px)] bg-[#F9FAFB]">
        <div
          className={`mx-4 grid grid-cols-1 gap-3 py-4 tablet:mx-8 tablet:grid-cols-2 tablet:gap-6 tablet:p-6 desktop:mx-[62px] desktop:px-[62px]`}
        >
          <div
            style={{ backgroundImage: `url(${MOCK_DETAIL.image})` }}
            className="min-h-[180px] rounded-3xl bg-yellow-primary bg-cover bg-center bg-no-repeat tablet:min-h-[270px]"
          ></div>

          <DetailCard gathering={MOCK_DETAIL} />

          <div className="border-t-2 border-[#e5e7eb] bg-white p-6 tablet:col-span-2">
            <div className="h-[500px]">
              <h3 className="mb-5 text-lg font-semibold">이용자 리뷰</h3>
              <div className="flex flex-col gap-[10px]">
                {MOCK_REVIEWS.map(review => (
                  <div key={review.id} className="border-b-2 border-dashed border-[#F3F4F6] pb-4">
                    <div className="flex h-[86px] flex-col justify-between">
                      <div>{review.score}</div>
                      <p className="text-sm">{review.comment}</p>
                      <div className="flex gap-1 text-xs">
                        <div className="flex gap-1">
                          <span>img</span>
                          <span>{review.user.nickname}</span>
                        </div>
                        <span className="">|</span>
                        <span className="text-[#9CA3AF]">{review.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="max-w-[476px]">1 2 3 4 5 ...</div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 h-[96px] w-full border-t-2 bg-white tablet:h-[84px] desktop:h-[87px]">
          <div className="mx-auto flex max-w-[744px] justify-between px-6 py-5 tablet:px-12">
            <div>
              <p className="text-sm font-semibold">메이트들의 PICK!</p>
              <p className="text-xs">메이트들이 선택한 맛집에서 즐거운 한끼 어떠세요?</p>
            </div>
            <div className="w-[115px]">
              <Button className="bg-yellow-primary text-[#262626]" onClick={submitJoin}>
                참여하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetailPage;
