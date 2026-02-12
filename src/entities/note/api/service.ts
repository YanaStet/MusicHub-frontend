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
    if (body.description) formData.append("description", body.description);
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
  async viewNote(id: number): Promise<{}> {
    const data = await api.post<{}, {}>(`/songs/${id}/view`, {});
    return data;
  }
  async likeNote(id: number): Promise<{}> {
    const data = await api.post<{}, {}>(`/songs/${id}/like`, {});
    return data;
  }
  async downloadNote(id: number, title: string): Promise<void> {
    try {
      const { downloadUrl } = await api.get<{ downloadUrl: string }>(
        `/songs/${id}/download`,
      );

      const response = await fetch(downloadUrl);

      if (!response.ok) throw new Error("Failed to fetch file from cloud");

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const safeTitle = title.replace(/\s+/g, "_");
      link.setAttribute("download", `${safeTitle}.pdf`);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }
}

export const noteService = new NoteService();
