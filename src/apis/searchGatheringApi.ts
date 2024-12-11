import buildQueryParams from "@/hooks/queryParams";
import {
  GatheringRes,
  Gatherings,
  GatheringsRes,
  GetGatheringParticipants,
  GetGatheringParticipantsRes,
  GetMyJoinedGatherings,
  GetMyJoinedGatheringsRes,
  GetSearchGatheringRes,
  GetSearchGatherings,
} from "@/types/api/gatheringApi";
import fetchInstance from "./fetchInstance";

// 모임 목록 조회
export async function getGatherings(params: Gatherings) {
  const searchParams = new URLSearchParams();
  const queryString = buildQueryParams(searchParams, params);

  const data = await fetchInstance.get<GatheringsRes>(
    `/gatherings${queryString ? `?${queryString}` : ""}`,
  );
  return data;
}

// 모임 상세 조회
export async function getGatheringDetail(id: number, options?: { next?: NextFetchRequestConfig }) {
  const data = await fetchInstance.get<GatheringRes>(`/gatherings/${id}`, options);
  return data;
}

export async function getGatheringParticipants(
  id: number,
  params: GetGatheringParticipants,
  options?: { next?: NextFetchRequestConfig },
) {
  const searchParams = new URLSearchParams();
  const queryString = buildQueryParams(searchParams, params);

  const data = await fetchInstance.get<GetGatheringParticipantsRes>(
    `/gatherings/${id}/participants${queryString ? `?${queryString}` : ""}`,
    options,
  );
  return data;
}

// 모임 목록 검색
export async function getSearchGatherings(
  params: GetSearchGatherings,
  options?: { next?: NextFetchRequestConfig },
) {
  const formatSearchKeywords = (searchText: string): string => {
    return searchText
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .filter(word => word.length > 0)
      .join(",");
  };

  const searchParams = new URLSearchParams();
  if (params.search) {
    searchParams.set("search", formatSearchKeywords(params.search));
  }
  const queryString = buildQueryParams(searchParams, params);

  const data = await fetchInstance.get<GetSearchGatheringRes>(
    `/gatherings/search${queryString ? `?${queryString}` : ""}`,
    options,
  );
  return data;
}

// 로그인된 사용자가 참석한 모임 목록 조회
export async function getMyJoinedGatherings(
  params: GetMyJoinedGatherings,
  options?: { next?: NextFetchRequestConfig },
) {
  const searchParams = new URLSearchParams();
  const queryString = buildQueryParams(searchParams, params);

  const data = await fetchInstance.get<GetMyJoinedGatheringsRes>(
    `/gatherings/joined${queryString ? `?${queryString}` : ""}`,
    options,
  );
  return data;
}
