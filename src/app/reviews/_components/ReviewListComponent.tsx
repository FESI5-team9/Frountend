"use client";

import { FilterDropDown } from "@/components/Filter/FilterDropDown";
import { LOCATION_OPTIONS, SORT_OPTIONS } from "@/constants/filter";
import { GetReviews, ReviewsRes } from "@/types/api/reviews";

interface Filters {
  type: GetReviews["type"];
  location: GetReviews["location"];
  sort: string;
}

interface ReviewListComponentProps {
  reviews: ReviewsRes | undefined;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

function ReviewListComponent({ reviews, setFilters }: ReviewListComponentProps) {
  const handleLocationFilter = (location: string) => {
    setFilters(prev => ({ ...prev, location: location as GetReviews["location"] }));
  };
  const handleSortFilter = (sort: string) => {
    setFilters(prev => ({ ...prev, sort }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <FilterDropDown
            filterType="selectionFilter"
            options={LOCATION_OPTIONS}
            onSelectFilterOption={handleLocationFilter}
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
          <div key={review.id} className="h-20 w-full rounded-lg border p-4"></div>
        ))}
      </div>
    </div>
  );
}

export default ReviewListComponent;
