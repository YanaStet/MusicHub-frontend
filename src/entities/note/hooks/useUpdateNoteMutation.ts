import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { noteService } from "../api/service";
import type { UpdateNoteRequest } from "../model";

export function useUpdateNoteMutation(): UseMutationResult<
  {},
  AxiosError<{}>,
  UpdateNoteRequest
> {
  return useMutation({
    mutationFn: (body: UpdateNoteRequest) => noteService.updateNote(body),
  });
}
