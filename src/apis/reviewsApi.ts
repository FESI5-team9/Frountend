import { buildQueryParams } from "@/hooks/useUrlParams";
import {
  AddReviews,
  AddReviewsRes,
  GetReviewStatsRes,
  GetReviews,
  GetReviewsRating,
  GetReviewsRatingGathering,
  GetReviewsRatingRes,
  ReviewsRes,
} from "@/types/api/reviews";
import fetchInstance from "./fetchInstance";

// 리뷰 목록 조회
export async function getReviews(params?: GetReviews, options?: { next?: NextFetchRequestConfig }) {
  const searchParams = new URLSearchParams();
  const queryString = params ? buildQueryParams(searchParams, params) : "";

  const data = await fetchInstance.get<ReviewsRes>(
    `/reviews${queryString ? `?${queryString}` : ""}`,
    options,
  );
  return data;
}

// 리뷰 추가
export async function addReviews(body: AddReviews) {
  const data = await fetchInstance.post<AddReviewsRes>("/review", body);
  return data;
}

// 리뷰 평점 목록 조회
export async function getReviewsRating(
  params: GetReviewsRating,
  options?: { next?: NextFetchRequestConfig },
) {
  const searchParams = new URLSearchParams();
  const queryString = buildQueryParams(searchParams, params);

  const data = await fetchInstance.get<GetReviewsRatingRes>(
    `/reviews/score${queryString ? `?${queryString}` : ""}`,
    options,
  );
  return data;
}
// 타입 별 리뷰 평점 통계 조회
export async function getReviewStats(type: string, options?: { next?: NextFetchRequestConfig }) {
  const data = await fetchInstance.get<GetReviewStatsRes>(
    `/reviews/statistics?${type ? `type=${type}` : ""}`,
    options,
  );
  return data;
}

// 모임 별 리뷰 평점 목록 조회
export async function getReviewsRatingGathering(
  params: GetReviewsRatingGathering,
  options?: { next?: NextFetchRequestConfig },
) {
  const searchParams = new URLSearchParams();
  const queryString = buildQueryParams(searchParams, params);

  const data = await fetchInstance.get<AddReviewsRes>(
    `/reviews/score${queryString ? `?${queryString}` : ""}`,
    options,
  );
  return data;
}
