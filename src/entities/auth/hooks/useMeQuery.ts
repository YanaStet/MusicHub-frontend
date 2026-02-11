import type { ComposerResponse } from "@/entities/composer/model";
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AUTH_CONSTANTS } from "../model";
import { authService } from "../api/service";

export function useMeQuery<TData = ComposerResponse>(
  options?: Partial<UseQueryOptions<ComposerResponse, AxiosError, TData>>,
): UseQueryResult<TData> {
  return useQuery<ComposerResponse, AxiosError, TData>({
    queryKey: [AUTH_CONSTANTS.GET_ME],
    queryFn: () => authService.me(),
    ...options,
  });
}
