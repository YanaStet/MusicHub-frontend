import type { ComposerResponse } from "@/entities/composer/model";
import { api } from "@/shared/api/api";

class AuthService {
  async login() {}
  async logout() {}
  async register() {}
  async me(): Promise<ComposerResponse> {
    const data = await api.get<ComposerResponse>("/me");
    return data;
  }
}

export const authService = new AuthService();
