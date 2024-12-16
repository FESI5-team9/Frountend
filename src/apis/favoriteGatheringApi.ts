import buildQueryParams from "@/hooks/queryParams";
import { Gatherings, GatheringsRes } from "@/types/api/gatheringApi";
import fetchInstance from "./fetchInstance";

// 모임 찜하기
export async function getFavoriteGathering(id: number) {
  const data = await fetchInstance.post(`/gatherings/${id}/favorite`);

  return data;
}

// 모임 찜하기 취소하기
export async function deleteFavoriteGathering(id: number) {
  const data = await fetchInstance.delete(`/gatherings/${id}/favorite`);
  return data;
}

// 찜한 모임 목록 조회
export async function getFavoriteGatherings(params: Gatherings) {
  const searchParams = new URLSearchParams();
  const queryString = buildQueryParams(searchParams, params);
  const data = await fetchInstance.get<GatheringsRes>(
    `/gatherings/favorite${queryString ? `?${queryString}` : ""}`,
  );

  return data;
}
