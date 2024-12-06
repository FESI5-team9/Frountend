//GET
export async function getData(url: string, headers?: HeadersInit) {
  const getUrl = process.env.NEXT_PUBLIC_BASE_URL + url;
  try {
    const response = await fetch(getUrl, {
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
      const data = await response.json();

      return data; // JSON 변환
    } else {
      const data = await response.text();

      return data; // JSON이 아니면 그냥 텍스트 반환
    }
  } catch {}
}
