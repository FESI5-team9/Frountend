export async function fetchWithMiddleware(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.message || "요청 실패";
    throw new Error(errorMessage);
  }

  return response;
}
