import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { COMPOSER_CONSTANTS, type ComposerResponse } from "../model";
import { composerService } from "../api/service";
import { AxiosError } from "axios";

export function useComposerByIdquery<TData = ComposerResponse>(
  id: string,
  options?: Partial<UseQueryOptions<ComposerResponse, AxiosError, TData>>,
): UseQueryResult<TData> {
  return useQuery<ComposerResponse, AxiosError, TData>({
    queryKey: [COMPOSER_CONSTANTS.GET_COMPOSER_BY_ID, id],
    queryFn: () => composerService.getComposerById(Number(id)),
    ...options,
  });
}
