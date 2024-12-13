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
  address2: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdAt: string;
  canceledAt: string;
};
export type GatheringRes = GatheringBase & {
  user: User;
  description: string;
  keyword: string[];
  host: boolean;
  favorite: boolean;
  open: boolean;
  participants: Participant[];
};

export type GatheringDetailRes = GatheringRes & {
  status: "RECRUITING" | "RECRUITMENT_COMPLETED";
  openParticipantCount: number;
};

export type User = {
  id: number;
  nickname?: string;
  image?: string;
};

export type CancelGatheringRes = GatheringBase & {
  user: User;
  description: string;
  keyword: string[];
  host: boolean;
};

export type Gathering = GatheringBase & {
  status: "RECRUITING" | "RECRUITMENT_COMPLETED";
  open: boolean;
  participation: boolean;
};

export type GatheringsRes = Gathering[];

export type GatheringsFavoriteRes = GatheringBase[];

export type GetMyJoinedGatheringsRes = GetMyJoinedGathering[];

export type GetMyJoinedGathering = GatheringBase & {
  keywords: string[];
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
};

export type CreateGathering = Omit<
GatheringBase,
"id" | "participantCount" | "createdAt" | "canceledAt" | "image" | "location" | "registrationEnd"
> & {
  openParticipantCount?: string;
  location: string;
  description: string;
  keyword: string[];
  image?: File;
};

export type Gatherings = PaginationParams & {
  id?: number[];
  type?: "CAFE" | "RESTAURANT" | "PUB" | "VEGAN";
  startDate?: string;
  endDate?: string;
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
  type?: "CAFE" | "RESTAURANT" | "PUB" | "VEGAN";
  location?:
  | "SEOUL"
  | "GYEONGGI_DO"
  | "GANGWON_DO"
  | "CHUNGCHEONG_DO"
  | "GYEONGSANG_DO"
  | "JEOLLA_DO"
  | "JEJU_ISLAND";
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
  nickname: string;
  image: string;
};

export type GetGatheringParticipants = PaginationParams;
export type GetGatheringParticipantsRes = Participant[];
