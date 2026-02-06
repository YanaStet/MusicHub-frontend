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
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
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
