// src/lib/client.ts
import { setAuthCookies } from "@/app/actions/auth";
import { LoginRes } from "@/types/api/authApi";
import { createClient } from "./HttpClient/HttpClient";
import { APIError } from "./HttpClient/error";

const fetchInstance = createClient({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
  },
  credentials: "include",
});

// 토큰 관련 로직 제거하고 필요한 인터셉터만 남김
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
        const refreshClient = createClient({
          baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        });

        const data = await refreshClient.post<LoginRes>("/auth/refresh-token");
        await setAuthCookies(data.accessToken);

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
  },
});

export default fetchInstance;
