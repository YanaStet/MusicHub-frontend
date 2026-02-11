import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { noteService } from "../api/service";

export function useViewNoteMutation(): UseMutationResult<
  {},
  AxiosError<{}>,
  number
> {
  return useMutation({
    mutationFn: (id: number) => noteService.viewNote(id),
  });
}
