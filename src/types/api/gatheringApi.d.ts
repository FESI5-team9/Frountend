export const DIRECTION = {
  ASC: "ASC",
  DESC: "DESC",
} as const;
export type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

export type PaginationParams = {
  size?: number;
  page?: number;
  sort?: string;
  direction?: Direction;
};

export type GatheringBase = {
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
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: string;
  canceledAt: string;
};

export type GatheringRes = GatheringBase & {
  user: User;
  address2: string;
  description: string;
  keyword: string[];
  host: boolean;
  favorite: boolean;
  participants: Participant;
};

export type User = {
  id: number;
  nickname: string;
  image: string;
};

export type GatheringsRes = GatheringBase[];

export type GetMyJoinedGatheringsRes = Omit<GatheringBase, "canceledAt"> & {
  address2: string;
  keywords: string[];
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
};

export type CreateGathering = Omit<
GatheringBase,
"id" | "participantCount" | "createdBy" | "canceledAt" | "image" | "location"
> & {
  openParticipantCount?: string;
  location: string;
  address2: string;
  description: string;
  keyword: string[];
  image?: File;
};

export type Gatherings = PaginationParams & {
  id?: number[];
  type?: "CAFE" | "RESTAURANT" | "PUB" | "VEGAN";
  dateTime?: string;
  location?:
  | "SEOUL"
  | "GYEONGGI_DO"
  | "GANGWON_DO"
  | "CHUNGCHEONG_DO"
  | "GYEONGSANG_DO"
  | "JEOLLA_DO"
  | "JEJU_ISLAND";
  createdBy?: string;
};

export type GetSearchGatherings = PaginationParams & {
  search: string;
};

export type GetSearchGatheringRes = GatheringBase[];

export type GetMyJoinedGatherings = PaginationParams & {
  completed?: boolean;
  reviews?: boolean;
};

export type Participant = {
  gatheringId: number;
  joinedAt: string;
  userId: number;
  email: string;
  name: string;
  nickname: string;
  image: string;
};

export type GetGatheringParticipants = PaginationParams;
export type GetGatheringParticipantsRes = Participant[];
