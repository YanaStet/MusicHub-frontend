import { usePaginatedNoteQuery } from "./usePaginatedNoteQuery";
import { useNoteInfinityQuery } from "./useNoteInfinityQuery";
import { useNoteByIdQuery } from "./useNoteByIdQuery";
import { useCreateNoteMutation } from "./useCreateNoteMutation";
import { useDeleteNoteMutation } from "./useDeleteNoteMutation";

export const noteHooks = {
  usePaginatedNoteQuery,
  useNoteInfinityQuery,
  useNoteByIdQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
};
