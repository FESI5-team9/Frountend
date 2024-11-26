export async function postPutData<T extends Record<string, string | number | File | Blob>>(
  method: "POST" | "PUT", // HTTP 메서드 선택
  url: string,
  data: T,
  contentType: "application/json" | "multipart/form-data",
  headers?: HeadersInit,
) {
  let body: BodyInit | null = null; // 초기값 null로 설정

  // Content-Type에 따라 데이터 변환
  if (contentType === "application/json") {
    body = JSON.stringify(data); // JSON 형태로 변환
  } else if (contentType === "multipart/form-data") {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value); // 파일 처리
      } else {
        formData.append(key, String(value)); // 문자열이나 숫자 처리
      }
    });
    body = formData;

    // multipart/form-data는 Content-Type 자동 설정
    if (headers instanceof Headers) {
      headers.delete("Content-Type");
    } else if (typeof headers === "object" && headers) {
      headers = Object.fromEntries(
        Object.entries(headers).filter(([key]) => key.toLowerCase() !== "content-type"),
      );
    }
  }

  // fetch 요청
  const response = await fetch(url, {
    method, // 메서드를 동적으로 설정
    headers: {
      ...headers,
    },
    body: body || null,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
}
