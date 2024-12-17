import buildQueryParams from "@/hooks/queryParams";
import {
  AddReviews,
  AddReviewsRes,
  GetReviewStatsRes,
  GetReviews,
  GetReviewsRating,
  GetReviewsRatingRes,
  ReviewsRes,
} from "@/types/api/reviews";
import fetchInstance from "./fetchInstance";

// 리뷰 목록 조회
export async function getReviews(params?: GetReviews) {
  const searchParams = new URLSearchParams();
  const queryString = params ? buildQueryParams(searchParams, params) : "";

  const data = await fetchInstance.get<ReviewsRes>(
    `/reviews${queryString ? `?${queryString}` : ""}`,
  );
  return data;
}

// 리뷰 추가
export async function addReviews(body: AddReviews) {
  const data = await fetchInstance.post<AddReviewsRes>("/reviews", body);
  return data;
}

// 리뷰 평점 목록 조회
export async function getReviewsRating(params: GetReviewsRating) {
  const searchParams = new URLSearchParams();
  const queryString = buildQueryParams(searchParams, params);

  const data = await fetchInstance.get<GetReviewsRatingRes>(
    `/reviews/score${queryString ? `?${queryString}` : ""}`,
  );
  return data;
}
// 타입 별 리뷰 평점 통계 조회
export async function getReviewStats(type: string) {
  const data = await fetchInstance.get<GetReviewStatsRes>(
    `/reviews/statistics?${type ? `type=${type}` : ""}`,
  );
  return data;
}
