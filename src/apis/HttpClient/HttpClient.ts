import { APIError, APIResponse, Client, Config, Interceptor } from "@/types/api/httpClient";
import { retry } from "./retry";

// client.ts
export const createClient = (baseConfig: Config = {}): Client => {
  const requestInterceptors: Interceptor<Config>[] = [];
  const responseInterceptors: Interceptor<APIResponse>[] = [];

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
      credentials: config.credentials,
      signal: config.signal,
      cache: config.cache as RequestCache,
      next: config.next,
    };

    if (config.body != null) {
      // BodyInit 타입이거나 plain object인 경우 처리
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

  const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new APIError(
        response.status,
        errorData,
        errorData?.message ?? `Error ${response.status}`,
      );
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

      const execute = () => fetch(url, init).then(res => handleResponse<T>(res));

      if (finalConfig.retryConfig) {
        const { maxRetries, retryDelay, retryCondition } = finalConfig.retryConfig;
        return await retry(execute, maxRetries, retryDelay, retryCondition);
      }

      return await execute();
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
