import { api } from "@/shared/api/api";
import type {
  NoteParams,
  NotePaginatedResponse,
  NoteById,
  CreateNoteRequest,
} from "../model";
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
  async createNote(body: CreateNoteRequest): Promise<NoteById> {
    const data = await api.post<NoteById, CreateNoteRequest>(`/songs`, body);
    return data;
  }
  async deleteNote(id: number): Promise<{}> {
    const data = await api.delete<{}>(`/songs/${id}`);
    return data;
  }
  async getSongsByComposerId(
    id: number,
    params: NoteParams,
  ): Promise<NotePaginatedResponse> {
    const data = await api.get<NotePaginatedResponse>(
      `/composer/${id}/songs?${buildQueryParams(params)}`,
    );
    return data;
  }
}

export const noteService = new NoteService();
