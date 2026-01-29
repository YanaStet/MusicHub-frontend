import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  type TimeSignaturePaginated,
  type TimeSignatureParams,
} from "../model";
import { timeSignatureService } from "../api/service";
import { AxiosError } from "axios";
import { TIME_SIGNATURES_CONSTANTS } from "../model/constants";

export function useTimeSignaturePaginatedQuery<TData = TimeSignaturePaginated>(
  params: TimeSignatureParams,
  options?: Partial<UseQueryOptions<TimeSignaturePaginated, AxiosError, TData>>,
): UseQueryResult<TData> {
  return useQuery<TimeSignaturePaginated, AxiosError, TData>({
    queryKey: [TIME_SIGNATURES_CONSTANTS.GET_PAGINATED, params],
    queryFn: () => timeSignatureService.getTimeSignatures(params),
    ...options,
  });
}
