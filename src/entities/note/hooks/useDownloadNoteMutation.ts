// features/notes/hooks/useDownloadNote.ts
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { noteService } from "../api/service";
import type { AxiosError } from "axios";

export function useDownloadNoteMutation(): UseMutationResult<
  void,
  AxiosError<{}>,
  { id: number; title: string }
> {
  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      noteService.downloadNote(id, title),
  });
}
