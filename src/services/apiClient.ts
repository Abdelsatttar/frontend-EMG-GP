export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: () => string | null | Promise<string | null>;
}

export class ApiRequestError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export function createApiClient(options: ApiClientOptions) {
  const baseUrl = options.baseUrl.replace(/\/+$/, "");

  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = await options.getAccessToken?.();
    const headers = new Headers(init.headers);
    if (!headers.has("Accept")) headers.set("Accept", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(`${baseUrl}/${path.replace(/^\/+/, "")}`, {
      ...init,
      headers
    });

    if (!response.ok) {
      const message = await response.text().catch(() => "");
      throw new ApiRequestError(message || `API request failed (${response.status})`, response.status);
    }

    if (response.status === 204) return undefined as T;
    return await response.json() as T;
  }

  return {
    get: <T>(path: string, signal?: AbortSignal) => request<T>(path, { method: "GET", signal }),
    post: <T>(path: string, body?: unknown) => request<T>(path, {
      method: "POST",
      headers: body instanceof FormData ? undefined : { "Content-Type": "application/json" },
      body: body instanceof FormData ? body : body === undefined ? undefined : JSON.stringify(body)
    }),
    put: <T>(path: string, body?: unknown) => request<T>(path, {
      method: "PUT",
      headers: body instanceof FormData ? undefined : { "Content-Type": "application/json" },
      body: body instanceof FormData ? body : body === undefined ? undefined : JSON.stringify(body)
    }),
    delete: <T>(path: string) => request<T>(path, { method: "DELETE" })
  };
}
