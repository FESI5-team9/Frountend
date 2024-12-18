// src/apis/gatheringsApi.ts
import { Gatherings } from "@/types/api/gatheringApi";
import { GetGathering } from "@/types/components/card";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.example.com";

export async function getMainPage(params: Gatherings): Promise<GetGathering[]> {
  try {
    // 쿼리 파라미터 생성
    const queryParams = new URLSearchParams(params as unknown as Record<string, string>).toString();
    const url = `${BASE_URL}/gatherings/${queryParams}`;

    // 데이터 요청
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("API 응답 에러:", await response.text());
      throw new Error(`Failed to fetch gatherings: ${response.statusText}`);
    }

    const data: GetGathering[] = await response.json();
    return data;
  } catch (error) {
    console.error("getGatherings 에러:", error);
    throw error;
  }
}
