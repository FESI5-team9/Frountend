export type GetReviews = {
  gatheringId?: number;
  userId?: number;
  type?: string;
  location?: string;
  date?: string;
  registrationEnd?: string;
  size?: number;
  page?: number;
  sort?: string;
  direction?: string;
};

export type ReviewsRes = ReviewRes[];

export type ReviewRes = {
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  gathering: Gathering;
  user: User;
};

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

export type AddReviewRes = {
  id: number;
  userId: number;
  gatheringId: number;
  score: number;
  comment: string;
  createdAt: string;
};

export type GetReviewsRating = {
  gatheringId?: number;
  type?: string;
};

export type GetReviewsRatingRes = ReviewRating[];

export type ReviewRating = {
  gatheringId: number;
  type: string;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
};
