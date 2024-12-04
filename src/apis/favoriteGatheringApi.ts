import { GatheringsRes } from "@/types/api/gatheringApi";
import fetchInstance from "./fetchInstance";

// 모임 찜하기
export async function joinGathering(id: string) {
  const data = await fetchInstance.post(`/gatherings/${id}/favorite`);
  return data;
}

// 모임 찜하기 취소하기
export async function LeaveGathering(id: string) {
  const data = await fetchInstance.delete(`/gatherings/${id}/favorite`);
  return data;
}

// 찜한 모임 목록 조회
export async function getGatherings() {
  const data = await fetchInstance.get<GatheringsRes>("/gatherings/favorite");
  return data;
}
