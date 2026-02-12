import type {
  NoteInfinityQueryResponse,
  NotePaginatedResponse,
  NoteParams,
} from "@/entities/note/model";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AUTH_CONSTANTS } from "../model";
import { authService } from "../api/service";
import type { Error } from "@/shared/types/common";

export const useMyFavouriteSongsInfinityQuery = (params: NoteParams) => {
  return useInfiniteQuery<
    NotePaginatedResponse,
    Error,
    NoteInfinityQueryResponse,
    (string | NoteParams)[],
    number
  >({
    queryKey: [AUTH_CONSTANTS.GET_MY_SONGS, params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await authService.myFavouriteSongs({
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
