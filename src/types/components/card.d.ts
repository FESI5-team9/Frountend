import { GetMyJoinedGathering } from "@/types/api/gatheringApi";

export interface GetGathering {
  id: number;
  type: "CAFE" | "RESTAURANT" | "PUB" | "VEGAN";
  name: string;
  dateTime: string;
  registrationEnd: string;
  location?:
  | "SEOUL"
  | "GYEONGGI_DO"
  | "GANGWON_DO"
  | "CHUNGCHEONG_DO"
  | "GYEONGSANG_DO"
  | "JEOLLA_DO"
  | "JEJU_ISLAND";
  address1: string;
  address2: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdAt: string;
}

export interface MypageCardProps {
  id?: number;
  name: string;
  location?: string;
  address1: string;
  dateTime: string;
  image: string;
  participantCount: number;
  capacity: number;
  keywords?: string[];
}

export interface AllReviewCardProps {
  review: GetMyJoinedGatheringWithReview[];
  reviewed: ReviewRes[];
}

export interface ReviewSubmit {
  score?: number;
  content?: string;
}

export type GetMyJoinedGatheringWithReview = GetMyJoinedGathering & ReviewContent;
