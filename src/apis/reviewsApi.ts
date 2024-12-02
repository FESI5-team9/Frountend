import {
  AddReviews,
  AddReviewsRes,
  GetReviews,
  GetReviewsRating,
  GetReviewsRatingRes,
  ReviewsRes,
} from "@/types/api/reviews";
import fetchInstance from "./fetchInstance";

// 리뷰 목록 조회
export async function getReviews(params?: GetReviews) {
  const query = new URLSearchParams();

  if (params?.gatheringId) {
    query.set("gatheringId", params.gatheringId.toString());
  }
  if (params?.userId) {
    query.set("userId", params.userId.toString());
  }
  if (params?.type) {
    query.set("type", params.type);
  }
  if (params?.location) {
    query.set("location", params.location);
  }
  if (params?.date) {
    query.set("date", params.date);
  }
  if (params?.registrationEnd) {
    query.set("registrationEnd", params.registrationEnd);
  }
  if (params?.size) {
    query.set("size", params.size.toString());
  }
  if (params?.page) {
    query.set("page", params.page.toString());
  }
  if (params?.sort) {
    query.set("sort", params.sort);
  }
  if (params?.direction) {
    query.set("direction", params.direction);
  }

  const data = await fetchInstance.get<ReviewsRes>(`/reviews?${query.toString()}`);
  return data;
}

// 리뷰 추가
export async function addReviews(body: AddReviews) {
  const data = await fetchInstance.post<AddReviewsRes>("/review", body);
  return data;
}

// 리뷰 평점 목록 조회
export async function getReviewsRating(params: GetReviewsRating) {
  const query = new URLSearchParams();

  if (params?.gatheringId) {
    query.set("gatheringId", params.gatheringId.toString());
  }
  if (params?.type) {
    query.set("type", params.type);
  }

  const data = await fetchInstance.get<GetReviewsRatingRes>(`/reviews/score?${query.toString()}`);
  return data;
}
