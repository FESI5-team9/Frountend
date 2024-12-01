import "@/types/api/gatheringApi";
import {
  CreateGathering,
  GatheringRes,
  Gatherings,
  GatheringsRes,
  GetGatheringParticipants,
  GetGatheringParticipantsRes,
  GetMyJoinedGatherings,
  GetMyJoinedGatheringsRes,
} from "@/types/api/gatheringApi";
import fetchInstance from "./fetchInstance";

// 모임 취소
export async function CancelGathering(id: string) {
  const data = await fetchInstance.put<GatheringRes>(`/gatherings/${id}/cancel`);
  return data;
}

// 모임 목록 조회
export async function getGatherings(params: Gatherings) {
  const data = await fetchInstance.get<GatheringsRes>(
    `/gatherings?${params.id ? `id=${params.id}&` : ""}${params.type ? `type=${params.type}&` : ""}${params.dateTime ? `dateTime=${params.dateTime}&` : ""}${params.location ? `location=${params.location}&` : ""}${params.createdBy ? `createdBy=${params.createdBy}&` : ""}size=${params.size}&page=${params.page}&sort=${params.sort}&direction=${params.direction}`,
  );
  return data;
}

// 모임 생성
export async function createGathering(body: CreateGathering) {
  const data = await fetchInstance.post<GatheringRes>("/gatherings", body);
  return data;
}

// 모임 참여
export async function joinGathering(id: string) {
  const data = await fetchInstance.post(`/gatherings/${id}/join`);
  return data;
}

// 모임 상세 조회
export async function getGatheringDetail(id: string) {
  const data = await fetchInstance.get<GatheringRes>(`/gatherings/${id}`);
  return data;
}

// 특정 모임의 참가자 목록 조회
export async function getGatheringParticipants(id: number, params: GetGatheringParticipants) {
  const data = await fetchInstance.get<GetGatheringParticipantsRes>(
    `/gatherings/${id}/participants?size=${params.size}&page=${params.page}&sort=${params.sort}&direction=${params.direction}`,
  );
  return data;
}

// 로그인된 사용자가 참석한 모임 목록 조회
export async function getMyJoinedGatherings(params: GetMyJoinedGatherings) {
  const data = await fetchInstance.get<GetMyJoinedGatheringsRes>(
    `/gatherings/joined?completed=${params.completed}&reviews=${params.reviews}&size=${params.size}&page=${params.page}&sort=${params.sort}&direction=${params.direction}`,
  );
  return data;
}

// 모임 참여 취소
export async function LeaveGathering(id: string) {
  const data = await fetchInstance.delete(`/gatherings/${id}/leave`);
  return data;
}
