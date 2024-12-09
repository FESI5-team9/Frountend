"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getReviewStats, getReviews } from "@/apis/reviewsApi";
import { categories } from "@/constants/categoryList";
import useDateStore from "@/store/dateStore";
import { GetReviewStatsRes, GetReviews, ReviewsRes } from "@/types/api/reviews";
import RatingComponent from "./RatingComponent";
import ReviewListComponent from "./ReviewListComponent";

interface Filters {
  type: GetReviews["type"];
  location: GetReviews["location"];
  date: GetReviews["date"];
  sort: string;
}

function AllReviews() {
  const [type, setType] = useState<Category["link"]>("RESTAURANT");
  const [filters, setFilters] = useState<Filters>({
    type: "CAFE",
    location: undefined,
    date: undefined,
    sort: "createdAt",
  });

  const handleTypeChange = (newType: Category["link"]) => {
    setType(newType);
    // 모든 필터 상태 초기화
    setFilters({
      type: newType,
      location: undefined,
      date: undefined,
      sort: "createdAt",
    });
    // DateStore 초기화
    useDateStore.setState({ selectedOption: undefined });
  };

  const { data: reviews } = useQuery<ReviewsRes>({
    queryKey: ["reviews", { size: 10, ...filters }],
    queryFn: () => getReviews({ size: 10, ...filters }),
  });

  const { data: stats } = useQuery<GetReviewStatsRes>({
    queryKey: ["stats", { type }],
    queryFn: () => getReviewStats(type),
  });

  return (
    <>
      <div className="mb-1 flex flex-row items-center gap-4 px-2 tablet:px-0">
        <Image
          src="/images/mainPage/head.svg"
          width={72}
          height={72}
          className="h-auto w-auto"
          alt="head"
        />
        <div>
          <h4 className="text-2xl">모든리뷰</h4>
          <h1 className="pb-2 text-sm">밀엔메이트를 이용한 분들은 이렇게 느꼈아요!</h1>
        </div>
      </div>
      <div className="flex justify-between px-2 pb-2 tablet:px-0">
        <ul className="flex gap-3 p-2 text-lg tablet:justify-between tablet:gap-4">
          {categories.map(category => (
            <li
              key={category.name}
              onClick={() => handleTypeChange(category.link)}
              className={`flex list-none items-center gap-[3px] border-b-2 ${
                type === category.link
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400"
              } hover:cursor-pointer`}
            >
              <p>{category.name}</p>
              <Image
                src={type === category.link ? category.icon : category.disabled}
                alt={category.alt}
                width={18}
                height={20}
                className="hidden h-[20px] w-[18px] object-contain tablet:block"
              />
            </li>
          ))}
        </ul>
      </div>
      <RatingComponent stats={stats} />
      <ReviewListComponent
        reviews={reviews}
        filters={{ ...filters, type }}
        setFilters={setFilters}
      />
    </>
  );
}

export default AllReviews;
