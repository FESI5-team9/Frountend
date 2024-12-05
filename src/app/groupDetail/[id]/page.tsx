"use client";

import { useParams } from "next/navigation";
import Button from "@/components/Button/Button";
import { formatToKoreanTime } from "@/utils/date";
import DetailCard from "../_components/DetailCard";
import Map from "../_components/Map";
import Reviews from "../_components/Reviews";

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
    createdAt: "2024-11-29T08:43:22.102",
    user: {
      nickname: "hahha",
      image: "",
    },
  },
  {
    id: 3,
    score: 2,
    comment: "bbbbbbbbbbbbbbbbb",
    createdAt: "2024-11-29T08:43:22.102",
    user: {
      nickname: "hahha",
      image: "",
    },
  },
  {
    id: 5,
    score: 5,
    comment: "assfdgsdfgfdgfd",
    createdAt: "2024-11-29T08:43:22.102",
    user: {
      nickname: "hahha",
      image: "",
    },
  },
  {
    id: 7,
    score: 5,
    comment: "gkgkkg",
    createdAt: "2024-11-29T08:43:22.102",
    user: {
      nickname: "hahha",
      image: "",
    },
  },
];

function GroupDetailPage() {
  const { id } = useParams();
  const userId = "1";

  const submitJoin = () => {};

  const cancelGathering = () => {};

  const shareGathering = () => {};

  return (
    <div className="mx-auto max-w-[1200px] px-4 tablet:px-8 desktop:px-[62px]">
      <div
        className={`desktop:grid-areas-custom grid gap-6 py-4 tablet:gap-6 tablet:p-6 desktop:px-[62px]`}
      >
        <div
          style={{ backgroundImage: `url(${MOCK_DETAIL.image})` }}
          className="desktop:grid-area-topLeft min-h-[180px] rounded-3xl bg-yellow-primary bg-cover bg-center bg-no-repeat tablet:min-h-[270px] desktop:mb-20"
        ></div>
        <div className="desktop:grid-area-topRight min-h-[240px] tablet:min-h-[270px]">
          <DetailCard gathering={MOCK_DETAIL} />
        </div>
        <div className="desktop:grid-area-bottom flex flex-col gap-4 px-1 tablet:col-span-2 tablet:px-6 desktop:-mt-6">
          <h3 className="text-lg font-semibold">모임 설명</h3>
          <p className="text-sm font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, molestias nesciunt
            sapiente non magni ad. Natus doloribus maxime cumque eaque explicabo consectetur
            incidunt cupiditate delectus alias blanditiis sequi, necessitatibus voluptate?
          </p>
          <div className="flex items-center gap-1 text-xs font-medium">
            <div className="flex items-center gap-1">
              <div className="h-6 w-6 rounded-full bg-gray-400"></div>
              <span>{MOCK_DETAIL.user.nickname}</span>
            </div>
            <span className="text-[#3C3C3C]">|</span>

            <span className="text-[#9CA3AF]">
              {formatToKoreanTime(MOCK_DETAIL?.createdBy, "yyyy.MM.dd")}
            </span>
          </div>
        </div>
        <div className="desktop:grid-area-bottomRight tablet:col-span-2 tablet:h-[206px] tablet:px-6 desktop:px-0">
          <Map address={MOCK_DETAIL.address2} />
        </div>
      </div>
      <div className="w-full px-6 desktop:px-[62px]">
        <Reviews reviews={MOCK_REVIEWS} />
      </div>

      <div className="fixed bottom-0 left-0 h-[134px] w-full border-t-2 bg-white tablet:h-[84px] desktop:h-[87px]">
        <div className="mx-auto flex max-w-[744px] flex-wrap justify-between gap-[10px] px-4 py-5 tablet:px-6 tablet:py-5 desktop:px-12">
          <div>
            <p className="text-sm font-semibold">메이트들의 PICK!</p>
            <p className="text-xs">메이트들이 선택한 맛집에서 즐거운 한끼 어떠세요?</p>
          </div>
          {id && id === userId ? (
            <div className="flex w-full gap-2 tablet:w-[238px]">
              <Button className="h-11 bg-[#E5E7EB] text-[#262626]" onClick={cancelGathering}>
                취소하기
              </Button>
              <Button className="h-11 bg-yellow-primary text-[#262626]" onClick={shareGathering}>
                공유하기
              </Button>
            </div>
          ) : (
            <div className="w-[115px]">
              <Button className="h-11 bg-yellow-primary text-[#262626]" onClick={submitJoin}>
                참여하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupDetailPage;
