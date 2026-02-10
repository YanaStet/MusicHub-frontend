import { api } from "@/shared/api/api";
import type {
  NoteParams,
  NotePaginatedResponse,
  NoteById,
  CreateNoteRequest,
  UpdateNoteRequest,
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
    const formData = new FormData();
    formData.append("title", body.title);
    formData.append("userId", String(body.userId));
    formData.append("timeSignatureId", String(body.timeSignatureId));
    formData.append("isPublic", String(body.isPublic));

    if (body.tagsIds && body.tagsIds.length > 0) {
      formData.append("tagsIds", body.tagsIds.join(","));
    }

    if (body.pdf) formData.append("pdf", body.pdf as Blob);
    if (body.audio) formData.append("audio", body.audio as Blob);
    if (body.cover) formData.append("cover", body.cover as Blob);
    const data = await api.post<NoteById, FormData>(`/songs`, formData);
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
      `/composers/${id}/songs?${buildQueryParams(params)}`,
    );
    return data;
  }
  async updateNote(body: UpdateNoteRequest): Promise<{}> {
    const newBody = {
      title: body.title,
      description: body.description,
      tagsIds: body.tagsIds,
    };
    const data = await api.put<{}, Omit<UpdateNoteRequest, "id">>(
      `/songs/${body.id}`,
      newBody,
    );
    return data;
  }
}

export const noteService = new NoteService();
