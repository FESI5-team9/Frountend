"use client";

// import { useEffect } from "react";
// import { useParams } from "next/navigation";
import { formatToKoreanTime } from "@/utils/date";
import DetailCard from "../_components/DetailCard";
import FixedBottomBar from "../_components/FixedBottomBar";
import Map from "../_components/Map";
import Reviews from "../_components/Reviews";

const MOCK_DETAIL = {
  id: 123,
  type: "restaurant",
  name: "하이디라오 건대점",
  dateTime: "2024-12-03T04:16:28.268",
  registrationEnd: "2024-12-02T11:59:59",
  createdAt: "2024-12-03T04:16:28.268",
  canceledAt: "2024-12-03T04:16:28.268",
  location: "서울",
  address1: "서울 광진구",
  address2: "서울 광진구 능동로 110서울 광진구 능동로 110",
  description: "모임 설명이에요",
  image: "/images/image.png",
  favorite: true,
  keyword: ["처유마라훠궈(오리지널)", "처유마라훠궈(오리지널)", "처유마라훠궈(오리지널)"],
  participantCount: 5,
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
  // const { id } = useParams();
  // const userId = "1";

  // useEffect(() => {
  //   console.log(id, typeof id);
  // }, [id]);

  if (!MOCK_DETAIL)
    return <div className="mx-auto max-w-[1200px] px-4 tablet:px-8 desktop:px-[62px]"></div>;

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
              {formatToKoreanTime(MOCK_DETAIL.createdAt, "yyyy.MM.dd")}
            </span>
          </div>
        </div>
        <div className="desktop:grid-area-bottomRight tablet:col-span-2 tablet:h-[206px] tablet:px-6 desktop:px-0">
          <Map address={MOCK_DETAIL.address2} />
        </div>
      </div>
      <div className="w-full pb-[134px] tablet:px-6 desktop:px-[62px]">
        <Reviews reviews={MOCK_REVIEWS} />
      </div>

      <FixedBottomBar gatheringId={MOCK_DETAIL.id} status="join" />
    </div>
  );
}

export default GroupDetailPage;
