import { getRegionMapping } from "@/hooks/useRegion";
import { CancelGatheringRes, CreateGathering, GatheringRes } from "@/types/api/gatheringApi";
import { DistrictName } from "@/types/hooks/region";
import fetchInstance from "./fetchInstance";

// 모임 취소
export async function CancelGathering(id: string) {
  const data = await fetchInstance.put<CancelGatheringRes>(`/gatherings/${id}/cancel`);
  return data;
}

// 모임 생성
export async function createGathering(body: CreateGathering, image?: File) {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    if (key === "location" && value) {
      const mappedRegion = getRegionMapping(value as DistrictName);
      formData.append(key, mappedRegion);
    } else if (key === "keyword" && Array.isArray(value)) {
      value.forEach(item => formData.append(key, item));
    } else if (key === "image" && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  if (image) {
    formData.append("image", image, image.name);
  }
  const data = await fetchInstance.post<GatheringRes>("/gatherings", formData);
  return data;
}

// 모임 참여
export async function joinGathering(id: string) {
  const data = await fetchInstance.post(`/gatherings/${id}/join`);
  return data;
}

// 모임 참여 취소
export async function LeaveGathering(id: number) {
  const data = await fetchInstance.delete(`/gatherings/${id}/leave`);
  return data;
}

// 모임 수정
export async function editGathering(id: string, body: CreateGathering) {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    if (key === "location" && value) {
      const mappedRegion = getRegionMapping(value as DistrictName);
      formData.append(key, mappedRegion);
    } else if (key === "keyword" && Array.isArray(value)) {
      value.forEach(item => formData.append(key, item));
    } else if (key === "image" && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  const data = await fetchInstance.put<GatheringRes>(`/gatherings/${id}`, formData);
  return data;
}
