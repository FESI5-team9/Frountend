//GET
export async function getData(url: string, headers?: HeadersInit) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    return response.json(); // JSON 변환
  } else {
    return response.text(); // JSON이 아니면 그냥 텍스트 반환
  }
}
