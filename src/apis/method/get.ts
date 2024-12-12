export async function getData(endpoint: string, options: RequestInit = {}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    if (baseUrl === "") {
      throw new Error("베이스 URL이 정의되지 않았습니다. 환경 변수를 확인하세요.");
    }

    const url = `${baseUrl}/${endpoint}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers, // 추가 헤더 병합
      },
      ...options,
    });

    if (!response.ok) {
      console.error("API 응답 상태 코드:", response.status);
      console.error("주소", url);
      console.error("응답 텍스트:", await response.text());
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("데이터 요청 중 에러 발생:", error);
    throw error;
  }
}
