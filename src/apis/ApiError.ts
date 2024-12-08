import { APIError } from "./HttpClient/error";

export const handleApiError = (error: unknown): APIError => {
  // API 응답 에러인 경우
  if (error && typeof error === "object" && "status" in error) {
    const apiError = error as {
      status: number;
      data?: unknown;
      message?: unknown;
    };

    return new APIError(apiError.status, apiError.data || null, apiError.message || null);
  }

  // fetch 네트워크 에러
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return new APIError(500, null, { error: "Network Error" });
  }

  // 기타 에러
  return new APIError(500, null, { error: "Unknown Error" });
};
