// hooks/useReviews.ts
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getReviews } from "@/apis/reviewsApi";
import { getMyJoinedGatherings } from "@/apis/searchGatheringApi";
import { GetMyJoinedGathering } from "@/types/api/gatheringApi";
import { ReviewsRes } from "@/types/api/reviews";

export const DIRECTION = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

export const useReviews = () => {
  const [completedReviews, setCompletedReviews] = useState<ReviewsRes>([]);
  const [unCompletedReviews, setUnCompletedReviews] = useState<GetMyJoinedGathering[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams();

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = id ? parseInt(id as string) : undefined;

      // 작성한 리뷰 가져오기
      const completedReviewsParams = {
        userId: userId,
      };
      const completedReviewsData = await getReviews(completedReviewsParams);

      // 작성하지 않은 리뷰 가져오기
      const myJoinedGatheringsParams = {
        completed: true,
        reviewed: false,
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
