import { useInfiniteQuery } from "@tanstack/react-query";
import { NOTE_CONSTANTS } from "../model/constants";
import { noteService } from "../api/service";
import type {
  NoteInfinityQueryResponse,
  NotePaginatedResponse,
  NoteParams,
} from "../model/type";

export const useNoteInfinityQuery = (params: NoteParams) => {
  return useInfiniteQuery<
    NotePaginatedResponse,
    Error,
    NoteInfinityQueryResponse,
    (string | NoteParams)[],
    number
  >({
    queryKey: [NOTE_CONSTANTS.INFINITE_QUERY, params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await noteService.getNotesPaginated({
        ...params,
        page: pageParam,
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
