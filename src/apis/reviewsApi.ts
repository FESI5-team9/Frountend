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
export async function getReviews(params?: GetReviews) {
  const data = await fetchInstance.get<ReviewsRes>(
    `/reviews?${params?.gatheringId ? `gatheringId=${params.gatheringId}&` : ""}${params?.userId ? `userId=${params.userId}&` : ""}${params?.type ? `type=${params.type}&` : ""}${params?.location ? `location=${params.location}&` : ""}${params?.date ? `date=${params.date}&` : ""}${params?.registrationEnd ? `registrationEnd=${params.registrationEnd}&` : ""}${params?.size ? `size=${params.size}&` : ""}${params?.page ? `page=${params.page}&` : ""}${params?.sort ? `sort=${params.sort}&` : ""}${params?.direction ? `direction=${params.direction}` : ""}`,
  );
  return data;
}

// 리뷰 추가
export async function addReviews(body: AddReviews) {
  const data = await fetchInstance.post<AddReviewsRes>("/review", body);
  return data;
}

// 리뷰 평점 목록 조회
export async function getReviewsRating(params: GetReviewsRating) {
  const data = await fetchInstance.get<GetReviewsRatingRes>(
    `/reviews/score?${params?.gatheringId ? `gatheringId=${params.gatheringId}&` : ""}${params?.type ? `type=${params.type}` : ""}`,
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

// 모임 별 리뷰 평점 목록 조회
export async function getReviewsRatingGathering(params: GetReviewsRatingGathering) {
  const data = await fetchInstance.get<AddReviewsRes>(
    `/reviews/score?${params?.gatheringId ? `gatheringId=${params.gatheringId}` : ""}`,
  );
  return data;
}
