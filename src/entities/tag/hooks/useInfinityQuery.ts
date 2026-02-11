import { useInfiniteQuery } from "@tanstack/react-query";
import { TAG_CONSTANTS, type TagInfinity, type TagPaginated } from "../model";
import type { Params } from "@/shared/types/common";
import { tagService } from "../api/service";

export const useTagsInfinityQuery = (params: Params) => {
  return useInfiniteQuery<
    TagPaginated,
    Error,
    TagInfinity,
    (string | Params)[],
    number
  >({
    queryKey: [TAG_CONSTANTS.GET_INFINITY_QUERY, params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await tagService.getTags({
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
