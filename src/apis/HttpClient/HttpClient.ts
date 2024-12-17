// src/lib/HttpClient/HttpClient.ts
import { APIResponse, Client, Config, Interceptor } from "@/types/api/httpClient";
import { APIError } from "./error";

export const createClient = (baseConfig: Config = {}): Client => {
  const requestInterceptors: Interceptor<Config>[] = [];
  const responseInterceptors: Interceptor<APIResponse>[] = [];

  const getAccessToken = async () => {
    if (typeof window === "undefined") {
      try {
        const { cookies } = await import("next/headers");
        return cookies().get("access-token")?.value;
      } catch {
        return undefined;
      }
    } else {
      const cookies = document.cookie.split(";").map(cookie => cookie.trim());

      const accessToken = cookies.find(cookie => cookie.startsWith("access-token="))?.split("=")[1];

      return accessToken;
    }
  };

  const createURL = (path: string, params?: Record<string, string>): string => {
    if (!path) throw new Error("URL path is required");

    const baseUrl = baseConfig.baseURL?.replace(/\/+$/, "") ?? "";
    const normalizedPath = path.replace(/^\/+/, "/");
    const fullUrl = `${baseUrl}${normalizedPath}`;

    if (!params) return fullUrl;

    try {
      const url = new URL(fullUrl);
      Object.entries(params)
        .filter(([_, value]) => value != null)
        .forEach(([key, value]) => url.searchParams.append(key, value));
      return url.toString();
    } catch (error) {
      throw new Error(`Invalid URL: ${fullUrl}`);
    }
  };

  const createRequestInit = (config: Config = {}): RequestInit => {
    const isFormData = config.body instanceof FormData;
    const headers = isFormData
      ? Object.fromEntries(
        Object.entries({ ...baseConfig.headers, ...config.headers }).filter(
          ([key]) => key.toLowerCase() !== "content-type",
        ),
      )
      : {
        "Content-Type": "application/json",
        ...baseConfig.headers,
        ...config.headers,
      };

    const init: RequestInit = {
      method: config.method,
      headers,
      credentials: config.credentials || "include",
      signal: config.signal,
      cache: config.cache as RequestCache,
      next: config.next,
    };

    if (config.body != null) {
      init.body =
        config.body instanceof FormData ||
        config.body instanceof Blob ||
        config.body instanceof ArrayBuffer ||
        config.body instanceof URLSearchParams ||
        ArrayBuffer.isView(config.body) ||
        typeof config.body === "string"
          ? (config.body as BodyInit)
          : JSON.stringify(config.body);
    }

    return init;
  };

  const handleResponse = async <T>(response: Response, config: Config): Promise<T> => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      const error = new APIError(
        response.status,
        config.body || null,
        errorData?.message || `Error ${response.status}`,
        config,
      );

      return responseInterceptors.reduce<Promise<T>>(async (promise, interceptor): Promise<T> => {
        try {
          const value = await promise;
          return value;
        } catch (err) {
          if (interceptor.onRejected) {
            return interceptor.onRejected(err) as Promise<T>;
          }
          throw err;
        }
      }, Promise.reject(error));
    }

    const data = await response.json();
    const apiResponse: APIResponse = {
      data,
      status: response.status,
      headers: response.headers,
    };

    const result = await responseInterceptors.reduce(async (promise, interceptor) => {
      const value = await promise;
      return interceptor.onFulfilled?.(value) ?? value;
    }, Promise.resolve(apiResponse));

    return result.data as T;
  };

  const request = async <T>(config: Config): Promise<T> => {
    const finalConfig = await requestInterceptors.reduce(async (promise, interceptor) => {
      const conf = await promise;
      return interceptor.onFulfilled?.(conf) ?? conf;
    }, Promise.resolve(config));

    // 토큰을 가져와서 헤더에 추가
    if (!finalConfig.url?.includes("/auth/managed-access-token")) {
      const accessToken = await getAccessToken();
      finalConfig.headers = {
        ...finalConfig.headers,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };
    }

    const controller = new AbortController();
    const timeoutId = finalConfig.timeout
      ? setTimeout(() => controller.abort(), finalConfig.timeout)
      : undefined;

    try {
      const url = createURL(config.url!, config.params);
      const init = createRequestInit({
        ...finalConfig,
        signal: controller.signal,
      });

      return await fetch(url, init).then(res => handleResponse<T>(res, finalConfig));
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  };

  return {
    interceptors: {
      request: requestInterceptors,
      response: responseInterceptors,
    },

    get: (url, config = {}) => request({ ...config, url, method: "GET" }),
    post: (url, data, config = {}) => request({ ...config, url, method: "POST", body: data }),
    put: (url, data, config = {}) => request({ ...config, url, method: "PUT", body: data }),
    patch: (url, data, config = {}) => request({ ...config, url, method: "PATCH", body: data }),
    delete: (url, config = {}) => request({ ...config, url, method: "DELETE" }),
  };
};
