import { Config } from "@/types/api/httpClient";

export class APIError extends Error {
  readonly name = "APIError";

  constructor(
    public readonly status: number,
    public readonly data: unknown = null,
    message?: string,
    public readonly config?: Config,
  ) {
    super(message ?? `API Error: ${status}`);

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
