import AllReviewCard from "@/components/Card/AllReviewCard";
import { GetMyJoinedGathering } from "@/types/api/gatheringApi";
import { ReviewRes } from "@/types/api/reviews";

interface RenderContentProps {
  completedReviews: ReviewRes[];
  unCompletedReview: GetMyJoinedGathering[];
}

export default function myReviews({ completedReviews, unCompletedReview }: RenderContentProps) {
  return (
    <>
      <AllReviewCard review={unCompletedReview} reviewed={completedReviews} />
    </>
  );
}
