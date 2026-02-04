import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { NOTE_CONSTANTS, type NoteById } from "../model";
import { noteService } from "../api/service";
import { AxiosError } from "axios";

export function useNoteByIdQuery<TData = NoteById>(
  id: string,
  options?: Partial<UseQueryOptions<NoteById, AxiosError, TData>>,
): UseQueryResult<TData> {
  return useQuery<NoteById, AxiosError, TData>({
    queryKey: [NOTE_CONSTANTS.GET_NOTE_BY_ID, id],
    queryFn: () => noteService.getNoteById(id),
    ...options,
  });
}
