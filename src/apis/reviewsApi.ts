import {
  AddReviews,
  GetReviews,
  GetReviewsRating,
  GetReviewsRatingRes,
  ReviewsRes,
} from "@/types/api/reviews";
import fetchInstance from "./fetchInstance";

// 리뷰 목록 조회
export async function getReviews(params: GetReviews) {
  const data = await fetchInstance.get<ReviewsRes>(
    `/reviews?gatheringId=${params.gatheringId}&userId=${params.userId}&type=${params.type}&location=${params.location}&date=${params.date}&registrationEnd=${params.registrationEnd}&size=${params.size}&page=${params.page}&sort=${params.sort}&direction=${params.direction}`,
  );
  return data;
}

// 리뷰 추가
export async function addReviews(body: AddReviews) {
  const data = await fetchInstance.post<ReviewsRes>("/review", body);
  return data;
}

// 리뷰 평점 목록 조회
export async function getReviewsRating(params: GetReviewsRating) {
  const data = await fetchInstance.get<GetReviewsRatingRes>(
    `/reviews/score?gatherings?gatheringId=${params.gatheringId}&type=${params.type}`,
  );
  return data;
}
