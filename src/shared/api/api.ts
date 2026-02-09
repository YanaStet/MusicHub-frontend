class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || "";
  }

  private async request<T>(
    endpoint: string,
    method: string = "GET",
    body?: unknown,
    headers: HeadersInit = {},
  ): Promise<T> {
    const config: RequestInit = {
      method,
      headers: { ...headers },
      credentials: "include",
    };

    if (body) {
      if (body instanceof FormData) {
        config.body = body;
      } else {
        config.body = JSON.stringify(body);

        (config.headers as Record<string, string>)["Content-Type"] =
          "application/json";
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      if (response.status === 401) {
        console.warn("User unauthorized");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || response.statusText;
        throw new Error(`API Error: ${response.status} ${errorMessage}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  public get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, "GET", undefined, headers);
  }

  public post<T, D>(
    endpoint: string,
    data: D,
    headers?: HeadersInit,
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", data, headers);
  }

  public put<T, D>(
    endpoint: string,
    data: D,
    headers?: HeadersInit,
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", data, headers);
  }

  public delete<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, "DELETE", undefined, headers);
  }
}

export const api = new Api();
