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
import fetchWithMiddleware from "./fetchWithMiddleware";

// 리뷰 목록 조회
export async function getReviews(params?: GetReviews) {
  const searchParams = new URLSearchParams();
  if (params) {
    buildQueryParams(searchParams, params);
  }
  const response = await fetchWithMiddleware(`/api/reviews?${searchParams.toString()}`);
  const data: ReviewsRes = await response.json();
  return data;
}

// 리뷰 추가
export async function addReviews(body: AddReviews) {
  const response = await fetchWithMiddleware("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data: AddReviewsRes = await response.json();
  return data;
}

// 리뷰 평점 목록 조회
export async function getReviewsRating(params?: GetReviewsRating) {
  const searchParams = new URLSearchParams();
  if (params) {
    buildQueryParams(searchParams, params);
  }
  const response = await fetchWithMiddleware(`/api/reviews/score?${searchParams.toString()}`);
  const data: GetReviewsRatingRes = await response.json();
  return data;
}

// 타입 별 리뷰 평점 통계 조회
export async function getReviewStats(type: string) {
  const response = await fetchWithMiddleware(`/api/reviews/statistics?type=${type}`);
  const data: GetReviewStatsRes = await response.json();
  return data;
}
