import {
  GatheringRes,
  Gatherings,
  GatheringsRes,
  GetGatheringParticipants,
  GetGatheringParticipantsRes,
  GetMyJoinedGatherings,
  GetMyJoinedGatheringsRes,
  GetSearchGatherings,
} from "@/types/api/gatheringApi";
import fetchInstance from "./fetchInstance";

// 모임 목록 조회
export async function getGatherings(params: Gatherings) {
  const data = await fetchInstance.get<GatheringsRes>(
    `/gatherings?${params.id ? `id=${params.id}&` : ""}${params.type ? `type=${params.type}&` : ""}${params.dateTime ? `dateTime=${params.dateTime}&` : ""}${params.location ? `location=${params.location}&` : ""} ${params.createdBy ? `createdBy=${params.createdBy}&` : ""}${params.size ? `size=${params.size}&` : ""}${params.page ? `page=${params.page}&` : ""}${params.sort ? `sort=${params.sort}&` : ""}${params.direction ? `direction=${params.direction}` : ""}`,
  );
  return data;
}

// 모임 상세 조회
export async function getGatheringDetail(id: number, userId: number) {
  const data = await fetchInstance.get<GatheringRes>(`/gatherings/${id}?uerId=${userId}`);
  return data;
}

// 특정 모임의 참가자 목록 조회
export async function getGatheringParticipants(id: number, params: GetGatheringParticipants) {
  const data = await fetchInstance.get<GetGatheringParticipantsRes>(
    `/gatherings/${id}/participants?${params.size ? `size=${params.size}&` : ""}${params.page ? `page=${params.page}&` : ""}${params.sort ? `sort=${params.sort}&` : ""}${params.direction ? `direction=${params.direction}` : ""}`,
  );
  return data;
}

// 모임 목록 검색
export async function getSearchGatherings(params: GetSearchGatherings) {
  const formatSearchKeywords = (searchText: string): string => {
    return searchText
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .filter(word => word.length > 0)
      .join(",");
  };
  const data = await fetchInstance.get<GatheringRes>(
    `/gatherings/search?search=${formatSearchKeywords(params.search)}${params.size ? `size=${params.size}&` : ""}${params.page ? `page=${params.page}&` : ""}${params.sort ? `sort=${params.sort}&` : ""}${params.direction ? `direction=${params.direction}` : ""}`,
  );
  return data;
}

// 로그인된 사용자가 참석한 모임 목록 조회
export async function getMyJoinedGatherings(params: GetMyJoinedGatherings) {
  const data = await fetchInstance.get<GetMyJoinedGatheringsRes>(
    `/gatherings/joined?${params.completed ? `completed=${params.completed}&` : ""}${params.reviews ? `reviews=${params.reviews}&` : ""}${params.size ? `size=${params.size}&` : ""}${params.page ? `page=${params.page}&` : ""}${params.sort ? `sort=${params.sort}&` : ""}${params.direction ? `direction=${params.direction}` : ""}`,
  );
  return data;
}
