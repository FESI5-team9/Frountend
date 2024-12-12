import { Config } from "@/types/api/httpClient";

export class APIError extends Error {
  readonly name = "APIError";

  public readonly originalMessage: unknown;

  constructor(
    public readonly status: number,
    public readonly data: unknown = null,
    message?: unknown,
    public readonly config?: Config,
  ) {
    // Error의 message를 전체 정보를 포함한 문자열로 만듦
    const errorInfo = {
      name: "APIError",
      status: status,
      message: message,
      data: data,
    };
    super(JSON.stringify(errorInfo));

    this.originalMessage = message;
    Object.setPrototypeOf(this, APIError.prototype);
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      status: this.status,
      message: this.originalMessage,
      data: this.data,
    };
  }
}
