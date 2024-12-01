export type GetReviews = {
  gatheringId: number;
  userId: number;
  type: string;
  location: string;
  date: string;
  registrationEnd: string;
  size: number;
  page: number;
  sort: string;
  direction: string;
};

export type AddReviews = {
  gatheringId: number;
  type: string;
};

export type GetReviewsRating = {
  gatheringId: number;
  type: string;
};

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

export type GetReviewsRatingRes = ReviewRating[];

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
  email: string;
  password: string;
  name: string;
  nickname: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  tokens: Array<Tokens>;
  username: string;
  authorities: Array<Tokens>;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

type Gathering = {
  id: number;
  location: string;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  address1: string;
  address2: string;
  description: string;
  participantCount: number;
  capacity: number;
  createdBy: string;
  user: User;
  canceledAt: string;
  canceledGathering: boolean;
  joinableGathering: boolean;
};

type Tokens = {
  id: number;
  token: string;
  tokenType: string;
  expired: boolean;
  revoked: boolean;
  user: string;
  authority: string;
};
