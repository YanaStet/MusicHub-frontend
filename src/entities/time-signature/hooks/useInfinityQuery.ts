import { useInfiniteQuery } from "@tanstack/react-query";
import type {
  TimeSignatureInfinityResponse,
  TimeSignaturePaginated,
  TimeSignatureParams,
} from "../model";
import { TIME_SIGNATURES_CONSTANTS } from "../model/constants";
import { timeSignatureService } from "../api/service";

export const useTimeSignaturesInfinityQuery = (params: TimeSignatureParams) => {
  return useInfiniteQuery<
    TimeSignaturePaginated,
    Error,
    TimeSignatureInfinityResponse,
    (string | TimeSignatureParams)[],
    number
  >({
    queryKey: [TIME_SIGNATURES_CONSTANTS.GET_INFINITY_QUERY, params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await timeSignatureService.getTimeSignatures({
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
