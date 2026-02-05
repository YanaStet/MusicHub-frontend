import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { noteService } from "../api/service";

export function useDeleteNoteMutation(): UseMutationResult<
  {},
  AxiosError<{}>,
  number
> {
  return useMutation({
    mutationFn: (id: number) => noteService.deleteNote(id),
  });
}
