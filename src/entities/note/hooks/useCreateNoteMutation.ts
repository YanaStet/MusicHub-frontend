import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { CreateNoteRequest, NoteById } from "../model";
import { noteService } from "../api/service";

export function useCreateNoteMutation(): UseMutationResult<
  NoteById,
  AxiosError<{}>,
  CreateNoteRequest
> {
  return useMutation({
    mutationFn: (body: CreateNoteRequest) => noteService.createNote(body),
  });
}
