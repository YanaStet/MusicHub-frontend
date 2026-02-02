import { api } from "@/shared/api/api";
import type { NoteParams, NotePaginatedResponse, NoteById } from "../model";
import { buildQueryParams } from "@/shared/utils/query";

class NoteService {
  async getNotesPaginated(params: NoteParams): Promise<NotePaginatedResponse> {
    const data = await api.get<NotePaginatedResponse>(
      `/songs?${buildQueryParams(params)}`,
    );
    return data;
  }
  async getNoteById(id: string): Promise<NoteById> {
    const data = await api.get<NoteById>(`/songs/${id}`);
    return data;
  }
}

export const noteService = new NoteService();
