export type GetReviews = {
  gatheringId?: number;
  userId?: number;
  type?: "CAFE" | "RESTAURANT" | "PUB" | "VEGAN";
  location?:
  | "SEOUL"
  | "GYEONGGI_DO"
  | "GANGWON_DO"
  | "CHUNGCHEONG_DO"
  | "GYEONGSANG_DO"
  | "JEOLLA_DO"
  | "JEJU_ISLAND";
  date?: string;
  registrationEnd?: string;
  size?: number;
  page?: number;
  sort?: string;
  direction?: string;
};

export type ReviewsRes = ReviewRes[];

export type ReviewResBase = {
  id: number;
  score: number;
  comment: string;
  createdAt: string;
};

export type ReviewRes = ReviewResBase & {
  gathering: Gathering;
  user: User;
};

export type Gathering = Partial<
Pick<GetReviews, "id" | "type" | "name" | "dateTime" | "location">
> & { image: string };

type User = {
  id: number;
  nickname: string;
  image: string;
};

export type AddReviews = {
  gatheringId: number;
  score: number;
  comment: string;
};

export type AddReviewsRes = AddReviewRes[];

export type AddReviewRes = ReviewResBase & {
  userId: number;
  gatheringId: number;
};

export type GetReviewsRating = Pick<ReviewRating, "gatheringId" | "type">;

export type GetReviewsRatingRes = ReviewRating[];

export type ReviewRating = {
  gatheringId?: number;
  type?: "CAFE" | "RESTAURANT" | "PUB" | "VEGAN";
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
};

export type GetReviewStatsRes = Omit<ReviewRating, "gatheringId" | "type">;

export type GetReviewsRatingGathering = Pick<
GetReviews,
"gatheringId" | "size" | "page" | "sort" | "direction"
>;
