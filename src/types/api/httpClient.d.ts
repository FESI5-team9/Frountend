// types.ts
export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class APIError extends Error {
  readonly name = "APIError";

  constructor(
    public readonly status: number,
    public readonly data: unknown = null,
    message?: string,
  ) {
    super(message ?? `API Error: ${status}`);

    // ES5 이하 버전 호환성을 위한 prototype 체인 수정
    Object.setPrototypeOf(this, APIError.prototype);
  }

  toString(): string {
    return `${this.name} (${this.status}): ${this.message}`;
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }
}

export interface NextFetchConfig {
  revalidate?: number | false;
  tags?: string[];
  cache?: "force-cache" | "no-store";
  prefetch?: boolean;
}

export interface BaseConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  next?: NextFetchConfig;
}

type Primitive = string | number | boolean | null | undefined;

export type RequestData =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FormData
  | URLSearchParams
  | Record<string, Primitive>;

export interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryCondition?: (error: unknown) => boolean;
}

export type Config<T = RequestData> = {
  url?: string;
  method?: HTTPMethod;
  params?: Record<string, string>;
  body?: T;
  signal?: AbortSignal;
  retryConfig?: RetryConfig;
  credentials?: RequestCredentials;
  next?: NextFetchConfig;
  cache?: RequestCache | boolean;
} & BaseConfig;

export interface APIResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
  config?: Config;
}

export interface Interceptor<T> {
  onFulfilled?: (value: T) => T | Promise<T>;
  onRejected?: (error: unknown) => unknown;
}

export interface Client {
  get<ResponseData = unknown>(url: string, config?: Config): Promise<ResponseData>;

  post<ResponseData = unknown>(
    url: string,
    data?: RequestData,
    config?: Config,
  ): Promise<ResponseData>;

  put<ResponseData = unknown>(
    url: string,
    data?: RequestData,
    config?: Config,
  ): Promise<ResponseData>;

  patch<ResponseData = unknown>(
    url: string,
    data?: RequestData,
    config?: Config,
  ): Promise<ResponseData>;

  delete<ResponseData = unknown>(url: string, config?: Config): Promise<ResponseData>;

  interceptors: {
    request: Interceptor<Config>[];
    response: Interceptor<APIResponse>[];
  };
}
