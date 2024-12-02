// src/lib/client.ts
import { handleApiError } from "./ApiError";
import { createClient } from "./HttpClient/HttpClient";
import { APIError } from "./HttpClient/error";

const fetchInstance = createClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzMzMTIyOTk0LCJleHAiOjE3MzMxMjQ3OTR9.39tMF8Oxz8m9Yfl_hDv2tIyrpAZuaTQ0jluuH8x-g4Y",
  },
  credentials: "include",
});

// 요청 인터셉터 추가
fetchInstance.interceptors.request.push({
  onFulfilled: async config => {
    const excludedUrls = ["/auth/tokens"];

    if (excludedUrls.some(url => config.url?.includes(url))) {
      return config;
    }
    const newConfig = { ...config };
    newConfig.headers = {
      ...newConfig.headers,
    };

    return newConfig;
  },
  onRejected: error => Promise.reject(error),
});
fetchInstance.interceptors.response.push({
  onFulfilled: response => {
    return response;
  },
  onRejected: async (error: unknown) => {
    if (!(error instanceof APIError)) {
      return Promise.reject(error);
    }

    const prevConfig = error.config;

    if (error.status === 401 && prevConfig && !prevConfig.retry) {
      prevConfig.retry = true;
      try {
        const { method, url, body, ...restConfig } = prevConfig;
        prevConfig.headers = {
          ...prevConfig.headers,
        };
        switch (method?.toUpperCase()) {
          case "GET":
            return await fetchInstance.get(url as string, restConfig);
          case "POST":
            return await fetchInstance.post(url as string, body, restConfig);
          case "PUT":
            return await fetchInstance.put(url as string, body, restConfig);
          case "PATCH":
            return await fetchInstance.patch(url as string, body, restConfig);
          case "DELETE":
            return await fetchInstance.delete(url as string, restConfig);
          default:
            return await fetchInstance.get(url as string, restConfig);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    const handledError = handleApiError(error);
    return Promise.reject(handledError);
  },
});

export default fetchInstance;
