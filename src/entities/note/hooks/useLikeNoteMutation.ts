import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { noteService } from "../api/service";

export function useLikeNoteMutation(): UseMutationResult<
  {},
  AxiosError<{}>,
  number
> {
  return useMutation({
    mutationFn: (id: number) => noteService.likeNote(id),
  });
}
