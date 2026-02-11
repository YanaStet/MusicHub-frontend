import { api } from "@/shared/api/api";
import type { ComposerResponse } from "../model";

class ComposerService {
  async getComposerById(id: number): Promise<ComposerResponse> {
    const data = await api.get<ComposerResponse>(`/users/${id}`);
    return data;
  }
}

export const composerService = new ComposerService();
