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
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  address1: string;
  address2: string;
  keyword: string[];
  capacity: number;
};

export type GatheringRes = GatheringBase & {
  id: number;
  description: string;
  participantCount: number;
  image: string;
  createdBy: string;
  canceledAt: string;
};

export type GatheringsRes = GatheringRes[];

export type GetMyJoinedGatheringsRes = GatheringBase & {
  id: number;
  createdBy: string;
  canceledAt: string;
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
};

export type CreateGathering = Omit<GatheringBase, "keyword"> & {
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

export type Token = {
  id: number;
  token: string;
  tokenType: "BEARER";
  expired: boolean;
  revoked: boolean;
  user: string;
};

export type Authority = {
  authority: string;
};

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  tokens: Token[];
  username: string;
  authorities: Authority[];
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

export type Participant = {
  userId: number;
  gatheringId: number;
  joinedAt: string;
  user: User;
};

export type GetGatheringParticipants = PaginationParams;
export type GetGatheringParticipantsRes = Participant[];
