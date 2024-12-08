"use client";

import { useState } from "react";
import Image from "next/image";
import FilterButton from "@/components/Filter/FilterButton";
import { FilterDropDown } from "@/components/Filter/FilterDropDown";
import { LOCATION_OPTIONS, SORT_OPTIONS } from "@/constants/filter";
import useDateStore from "@/store/dateStore";
import { GetReviews, ReviewsRes } from "@/types/api/reviews";

interface Filters {
  type: GetReviews["type"];
  location: GetReviews["location"];
  date: GetReviews["date"];
  sort: string;
}

interface ReviewListComponentProps {
  reviews: ReviewsRes | undefined;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

function ReviewListComponent({ reviews, filters, setFilters }: ReviewListComponentProps) {
  const [, setIsOpen] = useState(false);

  const handleLocationFilter = (location: string) => {
    setFilters({ ...filters, location: location as GetReviews["location"] });
  };

  const handleSortFilter = (sort: string) => {
    setFilters({ ...filters, sort });
  };

  const handleDateFilter = () => {
    setIsOpen(prevState => !prevState);
  };

  const { selectedOption } = useDateStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <FilterDropDown
            filterType="selectionFilter"
            options={LOCATION_OPTIONS}
            onSelectFilterOption={handleLocationFilter}
          />
          <FilterButton
            selectedDateOption={selectedOption}
            filterType="selectionFilter"
            onToggle={handleDateFilter}
          />
        </div>
        <FilterDropDown
          filterType="sortFilter"
          options={SORT_OPTIONS}
          onSelectFilterOption={handleSortFilter}
        />
      </div>

      <div className="flex flex-col gap-6">
        {reviews?.map(review => (
          <div key={review.id} className="rounded-lg border p-4">
            <Image
              src={review.gathering.image}
              alt="체험 이미지 사진"
              width={400}
              height={300}
              className="mb-4 rounded-lg"
            />
            <div className="flex gap-1">
              {[...Array(review.score)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <p className="mt-2">{review.comment}</p>
            <div className="mt-4 flex items-center gap-2 text-gray-500">
              <span>{review.user.nickname}</span>
              <span>|</span>
              <span>{review.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewListComponent;
