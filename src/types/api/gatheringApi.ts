//Base

// requestBase
export type RequestBase = {
  type?: "CAFE" | "RESTAURANT" | "PUB" | "VEGAN";
  location?: string;
};

export type PaginationParams = {
  size?: number;
  page?: number;
  sort?: string;
  direction?: "desc" | "asc";
};

// responseBase
export type ResponseBase = {
  id: number;
  status: "RECRUITING" | "RECRUITMENT_COMPLETED";
  type: "CAFE" | "RESTAURANT" | "PUB" | "VEGAN";
  name: string;
  dateTime: string;
  registrationEnd: string;
  location:
  | "SEOUL"
  | "GYEONGGI_DO"
  | "GANGWON_DO"
  | "CHUNGCHEONG_DO"
  | "GYEONGSANG_DO"
  | "JEOLLA_DO"
  | "JEJU_ISLAND";
  address1: string;
  address2: string;
  description: string;
  keyword: string[];
  openParticipantCount: number;
  participantCount: number;
  capacity: number;
  image: string;
  createdAt: string;
  canceledAt: string;
  user: User;
};

export type ResponseOption = {
  host: boolean;
  favorite: boolean;
  open: boolean;
  participation: boolean;
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
  participants: Participant[];
};

export type Participant = {
  gatheringId: number;
  joinedAt: string;
  userId: number;
  email: string;
  nickname: string;
  image: string;
};

export type User = {
  id: number;
  nickname: string;
  image: string;
};

//모임 상세조회
// response
export type GatheringDetailRes = ResponseBase &
Pick<ResponseOption, "host" | "favorite" | "open" | "participants">;

// 모임 수정 , 모임 생성
// request
export type CreateGathering = RequestBase & {
  name?: string;
  dateTime?: string;
  openParticipantCount?: string;
  capacity?: number;
  image?: string;
  address1?: string;
  address2?: string;
  description?: string;
  keyword?: string[];
};
// response
export type GatheringRes = Omit<
ResponseBase,
"status" | "description" | "openParticipantCount" | "canceledAt" | "user"
>;

// 모임 취소
// response
export type CancelGatheringRes = Omit<ResponseBase, "status" | "openParticipantCount"> &
Pick<ResponseOption, "host">;

// 모임 목록 조회
// request
export type Gatherings = RequestBase &
PaginationParams & {
  id?: number[];
  startDate?: string;
  endDate?: string;
};
// response
export type GatheringsRes = Array<
Omit<ResponseBase, "description" | "keyword" | "openParticipantCount" | "user"> &
Pick<ResponseOption, "open" | "favorite" | "participation">
>;

// 모임 상태 변경
// responseBase GetGatheringRecruitRes

// 특정 모임의 참가자 목록 조회
// request
export type GetGatheringParticipants = PaginationParams;
// response
export type GetGatheringParticipantsRes = Participant[];

// 모임 목록 검색
// requestBase
export type GetSearchGatherings = RequestBase &
PaginationParams & {
  search: string;
};
// response
export type GetSearchGatheringRes = GatheringsRes;

// 로그인된 사용자가 참석한 모임 목록 조회
// requestBase
export type GetMyJoinedGatherings = PaginationParams & {
  completed?: boolean;
  reviewed?: boolean;
};
// response
export type GetMyJoinedGatheringsRes = Array<
Omit<ResponseBase, "status" | "description" | "openParticipantCount" | "user"> &
Pick<ResponseOption, "joinedAt" | "isCompleted" | "isReviewed">
>;

// 찜한 모임 목록 조회
// response
export type GatheringsFavoriteRes = Array<GatheringsRes>;

// 내가 만든 모임 목록 조회
// requestBase
export type GetMyGatheringParticipants = PaginationParams;
// response
export type GetMyGatheringParticipantsRes = Array<GatheringsRes>;
