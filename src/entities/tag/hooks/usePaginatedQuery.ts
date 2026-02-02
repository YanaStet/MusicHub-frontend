import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { TAG_CONSTANTS, type TagPaginated } from "../model";
import { AxiosError } from "axios";
import type { Params } from "@/shared/types/common";
import { tagService } from "../api/service";

export function useTagsPaginatedQuery<TData = TagPaginated>(
  params: Params,
  options?: Partial<UseQueryOptions<TagPaginated, AxiosError, TData>>,
): UseQueryResult<TData> {
  return useQuery<TagPaginated, AxiosError, TData>({
    queryKey: [TAG_CONSTANTS.GET_PAGINATED, params],
    queryFn: () => tagService.getTags(params),
    ...options,
  });
}
