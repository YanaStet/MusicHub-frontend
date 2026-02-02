import { api } from "@/shared/api/api";
import type { NoteParams, NotePaginatedResponse } from "../model";
import { buildQueryParams } from "@/shared/utils/query";

class NoteService {
  async getNotesPaginated(params: NoteParams): Promise<NotePaginatedResponse> {
    const data = api.get<NotePaginatedResponse>(
      `/songs?${buildQueryParams(params)}`,
    );
    return data;
  }
}

export const noteService = new NoteService();
