// hooks/useReviews.ts
import { useEffect, useState } from "react";
import { getReviews } from "@/apis/reviewsApi";
import { getMyJoinedGatherings } from "@/apis/searchGatheringApi";
import { GetMyJoinedGatheringsRes } from "@/types/api/gatheringApi";
import { ReviewsRes } from "@/types/api/reviews";

export const DIRECTION = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

export const useReviews = () => {
  const [completedReviews, setCompletedReviews] = useState<ReviewsRes>([]);
  const [unCompletedReviews, setUnCompletedReviews] = useState<GetMyJoinedGatheringsRes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      // 작성한 리뷰 가져오기
      const completedReviewsParams = {
        size: 10,
        page: 0,
        sort: "createdAt",
        direction: "DESC",
      };
      const completedReviewsData = await getReviews(completedReviewsParams);

      // 작성하지 않은 리뷰 가져오기
      const myJoinedGatheringsParams = {
        completed: true,
        reviewed: false,
        size: 10,
        page: 0,
        sort: "id.gathering.dateTime",
        direction: DIRECTION.DESC,
      };
      const unCompletedReviewsData = await getMyJoinedGatherings(myJoinedGatheringsParams);

      // 상태 업데이트
      setCompletedReviews(completedReviewsData);
      setUnCompletedReviews(unCompletedReviewsData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    completedReviews,
    unCompletedReviews,
    loading,
    error,
    refetch: fetchReviews, // 필요 시 외부에서 재호출 가능
  };
};
