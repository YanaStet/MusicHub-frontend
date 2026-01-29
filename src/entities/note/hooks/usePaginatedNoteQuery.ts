import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  NOTE_CONSTANTS,
  type NotePaginatedResponse,
  type NoteParams,
} from "../model";
import { noteService } from "../api/service";
import { AxiosError } from "axios";

export function usePaginatedNoteQuery<TData = NotePaginatedResponse>(
  params: NoteParams,
  options?: Partial<UseQueryOptions<NotePaginatedResponse, AxiosError, TData>>,
): UseQueryResult<TData> {
  return useQuery<NotePaginatedResponse, AxiosError, TData>({
    queryKey: [NOTE_CONSTANTS.GET_PAGINATED_NOTES, params],
    queryFn: () => noteService.getNotesPaginated(params),
    ...options,
  });
}
