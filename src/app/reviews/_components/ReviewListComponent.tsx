"use client";

import { useEffect } from "react";
import DropdownCalendar from "@/components/Calendar/DropdownCalendar";
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

const mockData = [
  {
    id: 0,
    score: 0,
    comment: "string",
    createdAt: "2024-12-09T00:05:03.161Z",
    gathering: {
      id: 0,
      type: "CAFE",
      name: "string",
      dateTime: "2024-12-09T00:05:03.161Z",
      location: "SEOUL",
      image: "string",
    },
    user: {
      id: 0,
      nickname: "string",
      image: "string",
    },
  },
  {
    id: 0,
    score: 0,
    comment: "string",
    createdAt: "2024-12-09T00:05:03.161Z",
    gathering: {
      id: 0,
      type: "CAFE",
      name: "string",
      dateTime: "2024-12-09T00:05:03.161Z",
      location: "SEOUL",
      image: "string",
    },
    user: {
      id: 0,
      nickname: "string",
      image: "string",
    },
  },
];

function ReviewListComponent({ reviews, setFilters }: ReviewListComponentProps) {
  const { firstDate } = useDateStore();

  useEffect(() => {
    if (firstDate) {
      setFilters(prev => ({ ...prev, date: firstDate.toString() }));
    }
  }, [firstDate, setFilters]);

  const handleLocationFilter = (location: string) => {
    setFilters(prev => ({ ...prev, location: location as GetReviews["location"] }));
  };
  const handleSortFilter = (sort: string) => {
    setFilters(prev => ({ ...prev, sort }));
  };
  // eslint-disable-next-line no-console
  console.log(reviews);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <FilterDropDown
            filterType="selectionFilter"
            options={LOCATION_OPTIONS}
            onSelectFilterOption={handleLocationFilter}
          />

          <DropdownCalendar />
        </div>
        <FilterDropDown
          filterType="sortFilter"
          options={SORT_OPTIONS}
          onSelectFilterOption={handleSortFilter}
        />
      </div>

      <div className="flex flex-col gap-6">
        {mockData?.map(review => (
          <div key={review.id} className="h-20 w-full rounded-lg border p-4"></div>
        ))}
      </div>
    </div>
  );
}

export default ReviewListComponent;
