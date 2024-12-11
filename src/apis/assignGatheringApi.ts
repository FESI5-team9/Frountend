import { CreateGathering, GatheringRes } from "@/types/api/gatheringApi";
import fetchInstance from "./fetchInstance";

// 모임 취소
export async function CancelGathering(id: string) {
  const data = await fetchInstance.put<GatheringRes>(`/gatherings/${id}/cancel`);
  return data;
}

// 모임 생성
export async function createGathering(body: CreateGathering) {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(key, item));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  const data = await fetchInstance.post<GatheringRes>("/gatherings", formData);
  return data;
}

// 모임 참여
export async function joinGathering(id: string) {
  const data = await fetchInstance.post(`/gatherings/${id}/join`);
  return data;
}

// 모임 참여 취소
export async function LeaveGathering(id: string) {
  const data = await fetchInstance.delete(`/gatherings/${id}/leave`);
  return data;
}

// 모임 수정
