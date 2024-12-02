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
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
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
};

export type User = {
  id: number;
  nickname: string;
  image: string;
};

export type GatheringsRes = GatheringBase[];

export type GetMyJoinedGatheringsRes = {
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  address1: string;
  address2: string;
  keywords: string[];
  participantCount: number;
  capacity: number;
  createdBy: string;
  canceledAt: string;
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
};

export type CreateGathering = {
  type: string;
  location: string;
  name: string;
  dateTime: string;
  capacity: number;
  image?: string;
  registrationEnd: string;
  address1: string;
  address2: string;
  description: string;
  keyword: string[];
};

export type Gatherings = PaginationParams & {
  id?: number[];
  type?: string;
  dateTime?: string;
  location?: string;
  createdBy?: string;
};

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
