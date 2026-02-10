import type { Composer, ComposerResponse } from "@/entities/composer/model";
import type { NotePaginatedResponse, NoteParams } from "@/entities/note/model";
import { api } from "@/shared/api/api";
import { buildQueryParams } from "@/shared/utils/query";
import type { LoginRequest, RegisterRequest } from "../model";

class AuthService {
  async login(body: LoginRequest): Promise<Composer> {
    const data = await api.post<Composer, LoginRequest>("/auth/login", body);
    return data;
  }
  async logout(): Promise<{}> {
    const data = await api.post<{}, {}>("/auth/logout", {});
    return data;
  }
  async register(body: RegisterRequest): Promise<Composer> {
    const data = await api.post<Composer, RegisterRequest>(
      "/auth/register",
      body,
    );
    return data;
  }
  async me(): Promise<ComposerResponse> {
    const data = await api.get<ComposerResponse>("/me");
    return data;
  }
  async mySongs(params: NoteParams): Promise<NotePaginatedResponse> {
    const data = await api.get<NotePaginatedResponse>(
      `/my-songs?${buildQueryParams(params)}`,
    );
    return data;
  }
}

export const authService = new AuthService();
