// src/lib/client.ts
import { setAuthCookies } from "@/app/actions/auth";
import { LoginRes } from "@/types/api/authApi";
import { handleApiError } from "./ApiError";
import { createClient } from "./HttpClient/HttpClient";
import { APIError } from "./HttpClient/error";

const fetchInstance = createClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
  },
  credentials: "include",
});

// 요청 인터셉터 추가
fetchInstance.interceptors.request.push({
  onFulfilled: async config => {
    const excludedUrls = ["/auth/refresh-token"];
    if (excludedUrls.some(url => config.url?.includes(url))) {
      return config;
    }
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return undefined;
    };
    const accessToken = getCookie("accessToken");
    const newConfig = { ...config };
    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    // FormData 사용 시 Content-Type 제거
    if (config.data instanceof FormData) {
      delete newConfig.headers["Content-Type"];
    }

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
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(";").shift();
          return undefined;
        };

        const currentRefreshToken = getCookie("refreshToken");
        if (!currentRefreshToken) {
          return await Promise.reject(error);
        }

        const refreshClient = createClient({
          baseURL: process.env.NEXT_PUBLIC_BASE_URL,
          headers: {
            Authorization: `Bearer ${currentRefreshToken}`,
          },
        });

        const data = await refreshClient.post<LoginRes>("/auth/refresh-token");
        await setAuthCookies(data.accessToken, data.refreshToken);

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
